import React, { useEffect, useState } from 'react'
import { BackHandler, StatusBar } from 'react-native'

import { AcceptTermsAndConditionsScreenProps } from '@routes/Stack/AuthRegisterStack/screenProps'

import {
	Container,
	TermsButtonContainer,
	TermsLabel,
	TermsLabelHighlight
} from './styles'
import CheckWhiteIcon from '@assets/icons/check-white.svg'
import { theme } from '@common/theme'

import { BackButton } from '@components/_buttons/BackButton'
import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { InstructionCard } from '@components/_cards/InstructionCard'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { TermsOfServiceModal } from '@components/_modals/TermsOfServiceModal'

function AcceptTermsAndConditions({ navigation }: AcceptTermsAndConditionsScreenProps) {
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

	const navigateToSelectRegisterMethod = () => {
		navigation.navigate('SelectAuthMethod', { newUser: true })
	}

	const navigateBackwards = () => navigation.goBack()

	return (
		<Container>
			<StatusBar backgroundColor={theme.purple2} barStyle={'dark-content'} />
			<TermsOfServiceModal visibility={termsVisibility} closeModal={hideTermsOfServiceModal} />
			<DefaultHeaderContainer
				relativeHeight={'50%'}
				centralized
				backgroundColor={theme.purple2}
			>
				<BackButton onPress={navigateBackwards} />
				<InstructionCard
					message={'termos de serviço \ne privacidade'}
					highlightedWords={['serviço', 'privacidade']}
					fontSize={16}
				/>
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
					onPress={navigateToSelectRegisterMethod}
				/>
			</TermsButtonContainer>
		</Container>
	)
}

export { AcceptTermsAndConditions }
