import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { ButtonsContainer, Container } from './styles'
import { theme } from '../../../common/theme'
import UsedLabelWhiteIcon from '../../../assets/icons/usedLabel-white.svg'
import GiftWhiteIcon from '../../../assets/icons/gift-white.svg'

import { SelectItemStatusScreenProps } from '../../../routes/Stack/SaleStack/stackScreenProps'
import { ItemStatus } from '../../../services/firebase/types'

import { SaleContext } from '../../../contexts/SaleContext'
import { EditContext } from '../../../contexts/EditContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { BackButton } from '../../../components/_buttons/BackButton'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { ProgressBar } from '../../../components/ProgressBar'
import { relativeScreenHeight } from '../../../common/screenDimensions'

function SelectItemStatus({ route, navigation }: SelectItemStatusScreenProps) {
	const { setSaleDataOnContext } = useContext(SaleContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const saveItemStatus = (itemStatus: ItemStatus) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ itemStatus })
			navigation.goBack()
			return
		}

		setSaleDataOnContext({ itemStatus })
		navigation.navigate('InsertSaleTitle')
	}

	return (
		<Container>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				relativeHeight={relativeScreenHeight(24)}
				centralized
				backgroundColor={theme.white3}
			>
				<BackButton onPress={() => navigation.goBack()} />
				<InstructionCard
					borderLeftWidth={3}
					fontSize={17}
					message={'você vende, aceita troca ou os dois?'}
					highlightedWords={['vende', 'aceita', 'troca', 'os', 'dois']}
				>
					<ProgressBar
						range={5}
						value={2}
					/>
				</InstructionCard>
			</DefaultHeaderContainer>
			<FormContainer
				backgroundColor={theme.green2}
			>
				<ButtonsContainer>
					<PrimaryButton
						flexDirection={'row-reverse'}
						justifyContent={'space-around'}
						color={theme.white3}
						relativeHeight={'21%'}
						labelColor={theme.black4}
						fontSize={20}
						label={'item usado'}
						highlightedWords={['usado']}
						SvgIcon={UsedLabelWhiteIcon}
						svgIconScale={['50%', '18%']}
						onPress={() => saveItemStatus('used')}
					/>
					<PrimaryButton
						flexDirection={'row-reverse'}
						justifyContent={'space-around'}
						color={theme.white3}
						relativeHeight={'21%'}
						labelColor={theme.black4}
						fontSize={20}
						label={'item novo'}
						highlightedWords={['novo']}
						SvgIcon={GiftWhiteIcon}
						svgIconScale={['50%', '18%']}
						onPress={() => saveItemStatus('new')}
					/>
				</ButtonsContainer>
			</FormContainer>
		</Container>
	)
}

export { SelectItemStatus }
