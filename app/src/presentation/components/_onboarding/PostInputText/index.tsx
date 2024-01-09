import React, { useEffect, useRef, useState } from 'react'
import { Platform, TextInputProps } from 'react-native'

import { ButtonsContainer, Container, InstructionButtonContainer } from './styles'
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
import { DefaultInput } from '@components/_inputs/DefaultInput'
import { HorizontalSpacing } from '@components/_space/HorizontalSpacing'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'

import { ProgressBar } from '../../ProgressBar'

interface PostInputTextProps {
	children?: React.ReactElement
	height?: string
	backgroundColor: string
	validationColor: string
	customTitle?: string
	customHighlight?: string[]
	contextTitle?: string
	contextHighlightedWords?: string[]
	multiline?: boolean
	inputPlaceholder?: string
	keyboardType?: TextInputProps['keyboardType']
	initialValue?: string
	keyboardOpened?: boolean
	progress?: [value: number, range: number]
	validateInputText?: (text: string) => boolean
	skipScreen?: () => void
	saveTextData: (text: string) => void
	navigateBackwards: () => void
}

function PostInputText({
	children,
	height,
	backgroundColor,
	validationColor,
	customTitle,
	customHighlight,
	contextTitle,
	contextHighlightedWords,
	multiline,
	inputPlaceholder,
	keyboardType,
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

	const textInputRef = useRef()

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
				flexDirection={'column'}
			>
				{
					contextTitle ? (
						<>
							<InstructionButtonContainer withPaddingLeft>
								<InstructionCard
									borderLeftWidth={5}
									fontSize={16}
									message={contextTitle || ''}
									highlightedWords={contextHighlightedWords || []}
								/>
							</InstructionButtonContainer>
							<VerticalSpacing />
						</>
					) : <></>
				}
				<InstructionButtonContainer>
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
				</InstructionButtonContainer>
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
					textInputRef={textInputRef}
					value={inputText}
					defaultBackgroundColor={theme.white2}
					validBackgroundColor={inputTextIsValid ? validationColor : theme.white3}
					lastInput
					fontSize={16}
					multiline={multiline}
					placeholder={inputPlaceholder || 'descreva seu post...'}
					keyboardType={keyboardType || 'default'}
					textIsValid={inputTextIsValid && !keyboardOpened}
					validateText={(text: string) => validateInputText(text)}
					onChangeText={(text: string) => setInputText(text)}
				/>
				<ButtonsContainer>
					{
						inputTextIsValid && !keyboardOpened
							? (
								<PrimaryButton
									flexDirection={'row-reverse'}
									color={theme.green3}
									label={'continuar'}
									labelColor={theme.white3}
									SvgIcon={CheckWhiteIcon}
									onPress={() => saveTextData(inputText.trim())}
								/>
							)
							: children && children
					}
				</ButtonsContainer>
			</FormContainer>
		</Container>
	)
}

export { PostInputText }
