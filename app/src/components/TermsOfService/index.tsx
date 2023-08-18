import React from 'react'
import { Linking } from 'react-native'

import { theme } from '../../common/theme'
import { Container, LinkButtonsContainer } from './styles'
import PlusWhiteIcon from '../../assets/icons/plusTabIconInactive.svg'
import DescriptionWhiteIcon from '../../assets/icons/description-white.svg'
import XWhiteIcon from '../../assets/icons/x-white.svg'

import { PrimaryButton } from '../_buttons/PrimaryButton'

interface TermsOfServiceProps {
	calledFromConfig?: boolean
	onPress: () => void
}

function TermsOfService({ calledFromConfig, onPress }: TermsOfServiceProps) {
	const redirectToUrl = (url: string) => {
		Linking.openURL(url)
	}

	return (
		<Container calledFromConfig={calledFromConfig}>
			<LinkButtonsContainer>
				<PrimaryButton
					color={theme.white3}
					label={'termos de serviço'}
					fontSize={16}
					highlightedWords={['termos', 'de', 'serviço']}
					labelColor={theme.black4}
					SvgIcon={PlusWhiteIcon}
					justifyContent={'space-between'}
					onPress={() => redirectToUrl('https://docs.google.com/document/d/1NxrbFcgwlcGNiV4jOW5o-cH8F2O7uUTW/edit#')}
				/>
				<PrimaryButton
					color={theme.white3}
					label={'termos de privacidade'}
					fontSize={16}
					highlightedWords={['termos', 'privacidade']}
					labelColor={theme.black4}
					SvgIcon={PlusWhiteIcon}
					justifyContent={'space-between'}
					onPress={() => redirectToUrl('https://docs.google.com/document/d/1-QjzWFDoXSghCz35CkSq6akro0DX-E_2/edit#')}
				/>
			</LinkButtonsContainer>
			{
				calledFromConfig ? (
					<PrimaryButton
						color={theme.red3}
						label={'meus dados'}
						fontSize={16}
						highlightedWords={['meus', 'dados']}
						justifyContent={'space-between'}
						labelColor={theme.white3}
						SvgIcon={DescriptionWhiteIcon}
						onPress={onPress}
					/>
				) : (
					<PrimaryButton
						color={theme.red3}
						label={'fechar'}
						fontSize={16}
						highlightedWords={['fechar']}
						justifyContent={'space-between'}
						labelColor={theme.white3}
						SvgIcon={XWhiteIcon}
						onPress={onPress}
					/>
				)

			}
		</Container>
	)
}

export { TermsOfService }
