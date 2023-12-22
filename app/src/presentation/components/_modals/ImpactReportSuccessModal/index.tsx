import React from 'react'

import LogoCorreOutlinedIcon from '@assets/icons/logo-outlined.svg'
import SloganHashtag from '@assets/imgs/sloganHashtag.svg'

import { CustomModal } from '../CustomModal'

interface ImpactReportSuccessModalProps {
	visibility: boolean
	closeModal?: () => void
}

function ImpactReportSuccessModal({
	visibility,
	closeModal = () => { },
}: ImpactReportSuccessModalProps) {
	return (
		<CustomModal
			visibility={visibility}
			title={'obrigado!'}
			titleAlign={'center'}
			TitleIcon={LogoCorreOutlinedIcon}
			firstParagraph={{
				text: 'com a sua resposta podemos melhorar nosso trabalho e impacto social!',
				textAlign: 'center',
				fontSize: 14
			}}
			TextSvg={SloganHashtag}
			closeModal={closeModal}
			affirmativeButton={{
				label: 'tamo junto!',
				onPress: closeModal
			}}
		/>
	)
}

export { ImpactReportSuccessModal }
