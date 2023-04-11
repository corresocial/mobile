import React from 'react'
import { Modal } from 'react-native'

import { relativeScreenWidth } from '../../../common/screenDimensions'

import {
	Container,
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
import { SmallButton } from '../../_buttons/SmallButton'

interface TourModalProps {
	visibility: boolean
	closeModal: () => void
	onPressButton: () => void
}

function TourModal({ visibility, closeModal, onPressButton }: TourModalProps) {
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
					<Header>
						<Title>{showMessageWithHighlight('bem-vindo!', ['bem-vindo!'])}</Title>
						<SmallButton
							SvgIcon={XWhiteIcon}
							relativeWidth={relativeScreenWidth(11)}
							height={relativeScreenWidth(11)}
							color={theme.red3}
							onPress={closeModal}
						/>
					</Header>
					<Description>
						{showMessageWithHighlight(
							'para que as pessoas encontrem seu perfil, você precisa fazer sua primeira postagem.',
							['para', 'que', 'as', 'pessoas', 'encontrem', 'seu', 'perfil', 'primeira', 'postagem']
						)}
					</Description>
					<Description>
						{showMessageWithHighlight(
							'em só 5 minutos, o seu bairro, cidade ou o país inteiro já consegue te encontrar, vamos começar?',
							['5', 'minutos', 'te', 'encontrar']
						)}
					</Description>
					<PrimaryButton
						color={theme.green3}
						labelColor={theme.white3}
						label={'vamos lá!'}
						highlightedWords={['vamos', 'lá!']}
						fontSize={22}
						SecondSvgIcon={CheckWhiteIcon}
						svgIconScale={['40%', '30%']}
						onPress={onPressButton}
					/>
				</Content>
				<TouchCloseArea onPress={closeModal} ></TouchCloseArea>
			</Container>
		</Modal >
	)
}

export { TourModal }
