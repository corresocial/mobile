import React, { createContext, useContext, useEffect, useRef, useState } from 'react'

import { Chat } from '@domain/entities/chat/types'
import { Id } from '@domain/entities/globalTypes'

import { SmasRepositoryAdapter } from '@data/smas/SmasRepositoryAdapter'

import { ChatContextType, ChatProviderProps } from './types'
import { MutableObjectReference } from '@services/pushNotification/types'

import { ChatAdapter } from '@adapters/chat/ChatAdapter'
import { SmasAdapter } from '@adapters/smas/SmasAdapter'

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

const { setSmasPushNotificationState } = SmasAdapter()

const initialValue = {
	chatDataContext: [],
	pushNotificationEnabled: false,
	setPushNotificationState: (state: boolean) => new Promise<void>(() => { }),
	chatUserHasTokenNotification: () => new Promise<boolean>(() => { }),
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
		const hasTokenNotification = await chatUserHasTokenNotification()
		await setPushNotificationState(hasTokenNotification)
	}

	const chatUserHasTokenNotification = async () => {
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
				await setSmasPushNotificationState(state, '', authenticatedUserId, SmasRepositoryAdapter)
				addNotificationListener(notificationListener, responseListener)
			} else {
				await updateUserTokenNotification(authenticatedUserId, '')
				await setSmasPushNotificationState(state, '', '', SmasRepositoryAdapter)
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
		chatUserHasTokenNotification,
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
