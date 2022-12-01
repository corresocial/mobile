import React from 'react'
import { Modal, StatusBar } from 'react-native'

import {
	Container,
	Content,
	Description,
	Question,
	Title,
	TouchCloseArea
} from './styles'
import { theme } from '../../../common/theme'
import RightCurvedArrow from '../../../assets/icons/rightCurvedArrow.svg'

import { PrimaryButton } from '../../_buttons/PrimaryButton'

interface ShareModalProps {
	visibility: boolean
	closeModal: () => void
	onPressButton: () => void
}

function ShareModal({ visibility, closeModal, onPressButton }: ShareModalProps) {
	return (
		<Modal
			transparent
			visible={visibility}
			animationType={'fade'}
			onRequestClose={closeModal}
		>
			<StatusBar backgroundColor={'rgba(0,0,0,0.5)'} barStyle={'dark-content'} />
			<Container>
				<TouchCloseArea onPress={closeModal} ></TouchCloseArea>
				<Content>
					<Title>{'pronto!'}</Title>
					<Description>
						{'agora outros clientes e pessoas podem encontrar seu perfil e o que você vende!\r'}
					</Description>
					<Question>
						{'que tal começar compartilhando, para ainda mais pessoas comprarem de você!?\r'}
					</Question>
					<PrimaryButton
						color={theme.green3}
						labelColor={theme.white3}
						label={'compartilhar!'}
						highlightedWords={['compartilhar!']}
						fontSize={18}
						SvgIcon={RightCurvedArrow}
						svgIconScale={['40%', '16%']}
						onPress={onPressButton}
					/>
				</Content>
				<TouchCloseArea onPress={closeModal} ></TouchCloseArea>
			</Container>
		</Modal >
	)
}

export { ShareModal }
