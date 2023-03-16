import React, { RefObject, useContext, useRef, useState } from 'react'

import { FlatList } from 'react-native'
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
import { Message } from '../../../@types/chat/types'
import { AuthContext } from '../../../contexts/AuthContext'
import { ChatPopOver } from '../../../components/ChatPopOver'
import { FlatListItem } from '../../../@types/global/types'

function Chat({ navigation }: ChatScreenProps) {
	const chat = {
		chatId: 123,
		userId1: 'userId1',
		userId2: 'userId2',
		messages: [
			{
				message: 'e aquela coca de ontem?',
				dateTime: new Date('2023-03-05'),
				readed: false,
				owner: 'userId1'
			},
			{
				message: 'vou ficar devendo',
				dateTime: new Date('2023-03-06'),
				readed: true,
				owner: 'userId2'
			},
			{
				message: 'mas de novo cara?!',
				dateTime: new Date('2023-03-07'),
				readed: false,
				owner: 'userId1'
			}
		]
	}

	const { userDataContext } = useContext(AuthContext)

	const [chatOptionsIsOpen, setChatOptionsIsOpen] = useState(false)
	const [messages, setMessages] = useState<Message[]>(chat.messages)

	const flatListRef: RefObject<FlatList> = useRef(null)

	const isUserOwner = (messageUserId: string) => {
		// return userDataContext.userId === messageUserId // TODO UNCOMENT
		return messageUserId === 'userId1'
	}

	const scrollToEnd = () => {
		flatListRef.current?.scrollToEnd({ animated: true })
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
					userName={'Wellington Souza'}
					profilePictureUrl={'https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2021/06/41479_2FF050B33087A556.png?w=876&h=484&crop=1'}
					width={'60%'}
					userNameFontSize={15}
					height={'100%'}
				/>
				<ChatPopOver
					userName={'Wellington Souza'}
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
				data={messages}
				renderItem={({ item }: FlatListItem<Message>) => ( // TODO TYPE
					<MessageCard
						message={item.message}
						dateTime={item.dateTime}
						owner={isUserOwner(item.owner)}
						errorSending={item.message === 'kkkj'}
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
				submitMessage={(text: string) => {
					setMessages([
						...messages,
						{
							message: text,
							dateTime: new Date(),
							readed: false,
							owner: 'userId1'
						}
					])
				}}
			/>
		</Container>
	)
}

export { Chat }
