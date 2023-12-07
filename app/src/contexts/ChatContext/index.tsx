import * as Notifications from 'expo-notifications'
import React, { MutableRefObject, createContext, useContext, useEffect, useRef, useState } from 'react'

import { Conversation } from '@domain/entities/chat/types'

import { ChatContextType, ChatProviderProps } from './types'
import { Chat, MessageObjects } from '@globalTypes/chat/types'
import { Id } from '@services/firebase/types'

import { unsubscribeChatIdsListener } from '@services/firebase/chat/unsubscribeChatIdsListener'
import { unsubscribeUserChatsListener } from '@services/firebase/chat/unsubscribeUserChatsListener'

import { ChatAdapter } from '@adapters/ChatAdapter'

import { AuthContext } from '../AuthContext'

const {
	createNewUser,
	getRemoteUserData,
	existsOnDatabase,
	startUserChatIdsListener,
	startUserChatListeners,
	updateUserTokenNotification,
	registerPushNotification,
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

	const notificationListener: MutableRefObject<any> = useRef()
	const responseListener: MutableRefObject<any> = useRef()

	const chatDataContextRef = useRef(chatDataContext)

	useEffect(() => {
		initUserInstance(userDataContext.userId as Id)
		checkUserTokenNotificationState()
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

	const chatListenerCallback = (chatId: Id, messages: MessageObjects) => {
		updateChatMessages(chatId, messages)
	}

	const updateChatMessages = (chatId: Id, messages: MessageObjects) => {
		const chatMessagesOnContext = chatDataContextRef.current
		const chats = mergeChatMessages(chatId, messages, chatMessagesOnContext)
		setChatsOnContext(chats as Conversation[])
	}

	const mergeChatMessages = (chatId: Id, messages: MessageObjects, chatMessagesOnContext: Chat[]) => {
		return chatMessagesOnContext.map((chat: Chat) => {
			if (chat.chatId === chatId) return { ...chat, messages }
			return chat
		})
	}

	// Notification

	const checkUserTokenNotificationState = async () => {
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
				addNotificationListeners()
			} else {
				await updateUserTokenNotification(authenticatedUserId, '')
				removeNotificationListeners()
			}
		} catch (err) {
			setPushNotificationEnabled(!state)
			console.log(err)
		}
	}

	/* const registerNewPushNotificationAsync = async () => {
		try {
			let token

			Notifications.setNotificationHandler({
				handleNotification: async () => ({
					shouldShowAlert: true,
					shouldPlaySound: false,
					shouldSetBadge: false,
				}),
			})

			if (Platform.OS === 'android') {
				await Notifications.setNotificationChannelAsync('default', {
					name: 'default',
					importance: Notifications.AndroidImportance.MAX,
					vibrationPattern: [0, 250, 250, 250],
					lightColor: '#FF231F7C',
				})
			}

			if (Device.isDevice) {
				const { status: existingStatus } = await Notifications.getPermissionsAsync()
				let finalStatus = existingStatus
				if (existingStatus !== 'granted') {
					const { status } = await Notifications.requestPermissionsAsync()
					finalStatus = status
				}

				if (finalStatus !== 'granted') {
					console.log('não permitiu notificações')
					await updateUserTokenNotification(userDataContext.userId as Id, '')
					return
				}

				token = (await Notifications.getExpoPushTokenAsync()).data
				await updateUserTokenNotification(userDataContext.userId as Id, token)
			}
		} catch (err: any) {
			console.log(err)
			ENVIRONMENT === 'dev' && Alert.alert('erro', err && err.message ? err.message : err)
		}
	} */

	const addNotificationListeners = () => {
		if (notificationListener) {
			console.log('Add notification Listener')
			notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
				// console.log(notification)
			})

			responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
				// console.log(response)
			})
		}
	}

	const removeNotificationListeners = () => {
		if (notificationListener && responseListener.current) {
			console.log('Remove notification Listener')
			Notifications.removePushTokenSubscription(notificationListener.current)
			Notifications.removeNotificationSubscription(notificationListener.current)
			Notifications.removeNotificationSubscription(responseListener.current)
			Notifications.unregisterForNotificationsAsync()
		}
	}

	const removeChatListeners = () => {
		unsubscribeUserChatsListener(userDataContext.userId)
		unsubscribeChatIdsListener(chatIdList)
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
