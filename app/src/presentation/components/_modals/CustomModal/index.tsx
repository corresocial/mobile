import React, { useEffect, useState } from 'react'
import { Modal, Platform, TextInputProps, TextStyle } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { SvgProps } from 'react-native-svg'

import {
	Container,
	ContentInner,
	Content,
	Description,
	Header,
	Title,
	TouchCloseArea
} from './styles'
import CheckWhiteIcon from '@assets/icons/check-white.svg'
import XWhiteIcon from '@assets/icons/x-white.svg'
import { showMessageWithHighlight } from '@common/auxiliaryFunctions'
import { relativeScreenWidth } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { SmallButton } from '@components/_buttons/SmallButton'
import { DefaultInput } from '@components/_inputs/DefaultInput'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'

import { FocusAwareStatusBar } from '../../FocusAwareStatusBar'

interface CustomModalProps {
	visibility: boolean
	overlayColor?: 'success' | 'error' | 'info'
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
	TextSvg?: React.FC<SvgProps>
	withoutStatusBar?: boolean,
	closeButton?: boolean,
	closeModalOnPressButton?: boolean,
	closeModal: () => void
	customInput?: {
		placeholder: string
		initialValue?: string
		keyboardType?: TextInputProps['keyboardType']
		maxLength?: number
		validateText?: (value: string) => boolean
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
	overlayColor,
	visibility,
	title,
	titleHighlightedWords,
	titleAlign,
	TitleIcon,
	withoutStatusBar,
	firstParagraph,
	secondParagraph,
	listItemText,
	TextSvg,
	customInput,
	closeButton,
	closeModalOnPressButton = true,
	closeModal,
	affirmativeButton,
	negativeButton,
	children
}: CustomModalProps) {
	const [textInput, setTextInput] = useState(customInput?.initialValue || '')

	useEffect(() => {
		if (customInput) {
			setTextInput(customInput.initialValue || '')
		}
	}, [customInput?.initialValue])

	const closeModalAfterOnPress = (onPress: (value?: string) => void) => {
		onPress && onPress(textInput)
		closeModalOnPressButton && closeModal()
	}

	const iconStyle = { marginLeft: -RFValue(8), marginRight: RFValue(15) }

	const getRelativeStatusBarColor = () => {
		switch (overlayColor) {
			case 'error': return theme.transparence.red
			case 'info': return theme.transparence.blue3
			case 'success': return theme.transparence.green
			default: return theme.transparence.orange1
		}
	}

	return (
		<Modal
			transparent
			visible={visibility}
			animationType={'fade'}
			onRequestClose={closeModal}
		>
			{!withoutStatusBar && <FocusAwareStatusBar backgroundColor={getRelativeStatusBarColor()} barStyle={'dark-content'} />}
			<Container
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				overlayColor={overlayColor}
			>
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
									textAlign={secondParagraph.textAlign}
								>
									{showMessageWithHighlight(secondParagraph.text || '', secondParagraph.highlightedWords)}
								</Description>
							)
						}
						{
							customInput && (
								<>
									<VerticalSpacing/>
									<DefaultInput
										{...customInput}
										defaultBackgroundColor={theme.white2}
										validBackgroundColor={theme.orange1}
										fontSize={15}
										multiline
										numberOfLines={5}
										keyboardType={customInput.keyboardType || 'email-address'}
										placeholder={customInput.placeholder}
										validateText={customInput.validateText}
										value={textInput}
										onChangeText={setTextInput}
									/>
									<VerticalSpacing/>
								</>
							)
						}

						{TextSvg && <TextSvg width={'100%'} height={RFValue(40)} />}
						<VerticalSpacing />

						{
							affirmativeButton && (
								<>
									<PrimaryButton
										keyboardHideButton={false}
										color={theme.green3}
										labelMarginLeft={RFValue(10)}
										labelColor={theme.white3}
										label={affirmativeButton.label}
										highlightedWords={[...affirmativeButton.label.split(' '), ...affirmativeButton.label.split(', ')]}
										fontSize={14}
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
									fontSize={14}
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
