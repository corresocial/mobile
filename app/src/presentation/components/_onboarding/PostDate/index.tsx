import React, { useState } from 'react'
import { Platform, StatusBar } from 'react-native'

import { ButtonContainer, Container, InputsContainer } from './styles'
import CheckWhiteIcon from '@assets/icons/check-white.svg'
import TrashWhiteIcon from '@assets/icons/trash-white.svg'
import { relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { BackButton } from '@components/_buttons/BackButton'
import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { SmallButton } from '@components/_buttons/SmallButton'
import { InstructionCard } from '@components/_cards/InstructionCard'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { FormContainer } from '@components/_containers/FormContainer'
import { DataVisualizerInput } from '@components/_inputs/DataVisualizerInput'
import { HorizontalSpacing } from '@components/_space/HorizontalSpacing'

interface PostDateProps {
	backgroundColor: string
	validationColor: string
	customTitle?: string
	customHighlight?: string[]
	initialValue?: Date
	navigateBackwards: () => void
	skipScreen?: () => void
	saveDate: (date: Date) => void
}

function PostDate({
	backgroundColor,
	validationColor,
	customTitle,
	customHighlight,
	initialValue,
	navigateBackwards,
	skipScreen,
	saveDate
}: PostDateProps) {
	const initialDate = initialValue ? initialValue as Date : null
	const [date, setDate] = useState<Date | null>(initialDate)

	/* const insertedDateIsAfterCurrentDate = () => {
		const insertedDate = new Date(`${year}-${month}-${day}T23:59:59`)
		const currentDate = new Date()
		const currentDateWithoutTimezone = new Date(`${currentDate.getUTCFullYear()}-${(currentDate.getUTCMonth() + 1 < 10) ? `0${currentDate.getUTCMonth() + 1}` : currentDate.getUTCMonth() + 1}-${(currentDate.getUTCDate() < 10) ? `0${currentDate.getUTCDate()}` : currentDate.getUTCDate()}`)
		return insertedDate >= currentDateWithoutTimezone
	} */

	const savePostDate = () => {
		saveDate(date as Date)
	}

	return (
		<Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<StatusBar backgroundColor={backgroundColor} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				minHeight={relativeScreenHeight(24)}
				relativeHeight={relativeScreenHeight(24)}
				centralized
				backgroundColor={backgroundColor}
			>
				<BackButton onPress={navigateBackwards} />
				<InstructionCard
					fontSize={16}
					message={customTitle || 'que dia começa?'}
					highlightedWords={customHighlight || ['dia', 'começa']}
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
			<FormContainer
				backgroundColor={theme.colors.white[3]}
				justifyContent={'center'}
			>
				<InputsContainer>
					<DataVisualizerInput
						openPickerOnTouch
						pickerType={'date'}
						fields={['dia', 'mês', 'ano']}
						initialValue={initialValue}
						defaultBackgroundColor={theme.colors.white[2]}
						validBackgroundColor={validationColor}
						onDateSelect={(selectedDate: Date) => setDate(selectedDate)}
					/>
				</InputsContainer>
				<ButtonContainer>
					{
						date && (
							<PrimaryButton
								color={theme.colors.green[3]}
								label={'continuar'}
								labelColor={theme.colors.white[3]}
								SecondSvgIcon={CheckWhiteIcon}
								onPress={savePostDate}
							/>
						)
					}
				</ButtonContainer>
			</FormContainer>
		</Container>
	)
}

export { PostDate }
