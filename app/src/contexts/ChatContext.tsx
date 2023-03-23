import { onValue, ref } from 'firebase/database'
import React, { createContext, useMemo, useState } from 'react'
import { Chat } from '../@types/chat/types'
import { realTimeDatabase } from '../services/firebase'
import { readFromDatabase } from '../services/firebase/chat/read'
import { Id } from '../services/firebase/types'

type ChatData = any

type ChatContextType = {
	setCurrentChat: (chat: Chat) => void
	loadChats: (chatIds: Id[]) => void
	startChatListener: (chatIds: Id[]) => void
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
	chatDataContext: {},
	loadChats: (chatIds: Id[]) => { },
	startChatListener: (chatIds: Id[]) => { },
	startMessagesListener: (chatId: Id) => { },
	setNewMessageOnChat: (chatId: Id, chatData: ChatData) => { },
	updateChatDataOnContext: (chatData: ChatData) => { },

}

const ChatContext = createContext<ChatContextType>(initialValue)

function ChatProvider({ children }: ChatProviderProps) {
	const [chatDataContext, setChatsOnContext] = useState<Chat[]>([])
	const [currentChat, setCurrentChat] = useState<Chat>()

	const loadChats = async (chatIds: Id[]) => {
		console.log(`chatIds: ${chatIds}`)

		await readFromDatabase(chatIds)
			.then((remoteChats: Chat[]) => setChatsOnContext(remoteChats))
			.catch((err) => console.log(err))
	}

	const updateChatDataOnContext = async (chatData: ChatData) => {
		/* console.log('Update chats...')
		console.log(chatDataContext)
		console.log('---------------------------------------------------------')
		console.log(chatData) */
		const newChats = chatDataContext.map((chat) => {
			/* 	console.log(chat.chatId === chatData.chatId)
				console.log(chat.chatId)
				console.log(chatData.chatId) */
			if (chat.chatId === chatData.chatId) {
				return chatData
			}
			return chat
		})

		if (chatDataContext.length === 0) {
			newChats.push(chatData)
		}

		setChatsOnContext(newChats)
	}

	const startChatListener = (chatIds: Id[]) => {
		chatIds.forEach((chatId: string) => {
			const realTimeDatabaseRef = ref(realTimeDatabase, `${chatId}`)
			onValue(realTimeDatabaseRef, (snapshot) => {
				// const data = snapshot.val()
				// updateChatDataOnContext(data)
				// loadChats(chatIds)
			})
		})
	}

	const startMessagesListener = (chatId: Id) => {
		const realTimeDatabaseRef = ref(realTimeDatabase, `${chatId}/messages`)
		return onValue(realTimeDatabaseRef, (snapshot) => {
			const data = snapshot.val()
			return data
		})
	}

	const chatProviderData = useMemo(() => ({
		currentChat,
		setCurrentChat,
		updateChatDataOnContext,
		chatDataContext,
		loadChats,
		startChatListener,
		startMessagesListener,
	}), [chatDataContext])

	return (
		<ChatContext.Provider value={chatProviderData as any} >
			{children}
		</ChatContext.Provider>
	)
}

export { ChatProvider, ChatContext }
