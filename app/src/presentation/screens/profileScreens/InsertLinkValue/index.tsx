import React, { useEffect, useRef, useState, useContext } from 'react'
import { Keyboard, Linking, Platform, StatusBar, TextInput } from 'react-native'

import { useUtils } from '@newutils/useUtils'

import { SocialMedia } from '@domain/user/entity/types'
import { useUserDomain } from '@domain/user/useUserDomain'

import { useUserRepository } from '@data/user/useUserRepository'

import { AuthContext } from '@contexts/AuthContext'

import { InsertLinkValueScreenProps } from '@routes/Stack/ProfileStack/screenProps'

import { isDefaultSocialMedia, mergeWithDefaultSocialMedia, sortSocialMedias, socialMediaUrl } from '@utils/socialMedias'

import { ButtonContainer, Container, HeaderLinkCardContainer, InputsContainer } from './styles'
import CheckWhiteIcon from '@assets/icons/check-white.svg'
import { theme } from '@common/theme'

import { BackButton } from '@components/_buttons/BackButton'
import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { HeaderLinkCard } from '@components/_cards/HeaderLinkCard'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { FormContainer } from '@components/_containers/FormContainer'
import { DefaultInput } from '@components/_inputs/DefaultInput'
import { Loader } from '@components/Loader'

const { updateUserRepository } = useUserDomain()

const { getArrayObjectDifferences } = useUtils()

function InsertLinkValue({ route, navigation }: InsertLinkValueScreenProps) {
	const { setUserDataOnContext, userDataContext } = useContext(AuthContext)

	const initialLinkValue = route.params.socialMedia ? route.params.socialMedia.link.replace(socialMediaUrl(route.params.socialMedia.title, ''), '') : ''

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
		if (validation) setLinkValueIsValid(validation)
	}, [linkValue, keyboardOpened])

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
		try {
			setIsLoading(true)

			if (linkValue !== '' && !isDefaultSocialMedia(route.params.socialMedia.title)) {
				if (!linkValue.includes('http') && !linkValue.includes('www') && !await Linking.canOpenURL(linkValue)) {
					setInvaliLinkValueAfterSubmit(true)
					return
				}
			}

			const socialMediaData = await getSocialMediaData()
			console.log(socialMediaData)

			if (!(getArrayObjectDifferences(userDataContext.socialMedias || [], socialMediaData.socialMedias) || []).length) {
				return navigation.navigate('SocialMediaManagement', { isAuthor: true })
			}

			await updateUserRepository(
				useUserRepository,
				userDataContext,
				{ unapprovedData: socialMediaData }
			)
			setUserDataOnContext({ unapprovedData: socialMediaData })

			navigation.navigate('SocialMediaManagement', { isAuthor: true })
		} catch (err) {
			console.log(err)
			setInvaliLinkValueAfterSubmit(true)
			setIsLoading(false)
		}
		setIsLoading(false)
	}

	const getSocialMediaData = async () => {
		let completeLink = linkValue

		let currentSocialMedias = mergeWithDefaultSocialMedia(userDataContext.socialMedias as SocialMedia[] || []) || [] as SocialMedia[]
		currentSocialMedias = currentSocialMedias.sort(sortSocialMedias)

		const socialMediaTitle = route.params.socialMedia.title
		const socialMediaEditableIndex = currentSocialMedias.findIndex((obj) => obj.title === socialMediaTitle) // Obtem novo index

		if (linkValue.slice(0, 3) === 'www') {
			completeLink = `http://${linkValue}`
		}

		if (isDefaultSocialMedia(socialMediaTitle) && !linkValue.includes('http') && !linkValue.includes('www')) {
			completeLink = socialMediaUrl(socialMediaTitle, linkValue)
		}

		if (completeLink && completeLink.slice(0, 4) !== 'http') {
			completeLink = `http://${completeLink}`
		}

		if (socialMediaEditableIndex >= 0) {
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

		return {
			socialMedias: currentSocialMedias.filter((socialMedia) => {
				return socialMedia.link && (socialMedia.link !== socialMediaUrl(socialMedia.title, ''))
			})
		}
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
						value={invalidLinkValueAfterSubmit ? 'insira um link válido' : isDefaultSocialMedia(route.params.socialMedia.title) ? 'cola o seu @ aí pra gente' : 'cola o seu link aí pra gente'}
					/>
				</HeaderLinkCardContainer>
			</DefaultHeaderContainer>
			<FormContainer >
				<InputsContainer>
					<DefaultInput
						value={linkValue}
						relativeWidth={'100%'}
						textInputRef={inputRefs.linkValueInput}
						defaultBackgroundColor={theme.white2}
						validBackgroundColor={theme.orange1}
						lastInput
						multiline
						fontSize={16}
						autoCapitalize={'none'}
						autoCorrect={false}
						invalidTextAfterSubmit={invalidLinkValueAfterSubmit}
						placeholder={isDefaultSocialMedia(route.params.socialMedia.title) ? 'ex: corresocial' : 'ex: www.facebook.com/corre'}
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
