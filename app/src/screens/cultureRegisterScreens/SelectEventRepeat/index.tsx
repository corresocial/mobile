import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { Container, ButtonsContainer } from './styles'
import { theme } from '../../../common/theme'

import { SelectEventRepeatScreenProps } from '../../../routes/Stack/cultureStack/stackScreenProps'
import { EventRepeatType } from '../../../services/firebase/types'

import { CultureContext } from '../../../contexts/CultureContext'
import { EditContext } from '../../../contexts/EditContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { BackButton } from '../../../components/_buttons/BackButton'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { ProgressBar } from '../../../components/ProgressBar'

function SelectEventRepeat({ route, navigation }: SelectEventRepeatScreenProps) {
	const { setCultureDataOnContext } = useContext(CultureContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const saveEventRepeat = async (eventRepeat: EventRepeatType) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ eventRepeat })
			navigation.goBack()
			return
		}

		setCultureDataOnContext({ eventRepeat })
		navigation.navigate('InsertEventStartDate')
	}

	const editModeIsTrue = () => route.params && route.params.editMode

	return (
		<Container>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				relativeHeight={'25%'}
				centralized
				backgroundColor={theme.white3}
			>
				<BackButton onPress={() => navigation.goBack()} />
				<InstructionCard
					borderLeftWidth={3}
					fontSize={18}
					message={'esse role se repete?'}
					highlightedWords={['repete']}
				>
					<ProgressBar
						range={5}
						value={4}
					/>
				</InstructionCard>
			</DefaultHeaderContainer>
			<FormContainer
				backgroundColor={theme.blue2}
			>
				<ButtonsContainer>
					<PrimaryButton
						justifyContent={'flex-start'}
						color={theme.white3}
						relativeHeight={'16%'}
						labelColor={theme.black4}
						fontSize={18}
						textAlign={'left'}
						label={'1 vez por semana'}
						highlightedWords={['1', 'vez', 'por', 'semana']}
						onPress={() => saveEventRepeat('weekly')}
					/>
					<PrimaryButton
						justifyContent={'flex-start'}
						color={theme.white3}
						relativeHeight={'16%'}
						labelColor={theme.black4}
						fontSize={18}
						textAlign={'left'}
						label={'todos os dias'}
						highlightedWords={['todos', 'os', 'dias']}
						onPress={() => saveEventRepeat('everyDay')}
					/>
					<PrimaryButton
						justifyContent={'flex-start'}
						color={theme.white3}
						relativeHeight={'16%'}
						labelColor={theme.black4}
						fontSize={18}
						textAlign={'left'}
						label={'a cada 15 dias'}
						highlightedWords={['a', 'cada', '15', 'dias']}
						onPress={() => saveEventRepeat('biweekly')}
					/>
					<PrimaryButton
						justifyContent={'flex-start'}
						color={theme.white3}
						relativeHeight={'16%'}
						labelColor={theme.black4}
						fontSize={18}
						textAlign={'left'}
						label={'1 vez no mês'}
						highlightedWords={['1', 'vez', 'no', 'mês']}
						onPress={() => saveEventRepeat('monthly')}
					/>
					<PrimaryButton
						justifyContent={'flex-start'}
						color={theme.white3}
						relativeHeight={'16%'}
						labelColor={theme.black4}
						fontSize={18}
						textAlign={'left'}
						label={'não se repete'}
						highlightedWords={['não', 'se', 'repete']}
						onPress={() => saveEventRepeat('unrepeatable')}
					/>
				</ButtonsContainer>
			</FormContainer>
		</Container>
	)
}

export { SelectEventRepeat }
