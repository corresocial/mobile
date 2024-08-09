import React, { useState } from 'react'
import { StatusBar } from 'react-native'

import { DaysOfWeek } from '@domain/post/entity/types'

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

import { BackButton } from '@components/_buttons/BackButton'
import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { SelectButton } from '@components/_buttons/SelectButton'
import { SmallButton } from '@components/_buttons/SmallButton'
import { InstructionCard } from '@components/_cards/InstructionCard'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { SelectButtonsContainer } from '@components/_containers/SelectButtonsContainer'
import { HorizontalSpacing } from '@components/_space/HorizontalSpacing'

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
								color={theme.colors.red[3]}
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
				backgroundColor={theme.colors.white[3]}
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
								color={theme.colors.green[3]}
								label={'continuar'}
								labelColor={theme.colors.white[3]}
								SecondSvgIcon={CheckWhiteIcon}
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
