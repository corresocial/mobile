import React, { useEffect, useRef, useState, useContext } from 'react'
import { Keyboard, StatusBar } from 'react-native'

import { ButtonContainer, Container, InputsContainer } from './styles'
import { theme } from '../../../common/theme'

import { InsertLinkValueScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { LineInput } from '../../../components/LineInput'
import { HeaderLinkCard } from '../../../components/_cards/HeaderLinkCard'
import { updateUser } from '../../../services/firebase/user/updateUser'
import { AuthContext } from '../../../contexts/AuthContext'
import { SocialMedia } from '../../../services/firebase/types'
import { LoaderContext } from '../../../contexts/LoaderContext'

function InsertLinkValue({ route, navigation }: InsertLinkValueScreenProps) {
	const { setUserDataOnContext, userDataContext } = useContext(AuthContext)
	const { setLoaderIsVisible } = useContext(LoaderContext)

	const [linkValue, setInputLinkValue] = useState<string>(route.params.socialMedia?.link || '')
	const [linkValueIsValid, setLinkValueIsValid] = useState<boolean>(false)
	const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)
	const [invalidLinkValueAfterSubmit, setInvaliLinkValueAfterSubmit] = useState<boolean>(false)
	const inputRefs = {
		linkValueInput: useRef<React.MutableRefObject<any>>(null),
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

	const someInvalidFieldSubimitted = () => invalidLinkValueAfterSubmit

	const saveLinkValue = async () => {
		setLoaderIsVisible(true)
		try {
			const socialMediaData = getSocialMediaData()

			await updateUser(userDataContext.userId as string, socialMediaData)
			setUserDataOnContext(socialMediaData)
			navigation.navigate('SocialMediaManagement', { socialMedias: socialMediaData.socialMedias, isAuthor: true }) // TODO Type
		} catch (err) {
			console.log(err)
			setLoaderIsVisible(false)
		}
		setLoaderIsVisible(false)
	}

	const getSocialMediaData = () => {
		let currentSocialMedias = [...userDataContext.socialMedias || [] as SocialMedia[]]
		const socialMediaEditableIndex = route.params.index

		if (socialMediaEditableIndex || socialMediaEditableIndex === 0) {
			currentSocialMedias[socialMediaEditableIndex] = {
				title: route.params.linkTitle,
				link: linkValue
			}
		} else {
			currentSocialMedias = [
				...currentSocialMedias,
				{
					title: route.params.linkTitle,
					link: linkValue
				}]
		}

		return { socialMedias: currentSocialMedias }
	}

	return (
		<Container >
			<StatusBar backgroundColor={someInvalidFieldSubimitted() ? theme.red2 : theme.orange2} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				relativeHeight={'50%'}
				centralized
				backgroundColor={theme.orange2}
			>
				<HeaderLinkCard
					title={'inserir link'}
					value={'cola o link para a gente'}
				/>
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
						maxLength={50}
						lastInput
						invalidTextAfterSubmit={invalidLinkValueAfterSubmit}
						placeholder={'ex: www.facebook.com'}
						keyboardType={'default'}
						textIsValid={linkValueIsValid && !keyboardOpened}
						onChangeText={(text: string) => setInputLinkValue(text)}
					/>
				</InputsContainer>
				<ButtonContainer>
					{
						linkValueIsValid && !keyboardOpened
						&& (
							<PrimaryButton
								color={someInvalidFieldSubimitted() ? theme.red3 : theme.green3}
								iconName={'arrow-right'}
								iconColor={theme.white3}
								label={'continuar'}
								labelColor={theme.white3}
								highlightedWords={['continuar']}
								startsHidden={false}
								onPress={saveLinkValue}
							/>
						)

					}
				</ButtonContainer>
			</FormContainer>
		</Container>
	)
}

export { InsertLinkValue }
