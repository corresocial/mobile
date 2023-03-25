import React, { RefObject, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import uuid from 'react-uuid'

import { FlatList } from 'react-native'
import { get, onValue, ref } from 'firebase/database'
import { theme } from '../../../common/theme'
import { SmallButton } from '../../../components/_buttons/SmallButton'

import { Container, Header, Sigh } from './styles'
import AngleLeftThinIcon from '../../../assets/icons/angleLeftThin.svg'
import ThreeDotsIcon from '../../../assets/icons/threeDots.svg'
import { relativeScreenHeight, relativeScreenWidth } from '../../../common/screenDimensions'
import { SmallUserIdentification } from '../../../components/SmallUserIdentification'
import { FocusAwareStatusBar } from '../../../components/FocusAwareStatusBar'
import { WithoutPostsMessage } from '../../../components/WithoutPostsMessage'
import { ChatInput } from '../../../components/ChatInput'
import { MessageCard } from '../../../components/MessageCard'
import { Chat, Message, MessageObjects } from '../../../@types/chat/types'
import { AuthContext } from '../../../contexts/AuthContext'
import { ChatPopOver } from '../../../components/ChatPopOver'
import { FlatListItem } from '../../../@types/global/types'
import { sendMessage } from '../../../services/firebase/chat/sendMessage'
import { Id } from '../../../services/firebase/types'
import { realTimeDatabase } from '../../../services/firebase'
import { ChatMessagesScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'
import { getRemoteChatData } from '../../../services/firebase/chat/getRemoteChatData'
import { registerNewChat } from '../../../services/firebase/chat/registerNewChat'
import { setChatIdToUsers } from '../../../services/firebase/chat/setChatIdToUsers'
import { makeAllUserMessagesAsRead } from '../../../services/firebase/chat/makeAllUserMessagesAsRead'

function ChatMessages({ route, navigation }: ChatMessagesScreenProps) {
	const { userDataContext } = useContext(AuthContext)

	const chatFromRoute = route.params && route.params.chat

	const [chatOptionsIsOpen, setChatOptionsIsOpen] = useState(false)
	const [currentChat, setCurrentChat] = useState<Chat>(chatFromRoute)
	const [messages, setMessages] = useState<MessageObjects>(currentChat.messages)

	const flatListRef: RefObject<FlatList> = useRef(null)

	useLayoutEffect(() => {
		startMessagesListener(currentChat.chatId)
	}, [])

	useEffect(() => {
		loadChatMessages()
		makeAllUserMessagesAsRead(currentChat.chatId, userDataContext.userId)
	}, [])

	const loadChatMessages = async () => {
		// console.log(currentChat)
		const remoteChatData = await getRemoteChatData(currentChat.userId1, currentChat.userId2)
		setCurrentChat(remoteChatData)
	}

	const startMessagesListener = async (chatId: Id) => {
		const realTimeDatabaseRef = ref(realTimeDatabase, `${chatId}/messages`)
		if (await existsOnDatabase(chatId)) {
			onValue(realTimeDatabaseRef, (snapshot) => {
				console.log('Listener message running...')
				const data = snapshot.val()
				setMessages(data)
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
		const realTimeDatabaseRef = ref(realTimeDatabase, `${chatId}`)
		return get(realTimeDatabaseRef)
			.then((snapshot: any) => snapshot.exists())
			.catch((err) => console.log(err))
	}

	const submitMessage = async (text: string) => {
		if (!await existsOnDatabase(currentChat.chatId)) {
			await registerNewChat(currentChat)
			await setChatIdToUsers([currentChat.userId1, currentChat.userId2], currentChat.chatId)
			await startMessagesListener(currentChat.chatId)
		}

		const newMessages = { ...messages, ...generateMessageObject(text) }
		setMessages(newMessages)

		sendMessage({
			message: text,
			dateTime: Date.now(),
			readed: false,
			owner: userDataContext.userId as Id
		}, currentChat.chatId)
	}

	const generateMessageObject = (text: string) => {
		return {
			[uuid()]: {
				message: text,
				dateTime: Date.now(),
				readed: false,
				owner: userDataContext.userId as Id
			}
		}
	}

	const getUserId = () => {
		if (userDataContext.userId === currentChat.userId1) {
			return currentChat.userId2
		}
		return currentChat.userId1
	}

	return (
		<Container>
			<FocusAwareStatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<Header>
				<SmallButton
					color={theme.white3}
					SvgIcon={AngleLeftThinIcon}
					relativeWidth={relativeScreenWidth(12)}
					height={relativeScreenWidth(12)}
					onPress={() => navigation.goBack()}
				/>
				<SmallUserIdentification
					pictureDimensions={40}
					userName={getUserId()}
					profilePictureUrl={'https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2021/06/41479_2FF050B33087A556.png?w=876&h=484&crop=1'}
					width={'60%'}
					userNameFontSize={15}
					height={'100%'}
				/>
				<ChatPopOver
					userName={getUserId()}
					popoverVisibility={chatOptionsIsOpen}
					closePopover={() => setChatOptionsIsOpen(false)}
					blockUser={() => { console.log('block') }}
					cleanConversation={() => { console.log('cleanConversation') }}
				>
					<SmallButton
						color={theme.white3}
						SvgIcon={ThreeDotsIcon}
						relativeWidth={relativeScreenWidth(12)}
						height={relativeScreenWidth(12)}
						onPress={() => setChatOptionsIsOpen(true)}
					/>
				</ChatPopOver>
			</Header>
			<FlatList
				ref={flatListRef}
				data={messages ? Object.values(messages) : []}
				renderItem={({ item }: FlatListItem<Message>) => ( // TODO TYPE
					<MessageCard
						message={item.message}
						dateTime={item.dateTime}
						owner={isUserOwner(item.owner)}
						errorSending={false}
						sendAgain={() => console.log('senderAgain')}
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
				showsVerticalScrollIndicator={false}
				ItemSeparatorComponent={() => <Sigh />}
				ListFooterComponent={() => <Sigh />}
				onContentSizeChange={scrollToEnd}
				onLayout={scrollToEnd}
			/>
			<ChatInput
				submitMessage={submitMessage}
			/>
		</Container>
	)
}

export { ChatMessages }
