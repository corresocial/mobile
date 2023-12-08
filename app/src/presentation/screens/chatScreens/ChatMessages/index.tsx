import React, {
	RefObject,
	useContext,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from 'react'
import { Platform } from 'react-native'
import uuid from 'react-uuid'

import { FlashList } from '@shopify/flash-list'
import { onValue, ref } from 'firebase/database'

import { AuthContext } from '@contexts/AuthContext'

import {
	Chat,
	Message,
	MessageObjects,
	ChatUserIdentification
} from '@globalTypes/chat/types'
import { FlatListItem } from '@globalTypes/global/types'
import { ChatMessagesScreenProps } from '@routes/Stack/UserStack/stackScreenProps'
import { Id } from '@services/firebase/types'

import { realTimeDatabase } from '@services/firebase'
import { blockUserId } from '@services/firebase/chat/blockUser'
import { cleanMessages } from '@services/firebase/chat/cleanMessages'
import { getRemoteChatData } from '@services/firebase/chat/getRemoteChatData'
import { makeAllUserMessagesAsRead } from '@services/firebase/chat/makeAllUserMessagesAsRead'
import { registerNewChat } from '@services/firebase/chat/registerNewChat'
import { sendMessage } from '@services/firebase/chat/sendMessage'
import { setChatIdToUsers } from '@services/firebase/chat/setChatIdToUsers'
import { unblockUserId } from '@services/firebase/chat/unblockUser'
import { unsubscribeMessageListener } from '@services/firebase/chat/unsubscribeMessageListener'
import { UiChatUtils } from '@utils-ui/chat/UiChatUtils'

import { Container, Header, IsBlockedContainer } from './styles'
import DeniedWhiteIcon from '@assets/icons/denied-white.svg'
import ThreeDotsWhiteIcon from '@assets/icons/threeDots.svg'
import { relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { ChatAdapter } from '@adapters/ChatAdapter'

import { BackButton } from '@components/_buttons/BackButton'
import { SmallButton } from '@components/_buttons/SmallButton'
import { DefaultConfirmationModal } from '@components/_modals/DefaultConfirmationModal'
import { HorizontalSpacing } from '@components/_space/HorizontalSpacing'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { ChatInput } from '@components/ChatInput'
import { ChatPopOver } from '@components/ChatPopOver'
import { FocusAwareStatusBar } from '@components/FocusAwareStatusBar'
import { MessageCard } from '@components/MessageCard'
import { SmallUserIdentification } from '@components/SmallUserIdentification'
import { WithoutPostsMessage } from '@components/WithoutPostsMessage'

const { getLastMessageObject } = UiChatUtils()

const { getConversationUserId, getConversationUserName, getConversationProfilePicture } = UiChatUtils()

const {
	existsOnDatabase,
	hasBlockedUserOnConversation
} = ChatAdapter()

function ChatMessages({ route, navigation }: ChatMessagesScreenProps) {
	const { userDataContext } = useContext(AuthContext)

	const chatFromRoute = route.params && route.params.chat

	const [chatOptionsIsOpen, setChatOptionsIsOpen] = useState(false)
	const [currentChat, setCurrentChat] = useState<Chat>(chatFromRoute)
	const [messages, setMessages] = useState<MessageObjects>(currentChat.messages)
	const [listenerHasStarted, setListenerHasStarted] = useState(false)
	const [isBlockedUser, setIsBlockedUser] = useState(false)
	const [blockedByOwner, setBlockedByOwner] = useState(false)

	const [blockConfirmationModalIsVisible, setBlockConfirmationModalIsVisible] = useState(false)
	const [clearMessagesConfirmationModalIsVisible, setCleanMessagesConfirmationModalIsVisible] = useState(false)

	const flatListRef: RefObject<any> = useRef(null)

	useLayoutEffect(() => {
		!listenerHasStarted && startMessagesListener(currentChat.chatId)
	}, [currentChat])

	useEffect(() => {
		loadChatMessages()
		makeAllUserMessagesAsRead(currentChat.chatId, userDataContext.userId as Id)
		return () => {
			unsubscribeMessageListener(currentChat.chatId)
			makeAllUserMessagesAsRead(
				currentChat.chatId,
				userDataContext.userId as Id
			)
		}
	}, [])

	const loadChatMessages = async () => {
		const remoteChatData = await getRemoteChatData(currentChat.user1, currentChat.user2)

		setCurrentChat({ ...remoteChatData, messages: { ...remoteChatData.messages }, } as any) // TODO Type
		setMessages({ ...remoteChatData.messages })

		verifyUsersBlock()
	}

	const verifyUsersBlock = async () => {
		const authenticatedUserId = userDataContext.userId
		const { userId: userId1 } = currentChat.user1
		const { userId: userId2 } = currentChat.user2

		const { hasUserBlocked, userBlockOwnerId } = await hasBlockedUserOnConversation(userId1, userId2)

		setBlockedByOwner(userBlockOwnerId === authenticatedUserId)
		setIsBlockedUser(hasUserBlocked)

		return hasUserBlocked
	}

	const startMessagesListener = async (chatId: Id) => {
		const realTimeDatabaseRef = ref(realTimeDatabase, `${chatId}/messages`)
		if (await existsOnDatabase(chatId)) {
			setListenerHasStarted(true)
			return onValue(realTimeDatabaseRef, (snapshot) => {
				const listenerMessages = snapshot.val()
				if (getLastMessageObject(listenerMessages).owner !== userDataContext.userId) {
					setMessages(listenerMessages)
				}
			})
		}
	}

	const isUserOwner = (messageUserId: string) => {
		return userDataContext.userId === messageUserId
	}

	const scrollToEnd = () => {
		!!(messages && messages.length) && flatListRef.current?.scrollToEnd({ animated: true })
	}

	const submitMessage = async (text: string) => {
		if (!(await existsOnDatabase(currentChat.chatId))) {
			await registerNewChat(currentChat)
			await setChatIdToUsers(
				[currentChat.user1.userId, currentChat.user2.userId],
				currentChat.chatId
			)
			await startMessagesListener(currentChat.chatId)
		}

		const newMessages = { ...messages, ...generateMessageObject(text) }
		setMessages(newMessages)

		const userBlock = await verifyUsersBlock()
		if (userBlock) { // Check loginc
			sendMessage(
				{
					message: text,
					dateTime: Date.now(),
					readed: false,
					justOwner: true,
					owner: userDataContext.userId as Id,
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

		// await sendPushNotification(text)
	}

	/* async function sendPushNotification(text: string) {
		const destinationUserId = getConversationUserId(userDataContext.userId as Id, currentChat.user1, currentChat.user2)
		const remoteUser = await getRemoteUserData(destinationUserId)

		const message = {
			to: remoteUser.tokenNotification,
			sound: 'default',
			title: 'corre social poha',
			body: text,
			data: { collapseKey: 'corre_social_notification' },
		}

		await fetch('https://exp.host/--/api/v2/push/send', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Accept-encoding': 'gzip, deflate',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(message),
		})
	}
 */
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

	const getReceiverUserId = (user1: ChatUserIdentification, user2: ChatUserIdentification) => {
		if (userDataContext.userId === user1.userId) {
			return user2.userId
		}
		return user1.userId
	}

	const getRecipientUserName = () => {
		const { user1, user2 } = currentChat
		return getConversationUserName(userDataContext.userId as Id, user1, user2)
	}

	const getRecipientUserId = () => {
		const { user1, user2 } = currentChat
		return getConversationUserId(userDataContext.userId as Id, user1, user2)
	}

	const getProfilePictureUrl = () => {
		const { user1, user2 } = currentChat
		return getConversationProfilePicture(userDataContext.userId as Id, user1, user2)
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
		navigation.navigate('ChatStack' as any, { // TODO type
			screen: 'ProfileChat',
			params: {
				userId: getRecipientUserId(),
				stackLabel: 'Chat',
			},
		})
	}

	const toggleBlockConfirmationModalVisibility = () => {
		setChatOptionsIsOpen(false)
		setTimeout(() => setBlockConfirmationModalIsVisible(!blockConfirmationModalIsVisible), 400)
	}

	const toggleCleanMessagesConfirmationModalVisibility = () => {
		setChatOptionsIsOpen(false)
		setTimeout(() => setCleanMessagesConfirmationModalIsVisible(!clearMessagesConfirmationModalIsVisible), 400)
	}

	return (
		<Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<DefaultConfirmationModal // BLOCK
				visibility={blockConfirmationModalIsVisible}
				title={isBlockedUser ? 'desbloquear' : 'bloquear'}
				text={`você tem certeza que deseja ${isBlockedUser ? 'desbloquear' : 'bloquear'} ${getRecipientUserName()}?`}
				highlightedWords={[...getRecipientUserName().split(' ')]}
				buttonKeyword={isBlockedUser ? 'desbloquear' : 'bloquear'}
				closeModal={toggleBlockConfirmationModalVisibility}
				onPressButton={isBlockedUser ? unblockUser : blockUser}
			/>
			<DefaultConfirmationModal // CLEAR MESSAGES
				visibility={clearMessagesConfirmationModalIsVisible}
				title={'apagar'}
				text={`você tem certeza que deseja apagar as mensagens com ${getRecipientUserName()}?`}
				highlightedWords={[...getRecipientUserName().split(' ')]}
				buttonKeyword={'apagar'}
				closeModal={toggleCleanMessagesConfirmationModalVisibility}
				onPressButton={cleanConversation}
			/>
			<FocusAwareStatusBar
				backgroundColor={theme.white3}
				barStyle={'dark-content'}
			/>
			<Header>
				<BackButton onPress={() => navigation.goBack()} />
				<SmallUserIdentification
					pictureDimensions={40}
					userName={getRecipientUserName()}
					profilePictureUrl={getProfilePictureUrl()}
					width={'60%'}
					userNameFontSize={15}
					height={'100%'}
					navigateToProfile={navigateToProfile}
				/>
				<HorizontalSpacing />
				<ChatPopOver
					userName={getRecipientUserName()}
					popoverVisibility={chatOptionsIsOpen}
					closePopover={() => setChatOptionsIsOpen(false)}
					blockUser={toggleBlockConfirmationModalVisibility}
					unblockUser={toggleBlockConfirmationModalVisibility}
					userIsBlocked={blockedByOwner && isBlockedUser}
					cleanConversation={toggleCleanMessagesConfirmationModalVisibility}
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
			<FlashList
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
						message={'tome cuidado ao passar informações pessoais e combine compras e trocas em locais seguros. em caso de serviços à domicílio, verifique o perfil de quem você está contratando'}
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
				estimatedItemSize={71}
				showsVerticalScrollIndicator={false}
				ItemSeparatorComponent={() => <VerticalSpacing height={relativeScreenHeight(1)} />}
				ListFooterComponent={() => {
					if (isBlockedUser && blockedByOwner) {
						return (
							<IsBlockedContainer>
								<SmallButton
									height={relativeScreenHeight(5)}
									color={theme.red3}
									labelColor={theme.white3}
									label={'usuário bloqueado'}
									highlightedWords={['usuário', 'bloqueado']}
									fontSize={14}
									SvgIcon={DeniedWhiteIcon}
									onPress={() => unblockUser()}
								/>
							</IsBlockedContainer>
						)
					}
					return <VerticalSpacing />
				}}
				onContentSizeChange={scrollToEnd}
				onLayout={scrollToEnd}
			/>

			<ChatInput submitMessage={submitMessage} />
		</Container>
	)
}

export { ChatMessages }
