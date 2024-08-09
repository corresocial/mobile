import React from 'react'

import { Body, Description } from './styles'
import AngleLeftWhiteIcon from '@assets/icons/angleLeft-white.svg'
import GoogleWhiteIcon from '@assets/icons/google-white.svg'
import ProfileWhiteIcon from '@assets/icons/profile-white.svg'
import SmartphoneWhiteIcon from '@assets/icons/smartphone-white.svg'
import { showMessageWithHighlight } from '@common/auxiliaryFunctions'
import { theme } from '@common/theme'

import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'

import { DescriptionWithLeftTracing } from '../../DescriptionWithLeftTracing'
import { CustomModal } from '../CustomModal'

interface SocialLoginAlertModalProps {
	visibility: boolean
	registerMethod?: boolean
	linking?: boolean
	hasError?: boolean
	accountIdentifier?: string
	closeModal: () => void
	onPressButton: () => void
}

function SocialLoginAlertModal({
	visibility,
	accountIdentifier,
	registerMethod,
	linking,
	hasError,
	closeModal,
	onPressButton
}: SocialLoginAlertModalProps) {
	const getRelativeAlertText = () => {
		if (hasError) return 'tivemos um erro ao tentar utilizar essa conta google'

		if (accountIdentifier && accountIdentifier?.includes('+55')) {
			return `parece que ${registerMethod ? 'já' : 'não'} existe uma conta corre. com esse número`
		}

		return `parece que ${registerMethod ? 'já' : 'não'} existe uma conta corre. vinculada a essa conta google`
	}

	const getFormatedCellNumber = () => {
		if (!accountIdentifier) return ''
		const numbetWithoutCountryCode = accountIdentifier.slice(3)
		const numberWithDDDSpace = `${numbetWithoutCountryCode.slice(0, 2)} ${numbetWithoutCountryCode.slice(2)}`
		return numberWithDDDSpace
	}

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
							getRelativeAlertText(),
							['corre', 'vinculada', 'conta', 'google', 'a', 'esse', 'número', 'não', 'existe', 'já', 'erro'],
						)
					}
				</Description>
				<VerticalSpacing height={3} />
				{
					accountIdentifier && (
						<>
							<DescriptionWithLeftTracing
								text={accountIdentifier?.includes('+55') ? getFormatedCellNumber() : accountIdentifier}
							/>
							<VerticalSpacing height={3} />
						</>
					)
				}
				{
					!linking && (
						<PrimaryButton
							keyboardHideButton={false}
							color={theme.colors.green[3]}
							labelColor={theme.colors.white[3]}
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
					)
				}
				<VerticalSpacing height={2} />
				<PrimaryButton
					keyboardHideButton={false}
					color={theme.colors.white[3]}
					labelColor={theme.colors.black[4]}
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
