/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-prop-types */ // TODO
import React, { useState, useContext, useEffect } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

import { get, onValue, ref } from 'firebase/database'
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

import { MessageObjects, Chat } from '../../../@types/chat/types'

import { AuthContext } from '../../../contexts/AuthContext'
import { ChatContext } from '../../../contexts/ChatContext'

import { FocusAwareStatusBar } from '../../../components/FocusAwareStatusBar'
import { SmallButton } from '../../../components/_buttons/SmallButton'
import { WithoutPostsMessage } from '../../../components/WithoutPostsMessage'
import { ConversationCard } from '../../../components/_cards/ConversationCard'
import { ChatConversationsScreenProps } from '../../../routes/Stack/ChatStack/stackScreenProps'
import { Id } from '../../../services/firebase/types'
import { realTimeDatabase } from '../../../services/firebase'

function ChatConversations({ navigation }: ChatConversationsScreenProps) { // TODO TYPE
	const { userDataContext } = useContext(AuthContext)
	const { chatDataContext, loadChats, setCurrentChat } = useContext(ChatContext)

	const [searchText, setSearchText] = useState('')
	const [filteredChats, setFilteredChats] = useState<Chat[]>([])
	const [searchMode, setSearchMode] = useState(false)

	const defaultMessageObject = {
		message: '---',
		dateTime: Date.now(),
		readed: true,
		owner: 'any',
	}

	useEffect(() => {
		// loadChats(userDataContext.chatIds)
		startChatListener(userDataContext.chatIds as any)// TODO Type
	}, [])

	const startChatListener = (chatIds: Id[]) => {
		chatIds.forEach(async (chatId: string) => {
			const realTimeDatabaseRef = ref(realTimeDatabase, `${chatId}`)
			if (await chatAlreadyExists(chatId)) {
				onValue(realTimeDatabaseRef, (snapshot) => {
					console.log('Listener chats running...')
					loadChats(userDataContext.chatIds as any)
				})
			} else { // Remove
				console.log(`Esse chat não existe: ${chatId}`)
			}
		})
	}

	const chatAlreadyExists = async (chatId: Id) => {
		const realTimeDatabaseRef = ref(realTimeDatabase, `${chatId}`)
		const chatExists = await get(realTimeDatabaseRef)
			.then((snapshot: any) => snapshot.exists())
			.catch((err) => console.log(err))

		return chatExists
	}

	const getLastMessageObjects = (messages: MessageObjects) => {
		if (!messages) {
			return defaultMessageObject
		}

		const keys = Object.keys(messages)
		const lastMessageId: any = keys[keys.length - 1] // TODO Type
		return messages[lastMessageId]
	}

	const getLastMessage = (messages: MessageObjects) => {
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
		const filtered = chatDataContext.filter((chat: Chat) => {
			return chat.userId1.includes(text) || chat.userId2.includes(text)
		})

		setSearchText(text)
		setFilteredChats(filtered as Chat[])
	}

	const getUserId = (currentChat: Chat) => {
		if (userDataContext.userId === currentChat.userId1) {
			return currentChat.userId2
		}
		return currentChat.userId1
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
												userName={getUserId(item)}
												lastMessage={getLastMessage(item.messages)}
												lastMessageTime={getLastMessageDateTime(item.messages)}
												numberOfUnseenMessages={getNumberOfUnseenMessages(item.messages)}
												onPress={() => {
													setCurrentChat({ ...item })
													navigation.navigate('Chat', { chat: { ...item } } as any)
												}}
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
