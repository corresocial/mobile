import React, { useEffect, useState } from 'react'
import { useTheme } from 'styled-components'

import { CitizenRegisterUseCases } from '@domain/citizenRegister/adapter/CitizenRegisterUseCases'

import { CitizenRegisterLocalRepository } from '@data/citizenRegister/CitizenRegisterLocalRepository'

import { CitizenRegistrationHomeScreenProps } from '@routes/Stack/CitizenRegistrationStack/screenProps'

import { getNetworkStatus } from '@utils/deviceNetwork'

import { Body, HeaderContainer, HeaderActionsContainer, GreetingText } from './styles'
import QuestionMarkWhiteIcon from '@assets/icons/questionMark-white.svg'
import RecordWhiteIcon from '@assets/icons/record-white.svg'
import WirelessOffWhiteIcon from '@assets/icons/wirelessOff-white.svg'
import WirelessOnWhiteIcon from '@assets/icons/wirelessOn-white.svg'
import { showMessageWithHighlight } from '@common/auxiliaryFunctions'
import { relativeScreenDensity } from '@common/screenDimensions'

import { OptionButton } from '@components/_buttons/OptionButton'
import { ScreenContainer } from '@components/_containers/ScreenContainer'
import { DefaultPostViewHeader } from '@components/DefaultPostViewHeader'

function CitizenRegistrationHome({ navigation }: CitizenRegistrationHomeScreenProps) {
	const [numberOfOfflineCitizenRegisters, setNumberOfOfflineCitizenRegisters] = useState(0)

	const theme = useTheme()

	const [hasNetworkConnection, setHasNetworkConnection] = useState<boolean>()

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			isConnected()
			loadNumberOfOfflineCitizenRegisters()
		})
		return unsubscribe
	}, [])

	const loadNumberOfOfflineCitizenRegisters = async () => {
		const offlineRegisters = await CitizenRegisterUseCases.getOfflineCitizenRegisters(CitizenRegisterLocalRepository) || []
		setNumberOfOfflineCitizenRegisters((offlineRegisters || []).length)
	}

	const isConnected = async () => {
		const status = await getNetworkStatus()
		setHasNetworkConnection(status.isConnected && status.isInternetReachable)
	}

	return (
		<ScreenContainer
			topSafeAreaColor={theme.orange2}
			bottomSafeAreaColor={theme.orange1}
		>
			<HeaderContainer>
				<DefaultPostViewHeader
					text={'cadastro cidadão'}
					highlightedWords={['cidadão']}
					ignorePlatform
					onBackPress={() => navigation.goBack()}
				/>
				<HeaderActionsContainer>
					<GreetingText>{showMessageWithHighlight('seja bem-vindo, recenseador!', ['bem-vindo,', 'recenseador!'])}</GreetingText>
					{
						(!!numberOfOfflineCitizenRegisters) && (
							<OptionButton
								label={`você tem ${numberOfOfflineCitizenRegisters} ${numberOfOfflineCitizenRegisters === 1 ? 'cadastro pronto' : 'cadastros prontos'} `}
								shortDescription={hasNetworkConnection ? 'você já pode enviá-los' : 'esperando conexão com internet'}
								highlightedWords={['cadastro', 'cadastros']}
								labelSize={14}
								relativeHeight={relativeScreenDensity(60)}
								leftSideWidth={'25%'}
								leftSideColor={hasNetworkConnection ? theme.green3 : theme.yellow3}
								SvgIcon={hasNetworkConnection ? WirelessOnWhiteIcon : WirelessOffWhiteIcon}
								svgIconScale={['70%', '70%']}
								onPress={() => navigation.navigate('CitizenOfflineRegistrationList')}
							/>
						)
					}
				</HeaderActionsContainer>
			</HeaderContainer>
			<Body>
				<OptionButton
					label={'quem somos?'}
					highlightedWords={['quem']}
					labelSize={15}
					relativeHeight={relativeScreenDensity(80)}
					leftSideWidth={'25%'}
					leftSideColor={theme.orange3}
					SvgIcon={QuestionMarkWhiteIcon}
					svgIconScale={['50%', '50%']}
					onPress={() => navigation.navigate('WhoWeAre')}
				/>
				<OptionButton
					label={'questionário'}
					highlightedWords={['questionário']}
					labelSize={15}
					relativeHeight={relativeScreenDensity(80)}
					leftSideWidth={'25%'}
					leftSideColor={theme.orange3}
					SvgIcon={RecordWhiteIcon}
					svgIconScale={['40%', '40%']}
					onPress={() => navigation.navigate('CitizenQuestionsList')}
				/>
			</Body>
		</ScreenContainer>
	)
}

export { CitizenRegistrationHome }
