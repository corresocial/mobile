import React from 'react'

import AngleLeftIcon from '../../../assets/icons/angleLeft-white.svg'
import { SmallButton } from '../SmallButton'
import { relativeScreenWidth } from '../../../common/screenDimensions'
import { theme } from '../../../common/theme'
import { Sigh } from './styles'

interface BackButtonProps {
	withoutSigh?: boolean
	onPress: () => void
}

function BackButton({ withoutSigh, onPress }: BackButtonProps) {
	return (
		<>
			<SmallButton
				relativeWidth={relativeScreenWidth(11)}
				height={relativeScreenWidth(11)}
				color={theme.white3}
				SvgIcon={AngleLeftIcon}
				onPress={onPress}
				svgScale={['55%', '55%']}
			/>
			<Sigh withoutSigh={!withoutSigh} />
		</>
	)
}

export { BackButton }
