import React, { useContext, useEffect, useState } from 'react'
import { Alert, BackHandler, StatusBar } from 'react-native'

import { sendEvent } from '@newutils/methods/analyticsEvents'

import { UserEntity } from '@domain/user/entity/types'

import { useUserRepository } from '@data/user/useUserRepository'

import { AuthContext } from '@contexts/AuthContext'

import { SelectAuthRegisterScreenProps } from '@routes/Stack/AuthRegisterStack/screenProps'

import { showBuildInfo } from '@utils/showBuildInfo'

import { Container, CarouselItemContainer, Slogan, EasterEgg } from './styles'
import Logo from '@assets/icons/logo.svg'
import PhoneDeviceWhiteIcon from '@assets/icons/phoneDevice-white.svg'
import PlusWhiteIcon from '@assets/icons/plus-white.svg'
import UserWhiteIcon from '@assets/icons/profile-white.svg'
import { relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { OptionButton } from '@components/_buttons/OptionButton'
import { InstructionCard } from '@components/_cards/InstructionCard'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { FormContainer } from '@components/_containers/FormContainer'
import { CustomCarousel } from '@components/CustomCarousel'

const presentationTexts = [
	'rede social, de verdade',
	'aqui você pode postar e encontrar de tudo, seu trabalho, comércio, cultura e iniciativa social  no seu bairro, cidade e país!',
	'além disso, quando você usa e assina o corre., você ajuda nossa organização a digitalizar pessoas em estado de vulnerabilidade ajudando elas a gerarem mais renda cultura e cidadania!',
]

const { localStorage } = useUserRepository()

function SelectAuthRegister({ route, navigation }: SelectAuthRegisterScreenProps) {
	const { performQuickSignin } = useContext(AuthContext)

	const [localUser, setLocalUser] = useState<UserEntity | null>()

	const userId = localUser && localUser.userId ? localUser.userId : ''
	const userName = localUser && localUser.name ? localUser.name : ''
	const hasStoredUser = userId && userName

	useEffect(() => {
		Alert.alert('process.env.IOS_MAPS_API_KEY', process.env.IOS_MAPS_API_KEY)
		Alert.alert('process.env.ANDROID_MAPS_API_KEY', process.env.ANDROID_MAPS_API_KEY)
		loadLocalUser()
	}, [])

	const loadLocalUser = async () => {
		const authenticatedLocalUser = await localStorage.getLocalUserData()
		setLocalUser(authenticatedLocalUser)
	}

	useEffect(() => {
		BackHandler.addEventListener('hardwareBackPress', onPressBackHandler)
	}, [])

	const onPressBackHandler = () => {
		if (navigation.isFocused()) {
			BackHandler.exitApp()
			return true
		}
		return false
	}

	const navigateToAuthFlow = () => {
		sendEvent('opened_auth_screen', { authType: 'login' }, true)
		navigation.navigate('SelectAuthMethod')
	}

	const navigateToRegisterFlow = () => {
		sendEvent('opened_auth_screen', { authType: 'register' }, true)
		navigation.navigate('AcceptTermsAndConditions')
	}

	const redirectToApp = async () => {
		try {
			if (localUser?.userId) {
				await performQuickSignin(localUser.userId)
			}
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<Container>
			<StatusBar backgroundColor={theme.colors.orange[3]} barStyle={'dark-content'} />
			<DefaultHeaderContainer relativeHeight={'50%'} backgroundColor={theme.colors.orange[3]} withoutPadding>
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
					hasStoredUser ? (
						<OptionButton
							label={userName || ''}
							highlightedWords={userName.split(' ') || ['']}
							shortDescription={'entrar'}
							labelSize={18}
							shortDescriptionFontSize={14}
							relativeHeight={'30%'}
							SvgIcon={UserWhiteIcon}
							svgIconScale={['50%', '50%']}
							leftSideColor={theme.colors.orange[3]}
							leftSideWidth={'25%'}
							onPress={redirectToApp}
						/>
					)
						: <></>
				}
				<OptionButton
					label={`entrar em ${hasStoredUser ? 'outra' : 'uma'} conta`}
					highlightedWords={['entrar', 'em', hasStoredUser ? 'outra' : 'uma', 'conta']}
					labelSize={16}
					relativeHeight={hasStoredUser ? '20%' : '30%'}
					SvgIcon={PhoneDeviceWhiteIcon}
					svgIconScale={['70%', '70%']}
					leftSideColor={theme.colors.green[3]}
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
					leftSideColor={theme.colors.purple[3]}
					leftSideWidth={'25%'}
					onPress={navigateToRegisterFlow}
				/>
				<EasterEgg onPress={showBuildInfo} />
			</FormContainer>
		</Container>
	)
}

export { SelectAuthRegister }
