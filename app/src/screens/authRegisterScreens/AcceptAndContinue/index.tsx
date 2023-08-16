import React, { useEffect, useState } from 'react'
import { BackHandler, StatusBar } from 'react-native'

import {
	Container,
	TermsButtonContainer,
	CarouselItemContainer,
	Slogan,
	TermsLabel,
	TermsLabelHighlight
} from './styles'
import { theme } from '../../../common/theme'
import { relativeScreenHeight, relativeScreenWidth } from '../../../common/screenDimensions'
import Logo from '../../../assets/icons/logo.svg'
import CheckWhiteIcon from '../../../assets/icons/check-white.svg'

import { AcceptAndContinueScreenProps } from '../../../routes/Stack/AuthRegisterStack/stackScreenProps'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { TermsOfServiceModal } from '../../../components/_modals/TermsOfServiceModal'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { CustomCarousel } from '../../../components/CustomCarousel'
import { InstructionCard } from '../../../components/_cards/InstructionCard'

const presentationTexts = [
	'rede social, de verdade',
	'aqui você pode postar e encontrar de tudo, seu trabalho, comércio, cultura e iniciativa social  no seu bairro, cidade e país!',
	'além disso, quando você usa e assina o corre., você ajuda nossa organização a digitalizar pessoas em estado de vulnerabilidade ajudando elas a gerarem mais renda cultura e cidadania!',
]

function AcceptAndContinue({ navigation }: AcceptAndContinueScreenProps) {
	const [termsVisibility, setTermsVisibility] = useState<boolean>(false)

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

	const showTermsOfServiceModal = () => {
		setTermsVisibility(true)
	}

	const hideTermsOfServiceModal = () => {
		setTermsVisibility(false)
	}

	const navigateToInsertPhoneScreen = () => {
		navigation.navigate('InsertCellNumber', { authByWhatsapp: false })
	}

	return (
		<Container>
			<StatusBar backgroundColor={theme.orange3} barStyle={'dark-content'} />
			<TermsOfServiceModal visibility={termsVisibility} closeModal={hideTermsOfServiceModal} />
			<DefaultHeaderContainer relativeHeight={'55%'} backgroundColor={theme.orange3} withoutPadding>
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
			<TermsButtonContainer>
				<TermsLabel>
					{'ao clicar em "aceitar e continuar" você aceita com os'}
					<TermsLabelHighlight onPress={showTermsOfServiceModal}>
						{' '}
						{'termos de serviço e privacidade'}
						{' '}
					</TermsLabelHighlight>
					{'do corre.social'}
				</TermsLabel>
				<PrimaryButton
					label={'aceitar e continuar'}
					SecondSvgIcon={CheckWhiteIcon}
					labelColor={theme.white3}
					color={theme.green3}
					highlightedWords={['aceitar', 'continuar']}
					onPress={navigateToInsertPhoneScreen}
				/>
			</TermsButtonContainer>
		</Container>
	)
}

export { AcceptAndContinue }
