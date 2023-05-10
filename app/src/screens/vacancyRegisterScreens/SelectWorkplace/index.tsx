import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { ButtonsContainer, Container } from './styles'
import { theme } from '../../../common/theme'
import ShopWhiteIcon from '../../../assets/icons/shop-white.svg'
import ComputerAndPhoneWhiteIcon from '../../../assets/icons/computerAndPhone-white.svg'

import { relativeScreenHeight } from '../../../common/screenDimensions'

import { SelectWorkplaceScreenProps } from '../../../routes/Stack/VacancyStack/stackScreenProps'
import { WorkplaceType } from '../../../services/firebase/types'

import { VacancyContext } from '../../../contexts/VacancyContext'
import { EditContext } from '../../../contexts/EditContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { BackButton } from '../../../components/_buttons/BackButton'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { ProgressBar } from '../../../components/ProgressBar'

function SelectWorkplace({ route, navigation }: SelectWorkplaceScreenProps) {
	const { isSecondPost, setVacancyDataOnContext } = useContext(VacancyContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const saveWorkplaceType = (workplace: WorkplaceType) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({
				workplace,
				location: { country: 'Brasil', city: 'any' }
			})
			navigation.goBack()
			return
		}

		setVacancyDataOnContext({
			workplace,
			location: { country: 'Brasil', city: 'any' }
		})

		navigation.navigate('SelectVacancyType')
	}

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	return (
		<Container>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				minHeight={relativeScreenHeight(24)}
				relativeHeight={relativeScreenHeight(24)}
				centralized
				backgroundColor={theme.white3}
			>
				<BackButton onPress={() => navigation.goBack()} />
				<InstructionCard
					borderLeftWidth={3}
					fontSize={17}
					message={'qual é o local de trabalho?'}
					highlightedWords={['local,', 'de', 'trabalho']}
				>
					<ProgressBar
						value={2}
						range={isSecondPost ? 3 : 5}
					/>
				</InstructionCard>
			</DefaultHeaderContainer>
			<FormContainer
				backgroundColor={theme.yellow2}
			>
				<ButtonsContainer>
					<PrimaryButton
						justifyContent={'space-around'}
						color={theme.white3}
						relativeHeight={'18%'}
						labelColor={theme.black4}
						fontSize={18}
						SecondSvgIcon={ShopWhiteIcon}
						textAlign={'left'}
						label={'vaga presencial'}
						highlightedWords={['presencial']}
						onPress={() => saveWorkplaceType('presential')}
					/>
					<PrimaryButton
						justifyContent={'space-around'}
						color={theme.white3}
						relativeHeight={'18%'}
						labelColor={theme.black4}
						fontSize={18}
						SecondSvgIcon={ComputerAndPhoneWhiteIcon}
						textAlign={'left'}
						label={'vaga homeoffice'}
						highlightedWords={['homeoffice']}
						onPress={() => saveWorkplaceType('homeoffice')}
					/>
					<PrimaryButton
						justifyContent={'space-around'}
						color={theme.white3}
						relativeHeight={'18%'}
						labelColor={theme.black4}
						fontSize={18}
						SvgIcon={ComputerAndPhoneWhiteIcon}
						SecondSvgIcon={ShopWhiteIcon}
						textAlign={'left'}
						label={'vaga híbrida'}
						highlightedWords={['híbrida']}
						onPress={() => saveWorkplaceType('hybrid')}
					/>
				</ButtonsContainer>
			</FormContainer>
		</Container>
	)
}

export { SelectWorkplace }
