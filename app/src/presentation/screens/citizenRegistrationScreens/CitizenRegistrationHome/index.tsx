import React, { useEffect, useState } from 'react'
import { useTheme } from 'styled-components'

import { CitizenRegisterUseCases } from '@domain/citizenRegister/adapter/CitizenRegisterUseCases'

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
import { CustomModal } from '@components/_modals/CustomModal'
import { DefaultPostViewHeader } from '@components/DefaultPostViewHeader'

const citizenUseCases = new CitizenRegisterUseCases()

function CitizenRegistrationHome({ navigation }: CitizenRegistrationHomeScreenProps) {
	const [numberOfOfflineCitizenRegisters, setNumberOfOfflineCitizenRegisters] = useState(0)
	const [citizenRegisterPresentationModalIsVisible, setCitizenRegisterPresentationModalIsVisible] = useState(false)

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
		const offlineRegisters = await citizenUseCases.getOfflineCitizenRegisters() || []
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
			<CustomModal
				closeModal={() => setCitizenRegisterPresentationModalIsVisible(false)}
				visibility={citizenRegisterPresentationModalIsVisible}
				title={'Cadastro cidadão'}
				closeButton
				firstParagraph={{
					text: 'Nossa missão no CORRE é conectar todos a um futuro melhor, promovendo ações de capacitação e emprego. Sua participação nesta pesquisa nos ajudará a entender as necessidades e realidades da sua comunidade, guiando nossas futuras ações.',
					highlightedWords: ['missão', 'CORRE', 'conectar', 'todos', 'a', 'um', 'futuro', 'melhor,', 'necessidades', 'realidades', 'da', 'sua', 'comunidade,'],
					fontSize: 16,
					textAlign: 'center'
				}}
				secondParagraph={{
					text: 'Suas respostas serão confidenciais. Não há respostas certas ou erradas, queremos apenas conhecer sua opinião e experiência para melhor entender os desafios da sua comunidade.',
					highlightedWords: ['Suas', 'respostas', 'serão', 'confidenciais', 'entender', 'os', 'desafios', 'da', 'comunidade'],
					fontSize: 16,
					textAlign: 'center'
				}}
				affirmativeButton={{
					label: 'vamos lá!',
					onPress: () => setCitizenRegisterPresentationModalIsVisible(false)
				}}
			/>

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
					label={'o que é cadastro cidadão?'}
					highlightedWords={['cadastro', 'cidadão?']}
					labelSize={15}
					relativeHeight={relativeScreenDensity(80)}
					leftSideWidth={'25%'}
					leftSideColor={theme.orange3}
					SvgIcon={QuestionMarkWhiteIcon}
					svgIconScale={['50%', '50%']}
					onPress={() => setCitizenRegisterPresentationModalIsVisible(true)}
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
					onPress={() => navigation.navigate('CitizenQuestionaryPreview')}
				/>
			</Body>
		</ScreenContainer>
	)
}

export { CitizenRegistrationHome }
