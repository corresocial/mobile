import { onValue, ref } from 'firebase/database'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { Chat, UserDatabase } from '../@types/chat/types'
import { realTimeDatabase } from '../services/firebase'
import { existsOnDatabase } from '../services/firebase/chat/existsOnDatabase'
import { readFromDatabase } from '../services/firebase/chat/readFromDatabase'
import { registerNewUser } from '../services/firebase/chat/registerNewUser'
import { Id } from '../services/firebase/types'
import { AuthContext } from './AuthContext'

type ChatData = any

type ChatContextType = {
	loadChats: (chatIds?: Id[]) => void
	loadUserChatIds: (userId: Id) => Promise<Id[]>
	updateChat: (chatData: Chat) => void

	startChatListener: (chatIds: Id[]) => void
	setCurrentChat: (chat: Chat) => void
	startMessagesListener: (chatId: Id) => void
	chatDataContext: ChatData
	setNewMessageOnChat: (chatId: Id, chatData: ChatData) => void
	updateChatDataOnContext: (chatData: ChatData) => void
}

interface ChatProviderProps {
	children: React.ReactNode
}

const initialValue = {
	setCurrentChat: (chat: Chat) => { },
	chatDataContext: [],
	loadChats: (chatIds?: Id[]) => { },
	updateChat: (chatData: Chat) => { },
	loadUserChatIds: (userId: Id) => Promise,
	startChatListener: (chatIds: Id[]) => { },
	startMessagesListener: (chatId: Id) => { },
	setNewMessageOnChat: (chatId: Id, chatData: ChatData) => { },
	updateChatDataOnContext: (chatData: ChatData) => { },

}

const ChatContext = createContext<ChatContextType>(initialValue as any) // TODO Type

function ChatProvider({ children }: ChatProviderProps) {
	const { userDataContext } = useContext(AuthContext)

	const [chatDataContext, setChatsOnContext] = useState<Chat[]>([])
	const [currentChat, setCurrentChat] = useState<Chat>()

	useEffect(() => {
		initUserInstance()
		/* setTimeout(() => {
			console.log('removingEventListeners')
			const realTimeDatabaseRef = ref(realTimeDatabase, `${userDataContext.userId}`)
			off(realTimeDatabaseRef)
		}, 20000) */
	}, [])

	const initUserInstance = async () => {
		if (!await existsOnDatabase(userDataContext.userId)) {
			await registerNewUser(userDataContext.userId, {
				blockedUsers: [''],
				chatIds: ['']
			})
		}
		console.log('starting user instance...')
		await startUserChatIdsListener(userDataContext.userId)
	}

	const startUserChatIdsListener = async (userId: Id) => {
		const realTimeDatabaseRef = ref(realTimeDatabase, `${userId}`)
		if (await existsOnDatabase(userId)) {
			onValue(realTimeDatabaseRef, async (snapshot) => {
				console.log(`Listener userChatIds running... ${userId}`)
				const newUserChatIds = await loadUserChatIds(userDataContext.userId)
				startChatListener(newUserChatIds)
				// loadChats(newUserChatIds) // Remove
			})
		} else { // Remove
			console.log(`Esse usuário não existe: ${userId}`)
		}
	}

	const loadUserChatIds = async (userId: Id) => {
		return readFromDatabase([userId])
			.then((user: UserDatabase[]) => {
				const filteredChatIds = removeEqualsChatIds(user[0].chatIds)
				console.log(filteredChatIds)
				return filteredChatIds
			})
	}

	const startChatListener = async (chatIds: Id[]) => {
		chatIds.forEach(async (chatId: string) => {
			const realTimeDatabaseRef = ref(realTimeDatabase, `${chatId}`)
			if (await existsOnDatabase(chatId)) {
				onValue(realTimeDatabaseRef, async (snapshot) => {
					console.log('Listener chats running...')
					loadChats(chatIds)
				})
			} else {
				console.log(`Esse chat não existe: ${chatId}`)
			}
		})
	}

	const loadChats = async (chatIds: Id[]) => {
		const filteredChatIds = chatIds.filter((chatId) => chatId)
		if (!filteredChatIds.length) return

		await readFromDatabase(filteredChatIds)
			.then((remoteChats: Chat[]) => setChatsOnContext(remoteChats))
			.catch((err) => console.log(err))
	}

	const removeEqualsChatIds = (chatIds: Id[]) => {
		if (!chatIds || !chatIds.length) return []
		return chatIds
			.filter((elem, index) => chatIds.indexOf(elem) === index || !!elem)
			.filter((filteredChatIds) => filteredChatIds)
	}

	const updateChat = async (chatData: ChatData) => {
		const newChats = chatDataContext.map((chat) => {
			if (chat.chatId === chatData.chatId) {
				return chatData
			}
			return chat
		})

		setChatsOnContext(newChats)
	}

	const chatProviderData = ({
		currentChat,
		setCurrentChat,
		updateChat,
		chatDataContext,
		loadChats,
		loadUserChatIds,
	})

	return (
		<ChatContext.Provider value={chatProviderData as any} >
			{children}
		</ChatContext.Provider>
	)
}

export { ChatProvider, ChatContext }
