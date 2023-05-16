import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { ButtonsContainer, Container } from './styles'
import { theme } from '../../../common/theme'

import { SelectEventPlaceModalityScreenProps } from '../../../routes/Stack/CultureStack/stackScreenProps'
import { PlaceModalityType } from '../../../services/firebase/types'

import { CultureContext } from '../../../contexts/CultureContext'
import { EditContext } from '../../../contexts/EditContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { BackButton } from '../../../components/_buttons/BackButton'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { ProgressBar } from '../../../components/ProgressBar'

function SelectEventPlaceModality({ route, navigation }: SelectEventPlaceModalityScreenProps) {
	const { setCultureDataOnContext } = useContext(CultureContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const saveEventPlaceModality = (eventPlaceModality: PlaceModalityType) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ eventPlaceModality })
			navigation.goBack()
		}

		setCultureDataOnContext({ eventPlaceModality })
		navigation.navigate('SelectCultureRange')
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
					message={'onde esse role vai acontecer?'}
					highlightedWords={['onde']}
				>
					<ProgressBar
						range={4}
						value={2}
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
						relativeHeight={'18%'}
						labelColor={theme.black4}
						labelMarginLeft={'5%'}
						fontSize={18}
						textAlign={'left'}
						label={'presencial'}
						highlightedWords={['presencial']}
						onPress={() => saveEventPlaceModality('presential')}
					/>
					<PrimaryButton
						justifyContent={'flex-start'}
						color={theme.white3}
						relativeHeight={'18%'}
						labelColor={theme.black4}
						labelMarginLeft={'5%'}
						fontSize={18}
						textAlign={'left'}
						label={'presencial + online'}
						highlightedWords={['presencial', '+', 'online']}
						onPress={() => saveEventPlaceModality('both')}
					/>
					<PrimaryButton
						justifyContent={'flex-start'}
						color={theme.white3}
						relativeHeight={'18%'}
						labelColor={theme.black4}
						labelMarginLeft={'5%'}
						fontSize={18}
						textAlign={'left'}
						label={'online'}
						highlightedWords={['online']}
						onPress={() => saveEventPlaceModality('online')}
					/>
				</ButtonsContainer>
			</FormContainer>
		</Container>
	)
}

export { SelectEventPlaceModality }
