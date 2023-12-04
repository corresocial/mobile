import React, { useState } from 'react'
import { StatusBar } from 'react-native'

import { DaysOfWeek } from '@services/firebase/types'

import {
	Container,
	FloatButtonContainer,
	Row,
	WeekdaysSelectedArea
} from './styles'
import CheckWhiteIcon from '@assets/icons/check-white.svg'
import TrashWhiteIcon from '@assets/icons/trash-white.svg'
import XBoldIcon from '@assets/icons/x-bold.svg'
import { relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { BackButton } from '../../_buttons/BackButton'
import { PrimaryButton } from '../../_buttons/PrimaryButton'
import { SelectButton } from '../../_buttons/SelectButton'
import { SmallButton } from '../../_buttons/SmallButton'
import { InstructionCard } from '../../_cards/InstructionCard'
import { DefaultHeaderContainer } from '../../_containers/DefaultHeaderContainer'
import { SelectButtonsContainer } from '../../_containers/SelectButtonsContainer'
import { HorizontalSpacing } from '../../_space/HorizontalSpacing'

interface PostDaysOfWeekProps {
	backgroundColor: string
	validationColor: string
	initialValue?: DaysOfWeek[]
	navigateBackwards: () => void
	skipScreen?: () => void
	savePostDaysOfWeek: (daysSelected: DaysOfWeek[]) => void
}

function PostDaysOfWeek({
	backgroundColor,
	validationColor,
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
			<StatusBar backgroundColor={backgroundColor} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				relativeHeight={relativeScreenHeight(24)}
				centralized
				backgroundColor={backgroundColor}
			>
				<BackButton onPress={navigateBackwards} />
				<InstructionCard
					fontSize={16}
					message={'qual é a frequência?'}
					highlightedWords={['frequência']}
				/>
				{
					skipScreen ? (
						<>
							<HorizontalSpacing />
							<SmallButton
								SvgIcon={TrashWhiteIcon}
								color={theme.red3}
								height={relativeScreenWidth(11)}
								relativeWidth={relativeScreenWidth(11)}
								svgScale={['60%', '60%']}
								onPress={skipScreen}
							/>
						</>
					)
						: <></>
				}
			</DefaultHeaderContainer>
			<SelectButtonsContainer
				backgroundColor={theme.white3}
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
					: null
			}
		</Container >
	)
}

export { PostDaysOfWeek }
