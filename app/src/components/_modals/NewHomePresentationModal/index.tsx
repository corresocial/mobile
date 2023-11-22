import React from 'react'

import { CustomModal } from '../CustomModal'

import { Container } from './styles'
import NewHomePresentationIcon from '../../../assets/imgs/newHomePresentation.svg'
import { VerticalSpacing } from '../../_space/VerticalSpacing'

interface NewHomePresentationModalProps {
	visibility: boolean
	closeModal: () => void
	onPressButton: () => void
}

function NewHomePresentationModal({
	visibility,
	closeModal,
	onPressButton
}: NewHomePresentationModalProps) {
	return (
		<CustomModal
			visibility={visibility}
			title={'nova organização!'}
			titleHighlightedWords={['nova']}
			titleAlign={'center'}
			closeModal={closeModal}
			firstParagraph={{
				text: 'serviços, vagas e vendas agora formam a nova sessão de renda',
				highlightedWords: ['serviços', 'vagas', 'vendas', 'renda'],
				textAlign: 'center'
			}}
			affirmativeButton={{
				label: 'entendi',
				onPress: onPressButton
			}}
		>
			<Container>
				<NewHomePresentationIcon width={'100%'} height={'100%'} />
			</Container>
			<VerticalSpacing />
		</CustomModal>
	)
}

export { NewHomePresentationModal }
