import React from 'react'
import { Modal } from 'react-native'

import { RFValue } from 'react-native-responsive-fontsize'
import {
	CloseIcon,
	Container,
	Content,
	Description,
	ButtonsContainer,
	Title,
	TouchCloseArea,
} from './styles'
import { theme } from '../../../common/theme'
import RightCurvedArrow from '../../../assets/icons/rightCurvedArrow.svg'
import XIcon from '../../../assets/icons/x.svg'
import Uncheck from '../../../assets/icons/uncheck.svg'

import { PrimaryButton } from '../../_buttons/PrimaryButton'
import { FocusAwareStatusBar } from '../../FocusAwareStatusBar'

interface DestructionModalProps {
	title?: string
	name?: string
	visibility: boolean
	closeModal: () => void
	onPressButton: () => void
}

function DestructionModal({
	title,
	name,
	visibility,
	closeModal,
	onPressButton,
}: DestructionModalProps) {
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
					<CloseIcon onPress={closeModal}>
						<XIcon width={RFValue(25)} height={RFValue(25)} />
					</CloseIcon>
					<Title>{`${title}`}</Title>
					<Description>
						{`você tem certeza que quer ${title} `} 
						<Title>{name}</Title>
						{'?'}
					</Description>

					<ButtonsContainer>
						<PrimaryButton
							color={theme.green3}
							labelColor={theme.white3}
							label={`sim, ${title}.`}
							fontSize={18}
							SvgIcon={RightCurvedArrow}
							svgIconScale={['40%', '16%']}
							onPress={onPressButton}
						/>
						<PrimaryButton
							flexDirection={'row-reverse'}
							color={theme.red3}
							label={'não, cancelar'}
							labelColor={theme.white3}
							fontSize={18}
							SvgIcon={Uncheck}
							svgIconScale={['30%', '20%']}
							onPress={closeModal}
						/>
					</ButtonsContainer>
				</Content>
				<TouchCloseArea onPress={closeModal}></TouchCloseArea>
			</Container>
		</Modal>
	)
}

export { DestructionModal }
