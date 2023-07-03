import React from 'react'
import { CustomModal } from '../CustomModal'

interface SubscriptionAlertModalProps {
	numberOfExpiredDays: number
	visibility: boolean
	closeModal: () => void
	onPressButton: () => void
}

function SubscriptionAlertModal({ numberOfExpiredDays, visibility, closeModal, onPressButton }: SubscriptionAlertModalProps) {
	const remainingSubscriptionDays = (7 - numberOfExpiredDays || 0)

	const getRelativeFirstParagraph = () => {
		return remainingSubscriptionDays >= 0 && remainingSubscriptionDays < 8
			? {
				text: `sua assinatura não pode ser renovada e será cancelada em ${remainingSubscriptionDays || 'menos de 1'} ${remainingSubscriptionDays <= 1 ? 'dia' : 'dias'}`,
				highlightedWords: [`${remainingSubscriptionDays}`, 'dias', 'alguns', 'dia', 'menos', 'de', '1']
			}
			: {
				text: 'Sua assinatura não pode ser renovada e foi cancelada!',
				highlightedWords: ['assinatura', 'cancelada!']
			}
	}

	const secondParagraph = remainingSubscriptionDays >= 0 && remainingSubscriptionDays < 8
		? {
			text: 'verifique sua forma de pagamento ou cancele seu plano',
			highlightedWords: ['verifique', 'sua', 'forma', 'de', 'pagamento', 'cancele', 'seu', 'plano']
		}
		: {
			text: 'assine um plano para poder usufruir de todos os benefícios do corre.',
			highlightedWords: ['corre', 'assine', 'um', 'plano']
		}

	return (
		<CustomModal
			visibility={visibility}
			title={'opa!'}
			firstParagraph={getRelativeFirstParagraph()}
			secondParagraph={{ ...secondParagraph }}
			closeModal={closeModal}
			affirmativeButton={{
				label: 'entendi',
				onPress: onPressButton
			}}
		/>
	)
}

export { SubscriptionAlertModal }
