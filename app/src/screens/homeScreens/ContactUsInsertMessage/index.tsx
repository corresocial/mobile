import React, { useContext, useEffect, useRef, useState } from 'react'
import { Keyboard, StatusBar } from 'react-native'

import { Container, ButtonsContainer, Body } from './styles'
import { theme } from '../../../common/theme'
import AngleLeftThin from '../../../assets/icons/angleLeftThin.svg'
import CheckIcon from '../../../assets/icons/check.svg'

import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'

import { ContactUsInsertMessageScreenProps } from '../../../routes/Stack/userStack/stackScreenProps'

import { AuthContext } from '../../../contexts/AuthContext'
import { LoaderContext } from '../../../contexts/LoaderContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { SmallButton } from '../../../components/_buttons/SmallButton'
import { LineInput } from '../../../components/LineInput'
import { InfoCard } from '../../../components/_cards/InfoCard'
import { screenHeight } from '../../../common/screenDimensions'
import { sendContactUsMessage } from '../../../services/discord/contactUs'
// import { sendContactUsMessage } from '../../../services/notion/contactUs'

function ContactUsInsertMessage({ route, navigation }: ContactUsInsertMessageScreenProps) {
	const { userDataContext } = useContext(AuthContext)
	const { setLoaderIsVisible } = useContext(LoaderContext)

	const [message, setItemDescription] = useState<string>('')
	const [messageIsValid, setItemDescriptionIsValid] = useState<boolean>(false)
	const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			removeAllKeyboardEventListeners()
			Keyboard.addListener('keyboardDidShow', () => setKeyboardOpened(true))
			Keyboard.addListener('keyboardDidHide', () => setKeyboardOpened(false))
		})
		return unsubscribe
	}, [navigation])

	useEffect(() => {
		const validation = validateItemDescription(message)
		setItemDescriptionIsValid(validation)
	}, [message, keyboardOpened])

	const inputRefs = {
		itemDescriptionInput: useRef<React.MutableRefObject<any>>(null),
	}

	const validateItemDescription = (text: string) => {
		const isValid = (text).trim().length >= 1
		if (isValid && !keyboardOpened) {
			return true
		}
		return false
	}

	const sendMessage = async () => {
		try {
			setLoaderIsVisible(true)
			await sendContactUsMessage({
				userId: userDataContext.userId as string,
				userName: userDataContext.name as string,
				title: route.params.title,
				message
			})
			setLoaderIsVisible(false)
			navigation.navigate('ContactUsSuccess')
		} catch (err) {
			console.log(err)
			setLoaderIsVisible(false)
		}
		setLoaderIsVisible(false)
	}

	return (
		<Container>
			<StatusBar backgroundColor={theme.orange2} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				relativeHeight={screenHeight * 0.2}
				centralized
				backgroundColor={theme.orange2}
			>
				<InfoCard
					title={route.params.title}
					titleFontSize={24}
					description={'fala para a gente o que aconteceu'}
					highlightedWords={[route.params.title, 'o', 'que']}
					height={'100%'}
					color={theme.white3}
				/>
			</DefaultHeaderContainer>
			<Body>
				<LineInput
					value={message}
					relativeWidth={'100%'}
					initialNumberOfLines={2}
					textInputRef={inputRefs.itemDescriptionInput}
					defaultBackgroundColor={theme.white2}
					defaultBorderBottomColor={theme.black4}
					validBackgroundColor={theme.orange1}
					validBorderBottomColor={theme.orange5}
					multiline
					lastInput
					textAlign={'left'}
					fontSize={16}
					placeholder={'detalhes o ocorrido...'}
					keyboardType={'default'}
					textIsValid={messageIsValid && !keyboardOpened}
					validateText={(text: string) => validateItemDescription(text)}
					onChangeText={(text: string) => setItemDescription(text)}
				/>
				{
					messageIsValid && !keyboardOpened
					&& (
						<ButtonsContainer>
							<SmallButton
								relativeWidth={65}
								height={65}
								color={theme.white3}
								SvgIcon={AngleLeftThin}
								onPress={() => navigation.goBack()}
							/>
							<PrimaryButton
								color={theme.green3}
								labelColor={theme.white3}
								fontSize={18}
								relativeWidth={'68%'}
								labelMarginLeft={5}
								textAlign={'left'}
								label={'continuar'}
								SecondSvgIcon={CheckIcon}
								svgIconScale={['30%', '15%']}
								onPress={sendMessage}
							/>
						</ButtonsContainer>
					)
				}
			</Body>
		</Container >
	)
}

export { ContactUsInsertMessage }
