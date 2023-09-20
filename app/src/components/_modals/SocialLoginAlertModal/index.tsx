import React from 'react'

import { CustomModal } from '../CustomModal'

import { Body, Description } from './styles'
import GoogleWhiteIcon from '../../../assets/icons/google-white.svg'
import ProfileWhiteIcon from '../../../assets/icons/profile-white.svg'
import AngleLeftWhiteIcon from '../../../assets/icons/angleLeft-white.svg'

import { showMessageWithHighlight } from '../../../common/auxiliaryFunctions'

import { VerticalSigh } from '../../VerticalSigh'
import { relativeScreenHeight } from '../../../common/screenDimensions'
import { PrimaryButton } from '../../_buttons/PrimaryButton'
import { theme } from '../../../common/theme'
import { DescriptionWithLeftTracing } from '../../DescriptionWithLeftTracing'

interface SocialLoginAlertModalProps {
	visibility: boolean
	accountIdentifier?: string
	closeModal: () => void
	onPressButton: () => void
}

function SocialLoginAlertModal({
	visibility,
	accountIdentifier,
	closeModal,
	onPressButton
}: SocialLoginAlertModalProps) {
	return (
		<CustomModal
			visibility={visibility}
			title={'algo deu errado'}
			titleHighlightedWords={['algo', 'deu', 'errado']}
			TitleIcon={GoogleWhiteIcon}
			closeModal={closeModal}
		>
			<Body>
				<Description>
					{
						showMessageWithHighlight(
							'parece que não existe uma conta corre. vinculada a essa conta google',
							['corre', 'vinculada', 'conta', 'google', 'a'],
						)
					}
				</Description>
				<VerticalSigh height={relativeScreenHeight(3)} />
				{
					accountIdentifier && (
						<>
							<DescriptionWithLeftTracing
								text={accountIdentifier}
							/>
							<VerticalSigh height={relativeScreenHeight(3)} />
						</>
					)
				}
				<PrimaryButton
					keyboardHideButton={false}
					color={theme.green3}
					labelColor={theme.white3}
					label={'criar uma \nnova conta'}
					highlightedWords={['\nnova', 'conta']}
					fontSize={16}
					textAlign={'left'}
					SecondSvgIcon={ProfileWhiteIcon}
					svgIconScale={['40%', '35%']}
					onPress={() => {
						onPressButton()
						closeModal()
					}}
				/>
				<VerticalSigh height={relativeScreenHeight(2)} />
				<PrimaryButton
					keyboardHideButton={false}
					color={theme.white3}
					labelColor={theme.black4}
					label={'voltar \npara login'}
					highlightedWords={['\npara', 'login']}
					fontSize={16}
					textAlign={'left'}
					SecondSvgIcon={AngleLeftWhiteIcon}
					svgIconScale={['40%', '35%']}
					onPress={closeModal}
				/>
			</Body>
		</CustomModal>
	)
}

export { SocialLoginAlertModal }
