import React, { RefObject, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import uuid from 'react-uuid'

import { FlatList } from 'react-native'
import { get, onValue, ref } from 'firebase/database'
import { theme } from '../../../common/theme'
import { SmallButton } from '../../../components/_buttons/SmallButton'

import { Container, Header, Sigh } from './styles'
import AngleLeftThinIcon from '../../../assets/icons/angleLeftThin.svg'
import ThreeDotsIcon from '../../../assets/icons/threeDots.svg'
import { relativeScreenHeight, relativeScreenWidth } from '../../../common/screenDimensions'
import { SmallUserIdentification } from '../../../components/SmallUserIdentification'
import { FocusAwareStatusBar } from '../../../components/FocusAwareStatusBar'
import { WithoutPostsMessage } from '../../../components/WithoutPostsMessage'
import { ChatInput } from '../../../components/ChatInput'
import { MessageCard } from '../../../components/MessageCard'
import { Chat, Message, MessageObjects, UserIdentification } from '../../../@types/chat/types'
import { AuthContext } from '../../../contexts/AuthContext'
import { ChatPopOver } from '../../../components/ChatPopOver'
import { FlatListItem } from '../../../@types/global/types'
import { sendMessage } from '../../../services/firebase/chat/sendMessage'
import { Id } from '../../../services/firebase/types'
import { realTimeDatabase } from '../../../services/firebase'
import { ChatMessagesScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'
import { getRemoteChatData } from '../../../services/firebase/chat/getRemoteChatData'
import { registerNewChat } from '../../../services/firebase/chat/registerNewChat'
import { setChatIdToUsers } from '../../../services/firebase/chat/setChatIdToUsers'
import { makeAllUserMessagesAsRead } from '../../../services/firebase/chat/makeAllUserMessagesAsRead'
import { getLastMessageObjects } from '../../../utils/chat'
import { blockUserId } from '../../../services/firebase/chat/blockUser'
import { getRemoteUser } from '../../../services/firebase/chat/getRemoteUser'
import { sortArray } from '../../../common/auxiliaryFunctions'

function ChatMessages({ route, navigation }: ChatMessagesScreenProps) {
	const { userDataContext } = useContext(AuthContext)

	const chatFromRoute = route.params && route.params.chat

	const [chatOptionsIsOpen, setChatOptionsIsOpen] = useState(false)
	const [currentChat, setCurrentChat] = useState<Chat>(chatFromRoute)
	const [messages, setMessages] = useState<MessageObjects>(currentChat.messages)
	const [isBlockedUser, setIsBlockedUser] = useState(false)

	const flatListRef: RefObject<FlatList> = useRef(null)

	useLayoutEffect(() => {
		startMessagesListener(currentChat.chatId)
	}, [])

	useEffect(() => {
		loadChatMessages()
		makeAllUserMessagesAsRead(currentChat.chatId, userDataContext.userId)
		return () => {
			makeAllUserMessagesAsRead(currentChat.chatId, userDataContext.userId)
		}
	}, [])

	const loadChatMessages = async () => {
		const remoteChatData = await getRemoteChatData(currentChat.user1, currentChat.user2)
		setCurrentChat(remoteChatData)

		const { blockedUsers: blockedUsers1 } = await getRemoteUser(currentChat.user1.userId)
		const { blockedUsers: blockedUsers2 } = await getRemoteUser(currentChat.user2.userId)
		const blockedUsers = [...blockedUsers1, ...blockedUsers2]
		console.log(blockedUsers)
		const userIsBlocked = blockedUsers.includes(currentChat.user1.userId) || blockedUsers.includes(currentChat.user2.userId)
		console.log(`Usuário bloqueado: ${userIsBlocked}`)
		setIsBlockedUser(userIsBlocked)
	}

	const startMessagesListener = async (chatId: Id) => {
		const realTimeDatabaseRef = ref(realTimeDatabase, `${chatId}/messages`)
		if (await existsOnDatabase(chatId)) {
			onValue(realTimeDatabaseRef, (snapshot) => {
				const listenerMessages = snapshot.val()
				if (getLastMessageObjects(listenerMessages).owner !== userDataContext.userId) {
					console.log('Listener message running...')
					setMessages(listenerMessages)
				}
			})
		}
	}

	const isUserOwner = (messageUserId: string) => {
		return userDataContext.userId === messageUserId
	}

	const scrollToEnd = () => {
		flatListRef.current?.scrollToEnd({ animated: true })
	}

	const existsOnDatabase = async (chatId: Id) => {
		const realTimeDatabaseRef = ref(realTimeDatabase, `${chatId}`)
		return get(realTimeDatabaseRef)
			.then((snapshot: any) => snapshot.exists())
			.catch((err) => console.log(err))
	}

	const submitMessage = async (text: string) => {
		const newMessages = { ...messages, ...generateMessageObject(text) }
		if (!await existsOnDatabase(currentChat.chatId)) {
			await registerNewChat(currentChat)
			await setChatIdToUsers([currentChat.user1.userId, currentChat.user2.userId], currentChat.chatId)
			await startMessagesListener(currentChat.chatId)
		}

		setMessages(newMessages)

		if (isBlockedUser) {
			sendMessage(
				{
					message: text,
					dateTime: Date.now(),
					readed: false,
					owner: userDataContext.userId as Id,
				},
				currentChat.chatId,
				getUserSenderLabel(currentChat.user1, currentChat.user2)
			)
			return
		}

		sendMessage({
			message: text,
			dateTime: Date.now(),
			readed: false,
			owner: userDataContext.userId as Id,
		}, currentChat.chatId)
	}

	const blockUser = async () => {
		const blockedUserId = getReceiverUserId(currentChat.user1, currentChat.user2)
		await blockUserId(blockedUserId, userDataContext.userId)

		setChatOptionsIsOpen(false)
		navigation.goBack()
	}

	const generateMessageObject = (text: string) => {
		return {
			[uuid()]: {
				message: text,
				dateTime: Date.now(),
				readed: false,
				owner: userDataContext.userId as Id
			}
		}
	}

	const getUserSenderLabel = (user1: UserIdentification, user2: UserIdentification) => {
		if (userDataContext.userId === user1.userId) {
			return 'user1'
		}
		return 'user2'
	}

	const getReceiverUserId = (user1: UserIdentification, user2: UserIdentification) => {
		if (userDataContext.userId === user1.userId) {
			return user2.userId
		}
		return user1.userId
	}

	const getUserName = (user1: UserIdentification, user2: UserIdentification) => {
		if (userDataContext.userId === user1.userId) {
			return user2.name
		}
		return user1.name
	}

	const getProfilePictureUrl = (user1: UserIdentification, user2: UserIdentification) => {
		if (userDataContext.userId === user1.userId) {
			return user2.profilePictureUrl
		}
		return user1.profilePictureUrl
	}

	const getOrdenerMessages = () => {
		const allMessages = [
			...Object.values(messages),
			...Object.values(currentChat[getUserSenderLabel(currentChat.user1, currentChat.user2)].privateMessages || [])
		]

		if (currentChat[getUserSenderLabel(currentChat.user1, currentChat.user2)].privateMessages) {
			return allMessages.sort(sortMessages)
		}

		return allMessages
	}

	const sortMessages = (a: Message, b: Message) => {
		if (a.dateTime < b.dateTime) return -1
		if (a.dateTime > b.dateTime) return 1
		return 0
	}

	return (
		<Container>
			<FocusAwareStatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<Header>
				<SmallButton
					color={theme.white3}
					SvgIcon={AngleLeftThinIcon}
					relativeWidth={relativeScreenWidth(12)}
					height={relativeScreenWidth(12)}
					onPress={() => navigation.goBack()}
				/>
				<SmallUserIdentification
					pictureDimensions={40}
					userName={getUserName(currentChat.user1, currentChat.user2)}
					profilePictureUrl={getProfilePictureUrl(currentChat.user1, currentChat.user2)}
					width={'65%'}
					userNameFontSize={15}
					height={'100%'}
				/>
				<ChatPopOver
					userName={getUserName(currentChat.user1, currentChat.user2)}
					popoverVisibility={chatOptionsIsOpen}
					closePopover={() => setChatOptionsIsOpen(false)}
					blockUser={blockUser}
					cleanConversation={() => { console.log('cleanConversation') }}
				>
					<SmallButton
						color={theme.white3}
						SvgIcon={ThreeDotsIcon}
						relativeWidth={relativeScreenWidth(12)}
						height={relativeScreenWidth(12)}
						onPress={() => setChatOptionsIsOpen(true)}
					/>
				</ChatPopOver>
			</Header>
			<FlatList
				ref={flatListRef}
				data={messages ? getOrdenerMessages() : []}
				renderItem={({ item }: FlatListItem<Message>) => ( // TODO TYPE
					<MessageCard
						message={item.message}
						dateTime={item.dateTime}
						owner={isUserOwner(item.owner)}
						errorSending={false}
						sendAgain={() => console.log('senderAgain')}
					/>
				)}
				ListHeaderComponent={() => (
					<WithoutPostsMessage
						message={'tome cuidado ao passar informações pessoais e combine compras e trocas em locais seguros. em caso de serviços à domicílio, verifique o perfil de quem você está contratando'}
						highlightedWords={['passar', 'informações', 'pessoais', 'combine', 'compras', 'trocas', 'locais', 'seguros', 'verifique', 'o', 'perfil']}
						backgroundColor={theme.yellow1}
					/>
				)}
				ListHeaderComponentStyle={{ marginBottom: relativeScreenHeight(2) }}
				showsVerticalScrollIndicator={false}
				ItemSeparatorComponent={() => <Sigh />}
				ListFooterComponent={() => <Sigh />}
				onContentSizeChange={scrollToEnd}
				onLayout={scrollToEnd}
			/>
			<ChatInput
				submitMessage={submitMessage}
			/>
		</Container>
	)
}

export { ChatMessages }
