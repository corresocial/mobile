import React from 'react'

import { ApproveFlowContainer } from './styles'
import ApproveFlowWhiteIcon from '@assets/icons/approveFlow-white.svg'
import ClockArrowWhiteIcon from '@assets/icons/clockArrow-white.svg'
import { relativeScreenDensity } from '@common/screenDimensions'

import { CustomModal } from '../CustomModal'

interface WaitingApproveModalProps {
	visibility: boolean
	closeModal?: () => void
}

function WaitingApproveModal({
	visibility,
	closeModal = () => { },
}: WaitingApproveModalProps) {
	return (
		<CustomModal
			visibility={visibility}
			title={'aguardando aprovação'}
			titleAlign={'center'}
			TitleIcon={ClockArrowWhiteIcon}
			firstParagraph={{
				text: 'seu post foi salvo e está aguardando aprovação de um líder.',
				highlightedWords: ['aguardando', 'aprovação', 'de', 'um', 'líder'],
				textAlign: 'center',
				fontSize: 14
			}}
			closeModal={closeModal}
			affirmativeButton={{
				label: 'entendi',
				onPress: closeModal
			}}
		>
			<ApproveFlowContainer>
				<ApproveFlowWhiteIcon height={relativeScreenDensity(50)} width={relativeScreenDensity(150)}/>
			</ApproveFlowContainer>
		</CustomModal>
	)
}

export { WaitingApproveModal }
