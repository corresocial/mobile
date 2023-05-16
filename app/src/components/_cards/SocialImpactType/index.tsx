import React from 'react'
import { DefaultHeaderTitle } from '../../DefaultHeaderTitle'

import PinWhiteIcon from '../../../assets/icons/pin-white.svg'
import PaperInfoWhite from '../../../assets/icons/paperInfo-white.svg'
import HeartAndPersonWhiteIcon from '../../../assets/icons/heartAndPerson-white.svg'
import HandOnHeartWhiteIcon from '../../../assets/icons/handOnHeart-white.svg'

import { showMessageWithHighlight } from '../../../common/auxiliaryFunctions'

import { SocialImpactType } from '../../../services/firebase/types'

import { DefaultCardContainer } from '../DefaultCardContainer'
import { PostInfoRow } from '../../PostInfoRow'
import { EditHeaderContainer } from '../../_containers/EditHeaderContainer'

interface SocialImpactTypeCardProps {
	title?: string
	socialImpactType?: SocialImpactType
	hightligtedWords?: string[]
	onEdit?: () => void
}

function SocialImpactTypeCard({ title, socialImpactType, hightligtedWords, onEdit }: SocialImpactTypeCardProps) {
	const getRelativeSocialImpactType = () => {
		switch (socialImpactType) {
			case 'informative': return showMessageWithHighlight('conteúdo informativo', ['informativo'])
			case 'iniciative': return showMessageWithHighlight('iniciativa social', ['social'])
			case 'donation': return showMessageWithHighlight('doação ou voluntariado', ['doação', 'voluntariado'])
			default: return showMessageWithHighlight('tipo indisponível', ['indisponível'])
		}
	}

	const getRelativeValueIcon = () => {
		switch (socialImpactType) {
			case 'informative': return PaperInfoWhite
			case 'iniciative': return HeartAndPersonWhiteIcon
			case 'donation': return HandOnHeartWhiteIcon
			default: return PinWhiteIcon
		}
	}

	return (
		<DefaultCardContainer>
			<EditHeaderContainer onPress={onEdit}>
				<DefaultHeaderTitle
					title={title || 'tipo de post'}
					highlightedWords={hightligtedWords || ['tipo']}
					dimensions={30}
				/>
			</EditHeaderContainer>
			<PostInfoRow
				text={getRelativeSocialImpactType()}
				SvgIcon={getRelativeValueIcon()}
			/>
		</DefaultCardContainer>
	)
}

export { SocialImpactTypeCard }
