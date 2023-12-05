import React from 'react'

import { PostType } from '@services/firebase/types'

import { Container, HorizontalPostTypes } from './styles'
import CashWhiteIcon from '@assets/icons/cash-white.svg'
import CitizenshipTextWhite from '@assets/icons/citizenshipText-white.svg'
import CultureWhiteIcon from '@assets/icons/culture-white.svg'
import CultureTextWhite from '@assets/icons/cultureText-white.svg'
import IncomeTextWhite from '@assets/icons/incomeText-white.svg'
import SocialImpactWhiteIcon from '@assets/icons/socialImpact-white.svg'
import { relativeScreenWidth } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { SmallButton } from '@components/_buttons/SmallButton'

interface HomeCatalogProps {
	navigateToScreen: (postType: PostType) => void
}

function HomeCatalogMenu({ navigateToScreen }: HomeCatalogProps) {
	return (
		<Container>
			<HorizontalPostTypes>
				<SmallButton
					relativeWidth={relativeScreenWidth(26)}
					height={relativeScreenWidth(15)}
					color={theme.green3}
					fontSize={7.5}
					onPress={() => navigateToScreen('income')}
					labelColor={theme.white3}
					SvgIcon={CashWhiteIcon}
					SecondSvgIcon={IncomeTextWhite}
					svgScale={['45%', '80%']}
					secondSvgScale={['24%', '70%']}
					flexDirection={'column'}
				/>
				<SmallButton
					relativeWidth={relativeScreenWidth(26)}
					height={relativeScreenWidth(15)}
					color={theme.pink3}
					fontSize={7.5}
					onPress={() => navigateToScreen('socialImpact')}
					labelColor={theme.white3}
					SvgIcon={SocialImpactWhiteIcon}
					SecondSvgIcon={CitizenshipTextWhite}
					svgScale={['45%', '80%']}
					secondSvgScale={['24%', '70%']}
					flexDirection={'column'}
				/>
				<SmallButton
					relativeWidth={relativeScreenWidth(26)}
					height={relativeScreenWidth(15)}
					color={theme.blue3}
					fontSize={7.5}
					onPress={() => navigateToScreen('culture')}
					labelColor={theme.white3}
					SvgIcon={CultureWhiteIcon}
					SecondSvgIcon={CultureTextWhite}
					svgScale={['45%', '80%']}
					secondSvgScale={['24%', '70%']}
					flexDirection={'column'}
				/>
			</HorizontalPostTypes>
		</Container>
	)
}

export { HomeCatalogMenu }
