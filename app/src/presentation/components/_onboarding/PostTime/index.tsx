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

interface PostTimeProps {
	backgroundColor: string
	validationColor: string
	customTitle?: string
	customHighlight?: string[]
	initialValue?: Date
	navigateBackwards: () => void
	skipScreen?: () => void
	saveTime: (dateTime: Date) => void
}

function PostTime({
	backgroundColor,
	validationColor,
	customTitle,
	customHighlight,
	initialValue,
	navigateBackwards,
	skipScreen,
	saveTime
}: PostTimeProps) {
	const [time, setTime] = useState<Date>(initialValue as Date) 

	const savePostTime = () => {
		saveTime(time)
	}	

	return (
		<Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<StatusBar backgroundColor={backgroundColor} />
			<DefaultHeaderContainer
				minHeight={relativeScreenHeight(24)}
				relativeHeight={relativeScreenHeight(24)}
				centralized
				backgroundColor={backgroundColor}
			>
				<BackButton onPress={navigateBackwards} />
				<InstructionCard
					fontSize={16}
					message={customTitle || 'que horas começa?'}
					highlightedWords={customHighlight || ['horas', 'começa']}
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
			<FormContainer
				backgroundColor={theme.white3}
				justifyContent={'center'}
			>
				<InputsContainer>
					<DataVisualizerInput
						openPickerOnTouch
						pickerType={'time'}
						initialValue={initialValue}
						fields={['horas', 'minutos']}
						defaultBackgroundColor={theme.white2}
						validBackgroundColor={validationColor}
						onDateSelect={(dateTime: Date) => setTime(dateTime)}
					/>
				</InputsContainer>
				<ButtonContainer>
					{
						time && (
							<PrimaryButton
								color={theme.green3}
								label={'continuar'}
								labelColor={theme.white3}
								SecondSvgIcon={CheckWhiteIcon}
								onPress={savePostTime}
							/>
						)
					}
				</ButtonContainer>
			</FormContainer>
		</Container>
	)
}

export { PostTime }
