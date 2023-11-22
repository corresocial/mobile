import React from 'react'
import { StatusBar } from 'react-native'

import { RFValue } from 'react-native-responsive-fontsize'
import { Container, InstructionButtonContainer } from './styles'
import { theme } from '../../../common/theme'
import CheckWhiteIcon from '../../../assets/icons/check-white.svg'

import { BackButton } from '../../../components/_buttons/BackButton'
import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { VerticalSpacing } from '../../../components/_space/VerticalSpacing'
import { LinkingAccountResultScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'

function LinkingAccountResult({ route, navigation }: LinkingAccountResultScreenProps) {
	const { accountIdentifier, wasLinked } = route.params

	const navigateBackwards = () => {
		if (accountIdentifier?.includes('+55') && wasLinked) {
			navigation.goBack()
			navigation.goBack()
			navigation.goBack()
			return
		}

		navigation.goBack()
	}
	const getAccountIdentifierLinked = () => {
		if (!accountIdentifier) return ''

		if (accountIdentifier?.includes('+55')) {
			const numbetWithoutCountryCode = accountIdentifier.slice(3)
			const numberWithDDDSpace = `${numbetWithoutCountryCode.slice(0, 2)} ${numbetWithoutCountryCode.slice(2)}`
			return numberWithDDDSpace
		}

		return accountIdentifier
	}

	return (
		<Container>
			<StatusBar backgroundColor={theme.orange2} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				relativeHeight={'55%'}
				flexDirection={'column'}
				centralized
				backgroundColor={theme.orange2}
			>
				<InstructionButtonContainer>
					<BackButton onPress={navigateBackwards} />
					<InstructionCard
						message={`conta ${wasLinked ? 'vinculada' : 'desvinculada'} com sucesso!`}
						highlightedWords={['vinculada', 'desvinculada', 'com', 'sucesso!']}
						fontSize={16}
					/>
				</InstructionButtonContainer>
				<VerticalSpacing />
				{
					accountIdentifier
						? (
							<InstructionButtonContainer withPaddingLeft>
								<InstructionCard
									fontSize={16}
									borderLeftWidth={RFValue(4)}
									message={getAccountIdentifierLinked()}
									highlightedWords={getAccountIdentifierLinked().split(' ')}

								>
									{/* <SmartphoneWhiteIcon width={50} height={50} /> */}
								</InstructionCard>
							</InstructionButtonContainer>
						)
						: <></>
				}
			</DefaultHeaderContainer>
			<FormContainer>
				<PrimaryButton
					color={theme.green3}
					label={'continuar'}
					labelColor={theme.white3}
					SecondSvgIcon={CheckWhiteIcon}
					onPress={navigateBackwards}
				/>
			</FormContainer>
		</Container>
	)
}

export { LinkingAccountResult }
