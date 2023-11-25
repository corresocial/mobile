import { onValue, ref } from 'firebase/database'
import React, { MutableRefObject, createContext, useContext, useEffect, useRef, useState } from 'react'
import { Alert, Platform } from 'react-native'
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'

import { Chat, UserDatabase } from '../@types/chat/types'
import { Id } from '../services/firebase/types'

import { AuthContext } from './AuthContext'

import { realTimeDatabase } from '../services/firebase'
import { existsOnDatabase } from '../services/firebase/chat/existsOnDatabase'
import { readFromDatabase } from '../services/firebase/chat/readFromDatabase'
import { registerNewUser } from '../services/firebase/chat/registerNewUser'
import { unsubscribeUserChatsListener } from '../services/firebase/chat/unsubscribeUserChatsListener'
import { unsubscribeChatIdsListener } from '../services/firebase/chat/unsubscribeChatIdsListener'
import { getAndUpdateUserToken } from '../services/firebase/chat/getAndUpdateUserToken'
import { getRemoteUser } from '../services/firebase/chat/getRemoteUser'

type ChatContextType = {
	chatDataContext: Chat[]
	pushNotificationEnabled: boolean
	setPushNotificationState: (state: boolean) => Promise<void>
	userHasTokenNotification: () => Promise<boolean>
	initUserInstance: (userId?: Id) => void
	removeChatListeners: () => void
}

interface ChatProviderProps {
	children: React.ReactNode
}

const initialValue = {
	chatDataContext: [],
	pushNotificationEnabled: false,
	setPushNotificationState: (state: boolean) => new Promise<void>((resolve, reject) => { }),
	userHasTokenNotification: () => new Promise<boolean>((resolve, reject) => { }),
	initUserInstance: (userId?: Id) => { },
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

	useEffect(() => {
		initUserInstance()
		checkUserRemoteNotificationState()
	}, [])

	const initUserInstance = async (userId?: Id) => {
		if (!await existsOnDatabase(userId || userDataContext.userId)) {
			await registerNewUser(userId || userDataContext.userId, {
				blockedUsers: [''],
				chatIds: ['']
			})
		}
		console.log('CHAT: Usuário ativo...')

		await startUserChatIdsListener(userDataContext.userId as Id)
	}

	const checkUserRemoteNotificationState = async () => {
		const notificationAlreadyRegistred = await userHasTokenNotification()
		await setPushNotificationState(notificationAlreadyRegistred, notificationAlreadyRegistred)
	}

	const startUserChatIdsListener = async (userId: Id) => {
		if (!userId) return false
		const realTimeDatabaseRef = ref(realTimeDatabase, `${userId}`)
		if (await existsOnDatabase(userId)) {
			onValue(realTimeDatabaseRef, async (snapshot) => {
				// console.log(`Listener userChatIds running... ${userId}`)
				const newUserChatIds = await loadUserChatIds(userDataContext.userId)
				setChatIdList(newUserChatIds)
				startChatListener(newUserChatIds)
			})
		}
	}

	const loadUserChatIds = async (userId?: Id) => {
		if (!userId) return []

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

	const setPushNotificationState = async (state: boolean, tokenAlreadyRegistred?: boolean) => {
		console.log(`Push Notification: ${state}`)
		if (state === true) {
			await loadUserNotification()
			setPushNotificationEnabled(state)
			addNotificationListeners()
			return
		}

		if (!tokenAlreadyRegistred) {
			await getAndUpdateUserToken(userDataContext.userId as Id, null)
			removeNotificationListeners()
		}
	}

	const userHasTokenNotification = async () => {
		const user = await getRemoteUser(userDataContext.userId || '')
		if (user && user.tokenNotification) return true
		return false
	}

	const loadUserNotification = async () => {
		try {
			await registerForPushNotificationsAsync()
		} catch (err: any) {
			console.log(err)
			Alert.alert('erro', err && err.message ? err.message : err)
		}
	}

	const registerForPushNotificationsAsync = async () => {
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
					await getAndUpdateUserToken(userDataContext.userId as Id, null)
					return
				}

				token = (await Notifications.getExpoPushTokenAsync()).data
				await getAndUpdateUserToken(userDataContext.userId as Id, token)
			}
		} catch (err: any) {
			console.log(err)
			Alert.alert('erro', err && err.message ? err.message : err)
		}
	}

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
		initUserInstance,
		removeChatListeners
	})

	return (
		<ChatContext.Provider value={chatProviderData as any} >
			{children}
		</ChatContext.Provider>
	)
}

export { ChatProvider, ChatContext }
