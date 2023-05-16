import React from 'react'

import { SkipButtonContainer } from './styles'
import DeniedWhiteIcon from '../../../assets/icons/denied-white.svg'
import { theme } from '../../../common/theme'

import { PrimaryButton } from '../PrimaryButton'

interface SkipButtonProps {
	customText?: string
	customHighlight?: string[]
	onPress?: () => void
}

function SkipButton({ customText, customHighlight, onPress }: SkipButtonProps) {
	return (
		<SkipButtonContainer>
			<PrimaryButton
				flexDirection={'row-reverse'}
				color={theme.yellow3}
				label={customText || 'pular'}
				highlightedWords={customHighlight || ['pular']}
				labelColor={theme.black4}
				SecondSvgIcon={DeniedWhiteIcon}
				svgIconScale={['50%', '18%']}
				onPress={() => onPress && onPress()}
			/>
		</SkipButtonContainer>
	)
}

export { SkipButton }
