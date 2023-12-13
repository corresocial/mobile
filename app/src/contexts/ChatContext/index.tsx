import React, { createContext, useContext, useEffect, useRef, useState } from 'react'

import { Chat } from '@domain/entities/chat/types'
import { Id } from '@domain/entities/globalTypes'

import { ChatContextType, ChatProviderProps } from './types'
import { MutableObjectReference } from '@services/pushNotification/types'

import { ChatAdapter } from '@adapters/chat/ChatAdapter'

import { AuthContext } from '../AuthContext'

const {
	createNewUser,
	getRemoteUserData,
	existsOnDatabase,
	startUserChatIdsListener,
	startUserChatListeners,
	unsubscribeUserChatIdsListener,
	unsubscribeUserChatsListener,
	updateUserTokenNotification,
	registerPushNotification,
	addNotificationListener,
	removeNotificationListener
} = ChatAdapter()

const initialValue = {
	chatDataContext: [],
	pushNotificationEnabled: false,
	setPushNotificationState: (state: boolean) => new Promise<void>(() => { }),
	userHasTokenNotification: () => new Promise<boolean>(() => { }),
	removeChatListeners: () => { },
}

const ChatContext = createContext<ChatContextType>(initialValue)

function ChatProvider({ children }: ChatProviderProps) {
	const { userDataContext } = useContext(AuthContext)

	const [pushNotificationEnabled, setPushNotificationEnabled] = useState(false)
	const [chatDataContext, setChatsOnContext] = useState<Chat[]>([])
	const [chatIdList, setChatIdList] = useState<string[]>([])

	const notificationListener: MutableObjectReference<any> = useRef()
	const responseListener: MutableObjectReference<any> = useRef()

	const chatDataContextRef = useRef(chatDataContext)

	useEffect(() => {
		initUserInstance(userDataContext.userId as Id)
		initPushNotificationService()
	}, [])

	useEffect(() => {
		chatDataContextRef.current = chatDataContext
	}, [chatDataContext])

	const initUserInstance = async (userId: Id) => {
		if (!await existsOnDatabase(userId)) await createNewUser(userId)
		await startUserChatIdsListener(userId, userChatIdsListenerCallback)
	}

	const userChatIdsListenerCallback = async (chatIds: Id[], userChats: Chat[]) => {
		setChatIdList(chatIds)
		setChatsOnContext(userChats)

		startUserChatListeners(chatIds, chatListenerCallback)
	}

	const chatListenerCallback = (chatId: Id, updatedChat: Chat) => {
		updateChatsOnContext(chatId, updatedChat)
	}

	const updateChatsOnContext = (chatId: Id, updatedChat: Chat) => {
		const chatsOnContext = chatDataContextRef.current
		const chats = mergeChatOnContext(chatId, updatedChat, chatsOnContext)
		setChatsOnContext(chats as Chat[])
	}

	const mergeChatOnContext = (chatId: Id, updatedChat: Chat, chatsOnContext: Chat[]) => {
		return chatsOnContext.map((chat: Chat) => {
			if (chat && chat.chatId === chatId) return { ...chat, ...updatedChat, messages: updatedChat.messages || [] }
			return chat
		})
	}

	// Notification

	const initPushNotificationService = async () => {
		const hasTokenNotification = await userHasTokenNotification()
		await setPushNotificationState(hasTokenNotification)
	}

	const userHasTokenNotification = async () => {
		const remoteUser = await getRemoteUserData(userDataContext.userId as Id)
		return !!(remoteUser && remoteUser.tokenNotification)
	}

	const setPushNotificationState = async (state: boolean) => {
		const authenticatedUserId = userDataContext.userId as Id

		try {
			setPushNotificationEnabled(state)

			if (state === true) {
				const tokenNotification = await registerPushNotification()
				updateUserTokenNotification(authenticatedUserId, tokenNotification)
				addNotificationListener(notificationListener, responseListener)
			} else {
				await updateUserTokenNotification(authenticatedUserId, '')
				removeNotificationListener(notificationListener, responseListener)
			}
		} catch (err) {
			setPushNotificationEnabled(!state)
			console.log(err)
		}
	}

	const removeChatListeners = () => {
		unsubscribeUserChatsListener(chatIdList)
		unsubscribeUserChatIdsListener(userDataContext.userId as Id)
		setPushNotificationState(false)
		setChatIdList([])
		setChatsOnContext([])
	}

	const chatProviderData = ({
		pushNotificationEnabled,
		setPushNotificationState,
		userHasTokenNotification,
		chatDataContext,
		removeChatListeners
	})

	return (
		<ChatContext.Provider value={chatProviderData as any} >
			{children}
		</ChatContext.Provider>
	)
}

export { ChatProvider, ChatContext }
