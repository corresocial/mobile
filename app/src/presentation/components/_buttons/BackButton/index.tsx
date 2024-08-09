import React from 'react'

import AngleLeftIcon from '@assets/icons/angleLeft-white.svg'
import { relativeScreenDensity, relativeScreenWidth } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { HorizontalSpacing } from '@components/_space/HorizontalSpacing'

import { SmallButton } from '../SmallButton'

interface BackButtonProps {
	withoutRightSpacing?: boolean
	onPress: () => void
}

function BackButton({ withoutRightSpacing, onPress }: BackButtonProps) {
	return (
		<>
			<SmallButton
				relativeWidth={relativeScreenWidth(11)}
				height={relativeScreenWidth(11)}
				color={theme.colors.white[3]}
				SvgIcon={AngleLeftIcon}
				onPress={onPress}
				svgScale={['55%', '55%']}
			/>
			<HorizontalSpacing width={withoutRightSpacing ? 0 : relativeScreenDensity(10)} />
		</>
	)
}

export { BackButton }
