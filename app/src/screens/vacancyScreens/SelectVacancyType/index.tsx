import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { ButtonsContainer, Container } from './styles'
import { theme } from '../../../common/theme'

import { SelectVacancyTypeScreenProps } from '../../../routes/Stack/vacancyStack/stackScreenProps'
import { VacancyType } from '../../../services/firebase/types'

import { VacancyContext } from '../../../contexts/VacancyContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { BackButton } from '../../../components/_buttons/BackButton'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { ProgressBar } from '../../../components/ProgressBar'

function SelectVacancyType({ navigation }: SelectVacancyTypeScreenProps) {
	const { setVacancyDataOnContext } = useContext(VacancyContext)

	const saveVacancyType = (vacancyType: VacancyType) => {
		setVacancyDataOnContext({
			vacancyType
		})
		switch (vacancyType) {
			case 'professional': {
				navigation.navigate('SelectWorkWeekdays')
				break
			}
			case 'temporary': {
				navigation.navigate('InsertWorkStartDate')
				break
			}
			case 'beak': {
				navigation.navigate('InsertWorkStartDate')
				break
			}
			default: return false
		}
	}

	return (
		<Container>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				relativeHeight={'28%'}
				centralized
				backgroundColor={theme.white3}
			>
				<BackButton onPress={() => navigation.goBack()} />
				<InstructionCard
					borderLeftWidth={3}
					fontSize={18}
					message={'que tipo de vaga?'}
					highlightedWords={['tipo', 'vaga']}
				>
					<ProgressBar
						range={5}
						value={4}
					/>
				</InstructionCard>
			</DefaultHeaderContainer>
			<FormContainer
				backgroundColor={theme.yellow2}
			>
				<ButtonsContainer>
					<PrimaryButton
						justifyContent={'flex-start'}
						color={theme.white3}
						relativeHeight={'18%'}
						labelColor={theme.black4}
						labelMarginLeft={'5%'}
						fontSize={18}
						textAlign={'left'}
						label={'vaga profissional'}
						highlightedWords={['profissional']}
						onPress={() => saveVacancyType('professional')}
					/>
					<PrimaryButton
						justifyContent={'flex-start'}
						color={theme.white3}
						relativeHeight={'18%'}
						labelColor={theme.black4}
						labelMarginLeft={'5%'}
						fontSize={18}
						textAlign={'left'}
						label={'vaga temporária'}
						highlightedWords={['temporária']}
						onPress={() => saveVacancyType('temporary')}
					/>
					<PrimaryButton
						justifyContent={'flex-start'}
						color={theme.white3}
						relativeHeight={'18%'}
						labelColor={theme.black4}
						labelMarginLeft={'5%'}
						fontSize={18}
						textAlign={'left'}
						label={'um bico'}
						highlightedWords={['bico']}
						onPress={() => saveVacancyType('beak')}
					/>
				</ButtonsContainer>
			</FormContainer>
		</Container>
	)
}

export { SelectVacancyType }
