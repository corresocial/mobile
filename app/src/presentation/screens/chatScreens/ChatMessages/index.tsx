import React, { RefObject, useContext, useEffect, useRef, useState } from 'react'
import { Platform } from 'react-native'

import { FlashList } from '@shopify/flash-list'

import { AuthContext } from '@contexts/AuthContext'
import { ChatContext } from '@contexts/ChatContext'

import {
	Chat,
	Message,
	MessageObjects,
} from '@globalTypes/chat/types'
import { FlatListItem } from '@globalTypes/global/types'
import { ChatMessagesScreenProps } from '@routes/Stack/UserStack/stackScreenProps'
import { Id } from '@services/firebase/types'

import { blockUserId } from '@services/firebase/chat/blockUser'
// import { getRemoteChatData } from '@services/firebase/chat/getRemoteChatData'
// import { registerNewChat } from '@services/firebase/chat/registerNewChat'
// import { setChatIdToUsers } from '@services/firebase/chat/setChatIdToUsers'
// import { sendMessage } from '@services/firebase/chat/sendMessage'
// import { unsubscribeMessageListener } from '@services/firebase/chat/unsubscribeMessageListener'
import { cleanMessages } from '@services/firebase/chat/cleanMessages'
import { makeAllUserMessagesAsRead } from '@services/firebase/chat/makeAllUserMessagesAsRead'
import { unblockUserId } from '@services/firebase/chat/unblockUser'
import { UiChatUtils } from '@utils-ui/chat/UiChatUtils'

import { Container, Header, IsBlockedContainer } from './styles'
import DeniedWhiteIcon from '@assets/icons/denied-white.svg'
import ThreeDotsWhiteIcon from '@assets/icons/threeDots.svg'
import { relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { ChatAdapter } from '@adapters/chat/ChatAdapter'

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
	getRemoteChatDataByUser,
	registerNewChat,
	setChatIdForUsers,
	generateNewMessageObject,
	sendMessage,
	existsOnDatabase,
	hasBlockedUserOnConversation,
	startChatMessagesListener
} = ChatAdapter()

function ChatMessages({ route, navigation }: ChatMessagesScreenProps) {
	const { userDataContext } = useContext(AuthContext)
	const { chatDataContext } = useContext(ChatContext)

	const chatFromRoute = route.params && route.params.chat

	const [chatOptionsIsOpen, setChatOptionsIsOpen] = useState(false)
	const [currentChat, setCurrentChat] = useState<Chat>(chatFromRoute)
	const [messages, setMessages] = useState<MessageObjects | Message[]>(currentChat.messages)
	const [isBlockedUser, setIsBlockedUser] = useState(false)
	const [blockedByOwner, setBlockedByOwner] = useState(false)

	const [blockConfirmationModalIsVisible, setBlockConfirmationModalIsVisible] = useState(false)
	const [clearMessagesConfirmationModalIsVisible, setCleanMessagesConfirmationModalIsVisible] = useState(false)

	const flatListRef: RefObject<any> = useRef(null)

	useEffect(() => {
		const updatedChat = chatDataContext.find((chat) => chat.chatId === currentChat.chatId)
		updatedChat && setMessages(updatedChat?.messages)
	}, [chatDataContext])

	useEffect(() => {
		loadChatMessages()
		makeAllUserMessagesAsRead(currentChat.chatId, userDataContext.userId as Id)
		return () => {
			makeAllUserMessagesAsRead(currentChat.chatId, userDataContext.userId as Id)
		}
	}, [])

	const messagesListenerCallback = async (newMessages: MessageObjects) => {
		if (!isUserOwner(getLastMessageObject(newMessages).owner)) {
			setMessages(newMessages)
		}
	}

	const loadChatMessages = async () => {
		const remoteChatData = await getRemoteChatDataByUser(currentChat.user1, currentChat.user2)

		setCurrentChat({ ...remoteChatData, messages: { ...remoteChatData.messages } }) // TODO Type
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

	const isUserOwner = (messageUserId: string) => { return userDataContext.userId === messageUserId }

	const submitMessage = async (text: string) => {
		if (!(await existsOnDatabase(currentChat.chatId))) {
			await registerNewChat(currentChat)
			await setChatIdForUsers([currentChat.user1.userId, currentChat.user2.userId], currentChat.chatId)
			startChatMessagesListener(currentChat.chatId, messagesListenerCallback)
		}

		const authenticatedUserId = userDataContext.userId as Id

		const newMessageObject = generateNewMessageObject(text, authenticatedUserId)
		const newMessageValue = Object.values(newMessageObject)[0]
		const newMessages = { ...messages, ...newMessageObject }

		const userBlock = await verifyUsersBlock()

		setMessages(newMessages)
		await sendMessage(
			{ ...newMessageValue, justOwner: !!userBlock },
			currentChat.chatId,
			getRecipientUserId()
		)
	}

	const blockUser = async () => {
		const targetUserId = getRecipientUserId()
		await blockUserId(targetUserId, userDataContext.userId as Id)

		setChatOptionsIsOpen(false)
		setBlockedByOwner(true)
		setIsBlockedUser(true)
	}

	const unblockUser = async () => {
		const blockedUserId = getRecipientUserId()
		await unblockUserId(blockedUserId, userDataContext.userId as Id)

		setChatOptionsIsOpen(false)
		setIsBlockedUser(false)
	}

	const cleanConversation = async () => {
		await cleanMessages(
			currentChat.chatId,
			getRecipientUserId()
		)
		setMessages({})
		setChatOptionsIsOpen(false)
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

	const scrollToEnd = () => {
		!!(messages && messages.length) && flatListRef.current?.scrollToEnd({ animated: true })
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
