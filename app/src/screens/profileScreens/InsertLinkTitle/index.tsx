import { Keyboard, Platform, StatusBar } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

import { ButtonContainer, Container, InputsContainer } from './styles'
import { theme } from '../../../common/theme'

import { InsertLinkTitleScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { LineInput } from '../../../components/LineInput'
import { HeaderLinkCard } from '../../../components/_cards/HeaderLinkCard'
import { SocialMedia } from '../../../services/firebase/types'

function InsertLinkTitle({ route, navigation }: InsertLinkTitleScreenProps) {
	const [linkTitle, setInputLinkTitle] = useState<string>(route.params.socialMedia?.title || '')
	const [linkTitleIsValid, setLinkTitleIsValid] = useState<boolean>(false)
	const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)
	const [invalidLinkTitleAfterSubmit, setInvaliLinkTitleAfterSubmit] = useState<boolean>(false)
	const inputRefs = {
		linkTitleInput: useRef<React.MutableRefObject<any>>(null),
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
		setLinkTitleIsValid(validation)
	}, [linkTitle])

	const validateLinkTitle = (text: string) => {
		const isValid = (text)?.trim().length >= 1
		if (isValid) {
			setInvaliLinkTitleAfterSubmit(false)
			return true
		}
		return false
	}

	const someInvalidFieldSubimitted = () => invalidLinkTitleAfterSubmit

	const saveLinkTitle = async () => {
		navigation.navigate('InsertLinkValue', {
			socialMedia: { ...route.params.socialMedia, title: linkTitle } as SocialMedia,
			index: route.params.index
		})
	}

	return (
		<Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<StatusBar backgroundColor={someInvalidFieldSubimitted() ? theme.red2 : theme.orange2} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				relativeHeight={'50%'}
				centralized
				backgroundColor={theme.orange2}
			>
				<HeaderLinkCard
					title={'título do link'}
					value={'qual o título do link para que os usuários'}
				/>
			</DefaultHeaderContainer>
			<FormContainer backgroundColor={theme.white2}>
				<InputsContainer>
					<LineInput
						value={linkTitle}
						relativeWidth={'100%'}
						textInputRef={inputRefs.linkTitleInput}
						defaultBackgroundColor={theme.white2}
						defaultBorderBottomColor={theme.black4}
						validBackgroundColor={theme.orange1}
						validBorderBottomColor={theme.orange5}
						invalidBackgroundColor={theme.red1}
						invalidBorderBottomColor={theme.red5}
						maxLength={50}
						lastInput
						invalidTextAfterSubmit={invalidLinkTitleAfterSubmit}
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
								color={someInvalidFieldSubimitted() ? theme.red3 : theme.green3}
								iconName={'arrow-right'}
								iconColor={theme.white3}
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
