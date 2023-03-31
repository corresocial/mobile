import React from 'react'
import { Linking } from 'react-native'

import { theme } from '@common/theme'
import { Container, LinkButtonsContainer } from './styles'

import { PrimaryButton } from '../_buttons/PrimaryButton'

interface TermsOfServiceProps {
	onPress: () => void;
}

function TermsOfService({ onPress }: TermsOfServiceProps) {
	const redirectToUrl = (url: string) => {
		Linking.openURL(url)
	}

	return (
		<Container>
			<LinkButtonsContainer>
				<PrimaryButton
					color={theme.white3}
					label={'termos de serviço'}
					fontSize={16}
					highlightedWords={['termos', 'de', 'serviço']}
					labelColor={theme.black4}
					iconName={'plus'}
					iconSize={22}
					justifyContent={'space-between'}
					onPress={() => redirectToUrl(
						'https://docs.google.com/document/d/1NxrbFcgwlcGNiV4jOW5o-cH8F2O7uUTW/edit#'
					)}
				/>
				<PrimaryButton
					color={theme.white3}
					label={'termos de privacidade'}
					fontSize={16}
					highlightedWords={['termos', 'privacidade']}
					labelColor={theme.black4}
					iconName={'plus'}
					iconSize={22}
					justifyContent={'space-between'}
					onPress={() => redirectToUrl(
						'https://docs.google.com/document/d/1-QjzWFDoXSghCz35CkSq6akro0DX-E_2/edit#'
					)}
				/>
			</LinkButtonsContainer>
			<PrimaryButton
				color={theme.red3}
				label={'fechar'}
				fontSize={18}
				highlightedWords={['fechar']}
				labelColor={theme.white3}
				iconName={'window-close'}
				iconSize={20}
				onPress={onPress}
			/>
		</Container>
	)
}

export { TermsOfService }
