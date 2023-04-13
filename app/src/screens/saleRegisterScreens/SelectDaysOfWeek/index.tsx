import React, { useContext, useState } from 'react'
import { StatusBar } from 'react-native'

import {
	Container,
	FloatButtonContainer,
	Row,
	WeekdaysSelectedArea
} from './styles'
import { theme } from '../../../common/theme'
import { relativeScreenHeight, relativeScreenWidth } from '../../../common/screenDimensions'
import CheckWhiteIcon from '../../../assets/icons/check-white.svg'
import DeniedWhiteIcon from '../../../assets/icons/denied-white.svg'

import { SelectDaysOfWeekScreenProps } from '../../../routes/Stack/saleStack/stackScreenProps'
import { DaysOfWeek } from '../../../services/firebase/types'

import { SaleContext } from '../../../contexts/SaleContext'
import { EditContext } from '../../../contexts/EditContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { SelectButtonsContainer } from '../../../components/_containers/SelectButtonsContainer'
import { SelectButton } from '../../../components/_buttons/SelectButton'
import { BackButton } from '../../../components/_buttons/BackButton'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { ProgressBar } from '../../../components/ProgressBar'

function SelectDaysOfWeek({ route, navigation }: SelectDaysOfWeekScreenProps) {
	const { setSaleDataOnContext } = useContext(SaleContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const [selectedDays, setSelectedDays] = useState<DaysOfWeek[]>(route.params?.initialValue || [])
	const daysOfWeek = ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'] as DaysOfWeek[]

	const renderDaysOfWeek = () => daysOfWeek.map((dayOfWeek, index) => {
		if (dayOfWeek === 'dom') {
			return (
				<Row key={dayOfWeek}>
					<SelectButton
						width={relativeScreenWidth(41)}
						height={relativeScreenHeight(11)}
						marginVertical={10}
						label={dayOfWeek}
						fontSize={24}
						backgroundSelected={theme.green1}
						selected={selectedDays.includes(dayOfWeek)}
						onSelect={() => onSelectDay(dayOfWeek)}
					/>
				</Row>
			)
		}

		return (
			<SelectButton
				key={dayOfWeek}
				width={relativeScreenWidth(41)}
				height={relativeScreenHeight(11)}
				marginVertical={10}
				label={dayOfWeek}
				fontSize={24}
				backgroundSelected={theme.green1}
				selected={selectedDays.includes(dayOfWeek)}
				onSelect={() => onSelectDay(dayOfWeek)}
			/>
		)
	})

	const onSelectDay = (dayOfWeek: DaysOfWeek) => {
		const selectedDaysOfWeek = [...selectedDays]
		if (selectedDays.includes(dayOfWeek)) {
			const selectedDaysFiltred = selectedDaysOfWeek.filter((day) => day !== dayOfWeek)
			setSelectedDays(selectedDaysFiltred)
		} else {
			selectedDaysOfWeek.push(dayOfWeek)
			setSelectedDays(selectedDaysOfWeek)
		}
	}

	const saveDaysOfWeek = () => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ attendanceWeekDays: selectedDays })
			navigation.goBack()
			return
		}

		setSaleDataOnContext({ attendanceWeekDays: selectedDays })
		navigation.navigate('InsertOpeningHour')
	}

	const skipScreen = () => {
		navigation.navigate('InsertOpeningHour')
	}

	const editModeIsTrue = () => route.params && route.params.editMode

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
					message={'que dias da semana?'}
					highlightedWords={['que', 'dias']}
				>
					<ProgressBar
						range={5}
						value={5}
					/>
				</InstructionCard>
			</DefaultHeaderContainer>
			<SelectButtonsContainer
				backgroundColor={theme.green2}
			>
				<WeekdaysSelectedArea>
					{renderDaysOfWeek()}
				</WeekdaysSelectedArea>
			</SelectButtonsContainer>
			{
				selectedDays.length
					? (
						<FloatButtonContainer>
							<PrimaryButton
								flexDirection={'row-reverse'}
								color={theme.green3}
								label={'continuar'}
								labelColor={theme.white3}
								SvgIcon={CheckWhiteIcon}
								svgIconScale={['40%', '25%']}
								onPress={saveDaysOfWeek}
							/>
						</FloatButtonContainer>
					)
					: (
						<FloatButtonContainer>
							<PrimaryButton
								flexDirection={'row-reverse'}
								color={theme.yellow3}
								label={'pular'}
								highlightedWords={['pular']}
								labelColor={theme.black4}
								SecondSvgIcon={DeniedWhiteIcon}
								svgIconScale={['40%', '18%']}
								onPress={skipScreen}
							/>
						</FloatButtonContainer>
					)
			}
		</Container >
	)
}

export { SelectDaysOfWeek }
