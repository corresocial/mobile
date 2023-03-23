import React, { RefObject, useContext, useEffect, useRef, useState } from 'react'
import uuid from 'react-uuid'

import { FlatList } from 'react-native'
import { onValue, ref } from 'firebase/database'
import { theme } from '../../../common/theme'
import { SmallButton } from '../../../components/_buttons/SmallButton'

import { Container, Header, Sigh } from './styles'
import AngleLeftThinIcon from '../../../assets/icons/angleLeftThin.svg'
import ThreeDotsIcon from '../../../assets/icons/threeDots.svg'
import { relativeScreenHeight, relativeScreenWidth } from '../../../common/screenDimensions'
import { SmallUserIdentification } from '../../../components/SmallUserIdentification'
import { FocusAwareStatusBar } from '../../../components/FocusAwareStatusBar'
import { WithoutPostsMessage } from '../../../components/WithoutPostsMessage'
import { ChatScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'
import { ChatInput } from '../../../components/ChatInput'
import { MessageCard } from '../../../components/MessageCard'
import { Message, MessageObjects } from '../../../@types/chat/types'
import { AuthContext } from '../../../contexts/AuthContext'
import { ChatPopOver } from '../../../components/ChatPopOver'
import { FlatListItem } from '../../../@types/global/types'
import { writeOnDatabase } from '../../../services/firebase/chat/write'
import { Id } from '../../../services/firebase/types'
import { realTimeDatabase } from '../../../services/firebase'

function Chat({ route, navigation }: ChatScreenProps) {
	const { userDataContext } = useContext(AuthContext)

	const currentChat = route.params.chat

	const [chatOptionsIsOpen, setChatOptionsIsOpen] = useState(false)
	const [messages, setMessages] = useState<MessageObjects>(currentChat.messages)

	const flatListRef: RefObject<FlatList> = useRef(null)

	useEffect(() => {
		// makeAllMessageAsRead(currentChat.messages)
		startMessagesListener(currentChat.chatId)
	}, [])

	const startMessagesListener = (chatId: Id) => {
		const realTimeDatabaseRef = ref(realTimeDatabase, `${chatId}/messages`)
		onValue(realTimeDatabaseRef, (snapshot) => {
			console.log('Listener message running...')
			const data = snapshot.val()
			setMessages(data)
		})
	}

	/* const chatAlreadyExists = async () => {
		const realTimeDatabaseRef = ref(realTimeDatabase, `${generateChatId()}`)
		const chatExists = await get(realTimeDatabaseRef)
			.then((snapshot: any) => snapshot.exists())
			.catch((err) => console.log(err))

		console.log(chatExists)
	} */

	const isUserOwner = (messageUserId: string) => {
		return userDataContext.userId === messageUserId
	}

	const scrollToEnd = () => {
		flatListRef.current?.scrollToEnd({ animated: true })
	}

	const sendMessage = async (text: string) => {
		const newMessages = {
			...messages,
			[uuid()]: {
				message: text,
				dateTime: Date.now(),
				readed: false,
				owner: userDataContext.userId as Id
			}
		}

		setMessages(newMessages)

		writeOnDatabase(
			{
				chatId: currentChat.chatId,
				userId1: userDataContext.userId as Id,
				userId2: getUserId(),
				messages: [
					{
						message: text,
						dateTime: Date.now(),
						readed: false,
						owner: userDataContext.userId as Id
					}
				] as any // TODO Type
			},
			!Object.keys(messages).length
		)
	}

	/* const generateChatId = () => {
		return `${userDataContext.userId}-${currentChat.userId1 === userDataContext.userId ? currentChat.userId2 : currentChat.userId1}`
	} */

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
				// onPress={() => chatAlreadyExists()}
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
				data={Object.values(messages)}
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
				submitMessage={sendMessage}
			/>
		</Container>
	)
}

export { Chat }
