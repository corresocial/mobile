/* eslint-disable react/no-unused-prop-types */
import React, { useState } from 'react'
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
// import ThreeDotsIcon from '../../../assets/icons/threeDots.svg'

import { Message, Chat } from '../../../@types/chat/types'

import { FocusAwareStatusBar } from '../../../components/FocusAwareStatusBar'
import { SmallButton } from '../../../components/_buttons/SmallButton'
import { WithoutPostsMessage } from '../../../components/WithoutPostsMessage'
import { ConversationCard } from '../../../components/_cards/ConversationCard'
import { ChatConversationsScreenProps } from '../../../routes/Stack/ChatStack/stackScreenProps'

const currentUserId = 'userId1'

const defaultChats: Chat[] = [
	{
		chatId: 123,
		userId1: 'userId1',
		userId2: 'userId2',
		messages: [
			{
				message: 'olá, tudo certo?',
				dateTime: new Date('2023-03-06'),
				readed: false,
				owner: 'userId2'
			},
			{
				message: 'olá, tudo sim',
				dateTime: new Date('2023-03-05'),
				readed: true,
				owner: 'userId1'
			}
		]
	},
	{
		chatId: 456,
		userId1: 'userId1',
		userId2: 'userId3',
		messages: [
			{
				message: 'olá, tudo bem?',
				dateTime: new Date('2023-03-04'),
				readed: false,
				owner: 'userId3'
			},
			{
				message: 'olá, posso responder não, tô no corre.',
				dateTime: new Date('2023-03-06'),
				readed: false,
				owner: 'userId3'
			}
		]
	}
]

function ChatConversations({ navigation }: ChatConversationsScreenProps) { // TODO TYPE
	const [searchText, setSearchText] = useState('')
	const [chats, setChats] = useState(defaultChats)
	const [filteredChats, setFilteredChats] = useState<Chat[]>([])
	const [searchMode, setSearchMode] = useState(false)

	const getLastMessage = (messages: Message[]) => { // TODO
		const lastMessageReceived = messages.reduce((total, current) => {
			if (current.dateTime > total.dateTime || !total.message) {
				return current
			}
			return total
		}, { dateTime: new Date('2022-10-10'), message: '' })

		return lastMessageReceived.message
	}

	const getLastMessageDateTime = (messages: Message[]) => {
		const lastMessageDateTime = messages[messages.length - 1].dateTime || new Date()
		return formatRelativeDate(lastMessageDateTime)
	}

	const getNumberOfUnseenMessages = (messages: Message[]) => {
		let unseenMessagesCount = 0
		messages.forEach((message) => {
			if (!message.readed && currentUserId !== message.owner) {
				unseenMessagesCount += 1
			}
		})
		return unseenMessagesCount
	}

	const onChangeSearchText = (text: string) => {
		const filtered = chats.filter((chat) => {
			return chat.userId1.includes(text) || chat.userId2.includes(text)
		})

		setSearchText(text)
		setFilteredChats(filtered as Chat[])
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
					!chats.length
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
								data={!searchText ? chats : filteredChats}
								renderItem={({ item }: { item: Chat }) => (
									<ConversationCard
										key={item.chatId}
										userName={item.userId1}
										lastMessage={getLastMessage(item.messages)}
										lastMessageTime={getLastMessageDateTime(item.messages)}
										numberOfUnseenMessages={getNumberOfUnseenMessages(item.messages)}
										onPress={() => navigation.navigate('Chat')}
									/>
								)}
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
