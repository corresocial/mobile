import React from 'react'
import { StatusBar } from 'react-native'

import { PrivacyAndSecurityScreenProps } from '@routes/Stack/ProfileStack/screenProps'

import { Container } from './styles'
import { theme } from '@common/theme'

import { BackButton } from '@components/_buttons/BackButton'
import { InstructionCard } from '@components/_cards/InstructionCard'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { HorizontalSpacing } from '@components/_space/HorizontalSpacing'
import { TermsOfService } from '@components/TermsOfService'

function PrivacyAndSecurity({ navigation }: PrivacyAndSecurityScreenProps) {
	return (
		<Container>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				relativeHeight={'18%'}
				centralized
				backgroundColor={theme.white3}
			>
				<BackButton onPress={() => navigation.goBack()} />
				<HorizontalSpacing />
				<InstructionCard
					fontSize={15}
					message={'privacidade e segurança'}
					highlightedWords={['privacidade', 'segurança']}
				/>
			</DefaultHeaderContainer>
			<TermsOfService
				calledFromConfig
				onPress={() => navigation.navigate('UserDataConfigurations')}
			/>
		</Container>
	)
}

export { PrivacyAndSecurity }
