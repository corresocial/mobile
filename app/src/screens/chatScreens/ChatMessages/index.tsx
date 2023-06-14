import { get, onValue, ref } from 'firebase/database'
import React, {
	RefObject,
	useContext,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from 'react'
import { FlatList, Platform } from 'react-native'
import uuid from 'react-uuid'

import DeniedWhiteIcon from '../../../assets/icons/denied-white.svg'
import ThreeDotsWhiteIcon from '../../../assets/icons/threeDots.svg'
import {
	relativeScreenHeight,
	relativeScreenWidth,
} from '../../../common/screenDimensions'
import { theme } from '../../../common/theme'
import { realTimeDatabase } from '../../../services/firebase'
import { blockUserId } from '../../../services/firebase/chat/blockUser'
import { cleanMessages } from '../../../services/firebase/chat/cleanMessages'
import { getRemoteChatData } from '../../../services/firebase/chat/getRemoteChatData'
import { getRemoteUser } from '../../../services/firebase/chat/getRemoteUser'
import { makeAllUserMessagesAsRead } from '../../../services/firebase/chat/makeAllUserMessagesAsRead'
import { registerNewChat } from '../../../services/firebase/chat/registerNewChat'
import { setChatIdToUsers } from '../../../services/firebase/chat/setChatIdToUsers'
import { unblockUserId } from '../../../services/firebase/chat/unblockUser'
import { unsubscribeMessageListener } from '../../../services/firebase/chat/unsubscribeMessageListener'
import { getLastMessageObjects } from '../../../utils/chat'
import { Container, Header, IsBlockedContainer, Sigh } from './styles'

import { AuthContext } from '../../../contexts/AuthContext'

import {
	Chat,
	Message,
	MessageObjects,
	UserIdentification
} from '../../../@types/chat/types'
import { FlatListItem } from '../../../@types/global/types'
import { Id } from '../../../services/firebase/types'

import { ChatInput } from '../../../components/ChatInput'
import { ChatPopOver } from '../../../components/ChatPopOver'
import { FocusAwareStatusBar } from '../../../components/FocusAwareStatusBar'
import { MessageCard } from '../../../components/MessageCard'
import { SmallUserIdentification } from '../../../components/SmallUserIdentification'
import { WithoutPostsMessage } from '../../../components/WithoutPostsMessage'
import { SmallButton } from '../../../components/_buttons/SmallButton'
import { sendMessage } from '../../../services/firebase/chat/sendMessage'

import { BackButton } from '../../../components/_buttons/BackButton'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { ChatMessagesScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'
import { HorizontalSigh } from '../../homeScreens/PostCategoryDetails/styles'

function ChatMessages({ route, navigation }: ChatMessagesScreenProps) {
	const { userDataContext } = useContext(AuthContext)

	const chatFromRoute = route.params && route.params.chat

	const [chatOptionsIsOpen, setChatOptionsIsOpen] = useState(false)
	const [currentChat, setCurrentChat] = useState<Chat>(chatFromRoute)
	const [messages, setMessages] = useState<MessageObjects>(
		currentChat.messages
	)
	const [listenerHasStarted, setListenerHasStarted] = useState(false)
	const [isBlockedUser, setIsBlockedUser] = useState(false)
	const [blockedByOwner, setBlockedByOwner] = useState(false)

	const flatListRef: RefObject<FlatList> = useRef(null)

	useLayoutEffect(() => {
		!listenerHasStarted && startMessagesListener(currentChat.chatId)
	}, [currentChat])

	useEffect(() => {
		loadChatMessages()
		makeAllUserMessagesAsRead(
			currentChat.chatId,
			userDataContext.userId as Id
		)
		return () => {
			unsubscribeMessageListener(currentChat.chatId)
			makeAllUserMessagesAsRead(
				currentChat.chatId,
				userDataContext.userId as Id
			)
		}
	}, [])

	const loadChatMessages = async () => {
		const remoteChatData = await getRemoteChatData(
			currentChat.user1,
			currentChat.user2
		)
		setCurrentChat({
			...remoteChatData,
			messages: { ...remoteChatData.messages },
		} as any) // TODO Type
		setMessages({ ...remoteChatData.messages })

		verifyUsersBlock()
	}

	const verifyUsersBlock = async () => {
		const { blockedUsers: blockedUsers1 } = await getRemoteUser(
			currentChat.user1.userId
		)
		const { blockedUsers: blockedUsers2 } = await getRemoteUser(
			currentChat.user2.userId
		)
		const blockedUsers = [...blockedUsers1, ...blockedUsers2]

		const userIsBlocked = blockedUsers.includes(currentChat.user1.userId)
			|| blockedUsers.includes(currentChat.user2.userId)

		const userBlock = blockedUsers1.includes(currentChat.user2.userId)
			? currentChat.user1.userId
			: currentChat.user2.userId
		setBlockedByOwner(userBlock === userDataContext.userId)
		setIsBlockedUser(userIsBlocked)
		return userIsBlocked
	}

	const startMessagesListener = async (chatId: Id) => {
		const realTimeDatabaseRef = ref(realTimeDatabase, `${chatId}/messages`)
		if (await existsOnDatabase(chatId)) {
			setListenerHasStarted(true)
			return onValue(realTimeDatabaseRef, (snapshot) => {
				const listenerMessages = snapshot.val()
				if (getLastMessageObjects(listenerMessages).owner !== userDataContext.userId) {
					// console.log('Listener message running...')
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
		if (!chatId) return false
		const realTimeDatabaseRef = ref(realTimeDatabase, `${chatId}`)
		return get(realTimeDatabaseRef)
			.then((snapshot: any) => snapshot.exists())
			.catch((err) => console.log(err))
	}

	const submitMessage = async (text: string) => {
		const newMessages = { ...messages, ...generateMessageObject(text) }
		if (!(await existsOnDatabase(currentChat.chatId))) {
			await registerNewChat(currentChat)
			await setChatIdToUsers(
				[currentChat.user1.userId, currentChat.user2.userId],
				currentChat.chatId
			)
			await startMessagesListener(currentChat.chatId)
		}

		setMessages(newMessages)

		const userBlock = await verifyUsersBlock()
		if (userBlock) {
			sendMessage(
				{
					message: text,
					dateTime: Date.now(),
					readed: false,
					owner: userDataContext.userId as Id,
					justOwner: true,
				} as any,
				currentChat.chatId
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
		const targetUserId = getReceiverUserId(
			currentChat.user1,
			currentChat.user2
		)
		await blockUserId(targetUserId, userDataContext.userId as Id)

		setChatOptionsIsOpen(false)
		setBlockedByOwner(true)
		setIsBlockedUser(true)
	}

	const unblockUser = async () => {
		const blockedUserId = getReceiverUserId(
			currentChat.user1,
			currentChat.user2
		)
		await unblockUserId(blockedUserId, userDataContext.userId as Id)

		setChatOptionsIsOpen(false)
		setIsBlockedUser(false)
	}

	const cleanConversation = async () => {
		await cleanMessages(
			currentChat.chatId,
			getReceiverUserId(currentChat.user1, currentChat.user2)
		)
		setMessages({})
		setChatOptionsIsOpen(false)
	}

	const generateMessageObject = (text: string) => {
		return {
			[uuid()]: {
				message: text,
				dateTime: Date.now(),
				readed: false,
				owner: userDataContext.userId as Id,
			},
		}
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

	const getUserId = (user1: UserIdentification, user2: UserIdentification) => {
		if (userDataContext.userId === user1.userId) {
			return user2.userId
		}
		return user1.userId
	}

	const getProfilePictureUrl = (user1: UserIdentification, user2: UserIdentification) => {
		if (userDataContext.userId === user1.userId) {
			return user2.profilePictureUrl
		}
		return user1.profilePictureUrl
	}

	const getFilteredMessages = () => {
		return Object.values(messages || {}).filter(
			(message: Message) => (!message.justOwner
				|| (message.justOwner
					&& message.owner === userDataContext.userId))
				&& (!message.userCanView
					|| message.userCanView === userDataContext.userId)
		)
	}

	const navigateToProfile = () => {
		navigation.navigate('ChatStack' as any, {
			// TODO type
			screen: 'ProfileChat',
			params: {
				userId: getUserId(currentChat.user1, currentChat.user2),
				stackLabel: 'Chat',
			},
		})
	}

	return (
		<Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<FocusAwareStatusBar
				backgroundColor={theme.white3}
				barStyle={'dark-content'}
			/>
			<Header>
				<BackButton onPress={() => navigation.goBack()} />
				<SmallUserIdentification
					pictureDimensions={40}
					userName={getUserName(
						currentChat.user1,
						currentChat.user2
					)}
					profilePictureUrl={getProfilePictureUrl(
						currentChat.user1,
						currentChat.user2
					)}
					width={'60%'}
					userNameFontSize={15}
					height={'100%'}
					navigateToProfile={navigateToProfile}
				/>
				<HorizontalSigh />
				<ChatPopOver
					userName={getUserName(
						currentChat.user1,
						currentChat.user2
					)}
					popoverVisibility={chatOptionsIsOpen}
					closePopover={() => setChatOptionsIsOpen(false)}
					blockUser={blockUser}
					unblockUser={unblockUser}
					userIsBlocked={blockedByOwner && isBlockedUser}
					cleanConversation={cleanConversation}
				>
					<SmallButton
						color={theme.white3}
						SvgIcon={ThreeDotsWhiteIcon}
						relativeWidth={relativeScreenWidth(12)}
						height={relativeScreenWidth(12)}
						onPress={() => setChatOptionsIsOpen(true)}
					/>
				</ChatPopOver>
			</Header>
			<FlatList
				ref={flatListRef}
				data={Object.values(messages || {}) ? getFilteredMessages() : []}
				renderItem={({ item }: FlatListItem<Message>) => (
					<MessageCard
						message={item.message}
						dateTime={item.dateTime}
						owner={isUserOwner(item.owner)}
						errorSending={false}
						sendAgain={() => console.log('sendAgain')}
					/>		
				)}
				ListHeaderComponent={() => (
					<WithoutPostsMessage
						message={
							'tome cuidado ao passar informações pessoais e combine compras e trocas em locais seguros. em caso de serviços à domicílio, verifique o perfil de quem você está contratando'
						}
						highlightedWords={[
							'passar',
							'informações',
							'pessoais',
							'combine',
							'compras',
							'trocas',
							'locais',
							'seguros',
							'verifique',
							'o',
							'perfil',
						]}
						backgroundColor={theme.yellow1}
					/>
				)}
				ListHeaderComponentStyle={{
					marginBottom: relativeScreenHeight(2),
				}}
				showsVerticalScrollIndicator={false}
				ItemSeparatorComponent={() => <Sigh />}
				ListFooterComponent={() => {
					if (isBlockedUser) {
						return (
							<IsBlockedContainer>
								<PrimaryButton
									color={theme.red3}
									labelColor={theme.white3}
									label={'usuário bloqueado'}
									highlightedWords={['usuário', 'bloqueado']}
									fontSize={14}
									SvgIcon={DeniedWhiteIcon}
									svgIconScale={['70%', '20%']}
									minHeight={20}
									relativeHeight={relativeScreenHeight(8)}
									onPress={() => unblockUser()}
								/>
							</IsBlockedContainer>
						) 
					} return <></>
				}}
				onContentSizeChange={scrollToEnd}
				onLayout={scrollToEnd}
			/>
			
			<ChatInput submitMessage={submitMessage} />
		</Container>
	)
}

export { ChatMessages }

