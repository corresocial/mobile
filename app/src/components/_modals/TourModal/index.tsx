import React from 'react'
import { Modal } from 'react-native'

import { theme } from '@common/theme'
import Check from '@assets/icons/check.svg'

import { showMessageWithHighlight } from '@common/auxiliaryFunctions'
import { FocusAwareStatusBar } from '../../FocusAwareStatusBar'
import {
	Container,
	Content,
	Description,
	Question,
	Title,
	TouchCloseArea,
} from './styles'

import { PrimaryButton } from '../../_buttons/PrimaryButton'

interface TourModalProps {
	visibility: boolean;
	closeModal: () => void;
	onPressButton: () => void;
}

function TourModal({ visibility, closeModal, onPressButton }: TourModalProps) {
	return (
		<Modal
			transparent
			visible={visibility}
			animationType={'fade'}
			onRequestClose={closeModal}
		>
			<FocusAwareStatusBar
				backgroundColor={theme.transparence.orange1}
				barStyle={'dark-content'}
			/>
			<Container>
				<TouchCloseArea onPress={closeModal}></TouchCloseArea>
				<Content>
					<Title>{'legal!'}</Title>
					<Description>
						{showMessageWithHighlight(
							'primeiro precisamos preencher seu perfil, para que outros possam te encontrar',
							[
								'primeiro',
								'preencher',
								'seu',
								'perfil',
								'te',
								'encontrar',
							]
						)}
					</Description>
					<Question>
						{showMessageWithHighlight('demora 5 minutos, bora?', [
							'5',
							'minutos',
						])}
					</Question>
					<PrimaryButton
						color={theme.green3}
						labelColor={theme.white3}
						label={'bora!'}
						highlightedWords={['bora!']}
						fontSize={22}
						SvgIcon={Check}
						svgIconScale={['30%', '11%']}
						onPress={onPressButton}
					/>
				</Content>
				<TouchCloseArea onPress={closeModal}></TouchCloseArea>
			</Container>
		</Modal>
	)
}

export { TourModal }
