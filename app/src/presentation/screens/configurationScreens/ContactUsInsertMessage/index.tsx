import React, { useContext, useEffect, useRef, useState } from 'react'
import { Keyboard, Platform, StatusBar, TextInput } from 'react-native'

import { AuthContext } from '@contexts/AuthContext'

import { ContactUsInsertMessageScreenProps } from '@routes/Stack/UserStack/stackScreenProps'
import { NotionPage } from '@services/notion/types'

import { sendContactUsMessageToDiscord } from '@services/discord/contactUs'
import { sendContactUsMessageToNotion } from '@services/notion/contactUs'

import { Container } from './styles'
import CheckIcon from '@assets/icons/check-white.svg'
import { removeAllKeyboardEventListeners } from '@common/listenerFunctions'
import { relativeScreenHeight } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { BackButton } from '@components/_buttons/BackButton'
import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { InfoCard } from '@components/_cards/InfoCard'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { FormContainer } from '@components/_containers/FormContainer'
import { DefaultInput } from '@components/_inputs/DefaultInput'
import { Loader } from '@components/Loader'

function ContactUsInsertMessage({ route, navigation }: ContactUsInsertMessageScreenProps) {
	const { userDataContext } = useContext(AuthContext)

	const [message, setItemDescription] = useState<string>('')
	const [messageIsValid, setItemDescriptionIsValid] = useState<boolean>(false)
	const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState(false)

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
		try {
			setIsLoading(true)
			const notionPage: NotionPage = await sendContactUsMessageToNotion({
				userId: userDataContext.userId as string,
				type: route.params.contactUsType,
				message,
				reportTarged: route.params.reportedType,
				reportedId: route.params.reportedId
			})

			await sendContactUsMessageToDiscord({
				userId: userDataContext.userId as string,
				userName: userDataContext.name as string,
				type: route.params.contactUsType,
				message,
				reportId: notionPage.reportId,
				reportedTarget: route.params.reportedType,
				reportedId: route.params.reportedId
			})

			setIsLoading(false)
			navigation.navigate('ContactUsSuccess', { reportType: route.params.reportedType || 'none' })
		} catch (err) {
			console.log(err)
			setIsLoading(false)
		}
		setIsLoading(false)
	}

	return (
		<Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<StatusBar backgroundColor={theme.orange2} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				relativeHeight={relativeScreenHeight(25)}
				centralized
				backgroundColor={theme.orange2}
			>
				<BackButton onPress={() => navigation.goBack()} />
				<InfoCard
					title={route.params.title}
					titleFontSize={24}
					description={'fala para a gente o que aconteceu'}
					highlightedWords={[route.params.title, 'o', 'que']}
					height={'70%'}
					color={theme.white3}
				/>
			</DefaultHeaderContainer>
			<FormContainer >
				<DefaultInput
					value={message}
					relativeWidth={'100%'}
					textInputRef={inputRefs.descriptionInput}
					defaultBackgroundColor={theme.white2}
					validBackgroundColor={theme.orange1}
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
					messageIsValid && !keyboardOpened && (
						isLoading
							? <Loader />
							: (
								<PrimaryButton
									color={theme.green3}
									labelColor={theme.white3}
									relativeHeight={relativeScreenHeight(9.3)}
									labelMarginLeft={5}
									textAlign={'left'}
									label={'continuar'}
									SecondSvgIcon={CheckIcon}
									onPress={sendMessage}
								/>
							)
					)
				}
			</FormContainer>
		</Container >
	)
}

export { ContactUsInsertMessage }
