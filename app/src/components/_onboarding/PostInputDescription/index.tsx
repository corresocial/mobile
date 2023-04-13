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

interface PostInputDescriptionProps {
	backgroundColor: string
	validationColor: string
	customTitle?: string
	customHighlight?: string[]
	inputPlaceholder?: string
	initialValue?: string
	initialNumberOfRows?: number
	keyboardOpened?: boolean
	validateInputText?: (text: string) => boolean
	progress: [value: number, range: number]
	saveTextData: (text: string) => void
	navigateBackwards: () => void
}

function PostInputDescription({
	backgroundColor,
	validationColor,
	customTitle,
	customHighlight,
	inputPlaceholder,
	initialValue,
	initialNumberOfRows,
	keyboardOpened,
	progress,
	validateInputText = (text: string) => true,
	saveTextData,
	navigateBackwards
}: PostInputDescriptionProps) {
	const [inputText, setInputText] = useState<string>(initialValue || '')
	const [inputTextIsValid, setInputTextIsValid] = useState<boolean>(false)

	useEffect(() => {
		const validation = validateInputText(inputText)
		setInputTextIsValid(validation)
	}, [inputText, keyboardOpened])

	return (
		<Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<DefaultHeaderContainer
				minHeight={relativeScreenHeight(26)}
				relativeHeight={relativeScreenHeight(26)}
				centralized
				backgroundColor={backgroundColor}
			>
				<BackButton onPress={navigateBackwards} />
				<InstructionCard
					borderLeftWidth={3}
					fontSize={17}
					message={customTitle || 'escreva uma descrição para o seu post?'}
					highlightedWords={customHighlight || ['descrição', 'o', 'seu', 'post']}
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
					multiline
					initialNumberOfLines={initialNumberOfRows || 2}
					defaultBackgroundColor={theme.white2}
					defaultBorderBottomColor={theme.black4}
					validBackgroundColor={validationColor}
					validBorderBottomColor={theme.black4}
					maxLength={100}
					lastInput
					textAlign={'left'}
					fontSize={16}
					placeholder={inputPlaceholder || 'ex: descrição'}
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
								svgIconScale={['40%', '25%']}
								onPress={() => saveTextData(inputText)}
							/>
						)
					}
				</ButtonsContainer>
			</FormContainer>
		</Container>
	)
}

export { PostInputDescription }
