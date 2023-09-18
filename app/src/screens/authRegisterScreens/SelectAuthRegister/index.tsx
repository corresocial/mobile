import React, { useContext, useEffect, useState } from 'react'
import { BackHandler, StatusBar } from 'react-native'

import { Container, CarouselItemContainer, Slogan } from './styles'
import { theme } from '../../../common/theme'
import { relativeScreenHeight, relativeScreenWidth } from '../../../common/screenDimensions'
import Logo from '../../../assets/icons/logo.svg'
import PhoneDeviceWhiteIcon from '../../../assets/icons/phoneDevice-white.svg'
import UserWhiteIcon from '../../../assets/icons/profile-white.svg'
import PlusWhiteIcon from '../../../assets/icons/plus-white.svg'

import { SelectAuthRegisterScreenProps } from '../../../routes/Stack/AuthRegisterStack/stackScreenProps'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { TermsOfServiceModal } from '../../../components/_modals/TermsOfServiceModal'
import { CustomCarousel } from '../../../components/CustomCarousel'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { OptionButton } from '../../../components/_buttons/OptionButton'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { AuthContext } from '../../../contexts/AuthContext'

const presentationTexts = [
	'rede social, de verdade',
	'aqui você pode postar e encontrar de tudo, seu trabalho, comércio, cultura e iniciativa social  no seu bairro, cidade e país!',
	'além disso, quando você usa e assina o corre., você ajuda nossa organização a digitalizar pessoas em estado de vulnerabilidade ajudando elas a gerarem mais renda cultura e cidadania!',
]

function SelectAuthRegister({ route, navigation }: SelectAuthRegisterScreenProps) {
	const { getUserDataFromSecureStore, setRemoteUserOnLocal, setUserDataOnContext } = useContext(AuthContext)

	const [termsVisibility, setTermsVisibility] = useState<boolean>(false)

	const { userId, userName } = route.params

	const hasStoredUser = userId && userName

	useEffect(() => {
		BackHandler.addEventListener('hardwareBackPress', onPressBackHandler)
	})

	const onPressBackHandler = () => {
		if (navigation.isFocused()) {
			BackHandler.exitApp()
			return true
		}
		return false
	}

	const hideTermsOfServiceModal = () => {
		setTermsVisibility(false)
	}

	const navigateToAuthFlow = () => {
		setUserDataOnContext({ newUser: false })
		navigation.navigate('SelectAuthMethod')
	}

	const navigateToRegisterFlow = () => {
		setUserDataOnContext({ newUser: true })
		navigation.navigate('AcceptTermsAndConditions')
	}

	const redirectToApp = async () => {
		try {
			const localUser = await getUserDataFromSecureStore(true, true)

			if (localUser) {
				await setRemoteUserOnLocal(localUser.userId, localUser)
				navigation.reset({
					index: 0,
					routes: [{
						name: 'UserStack',
						params: { tourPerformed: localUser.tourPerformed }
					}],
				})
			}
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<Container>
			<StatusBar backgroundColor={theme.orange3} barStyle={'dark-content'} />
			<TermsOfServiceModal visibility={termsVisibility} closeModal={hideTermsOfServiceModal} />
			<DefaultHeaderContainer relativeHeight={'50%'} backgroundColor={theme.orange3} withoutPadding>
				<CustomCarousel>
					<CarouselItemContainer >
						<Logo height={relativeScreenHeight(7)} width={relativeScreenWidth(50)} />
						<Slogan>{presentationTexts[0]}</Slogan>
					</CarouselItemContainer>
					<CarouselItemContainer>
						<InstructionCard
							message={presentationTexts[1]}
							highlightedWords={['postar', 'encontrar', 'de', 'tudo', 'trabalho', 'comércio', 'cultura', 'iniciativa', 'social']}
							flex={0}
						/>
					</CarouselItemContainer>
					<CarouselItemContainer>
						<InstructionCard
							message={presentationTexts[2]}
							highlightedWords={['usa', 'assina', 'o', 'corre.', 'ajuda', 'estado', 'de', 'vulnerabilidade', 'sociais']}
							flex={0}
						/>
					</CarouselItemContainer>
				</CustomCarousel>
			</DefaultHeaderContainer>
			<FormContainer >
				{
					hasStoredUser && (
						<OptionButton
							label={userName || ''}
							highlightedWords={userName.split(' ') || ['']}
							shortDescription={'entrar'}
							labelSize={18}
							shortDescriptionFontSize={14}
							relativeHeight={'30%'}
							SvgIcon={UserWhiteIcon}
							svgIconScale={['50%', '50%']}
							leftSideColor={theme.orange3}
							leftSideWidth={'25%'}
							onPress={redirectToApp}
						/>
					)
				}
				<OptionButton
					label={'entrar em outra conta'}
					highlightedWords={['entrar', 'em', 'outra', 'conta']}
					labelSize={16}
					relativeHeight={hasStoredUser ? '20%' : '30%'}
					SvgIcon={PhoneDeviceWhiteIcon}
					svgIconScale={['70%', '70%']}
					leftSideColor={theme.green3}
					leftSideWidth={'25%'}
					onPress={navigateToAuthFlow}
				/>
				<OptionButton
					label={'criar nova conta'}
					highlightedWords={['criar', 'nova', 'conta']}
					labelSize={16}
					relativeHeight={hasStoredUser ? '20%' : '30%'}
					SvgIcon={PlusWhiteIcon}
					svgIconScale={['45%', '45%']}
					leftSideColor={theme.yellow3}
					leftSideWidth={'25%'}
					onPress={navigateToRegisterFlow}
				/>
			</FormContainer>
		</Container>
	)
}

export { SelectAuthRegister }
