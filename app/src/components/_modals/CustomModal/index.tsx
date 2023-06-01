import React from 'react'
import { Modal } from 'react-native'
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
import { theme } from '../../../common/theme'
import CheckWhiteIcon from '../../../assets/icons/check-white.svg'
import XWhiteIcon from '../../../assets/icons/x-white.svg'

import { showMessageWithHighlight } from '../../../common/auxiliaryFunctions'

import { PrimaryButton } from '../../_buttons/PrimaryButton'
import { FocusAwareStatusBar } from '../../FocusAwareStatusBar'
import { VerticalSigh } from '../../VerticalSigh'
import { SmallButton } from '../../_buttons/SmallButton'
import { relativeScreenWidth } from '../../../common/screenDimensions'

interface CustomModalProps {
	visibility: boolean
	title?: string
	firstParagraph?: {
		text?: string
		fontSize?: number
		bolded?: boolean
		highlightedWords?: string[]
	},
	secondParagraph?: {
		text?: string
		fontSize?: number
		bolded?: boolean
		highlightedWords?: string[]
	},
	closeButton?: boolean,
	closeModal: () => void
	affirmativeButton?: {
		label: string
		CustomIcon?: React.FC<SvgProps>
		onPress: () => void
	}
	negativeButton?: {
		label: string
		CustomIcon?: React.FC<SvgProps>
		onPress: () => void
	}
}

function CustomModal({
	visibility,
	title,
	firstParagraph,
	closeButton,
	closeModal,
	secondParagraph,
	affirmativeButton,
	negativeButton
}: CustomModalProps) {
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
							<Title>{title}</Title>
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

						{
							firstParagraph && (
								<Description bolded={firstParagraph.bolded}>
									{showMessageWithHighlight(firstParagraph.text || '', firstParagraph.highlightedWords)}
								</Description>
							)
						}
						{
							secondParagraph && (
								<Description bolded={secondParagraph.bolded}>
									{showMessageWithHighlight(secondParagraph.text || '', secondParagraph.highlightedWords)}
								</Description>
							)
						}
						{
							negativeButton && (
								<>
									<PrimaryButton
										color={theme.red3}
										labelColor={theme.white3}
										label={negativeButton.label}
										highlightedWords={[...negativeButton.label.split(' '), ...negativeButton.label.split(', ')]}
										fontSize={16}
										SecondSvgIcon={negativeButton.CustomIcon || XWhiteIcon}
										svgIconScale={['40%', '25%']}
										onPress={negativeButton.onPress && negativeButton.onPress}
									/>
									<VerticalSigh />
								</>
							)
						}
						{
							affirmativeButton && (
								<PrimaryButton
									color={theme.green3}
									labelColor={theme.white3}
									label={affirmativeButton.label}
									highlightedWords={[...affirmativeButton.label.split(' '), ...affirmativeButton.label.split(', ')]}
									fontSize={16}
									SecondSvgIcon={affirmativeButton.CustomIcon || CheckWhiteIcon}
									svgIconScale={['40%', '25%']}
									onPress={affirmativeButton.onPress && affirmativeButton.onPress}
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
