import React from 'react'

import { CustomModal } from '../CustomModal'

import { Body, Description } from './styles'
import GoogleWhiteIcon from '../../../assets/icons/google-white.svg'
import ProfileWhiteIcon from '../../../assets/icons/profile-white.svg'
import AngleLeftWhiteIcon from '../../../assets/icons/angleLeft-white.svg'
import SmartphoneWhiteIcon from '../../../assets/icons/smartphone-white.svg'

import { showMessageWithHighlight } from '../../../common/auxiliaryFunctions'

import { VerticalSigh } from '../../VerticalSigh'
import { relativeScreenHeight } from '../../../common/screenDimensions'
import { PrimaryButton } from '../../_buttons/PrimaryButton'
import { theme } from '../../../common/theme'
import { DescriptionWithLeftTracing } from '../../DescriptionWithLeftTracing'

interface SocialLoginAlertModalProps {
	visibility: boolean
	registerMethod?: boolean
	accountIdentifier?: string
	closeModal: () => void
	onPressButton: () => void
}

function SocialLoginAlertModal({
	visibility,
	accountIdentifier,
	registerMethod,
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
							`parece que ${registerMethod ? 'já' : 'não'} existe uma conta corre. vinculada a essa conta google`,
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
					label={registerMethod ? 'entrar nessa conta' : 'criar uma \nnova conta'}
					highlightedWords={['nessa', '\nnova', 'conta']}
					fontSize={16}
					textAlign={'left'}
					SecondSvgIcon={registerMethod ? SmartphoneWhiteIcon : ProfileWhiteIcon}
					svgIconScale={['40%', '30%']}
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
					// label={`voltar \npara ${registerMethod ? 'login' : 'cadastro'}`}
					label={'voltar'}
					highlightedWords={['\npara', 'login']}
					fontSize={16}
					textAlign={'left'}
					SecondSvgIcon={AngleLeftWhiteIcon}
					svgIconScale={['40%', '30%']}
					onPress={closeModal}
				/>
			</Body>
		</CustomModal>
	)
}

export { SocialLoginAlertModal }
