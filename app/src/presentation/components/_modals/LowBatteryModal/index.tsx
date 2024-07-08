import React from 'react'
import { Modal, StatusBar } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

import { CardDescriptionText, CardTitleContainer, CardTitleText, Container, ContainerInner, ModalContainer } from './styles'
import CheckIcon from '@assets/icons/check-white.svg'
import LowBatteryIcon from '@assets/icons/lowBattery-white.svg'
import { theme } from '@common/theme'

import { OptionButton } from '@components/_buttons/OptionButton'

interface LowBatteryModalProps {
	isVisible?: boolean
	onConfirm: () => void
}

function LowBatteryModal({ isVisible = false, onConfirm }: LowBatteryModalProps) {
	return (
		<Modal
			visible={isVisible}
			animationType={'fade'}
			transparent
		>
			<StatusBar barStyle={'dark-content'} backgroundColor={theme.transparence.red} />
			<ModalContainer>
				<Container >
					<ContainerInner >
						<CardTitleContainer>
							<LowBatteryIcon />
							<CardTitleText>
								{'Bateria baixa!'}
							</CardTitleText>
						</CardTitleContainer>

						<CardDescriptionText>
							{'Sua bateria está quase acabando!'}
						</CardDescriptionText>

						<OptionButton
							labelSize={RFValue(16)}
							leftSideColor={theme.green3}
							leftSideWidth={RFValue(70)}
							SvgIcon={CheckIcon}
							svgIconScale={['40', '40']}
							onPress={onConfirm}
							label={'ok!'}
						/>
					</ContainerInner>
				</Container>
			</ModalContainer>
		</Modal>
	)
}

export { LowBatteryModal }
