/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-prop-types */
import React, { useState, useContext } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

import { formatRelativeDate } from '../../../common/auxiliaryFunctions'
import { getLastMessageObjects, sortChatMessages } from '../../../utils/chat'

import {
	Container,
	ConversationArea,
	ConversationList,
	FooterSigh,
	Header,
	IconArea,
	OptionsArea,
	SearchInput,
	SearchInputContainer,
	Sigh,
	Title
} from './styles'
import { theme } from '../../../common/theme'
import { relativeScreenHeight, relativeScreenWidth } from '../../../common/screenDimensions'
import XIcon from '../../../assets/icons/x-thin.svg'
import LoupIcon from '../../../assets/icons/loupTabIconInactive.svg'

import { MessageObjects, Chat, UserIdentification, Message } from '../../../@types/chat/types'
import { ChatConversationsScreenProps } from '../../../routes/Stack/ChatStack/stackScreenProps'

import { AuthContext } from '../../../contexts/AuthContext'
import { ChatContext } from '../../../contexts/ChatContext'

import { FocusAwareStatusBar } from '../../../components/FocusAwareStatusBar'
import { SmallButton } from '../../../components/_buttons/SmallButton'
import { WithoutPostsMessage } from '../../../components/WithoutPostsMessage'
import { ConversationCard } from '../../../components/_cards/ConversationCard'

function ChatConversations({ navigation }: ChatConversationsScreenProps) {
	const { userDataContext } = useContext(AuthContext)
	const { chatDataContext } = useContext(ChatContext)

	const [searchText, setSearchText] = useState('')
	const [filteredChats, setFilteredChats] = useState<Chat[]>([])
	const [searchMode, setSearchMode] = useState(false)

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
			return (lastMessage && lastMessage.dateTime.toString()) || Date.now().toString()
		}
		return formatRelativeDate(lastMessage ? lastMessage.dateTime : new Date())
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

	const getProfilePictureUrl = (user1: UserIdentification, user2: UserIdentification) => {
		if (userDataContext.userId === user1.userId) {
			return user2.profilePictureUrl
		}
		return user1.profilePictureUrl
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
		return chatDataContext.sort(sortChats)
	}

	const sortChats = (a: Chat, b: Chat) => {
		if (!a || !b || !Object.keys(a.messages).length || !Object.keys(b.messages).length) return 0

		if (getLastMessageDateTime(a.messages, true) < getLastMessageDateTime(b.messages, true)) return 1
		if (getLastMessageDateTime(a.messages, true) > getLastMessageDateTime(b.messages, true)) return -1
		return 0
	}

	return (
		<Container>
			<FocusAwareStatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<Header>
				{
					!searchMode ? (
						<>
							<Title>{'chats'}</Title>
							<OptionsArea>
								<SmallButton
									color={theme.white3}
									SvgIcon={LoupIcon}
									relativeWidth={relativeScreenWidth(12)}
									height={relativeScreenWidth(12)}
									onPress={() => setSearchMode(true)}
								/>
							</OptionsArea>
						</>
					)
						: (
							<SearchInputContainer>
								<IconArea>
									<SmallButton
										height={relativeScreenHeight(5)}
										relativeWidth={relativeScreenHeight(5)}
										color={theme.white3}
										onPress={() => {
											setSearchText('')
											setSearchMode(false)
										}}
										SvgIcon={XIcon}
									/>
								</IconArea>
								<SearchInput
									value={searchText}
									placeholder={'pesquisar conversas...'}
									returnKeyType={'search'}
									onChangeText={(text: string) => onChangeSearchText(text)}
								/>
							</SearchInputContainer>
						)
				}
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
												lastMessageTime={getLastMessageDateTime(item.messages)}
												numberOfUnseenMessages={getNumberOfUnseenMessages(item.messages)}
												onPress={() => navigateToChatMessages(item)}
											/>
										)
									}
								}}
								showsVerticalScrollIndicator={false}
								ItemSeparatorComponent={() => <Sigh />}
								ListHeaderComponentStyle={{ marginBottom: RFValue(15) }}
								ListFooterComponent={<FooterSigh />}
							/>
						)
				}
			</ConversationArea>
		</Container>
	)
}

export { ChatConversations }
