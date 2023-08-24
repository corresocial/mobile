import React, { useState } from 'react'
import { StatusBar } from 'react-native'

import {
	Container,
	FloatButtonContainer,
	Row,
	WeekdaysSelectedArea
} from './styles'
import { theme } from '../../../common/theme'
import { relativeScreenHeight } from '../../../common/screenDimensions'
import DeniedWhiteIcon from '../../../assets/icons/denied-white.svg'
import CheckWhiteIcon from '../../../assets/icons/check-white.svg'
import XBoldIcon from '../../../assets/icons/x-bold.svg'

import { DaysOfWeek } from '../../../services/firebase/types'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { SelectButtonsContainer } from '../../../components/_containers/SelectButtonsContainer'
import { SelectButton } from '../../../components/_buttons/SelectButton'
import { BackButton } from '../../../components/_buttons/BackButton'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { ProgressBar } from '../../../components/ProgressBar'

interface PostDaysOfWeekProps {
	backgroundColor: string
	validationColor: string
	progress: [value: number, range: number]
	initialValue?: DaysOfWeek[]
	navigateBackwards: () => void
	skipScreen?: () => void
	savePostDaysOfWeek: (daysSelected: DaysOfWeek[]) => void
}

function PostDaysOfWeek({
	backgroundColor,
	validationColor,
	progress,
	initialValue,
	navigateBackwards,
	skipScreen,
	savePostDaysOfWeek
}: PostDaysOfWeekProps) {
	const [selectedDays, setSelectedDays] = useState<DaysOfWeek[]>(initialValue || [])
	const daysOfWeek = ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'] as DaysOfWeek[]

	const getDayOfWeekLabel = (dayOfWeek: DaysOfWeek) => {
		switch (dayOfWeek) {
			case 'seg': return 'segunda'
			case 'ter': return 'terça'
			case 'qua': return 'quarta'
			case 'qui': return 'quinta'
			case 'sex': return 'sexta'
			case 'sab': return 'sábado'
			case 'dom': return 'domingo'
			default: return 'nenhum'
		}
	}

	const renderDaysOfWeek = () => daysOfWeek.map((dayOfWeek, index) => {
		if (dayOfWeek === 'dom') {
			return (
				<Row key={dayOfWeek}>
					<SelectButton
						width={'100%'}
						height={relativeScreenHeight(11)}
						marginVertical={10}
						label={getDayOfWeekLabel(dayOfWeek)}
						flexSelected={0}
						fontSize={16}
						backgroundSelected={validationColor}
						selected={selectedDays.includes(dayOfWeek)}
						SvgIcon={selectedDays.includes(dayOfWeek) ? XBoldIcon : null}
						svgIconScale={['20%', '10%']}
						onSelect={() => onSelectDay(dayOfWeek)}
					/>
				</Row>
			)
		}

		return (
			<SelectButton
				key={dayOfWeek}
				width={'45%'}
				height={relativeScreenHeight(11)}
				marginVertical={10}
				label={getDayOfWeekLabel(dayOfWeek)}
				fontSize={16}
				backgroundSelected={validationColor}
				selected={selectedDays.includes(dayOfWeek)}
				SvgIcon={selectedDays.includes(dayOfWeek) ? XBoldIcon : null}
				svgIconScale={['20%', '10%']}
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

	return (
		<Container>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				relativeHeight={relativeScreenHeight(24)}
				centralized
				backgroundColor={theme.white3}
			>
				<BackButton onPress={navigateBackwards} />
				<InstructionCard
					fontSize={16}
					message={'que dias da semana?'}
					highlightedWords={['que', 'dias']}
				>
					<ProgressBar
						value={progress[1]}
						range={progress[0]}
					/>
				</InstructionCard>
			</DefaultHeaderContainer>
			<SelectButtonsContainer
				backgroundColor={backgroundColor}
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
								svgIconScale={['30%', '15%']}
								onPress={() => savePostDaysOfWeek(selectedDays)}
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

export { PostDaysOfWeek }
