import React from 'react'
import { Modal } from 'react-native'

import {
	Container,
	Content,
	Description,
	ButtonsContainer,
	Title,
	TouchCloseArea,
	DescriptionTitle,
} from './styles'
import { theme } from '../../../common/theme'
import CheckIcon from '../../../assets/icons/check-shadow.svg'
import Uncheck from '../../../assets/icons/uncheck-shadow.svg'

import { PrimaryButton } from '../../_buttons/PrimaryButton'
import { FocusAwareStatusBar } from '../../FocusAwareStatusBar'

interface DestructionModalProps {
	title?: string;
	name?: string;
	visibility: boolean;
	closeModal: () => void;
	onPressButton: () => void;
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
					<Title>{`${title}`}</Title>
					<Description>
						{`você tem certeza que quer ${title} `}
						<DescriptionTitle>{name}</DescriptionTitle>
						{'?'}
					</Description>

					<ButtonsContainer>
						<PrimaryButton
							flexDirection={'row-reverse'}
							color={theme.green3}
							labelColor={theme.white3}
							label={`sim, ${title}`}
							highlightedWords={['sim', 'apagar', 'post', 'denunciar']}
							fontSize={18}
							labelMarginLeft={5}
							SvgIcon={CheckIcon}
							svgIconScale={['30%', '15%']}
							onPress={onPressButton}
						/>
						<PrimaryButton
							flexDirection={'row-reverse'}
							color={theme.red3}
							label={'não, cancelar'}
							highlightedWords={['não', 'cancelar']}
							labelColor={theme.white3}
							labelMarginLeft={5}
							fontSize={18}
							SvgIcon={Uncheck}
							svgIconScale={['30%', '15%']}
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
