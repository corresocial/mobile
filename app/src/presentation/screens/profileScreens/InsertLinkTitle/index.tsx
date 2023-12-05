import React, { useEffect, useRef, useState } from 'react'
import { Keyboard, Platform, StatusBar, TextInput } from 'react-native'

import { InsertLinkTitleScreenProps } from '@routes/Stack/UserStack/stackScreenProps'
import { SocialMedia } from '@services/firebase/types'

import { ButtonContainer, Container, InputsContainer, HeaderLinkCardContainer } from './styles'
import CheckWhiteIcon from '@assets/icons/check-white.svg'
import { theme } from '@common/theme'

import { BackButton } from '@components/_buttons/BackButton'
import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { HeaderLinkCard } from '@components/_cards/HeaderLinkCard'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { FormContainer } from '@components/_containers/FormContainer'
import { DefaultInput } from '@components/_inputs/DefaultInput'

function InsertLinkTitle({ route, navigation }: InsertLinkTitleScreenProps) {
	const [linkTitle, setInputLinkTitle] = useState<string>(route.params.socialMedia?.title || '')
	const [linkTitleIsValid, setLinkTitleIsValid] = useState<boolean>(false)

	const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)

	const inputRefs = {
		linkTitleInput: useRef<TextInput>(null),
	}

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			Keyboard.addListener('keyboardDidShow', () => setKeyboardOpened(true))
			Keyboard.addListener('keyboardDidHide', () => setKeyboardOpened(false))
		})
		return unsubscribe
	}, [navigation])

	useEffect(() => {
		const validation = validateLinkTitle(linkTitle)
		if (validation) setLinkTitleIsValid(validation)
	}, [linkTitle, keyboardOpened])

	const validateLinkTitle = (text: string) => {
		const isValid = (text)?.trim().length >= 1
		if (isValid && !keyboardOpened) {
			return true
		}
		return false
	}

	const saveLinkTitle = async () => {
		navigation.navigate('InsertLinkValue', {
			socialMedia: { ...route.params.socialMedia, title: linkTitle } as SocialMedia,
			index: route.params.index
		})
	}

	const navigateBackwards = () => navigation.goBack()

	return (
		<Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<StatusBar backgroundColor={theme.orange2} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				relativeHeight={'50%'}
				centralized
				backgroundColor={theme.orange2}
			>
				<BackButton onPress={navigateBackwards} />
				<HeaderLinkCardContainer>
					<HeaderLinkCard
						title={'título do link'}
						value={'qual o título do link para que os usuários identifiquem?'}
					/>
				</HeaderLinkCardContainer>
			</DefaultHeaderContainer>
			<FormContainer >
				<InputsContainer>
					<DefaultInput
						value={linkTitle}
						relativeWidth={'100%'}
						textInputRef={inputRefs.linkTitleInput}
						defaultBackgroundColor={theme.white2}
						validBackgroundColor={theme.orange1}
						lastInput
						multiline
						fontSize={16}
						placeholder={'ex: site de receitas'}
						keyboardType={'default'}
						textIsValid={linkTitleIsValid && !keyboardOpened}
						onChangeText={(text: string) => setInputLinkTitle(text)}
					/>
				</InputsContainer>
				<ButtonContainer>
					{
						linkTitleIsValid && !keyboardOpened
						&& (
							<PrimaryButton
								color={theme.green3}
								SecondSvgIcon={CheckWhiteIcon}
								label={'continuar'}
								labelColor={theme.white3}
								highlightedWords={['continuar']}
								startsHidden={false}
								onPress={saveLinkTitle}
							/>
						)
					}
				</ButtonContainer>
			</FormContainer>
		</Container>
	)
}

export { InsertLinkTitle }
