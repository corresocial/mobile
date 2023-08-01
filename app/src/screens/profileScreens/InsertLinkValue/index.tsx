import React, { useEffect, useRef, useState, useContext } from 'react'
import { Keyboard, Platform, StatusBar, TextInput } from 'react-native'

import { updateUser } from '../../../services/firebase/user/updateUser'

import { ButtonContainer, Container, HeaderLinkCardContainer, InputsContainer } from './styles'
import { theme } from '../../../common/theme'
import CheckWhiteIcon from '../../../assets/icons/check-white.svg'

import { InsertLinkValueScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'
import { SocialMedia } from '../../../services/firebase/types'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { LineInput } from '../../../components/LineInput'
import { HeaderLinkCard } from '../../../components/_cards/HeaderLinkCard'
import { AuthContext } from '../../../contexts/AuthContext'
import { Loader } from '../../../components/Loader'
import { isDefaultSocialMedia, mergeWithDefaultSocialMedia, sortSocialMedias } from '../../../utils/socialMedias'
import { BackButton } from '../../../components/_buttons/BackButton'

function InsertLinkValue({ route, navigation }: InsertLinkValueScreenProps) {
	const { setUserDataOnContext, userDataContext } = useContext(AuthContext)

	const initialLinkValue = route.params.socialMedia.link || ''

	const [linkValue, setInputLinkValue] = useState<string>(initialLinkValue || '')
	const [linkValueIsValid, setLinkValueIsValid] = useState<boolean>(false)
	const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)
	const [invalidLinkValueAfterSubmit, setInvaliLinkValueAfterSubmit] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState(false)

	const inputRefs = {
		linkValueInput: useRef<TextInput>(null),
	}

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			Keyboard.addListener('keyboardDidShow', () => setKeyboardOpened(true))
			Keyboard.addListener('keyboardDidHide', () => setKeyboardOpened(false))
		})
		return unsubscribe
	}, [navigation])

	useEffect(() => {
		const validation = validateLinkValue(linkValue)
		setLinkValueIsValid(validation)
	}, [linkValue])

	const validateLinkValue = (text: string) => {
		const isValid = (text)?.trim().length >= 1
		if (isValid) {
			setInvaliLinkValueAfterSubmit(false)
			return true
		}
		return false
	}

	const saveLinkValue = async () => {
		setInvaliLinkValueAfterSubmit(false)
		if (linkValue !== '') {
			if (!linkValue.includes('https://') && !linkValue.includes('www')) {
				setInvaliLinkValueAfterSubmit(true)
				return
			}
		}

		setIsLoading(true)
		try {
			const socialMediaData = await getSocialMediaData()
			await updateUser(userDataContext.userId as string, socialMediaData)
			setUserDataOnContext(socialMediaData)
			navigation.navigate('SocialMediaManagement', { socialMedias: socialMediaData.socialMedias, isAuthor: true })
		} catch (err) {
			console.log(err)
			setIsLoading(false)
		}
		setIsLoading(false)
	}

	const getSocialMediaData = async () => {
		let completeLink = linkValue

		let currentSocialMedias = mergeWithDefaultSocialMedia(userDataContext.socialMedias as SocialMedia[] || []) || [] as SocialMedia[]
		currentSocialMedias = currentSocialMedias.sort(sortSocialMedias)

		const socialMediaEditableIndex = route.params.index

		if (linkValue.slice(0, 3) === 'www') {
			completeLink = `https://${linkValue}`
		}

		if (socialMediaEditableIndex || socialMediaEditableIndex === 0) {
			currentSocialMedias[socialMediaEditableIndex] = {
				title: route.params.socialMedia.title,
				link: completeLink
			}
		} else {
			currentSocialMedias = [
				...currentSocialMedias,
				{
					title: route.params.socialMedia.title,
					link: completeLink
				}]
		}

		return { socialMedias: currentSocialMedias.filter((socialMedia) => socialMedia.link) }
	}

	const navigateBackwards = () => navigation.goBack()

	return (
		<Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<StatusBar backgroundColor={invalidLinkValueAfterSubmit ? theme.red2 : theme.orange2} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				relativeHeight={'50%'}
				centralized
				backgroundColor={invalidLinkValueAfterSubmit ? theme.red2 : theme.orange2}
			>
				<BackButton onPress={navigateBackwards} />
				<HeaderLinkCardContainer>
					<HeaderLinkCard
						title={invalidLinkValueAfterSubmit ? 'link inválido' : 'inserir link'}
						value={invalidLinkValueAfterSubmit ? 'insira um link válido' : 'cola o seu link aí pra gente'}
					/>
				</HeaderLinkCardContainer>
			</DefaultHeaderContainer>
			<FormContainer backgroundColor={theme.white2}>
				<InputsContainer>
					<LineInput
						value={linkValue}
						relativeWidth={'100%'}
						textInputRef={inputRefs.linkValueInput}
						defaultBackgroundColor={theme.white2}
						defaultBorderBottomColor={theme.black4}
						validBackgroundColor={theme.orange1}
						validBorderBottomColor={theme.orange5}
						invalidBackgroundColor={theme.red1}
						invalidBorderBottomColor={theme.red5}
						lastInput
						fontSize={16}
						autoCapitalize={'none'}
						autoCorrect={false}
						invalidTextAfterSubmit={invalidLinkValueAfterSubmit}
						placeholder={isDefaultSocialMedia(route.params.socialMedia.title) ? 'ex: corresocial' : 'ex: www.facebook.com/eu'}
						keyboardType={'url'}
						textIsValid={linkValueIsValid && !keyboardOpened}
						onChangeText={(text: string) => setInputLinkValue(text)}
					/>
				</InputsContainer>
				{
					isLoading
						? <Loader />
						: (
							<ButtonContainer>
								{
									!keyboardOpened
									&& (
										<PrimaryButton
											color={theme.green3}
											SecondSvgIcon={CheckWhiteIcon}
											label={'continuar'}
											labelColor={theme.white3}
											highlightedWords={['continuar']}
											startsHidden={false}
											onPress={saveLinkValue}
										/>
									)
								}
							</ButtonContainer>
						)
				}
			</FormContainer>
		</Container>
	)
}

export { InsertLinkValue }
