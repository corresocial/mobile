import React from 'react'
import { StatusBar } from 'react-native'

import { Container } from './styles'
import { theme } from '../../../common/theme'

import { PrivacyAndSecurityScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { TermsOfService } from '../../../components/TermsOfService'
import { BackButton } from '../../../components/_buttons/BackButton'
import { VerticalSpacing } from '../../../components/_space/VerticalSpacing'

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
				<VerticalSpacing />
				<InstructionCard
					borderLeftWidth={3}
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
