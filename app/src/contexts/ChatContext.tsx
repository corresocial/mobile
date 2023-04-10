import { onValue, ref } from 'firebase/database'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { Chat, UserDatabase } from '../@types/chat/types'
import { realTimeDatabase } from '../services/firebase'
import { existsOnDatabase } from '../services/firebase/chat/existsOnDatabase'
import { readFromDatabase } from '../services/firebase/chat/readFromDatabase'
import { registerNewUser } from '../services/firebase/chat/registerNewUser'
import { Id } from '../services/firebase/types'
import { AuthContext } from './AuthContext'

type ChatContextType = {
	chatDataContext: Chat[]
}

interface ChatProviderProps {
	children: React.ReactNode
}

const initialValue = {
	chatDataContext: []
}

const ChatContext = createContext<ChatContextType>(initialValue)

function ChatProvider({ children }: ChatProviderProps) {
	const { userDataContext } = useContext(AuthContext)

	const [chatDataContext, setChatsOnContext] = useState<Chat[]>([])

	useEffect(() => {
		initUserInstance()
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
				// console.log(`Listener userChatIds running... ${userId}`)
				const newUserChatIds = await loadUserChatIds(userDataContext.userId)
				startChatListener(newUserChatIds)
			})
		}
	}

	const loadUserChatIds = async (userId: Id) => {
		return readFromDatabase([userId])
			.then((user: UserDatabase[]) => {
				const filteredChatIds = removeEqualsChatIds(user[0].chatIds)
				return filteredChatIds
			})
	}

	const startChatListener = async (chatIds: Id[]) => {
		chatIds.forEach(async (chatId: string) => {
			const realTimeDatabaseRef = ref(realTimeDatabase, `${chatId}`)
			if (await existsOnDatabase(chatId)) {
				onValue(realTimeDatabaseRef, async (snapshot) => {
					// console.log('Listener chats running...')
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

	/* const updateChat = async (chatData: Chat) => {
		const newChats = chatDataContext.map((chat) => {
			if (chat.chatId === chatData.chatId) {
				return chatData
			}
			return chat
		})

		setChatsOnContext(newChats)
	} */

	const chatProviderData = ({ chatDataContext })

	return (
		<ChatContext.Provider value={chatProviderData as any} >
			{children}
		</ChatContext.Provider>
	)
}

export { ChatProvider, ChatContext }
