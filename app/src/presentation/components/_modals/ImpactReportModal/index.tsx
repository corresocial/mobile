import React from 'react'

import CheckLabelWhiteIcon from '@assets/icons/checkLabel-white.svg'

import { CustomModal } from '../CustomModal'

interface ImpactReportModalProps {
	visibility: boolean
	onPressButton: (impactValue?: string) => void
	closeModal?: () => void
}

function ImpactReportModal({
	visibility,
	closeModal = () => { },
	onPressButton
}: ImpactReportModalProps) {
	return (
		<CustomModal
			visibility={visibility}
			title={'marcar como finalizado'}
			titleAlign={'center'}
			TitleIcon={CheckLabelWhiteIcon}
			firstParagraph={{
				text: 'precisamos da sua ajuda para medir o impacto do aplicativo.',
				textAlign: 'center'
			}}
			secondParagraph={{
				text: 'esse corre te ajudou? \nqual foi o valor aproximado?',
				highlightedWords: ['esse', 'corre', 'te', 'ajudou', '\nqual', 'foi', 'o', 'valor'],
				textAlign: 'center',
				fontSize: 14
			}}
			customInput={{
				placeholder: 'ex: 21,00',
				keyboardType: 'numeric'

			}}
			closeModal={closeModal}
			affirmativeButton={{
				label: 'finalizar',
				onPress: onPressButton
			}}
			negativeButton={{
				label: 'cancelar',
				onPress: closeModal
			}}
		/>
	)
}

export { ImpactReportModal }
