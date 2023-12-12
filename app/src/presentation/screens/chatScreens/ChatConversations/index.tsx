import React, { useState, useContext, useEffect, useRef } from 'react'
import { ScrollView, TextInput } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

import { MessageObjects, ChatUserIdentification, Chat } from '@domain/entities/chat/types'
import { Id } from '@domain/entities/globalTypes'

import { AlertContext } from '@contexts/AlertContext/index'
import { AuthContext } from '@contexts/AuthContext'
import { ChatContext } from '@contexts/ChatContext'

import { FlatListItem } from '@globalTypes/global/types'
import { ChatConversationsScreenProps } from '@routes/Stack/ChatStack/stackScreenProps'

import { UiChatUtils } from '@utils-ui/chat/UiChatUtils'
import { UiUtils } from '@utils-ui/common/UiUtils'

import {
	CompletedConversationList,
	Container,
	ConversationArea,
	ConversationCardContainer,
	ConversationList,
	Header,
	HorizontalHeaderScroll,
	IconArea,
	OptionsArea,
	SearchInputContainer,
	SelectPeriodButtonContainer,
	Title
} from './styles'
import AngleLeftWhiteIcon from '@assets/icons/angleLeft-white.svg'
import LoupIcon from '@assets/icons/loup-white.svg'
import { relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { ChatAdapter } from '@adapters/chat/ChatAdapter'

import { SmallButton } from '@components/_buttons/SmallButton'
import { ConversationCard } from '@components/_cards/ConversationCard'
import { SubtitleCard } from '@components/_cards/SubtitleCard'
import { SearchInput } from '@components/_inputs/SearchInput'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { FocusAwareStatusBar } from '@components/FocusAwareStatusBar'
import { WithoutPostsMessage } from '@components/WithoutPostsMessage'

const { formatRelativeDate } = UiUtils()

const {
	sortChatMessages,
	getLastMessageObject,
	getConversationUserId,
	getConversationUserName,
	getConversationProfilePicture
} = UiChatUtils()

const { filterInvalidMessages, conversationsIsValidToSort } = ChatAdapter()

function ChatConversations({ navigation }: ChatConversationsScreenProps) {
	const { userDataContext } = useContext(AuthContext)
	const { showAlertNotificationModal } = useContext(AlertContext)
	const { chatDataContext } = useContext(ChatContext)

	const [searchText, setSearchText] = useState('')
	const [filteredChats, setFilteredChats] = useState<Chat[]>([])

	const horizontalScrollViewRef = useRef<ScrollView>()
	const searchInputRef = useRef<TextInput>()

	const authenticatedUserId = userDataContext.userId as Id

	useEffect(() => {
		showAlertNotificationModal()
	}, [])

	const getLastMessage = (messages: MessageObjects) => {
		const lastMessage = getLastObjectMessageFromFilteredSortedList(messages)
		return lastMessage ? lastMessage.message : ''
	}

	const getLastMessageDateTime = (messages: MessageObjects, inMiliseconds?: boolean) => {
		const lastMessage = getLastObjectMessageFromFilteredSortedList(messages)

		if (inMiliseconds) { return (lastMessage && lastMessage.dateTime.toString()) || (Date.now() - 31536000000).toString() }
		return formatRelativeDate(lastMessage ? lastMessage.dateTime : '')
	}

	const getLastObjectMessageFromFilteredSortedList = (messages: MessageObjects) => {
		const chatMessages = filterInvalidMessages(messages, authenticatedUserId)
		const ordenerMessages = Object.values(chatMessages).sort(sortChatMessages)
		return getLastMessageObject(ordenerMessages)
	}

	const getNumberOfUnseenMessages = (messages: MessageObjects) => {
		const chatMessages = filterInvalidMessages(messages, authenticatedUserId)
		if (!chatMessages) return 0

		const unseenMessagesCount = Object.values(chatMessages || {}).reduce((total, message) => {
			if (!message.readed && (userDataContext.userId !== message.owner)) {
				return total + 1
			}
			return total
		}, 0)
		return unseenMessagesCount
	}

	const onChangeSearchText = (text: string) => {
		const lowerCaseText = text.toLowerCase()
		const filtered = chatDataContext.filter((chat: Chat) => {
			return chat.user1.name.toLowerCase().includes(lowerCaseText) || chat.user2.name.toLowerCase().includes(lowerCaseText)
		})

		setSearchText(text)
		setFilteredChats(filtered as Chat[])
	}

	const showSearchInput = () => {
		if (horizontalScrollViewRef.current) {
			horizontalScrollViewRef.current.scrollToEnd({ animated: true })
			if (searchInputRef && searchInputRef.current) {
				setTimeout(() => (searchInputRef && searchInputRef.current) && searchInputRef.current.focus(), 300)
			}
		}
	}

	const hideSearchInput = () => {
		if (horizontalScrollViewRef.current) {
			horizontalScrollViewRef.current.scrollTo({ y: 0, animated: true })
		}
	}

	const navigateToChatMessages = (item: Chat) => {
		navigation.navigate('ChatMessages', { chat: { ...item } })
	}

	const getOpenConversations = (chats?: Chat[]) => {
		const conversations = chats || sortConversationsByDateTime()
		return conversations.filter((chat: Chat) => (chat && !chat.completed))
	}

	const getCompletedConversations = (chats?: Chat[]) => {
		const conversations = chats || sortConversationsByDateTime()
		return conversations.filter((chat: Chat) => (chat && chat.completed))
	}

	const sortConversationsByDateTime = () => {
		const currentChatData = [...chatDataContext]
		return currentChatData.sort(sortChats)
	}

	const sortChats = (a: Chat, b: Chat) => {
		if (conversationsIsValidToSort(a, b)) return -1

		const lastMessageA = getLastMessageDateTime(a.messages, true)
		const lastMessageB = getLastMessageDateTime(b.messages, true)

		if (lastMessageA < lastMessageB) return 1
		if (lastMessageA > lastMessageB) return -1
		return 0
	}

	const navigateToProfile = (user1: ChatUserIdentification, user2: ChatUserIdentification) => {
		navigation.navigate('ProfileChat', {
			userId: getConversationUserId(authenticatedUserId, user1, user2),
			stackLabel: 'Chat'
		})
	}

	const renderConversationListItem = (conversation: Chat) => {
		const { user1, user2, chatId, messages } = conversation

		return (
			<ConversationCardContainer>
				<ConversationCard
					key={chatId}
					userName={getConversationUserName(authenticatedUserId, user1, user2)}
					profilePictureUrl={getConversationProfilePicture(authenticatedUserId, user1, user2)}
					lastMessage={getLastMessage(messages)}
					lastMessageTime={getLastMessageDateTime(messages) || ''}
					numberOfUnseenMessages={getNumberOfUnseenMessages(messages)}
					navigateToProfile={() => navigateToProfile(user1, user2)}
					onPress={() => navigateToChatMessages(conversation)}
				/>
			</ConversationCardContainer>
		)
	}

	return (
		<Container>
			<FocusAwareStatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<Header>
				<SearchInputContainer>
					<HorizontalHeaderScroll
						horizontal
						showsHorizontalScrollIndicator={false}
						pagingEnabled
						ref={horizontalScrollViewRef}
						contentContainerStyle={{ justifyContent: 'center', }}
					>
						<SelectPeriodButtonContainer>
							<SearchInputContainer>
								<Title>{'conversas'}</Title>
								<OptionsArea>
									<SmallButton
										color={theme.white3}
										SvgIcon={LoupIcon}
										relativeWidth={relativeScreenWidth(12)}
										height={relativeScreenWidth(12)}
										onPress={showSearchInput}
									/>
								</OptionsArea>
							</SearchInputContainer>
						</SelectPeriodButtonContainer>
						<SelectPeriodButtonContainer>
							<SearchInputContainer>
								<IconArea>
									<SmallButton
										relativeWidth={relativeScreenWidth(12)}
										height={relativeScreenWidth(12)}
										color={theme.white3}
										onPress={() => {
											setSearchText('')
											hideSearchInput()
										}}
										SvgIcon={AngleLeftWhiteIcon}
									/>
								</IconArea>
								<SearchInput
									value={searchText}
									placeholder={'pesquisar conversas...'}
									returnKeyType={'search'}
									relativeWidth={'80%'}
									searchInputRef={searchInputRef}
									onChangeText={(text: string) => onChangeSearchText(text)}
								/>
							</SearchInputContainer>
						</SelectPeriodButtonContainer>
					</HorizontalHeaderScroll>
				</SearchInputContainer>
			</Header>
			<ConversationArea>
				{
					!chatDataContext.length
						? (
							<WithoutPostsMessage
								title={'opa!'}
								message={'você ainda não tem nenhum chat, fale com a lguém pela tela de perfil ou tela de post para começar a conversar.'}
								highlightedWords={['nenhum', 'chat']}
								backgroundColor={theme.yellow1}
							/>
						)
						: (
							<>
								<SubtitleCard
									text={'conversas abertas'}
									highlightedText={['abertas']}
								/>
								<ConversationList
									data={!searchText ? getOpenConversations() : getOpenConversations(filteredChats)}
									renderItem={({ item }: FlatListItem<Chat>) => item && renderConversationListItem(item)}
									showsVerticalScrollIndicator={false}
									ItemSeparatorComponent={<VerticalSpacing />}
									ListHeaderComponent={<VerticalSpacing />}
									ListFooterComponent={getCompletedConversations().length && (
										() => (
											<>
												<VerticalSpacing />
												<SubtitleCard
													text={'conversas finalizadas'}
													highlightedText={['finalizadas']}
												/>
												<VerticalSpacing />
												<CompletedConversationList
													data={!searchText ? getCompletedConversations() : getCompletedConversations(filteredChats)}
													renderItem={({ item }: FlatListItem<Chat>) => item && renderConversationListItem(item)}
													showsVerticalScrollIndicator={false}
													ItemSeparatorComponent={() => <VerticalSpacing />}
													ListHeaderComponentStyle={{ marginBottom: RFValue(15) }}
													ListFooterComponent={<VerticalSpacing height={relativeScreenHeight(10)} />}
												/>
											</>
										)
									)}
								/>

							</>
						)
				}
			</ConversationArea>
		</Container>
	)
}

export { ChatConversations }
