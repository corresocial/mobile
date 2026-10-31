import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Keyboard, StatusBar, TextInput } from 'react-native'
import uuid from 'react-uuid'

import { AuthContext } from '@contexts/AuthContext'

import { ContactUsInsertMessageScreenProps } from '@routes/Stack/ProfileStack/screenProps'

import { sendContactUsToSentry } from '@infrastructure/sentry/contactUs'
import { useDiscordService } from '@services/discord/useDiscordService'

import { Container } from './styles'
import CheckIcon from '@assets/icons/check-white.svg'
import { relativeScreenHeight } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { BackButton } from '@components/_buttons/BackButton'
import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { InfoCard } from '@components/_cards/InfoCard'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { FormContainer } from '@components/_containers/FormContainer'
import { DefaultInput } from '@components/_inputs/DefaultInput'
import { Loader } from '@components/Loader'

const { sendMessageToDiscordContactUs } = useDiscordService()

function ContactUsInsertMessage({ route, navigation }: ContactUsInsertMessageScreenProps) {
	const { userDataContext } = useContext(AuthContext)

	const [message, setItemDescription] = useState<string>('')
	const [messageIsValid, setItemDescriptionIsValid] = useState<boolean>(false)
	const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState(false)

	useFocusEffect(useCallback(() => {
		const keyboardDidShowSubscription = Keyboard.addListener('keyboardDidShow', () => setKeyboardOpened(true))
		const keyboardDidHideSubscription = Keyboard.addListener('keyboardDidHide', () => setKeyboardOpened(false))
		return () => {
			keyboardDidShowSubscription.remove()
			keyboardDidHideSubscription.remove()
		}
	}, []))

	useEffect(() => {
		const validation = validateItemDescription(message)
		setItemDescriptionIsValid(validation)
	}, [message, keyboardOpened])

	const inputRefs = {
		descriptionInput: useRef<TextInput>(null),
	}

	const validateItemDescription = (text: string) => {
		const isValid = (text).trim().length >= 1
		if (isValid && !keyboardOpened) {
			return true
		}
		return false
	}

	const sendMessage = async () => {
		try { // REFACTOR Deve virar um caso de domínio
			setIsLoading(true)
			const reportId = uuid()
			sendContactUsToSentry({
				userId: userDataContext.userId,
				userName: userDataContext.name,
				type: route.params.contactUsType,
				message,
				reportId,
				reportedTarget: route.params.reportedType,
				reportedId: route.params.reportedId
			})

			await sendMessageToDiscordContactUs({
				userId: userDataContext.userId,
				userName: userDataContext.name,
				type: route.params.contactUsType,
				message,
				reportId,
				reportedTarget: route.params.reportedType,
				reportedId: route.params.reportedId
			})

			setIsLoading(false)
			const contactUsSuccessParams = { reportType: route.params.reportedType || 'none' }
			// Instância registrada no UserStack (denúncias de enquete/abaixo-assinado) segue para a tela de sucesso do mesmo navegador
			const isUserStackInstance = (route.name as string) === 'ContactUsInsertMessageUserStack'
			isUserStackInstance
				? navigation.navigate('ContactUsSuccessUserStack', contactUsSuccessParams)
				: navigation.navigate('ContactUsSuccess', contactUsSuccessParams)
		} catch (err) {
			console.log(err)
			setIsLoading(false)
		}
		setIsLoading(false)
	}

	return (
		<Container behavior={'padding'}>
			<StatusBar backgroundColor={theme.colors.orange[2]} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				relativeHeight={relativeScreenHeight(30)}
				centralized
				backgroundColor={theme.colors.orange[2]}
			>
				<BackButton onPress={() => navigation.goBack()} />
				<InfoCard
					title={route.params.title}
					titleFontSize={24}
					description={'fala para a gente o que aconteceu'}
					highlightedWords={[route.params.title, 'o', 'que']}
					height={'80%'}
					color={theme.colors.white[3]}
				/>
			</DefaultHeaderContainer>
			<FormContainer >
				<DefaultInput
					value={message}
					relativeWidth={'100%'}
					textInputRef={inputRefs.descriptionInput}
					defaultBackgroundColor={theme.colors.white[2]}
					validBackgroundColor={theme.colors.orange[1]}
					multiline
					lastInput
					fontSize={16}
					placeholder={'detalhes o ocorrido...'}
					keyboardType={'default'}
					textIsValid={messageIsValid && !keyboardOpened}
					validateText={(text: string) => validateItemDescription(text)}
					onChangeText={(text: string) => setItemDescription(text)}
				/>
				{
					messageIsValid && !keyboardOpened ? (
						isLoading
							? <Loader />
							: (
								<PrimaryButton
									color={theme.colors.green[3]}
									labelColor={theme.colors.white[3]}
									relativeHeight={relativeScreenHeight(9.3)}
									labelMarginLeft={5}
									textAlign={'left'}
									label={'continuar'}
									SecondSvgIcon={CheckIcon}
									onPress={sendMessage}
								/>
							)
					) : <></>
				}
			</FormContainer>
		</Container >
	)
}

export { ContactUsInsertMessage }
