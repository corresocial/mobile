import React from 'react'
import { Linking } from 'react-native'

import { Container, LinkButtonsContainer } from './styles'
import DescriptionWhiteIcon from '@assets/icons/description-white.svg'
import PlusWhiteIcon from '@assets/icons/plus-white.svg'
import XWhiteIcon from '@assets/icons/x-white.svg'
import { theme } from '@common/theme'

import { PrimaryButton } from '@components/_buttons/PrimaryButton'

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
					color={theme.colors.white[3]}
					label={'termos de serviço'}
					fontSize={16}
					highlightedWords={['termos', 'de', 'serviço']}
					labelColor={theme.colors.black[4]}
					SvgIcon={PlusWhiteIcon}
					justifyContent={'space-between'}
					onPress={() => redirectToUrl('https://docs.google.com/document/d/1NxrbFcgwlcGNiV4jOW5o-cH8F2O7uUTW/edit#')}
				/>
				<PrimaryButton
					color={theme.colors.white[3]}
					label={'termos de privacidade'}
					fontSize={16}
					highlightedWords={['termos', 'privacidade']}
					labelColor={theme.colors.black[4]}
					SvgIcon={PlusWhiteIcon}
					justifyContent={'space-between'}
					onPress={() => redirectToUrl('https://docs.google.com/document/d/1-QjzWFDoXSghCz35CkSq6akro0DX-E_2/edit#')}
				/>
			</LinkButtonsContainer>
			{
				calledFromConfig ? (
					<PrimaryButton
						color={theme.colors.red[3]}
						label={'meus dados'}
						fontSize={16}
						highlightedWords={['meus', 'dados']}
						justifyContent={'space-between'}
						labelColor={theme.colors.white[3]}
						SvgIcon={DescriptionWhiteIcon}
						onPress={onPress}
					/>
				) : (
					<PrimaryButton
						color={theme.colors.red[3]}
						label={'fechar'}
						fontSize={16}
						highlightedWords={['fechar']}
						justifyContent={'space-between'}
						labelColor={theme.colors.white[3]}
						SvgIcon={XWhiteIcon}
						onPress={onPress}
					/>
				)

			}
		</Container>
	)
}

export { TermsOfService }
