/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-prop-types */ // TODO
import React, { useState, useContext, useEffect } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

import { formatRelativeDate } from '../../../common/auxiliaryFunctions'

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

import { MessageObjects, Chat, UserIdentification } from '../../../@types/chat/types'

import { AuthContext } from '../../../contexts/AuthContext'
import { ChatContext } from '../../../contexts/ChatContext'

import { FocusAwareStatusBar } from '../../../components/FocusAwareStatusBar'
import { SmallButton } from '../../../components/_buttons/SmallButton'
import { WithoutPostsMessage } from '../../../components/WithoutPostsMessage'
import { ConversationCard } from '../../../components/_cards/ConversationCard'
import { ChatConversationsScreenProps } from '../../../routes/Stack/ChatStack/stackScreenProps'
import { getLastMessageObjects } from '../../../utils/chat'

function ChatConversations({ navigation }: ChatConversationsScreenProps) { // TODO TYPE
	const { userDataContext } = useContext(AuthContext)
	const { chatDataContext, setCurrentChat } = useContext(ChatContext)

	const [searchText, setSearchText] = useState('')
	const [filteredChats, setFilteredChats] = useState<Chat[]>([])
	const [searchMode, setSearchMode] = useState(false)

	useEffect(() => {
		navigation.addListener('focus', () => {
			// loadUserChatIds(userDataContext.userId) // TODO
		})
	}, [navigation])

	const getLastMessage = (messages: MessageObjects) => {
		/* Integrar mensagens do Chat ao obter a última mensagem */
		const lastMessage = getLastMessageObjects(messages)
		return lastMessage.message || ''
	}

	const getLastMessageDateTime = (messages: MessageObjects) => {
		const lastMessage = getLastMessageObjects(messages)
		return formatRelativeDate(lastMessage.dateTime || new Date())
	}

	const getNumberOfUnseenMessages = (messages: MessageObjects) => {
		if (!messages) {
			return 0
		}

		const unseenMessagesCount = Object.values(messages).reduce((total, message) => {
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

	/* const getUserId = (currentChat: Chat) => {
		if (userDataContext.userId === currentChat.user1.userId) {
			return currentChat.user1.userId
		}
		return currentChat.user2.userId
	}

	const getUserIdentification = async () => {
		const userIdentificationList = userIdentifications
		console.log('userIdentificationList:')
		console.log(userIdentificationList)
	}

	const getUserIdentificationList = async () => {
		const userDatas = chatDataContext.map(async (currentChat) => {
			const userId = getUserId(currentChat)
			console.log(userId)
			const userData = await getUserIdentificationById(userId)
			return userData
		})

		return Promise.all(userDatas)
	}

	const getUserIdentificationById = async (userId: Id) => {
		return getUser(userId).then((user: any) => ({
			userId: user.userId,
			name: user.name,
			profilePictureUrl: user.profilePictureUrl
		}))
	} */

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
		setCurrentChat({ ...item })
		navigation.navigate('ChatMessages', { chat: { ...item } })
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
								data={!searchText ? chatDataContext : filteredChats}
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
