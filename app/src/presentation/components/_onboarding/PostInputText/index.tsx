import React, { useEffect, useState } from 'react'
import { Platform } from 'react-native'

import { ButtonsContainer, Container } from './styles'
import CheckWhiteIcon from '@assets/icons/check-white.svg'
import TrashWhiteIcon from '@assets/icons/trash-white.svg'

import { BackButton } from '../../_buttons/BackButton'
import { PrimaryButton } from '../../_buttons/PrimaryButton'
import { SmallButton } from '../../_buttons/SmallButton'
import { InstructionCard } from '../../_cards/InstructionCard'
import { DefaultHeaderContainer } from '../../_containers/DefaultHeaderContainer'
import { FormContainer } from '../../_containers/FormContainer'
import { DefaultInput } from '../../_inputs/DefaultInput'
import { HorizontalSpacing } from '../../_space/HorizontalSpacing'
import { relativeScreenHeight, relativeScreenWidth } from '../../../common/screenDimensions'
import { theme } from '../../../common/theme'
import { ProgressBar } from '../../ProgressBar'

interface PostInputTextProps {
	height?: string
	backgroundColor: string
	validationColor: string
	customTitle?: string
	customHighlight?: string[]
	multiline?: boolean
	inputPlaceholder?: string
	initialValue?: string
	keyboardOpened?: boolean
	progress?: [value: number, range: number]
	validateInputText?: (text: string) => boolean
	skipScreen?: () => void
	saveTextData: (text: string) => void
	navigateBackwards: () => void
}

function PostInputText({
	height,
	backgroundColor,
	validationColor,
	customTitle,
	customHighlight,
	multiline,
	inputPlaceholder,
	initialValue,
	keyboardOpened,
	progress,
	validateInputText = (text: string) => true,
	skipScreen,
	saveTextData,
	navigateBackwards
}: PostInputTextProps) {
	const [inputText, setInputText] = useState<string>(initialValue || '')
	const [inputTextIsValid, setInputTextIsValid] = useState<boolean>(false)

	useEffect(() => {
		const validation = validateInputText(inputText)
		setInputTextIsValid(validation)
	}, [inputText, keyboardOpened])

	return (
		<Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<DefaultHeaderContainer
				minHeight={relativeScreenHeight(28)}
				relativeHeight={height || relativeScreenHeight(28)}
				centralized
				backgroundColor={backgroundColor}
			>
				<BackButton onPress={navigateBackwards} />
				<InstructionCard
					fontSize={16}
					message={customTitle || 'fala tudo sobre o que você tá postando'}
					highlightedWords={customHighlight || ['tudo', 'o', 'que', 'você', 'tá', 'postando']}
				>
					{
						progress && (
							<ProgressBar
								value={progress[0]}
								range={progress[1]}
							/>
						)
					}
				</InstructionCard>
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
				<DefaultInput
					value={inputText}
					defaultBackgroundColor={theme.white2}
					validBackgroundColor={validationColor}
					lastInput
					fontSize={16}
					multiline={multiline}
					placeholder={inputPlaceholder || 'descreva seu post...'}
					keyboardType={'default'}
					textIsValid={inputTextIsValid && !keyboardOpened}
					validateText={(text: string) => validateInputText(text)}
					onChangeText={(text: string) => setInputText(text)}
				/>
				<ButtonsContainer>
					{
						inputTextIsValid && !keyboardOpened
						&& (
							<PrimaryButton
								flexDirection={'row-reverse'}
								color={theme.green3}
								label={'continuar'}
								labelColor={theme.white3}
								SvgIcon={CheckWhiteIcon}
								onPress={() => saveTextData(inputText.trim())}
							/>
						)
					}
				</ButtonsContainer>
			</FormContainer>
		</Container>
	)
}

export { PostInputText }
