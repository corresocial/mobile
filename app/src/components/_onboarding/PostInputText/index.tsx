import { Platform } from 'react-native'
import React, { useEffect, useState } from 'react'

import { ButtonsContainer, Container } from './styles'
import { theme } from '../../../common/theme'
import { relativeScreenHeight } from '../../../common/screenDimensions'
import CheckWhiteIcon from '../../../assets/icons/check-white.svg'

import { DefaultHeaderContainer } from '../../_containers/DefaultHeaderContainer'
import { FormContainer } from '../../_containers/FormContainer'
import { PrimaryButton } from '../../_buttons/PrimaryButton'
import { BackButton } from '../../_buttons/BackButton'
import { InstructionCard } from '../../_cards/InstructionCard'
import { LineInput } from '../../LineInput'
import { ProgressBar } from '../../ProgressBar'
import { SkipButton } from '../../_buttons/SkipButton'

interface PostInputTextProps {
	backgroundColor: string
	validationColor: string
	customTitle?: string
	customHighlight?: string[]
	inputPlaceholder?: string
	initialValue?: string
	keyboardOpened?: boolean
	progress: [value: number, range: number]
	validateInputText?: (text: string) => boolean
	skipScreen?: () => void
	saveTextData: (text: string) => void
	navigateBackwards: () => void
}

function PostInputText({
	backgroundColor,
	validationColor,
	customTitle,
	customHighlight,
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
				minHeight={relativeScreenHeight(24)}
				relativeHeight={relativeScreenHeight(24)}
				centralized
				backgroundColor={backgroundColor}
			>
				<BackButton onPress={navigateBackwards} />
				<InstructionCard
					borderLeftWidth={3}
					fontSize={17}
					message={customTitle || 'qual o título do seu post?'}
					highlightedWords={customHighlight || ['título']}
				>
					<ProgressBar
						value={progress[0]}
						range={progress[1]}
					/>
				</InstructionCard>
			</DefaultHeaderContainer>
			<FormContainer
				backgroundColor={theme.white2}
				justifyContent={'center'}
			>
				<LineInput
					value={inputText}
					relativeWidth={'100%'}
					defaultBackgroundColor={theme.white2}
					defaultBorderBottomColor={theme.black4}
					validBackgroundColor={validationColor}
					validBorderBottomColor={theme.black4}
					invalidBackgroundColor={theme.red1}
					invalidBorderBottomColor={theme.red5}
					maxLength={100}
					lastInput
					textAlign={'left'}
					fontSize={16}
					placeholder={inputPlaceholder}
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
								onPress={() => saveTextData(inputText)}
							/>
						)
					}
				</ButtonsContainer>
				{
					skipScreen && !inputTextIsValid && !keyboardOpened
						? (
							<SkipButton onPress={skipScreen} />
						)
						: <></>
				}
			</FormContainer>
		</Container>
	)
}

export { PostInputText }
