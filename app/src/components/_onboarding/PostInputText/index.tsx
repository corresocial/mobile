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
import { ProgressBar } from '../../ProgressBar'
import { SkipButton } from '../../_buttons/SkipButton'
import { DefaultInput } from '../../_inputs/DefaultInput'

interface PostInputTextProps {
	backgroundColor: string
	validationColor: string
	customTitle?: string
	customHighlight?: string[]
	multiline?: boolean
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
				relativeHeight={relativeScreenHeight(28)}
				centralized
				backgroundColor={backgroundColor}
			>
				<BackButton onPress={navigateBackwards} />
				<InstructionCard
					fontSize={16}
					message={'fala tudo sobre o que você tá postando'}
					highlightedWords={['tudo', 'o', 'que', 'você', 'tá', 'postando']}
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
					textAlign={'left'}
					fontSize={16}
					multiline
					initialNumberOfLines={multiline ? 1 : 1}
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
