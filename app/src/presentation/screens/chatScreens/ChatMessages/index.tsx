import React, { RefObject, useContext, useEffect, useRef, useState } from 'react'
import { Platform } from 'react-native'

import { FlashList } from '@shopify/flash-list'

import { Chat, Message, MessageObjects } from '@domain/entities/chat/types'

import { AuthContext } from '@contexts/AuthContext'
import { ChatContext } from '@contexts/ChatContext'

import { FlatListItem } from '@globalTypes/global/types'
import { ChatMessagesScreenProps } from '@routes/Stack/UserStack/stackScreenProps'
import { Id } from '@services/firebase/types'

import { UiChatUtils } from '@utils-ui/chat/UiChatUtils'

import { BottomSafeAreaColor, Container, Header, IsBlockedContainer } from './styles'
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

const { getConversationUserId, getConversationUserName, getConversationProfilePicture } = UiChatUtils()

const {
	existsOnDatabase,
	getRemoteChatDataByUser,
	registerNewChat,
	setChatIdForUsers,
	generateNewMessageObject,
	sendMessage,
	makeAllUserMessagesAsRead,
	cleanChatMessages,
	blockUserById,
	unblockUserById,
	hasBlockedUserOnConversation,
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
	const [markAsCompletedConfirmationModalIsVisible, setMarkAsCompletedConfirmationModalIsVisible] = useState(false)
	const [impactReportModalIsVisible, setImpactReportModalIsVisible] = useState(false)

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

	/* const messagesListenerCallback = async (newMessages: MessageObjects) => {
		if (!isUserOwner(getLastMessageObject(newMessages).owner)) {
			setMessages(newMessages)
		}
	} */ 			// abordagem listener

	const submitMessage = async (text: string) => {
		if (!(await existsOnDatabase(currentChat.chatId))) {
			await registerNewChat(currentChat)
			await setChatIdForUsers([currentChat.user1.userId, currentChat.user2.userId], currentChat.chatId)
			// startChatMessagesListener(currentChat.chatId, messagesListenerCallback)	// abordagem listener
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
		await blockUserById(targetUserId, userDataContext.userId as Id)

		setChatOptionsIsOpen(false)
		setBlockedByOwner(true)
		setIsBlockedUser(true)
	}

	const unblockUser = async () => {
		const blockedUserId = getRecipientUserId()
		await unblockUserById(blockedUserId, userDataContext.userId as Id)

		setChatOptionsIsOpen(false)
		setIsBlockedUser(false)
	}

	const cleanConversation = async () => {
		await cleanChatMessages(currentChat.chatId, getRecipientUserId())
		setMessages({})
		setChatOptionsIsOpen(false)
	}

	const markChatAsCompleted = async () => {
		console.log('markChatAsCompleted')
		// updateChatCompletedState

		toggleImpactReportModalVisibility()
	}

	const sendImpactReport = async () => {
		console.log('sendImpactReport')

		toggleImpactReportModalVisibility()
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
			(message: Message) => (!message.justOwner || (message.justOwner && message.owner === userDataContext.userId))
				&& (!message.userCanView || message.userCanView === userDataContext.userId)
		)
	}

	const navigateToProfile = () => {
		navigation.navigate('ChatStack' as any, { // TODO type
			screen: 'ProfileChat',
			params: { userId: getRecipientUserId(), stackLabel: 'Chat' }
		})
	}

	const toggleBlockConfirmationModalVisibility = () => {
		setChatOptionsIsOpen(false)
		setTimeout(() => setBlockConfirmationModalIsVisible(!blockConfirmationModalIsVisible), 500)
	}

	const toggleCleanMessagesConfirmationModalVisibility = () => {
		setChatOptionsIsOpen(false)
		setTimeout(() => setCleanMessagesConfirmationModalIsVisible(!clearMessagesConfirmationModalIsVisible), 500)
	}

	const toggleMarkAsCompletedConfirmationModalVisibility = () => {
		setChatOptionsIsOpen(false)
		setTimeout(() => setMarkAsCompletedConfirmationModalIsVisible(!markAsCompletedConfirmationModalIsVisible), 500)
	}

	const toggleImpactReportModalVisibility = () => {
		setChatOptionsIsOpen(false)
		setTimeout(() => setImpactReportModalIsVisible(!impactReportModalIsVisible), 500)
	}

	const [lastUpdated, setLastUpdated] = useState(0)
	const [firstScrollCompleted, setFirstScrollCompleted] = useState(false)

	const scrollToEnd = () => {
		const flatListMessages = getFilteredMessages()

		if (firstScrollCompleted) {
			!!(flatListRef && flatListMessages && Object.keys(flatListMessages).length) && flatListRef.current?.scrollToEnd({ animated: true })
			return
		}

		if ((Date.now() - lastUpdated) < 100 || lastUpdated === 0) {
			setLastUpdated(Date.now())

			setTimeout(() => {
				if (Date.now() - lastUpdated > 100) {
					setFirstScrollCompleted(true)
					!!(flatListRef && flatListMessages && Object.keys(flatListMessages).length) && flatListRef.current?.scrollToEnd({ animated: false })
				}
			}, 100)
		}
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
			<DefaultConfirmationModal // MARK COMPLETED
				visibility={markAsCompletedConfirmationModalIsVisible}
				title={'marcar concluída'}
				text={`você tem certeza que deseja concluir a conversa com ${getRecipientUserName()}?`}
				highlightedWords={[...getRecipientUserName().split(' ')]}
				buttonKeyword={'concluir'}
				closeModal={toggleMarkAsCompletedConfirmationModalVisibility}
				onPressButton={markChatAsCompleted}
			/>
			<DefaultConfirmationModal // IMPACT REPORT
				visibility={impactReportModalIsVisible}
				title={'marcar concluída'}
				text={'essa conversa te ajudou a ganhar mais dinheiro, visibilidade cultural ou doações/impacto social?'}
				highlightedWords={['te', 'ajudou']}
				buttonKeyword={'ajudou'}
				closeModal={toggleImpactReportModalVisibility}
				onPressButton={sendImpactReport}
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
					markAsCompleted={toggleMarkAsCompletedConfirmationModalVisibility}
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
						highlightedWords={['passar', 'informações', 'pessoais', 'combine', 'compras', 'trocas', 'locais', 'seguros', 'verifique', 'o', 'perfil']}
						backgroundColor={theme.yellow1}
					/>
				)}
				ListHeaderComponentStyle={{ marginBottom: relativeScreenHeight(2) }}
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
			{Platform.OS === 'ios' && <BottomSafeAreaColor />}
		</Container>
	)
}

export { ChatMessages }
