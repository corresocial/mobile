import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { Container, ButtonsContainer } from './styles'
import { theme } from '../../../common/theme'

import { SelectDeliveryMethodScreenProps } from '../../../routes/Stack/ServiceStack/stackScreenProps'
import { DeliveryMethod } from '../../../services/firebase/types'

import { ServiceContext } from '../../../contexts/ServiceContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { BackButton } from '../../../components/_buttons/BackButton'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { ProgressBar } from '../../../components/ProgressBar'

function SelectDeliveryMethod({ navigation }: SelectDeliveryMethodScreenProps) {
	const { setServiceDataOnContext } = useContext(ServiceContext)

	const saveDeliveryMethod = (deliveryMethod: DeliveryMethod) => {
		setServiceDataOnContext({
			deliveryMethod
		})
		navigation.navigate('SelectServiceFrequency')
	}

	return (
		<Container>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				relativeHeight={'27%'}
				centralized
				backgroundColor={theme.white3}
			>
				<BackButton onPress={() => navigation.goBack()} />
				<InstructionCard
					borderLeftWidth={3}
					fontSize={18}
					message={'você entrega seu serviço?'}
					highlightedWords={['entrega', 'seu', 'serviço']}
				>
					<ProgressBar
						range={5}
						value={5}
					/>
				</InstructionCard>
			</DefaultHeaderContainer>
			<FormContainer
				backgroundColor={theme.purple2}
			>
				<ButtonsContainer>
					<PrimaryButton
						justifyContent={'flex-start'}
						color={theme.white3}
						relativeHeight={'18%'}
						labelColor={theme.black4}
						fontSize={18}
						textAlign={'left'}
						label={'não entrego'}
						highlightedWords={['não']}
						onPress={() => saveDeliveryMethod('unavailable')}
					/>
					<PrimaryButton
						justifyContent={'flex-start'}
						color={theme.white3}
						relativeHeight={'18%'}
						labelColor={theme.black4}
						fontSize={18}
						textAlign={'left'}
						label={'entrego perto de mim'}
						highlightedWords={['perto', 'de', 'mim']}
						onPress={() => saveDeliveryMethod('near')}
					/>
					<PrimaryButton
						justifyContent={'flex-start'}
						color={theme.white3}
						relativeHeight={'18%'}
						labelColor={theme.black4}
						fontSize={18}
						textAlign={'left'}
						label={'entrego na cidade'}
						highlightedWords={['na', 'cidade']}
						onPress={() => saveDeliveryMethod('city')}
					/>
					<PrimaryButton
						justifyContent={'flex-start'}
						color={theme.white3}
						relativeHeight={'18%'}
						labelColor={theme.black4}
						fontSize={18}
						textAlign={'left'}
						label={'entrego no brasil inteiro'}
						highlightedWords={['brasil', 'inteiro']}
						onPress={() => saveDeliveryMethod('country')}
					/>
				</ButtonsContainer>
			</FormContainer>
		</Container>
	)
}

export { SelectDeliveryMethod }
