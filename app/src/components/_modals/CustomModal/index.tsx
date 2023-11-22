import React, { useState } from 'react'
import { Modal, TextStyle } from 'react-native'
import { SvgProps } from 'react-native-svg'

import { RFValue } from 'react-native-responsive-fontsize'
import {
	Container,
	ContentInner,
	Content,
	Description,
	Header,
	Title,
	TouchCloseArea,
	TextInput
} from './styles'
import { theme } from '../../../common/theme'
import CheckWhiteIcon from '../../../assets/icons/check-white.svg'
import XWhiteIcon from '../../../assets/icons/x-white.svg'

import { showMessageWithHighlight } from '../../../common/auxiliaryFunctions'

import { PrimaryButton } from '../../_buttons/PrimaryButton'
import { FocusAwareStatusBar } from '../../FocusAwareStatusBar'
import { VerticalSpacing } from '../../_space/VerticalSpacing'
import { SmallButton } from '../../_buttons/SmallButton'
import { relativeScreenWidth } from '../../../common/screenDimensions'

interface CustomModalProps {
	visibility: boolean
	title?: string
	titleHighlightedWords?: string[]
	titleAlign?: TextStyle['textAlign']
	TitleIcon?: React.FC<SvgProps>
	firstParagraph?: {
		text?: string
		fontSize?: number
		bolded?: boolean
		textAlign?: TextStyle['textAlign']
		highlightedWords?: string[]
	},
	secondParagraph?: {
		text?: string
		fontSize?: number
		bolded?: boolean
		textAlign?: TextStyle['textAlign']
		highlightedWords?: string[]
	} | false,
	listItemText?: string | false
	closeButton?: boolean,
	closeModalOnPressButton?: boolean,
	closeModal: () => void
	customInput?: {
		placeholder: string
		initialValue: string
	}
	affirmativeButton?: {
		label: string
		CustomIcon?: React.FC<SvgProps>
		onPress: (value?: string) => void
	}
	negativeButton?: {
		label: string
		CustomIcon?: React.FC<SvgProps>
		onPress: (value?: string) => void
	},
	children?: React.ReactElement | React.ReactElement[]
}

function CustomModal({
	visibility,
	title,
	titleHighlightedWords,
	titleAlign,
	TitleIcon,
	firstParagraph,
	secondParagraph,
	listItemText,
	customInput,
	closeButton,
	closeModalOnPressButton = true,
	closeModal,
	affirmativeButton,
	negativeButton,
	children
}: CustomModalProps) {
	const [textInput, setTextInput] = useState(customInput?.initialValue || '')

	const closeModalAfterOnPress = (onPress: (value?: string) => void) => {
		onPress && onPress(textInput)
		closeModalOnPressButton && closeModal()
	}

	const iconStyle = { marginLeft: -RFValue(8), marginRight: RFValue(15) }

	return (
		<Modal
			transparent
			visible={visibility}
			animationType={'fade'}
			onRequestClose={closeModal}
		>
			<FocusAwareStatusBar backgroundColor={theme.transparence.orange1} barStyle={'dark-content'} />
			<Container>
				<TouchCloseArea onPress={closeModal}></TouchCloseArea>
				<Content>
					<ContentInner>
						<Header>
							{TitleIcon && <TitleIcon width={'20%'} style={iconStyle} />}
							<Title
								hasHighlightedWords={!!titleHighlightedWords}
								textAlign={titleAlign}
							>
								{titleHighlightedWords ? showMessageWithHighlight(title || '', titleHighlightedWords) : title}

							</Title>
							{
								closeButton && (
									<SmallButton
										SvgIcon={XWhiteIcon}
										relativeWidth={relativeScreenWidth(11)}
										height={relativeScreenWidth(11)}
										color={theme.red3}
										onPress={closeModal}
									/>
								)
							}
						</Header>
						{children}

						{
							firstParagraph && (
								<Description
									bolded={firstParagraph.bolded}
									fontSize={firstParagraph.fontSize}
									textAlign={firstParagraph.textAlign}
								>
									{showMessageWithHighlight(firstParagraph.text || '', firstParagraph.highlightedWords)}
								</Description>
							)
						}
						{
							listItemText && (
								<Description fontSize={14} bolded>
									{`•  ${listItemText}`}
								</Description>
							)
						}
						{
							secondParagraph && (
								<Description
									bolded={secondParagraph.bolded}
									fontSize={secondParagraph.fontSize}
								>
									{showMessageWithHighlight(secondParagraph.text || '', secondParagraph.highlightedWords)}
								</Description>
							)
						}
						{
							customInput && (
								<TextInput
									keyboardType={'email-address'}
									placeholder={customInput.placeholder}
									value={textInput}
									onChangeText={(text: string) => setTextInput(text.trim().toLowerCase())}
								/>
							)
						}

						{
							affirmativeButton && (
								<>
									<PrimaryButton
										keyboardHideButton={false}
										color={theme.green3}
										labelColor={theme.white3}
										label={affirmativeButton.label}
										highlightedWords={[...affirmativeButton.label.split(' '), ...affirmativeButton.label.split(', ')]}
										fontSize={15}
										SecondSvgIcon={affirmativeButton.CustomIcon || CheckWhiteIcon}
										svgIconScale={['40%', '25%']}
										onPress={() => closeModalAfterOnPress(affirmativeButton.onPress)}
									/>
									{negativeButton && <VerticalSpacing />}
								</>
							)
						}
						{
							negativeButton && (
								<PrimaryButton
									keyboardHideButton={false}
									color={theme.red3}
									labelColor={theme.white3}
									label={negativeButton.label}
									highlightedWords={[...negativeButton.label.split(' '), ...negativeButton.label.split(', ')]}
									fontSize={15}
									SvgIcon={negativeButton.CustomIcon || XWhiteIcon}
									svgIconScale={['40%', '25%']}
									onPress={() => closeModalAfterOnPress(negativeButton.onPress)}
								/>
							)
						}
					</ContentInner>
				</Content>
				<TouchCloseArea onPress={closeModal} ></TouchCloseArea>
			</Container>
		</Modal >
	)
}

export { CustomModal }
