/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-prop-types */
import React, { useState, useContext, useEffect, useRef } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

import { ScrollView, TextInput } from 'react-native'

import {
	Container,
	ConversationArea,
	ConversationList,
	Header,
	HorizontalHeaderScroll,
	IconArea,
	OptionsArea,
	SearchInputContainer,
	SelectPeriodButtonContainer,
	Title
} from './styles'
import { theme } from '../../../common/theme'
import { relativeScreenHeight, relativeScreenWidth } from '../../../common/screenDimensions'
import AngleLeftWhiteIcon from '../../../assets/icons/angleLeft-white.svg'
import LoupIcon from '../../../assets/icons/loup-white.svg'

import { MessageObjects, Chat, UserIdentification, Message } from '../../../../types/chat/types'
import { ChatConversationsScreenProps } from '../../../routes/Stack/ChatStack/stackScreenProps'

import { AuthContext } from '../../../../contexts/AuthContext'
import { ChatContext } from '../../../../contexts/ChatContext'

import { FocusAwareStatusBar } from '../../../components/FocusAwareStatusBar'
import { SmallButton } from '../../../components/_buttons/SmallButton'
import { WithoutPostsMessage } from '../../../components/WithoutPostsMessage'
import { ConversationCard } from '../../../components/_cards/ConversationCard'
import { AlertContext } from '../../../../contexts/AlertContext/index'
import { VerticalSpacing } from '../../../components/_space/VerticalSpacing'
import { SearchInput } from '../../../components/_inputs/SearchInput'
import { UiUtils } from '../../../utils-ui/common/UiUtils'
import { UiChatUtils } from '../../../utils-ui/chat/UiChatUtils'

const { formatRelativeDate } = UiUtils()
const { getLastMessageObjects, sortChatMessages } = UiChatUtils()

function ChatConversations({ navigation }: ChatConversationsScreenProps) {
	const { userDataContext } = useContext(AuthContext)
	const { showAlertNotificationModal } = useContext(AlertContext)
	const { chatDataContext } = useContext(ChatContext)

	const [searchText, setSearchText] = useState('')
	const [filteredChats, setFilteredChats] = useState<Chat[]>([])

	const horizontalScrollViewRef = useRef<ScrollView>()
	const searchInputRef = useRef<TextInput>()

	useEffect(() => {
		showAlertNotificationModal()
	}, [])

	const getLastMessage = (messages: MessageObjects) => {
		const chatMessages = getFilteredMessages(messages)
		const ordenerMessages = Object.values(chatMessages).sort(sortChatMessages)
		const lastMessage = getLastMessageObjects(ordenerMessages)
		return lastMessage ? lastMessage.message : ''
	}

	const getLastMessageDateTime = (messages: MessageObjects, inMiliseconds?: boolean) => {
		const chatMessages = getFilteredMessages(messages)
		const ordenerMessages = Object.values(chatMessages).sort(sortChatMessages)
		const lastMessage = getLastMessageObjects(ordenerMessages as any)

		if (inMiliseconds) {
			return (lastMessage && lastMessage.dateTime.toString()) || (Date.now() - 31536000000).toString()
		}
		return formatRelativeDate(lastMessage ? lastMessage.dateTime : '')
	}

	const getNumberOfUnseenMessages = (messages: MessageObjects) => {
		const chatMessages = getFilteredMessages(messages)
		if (!chatMessages) {
			return 0
		}

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

	const getFilteredMessages = (messages: MessageObjects) => {
		return Object.values(messages || {}).filter((message: Message) => (
			!message.justOwner || (message.justOwner && message.owner === userDataContext.userId))
			&& (!message.userCanView || message.userCanView === userDataContext.userId))
	}

	const getOrdenedChatsByDateTime = () => {
		// chatDataContext.sort(sortChats).map((chat, index) => console.log(`${index} ${chat.user2.name}`))
		const currentChatData = [...chatDataContext]
		return currentChatData.sort(sortChats)
	}

	const chatsIsValid = (a: Chat, b: Chat) => {
		return (!a || !b || (a && !Object.keys(a)) || (b && !Object.keys(b)))
	}

	const sortChats = (a: Chat, b: Chat) => {
		if (chatsIsValid(a, b)) return -1

		const lastMessageA = getLastMessageDateTime(a.messages, true)
		const lastMessageB = getLastMessageDateTime(b.messages, true)

		if (lastMessageA < lastMessageB) return 1
		if (lastMessageA > lastMessageB) return -1
		return 0
	}

	const navigateToProfile = (user1: UserIdentification, user2: UserIdentification) => {
		navigation.navigate('ProfileChat', { userId: getUserId(user1, user2), stackLabel: 'Chat' })
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
							<ConversationList
								data={!searchText ? getOrdenedChatsByDateTime() : filteredChats}
								renderItem={({ item }: { item: Chat }) => {
									if (item) {
										return (
											<ConversationCard
												key={item.chatId}
												userName={getUserName(item.user1, item.user2)}
												profilePictureUrl={getProfilePictureUrl(item.user1, item.user2)}
												lastMessage={getLastMessage(item.messages)}
												lastMessageTime={getLastMessageDateTime(item.messages) || ''}
												numberOfUnseenMessages={getNumberOfUnseenMessages(item.messages)}
												navigateToProfile={() => navigateToProfile(item.user1, item.user2)}
												onPress={() => navigateToChatMessages(item)}
											/>
										)
									}
								}}
								showsVerticalScrollIndicator={false}
								ItemSeparatorComponent={() => <VerticalSpacing />}
								ListHeaderComponentStyle={{ marginBottom: RFValue(15) }}
								ListFooterComponent={<VerticalSpacing height={relativeScreenHeight(10)} />}
							/>
						)
				}
			</ConversationArea>
		</Container>
	)
}

export { ChatConversations }
