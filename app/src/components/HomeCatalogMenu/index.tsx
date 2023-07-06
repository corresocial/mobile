import React from 'react'

import { Container, HorizontalPostTypes } from './styles'
import { relativeScreenWidth } from '../../common/screenDimensions'
import { theme } from '../../common/theme'
import SocialImpactIcon from '../../assets/icons/socialImpact-filled.svg'
import CommerceIcon from '../../assets/icons/commerce.svg'
import CultureIcon from '../../assets/icons/culture-filled.svg'
import ServiceIcon from '../../assets/icons/service-filled.svg'
import VacancyIcon from '../../assets/icons/vacancy-filled.svg'

import { PostType } from '../../services/firebase/types'

import { SmallButton } from '../_buttons/SmallButton'

interface HomeCatalogProps {
	navigateToScreen: (postType: PostType) => void
}

function HomeCatalogMenu({ navigateToScreen }: HomeCatalogProps) {
	return (
		<Container>
			<HorizontalPostTypes>
				<SmallButton
					relativeWidth={relativeScreenWidth(15)}
					height={relativeScreenWidth(15)}
					color={'white'}
					fontSize={7.5}
					onPress={() => navigateToScreen('socialImpact')}
					label={'impacto'}
					labelColor={theme.black4}
					SvgIcon={SocialImpactIcon}
					svgScale={['50%', '80%']}
					flexDirection={'column'}
				/>
				<SmallButton
					relativeWidth={relativeScreenWidth(15)}
					height={relativeScreenWidth(15)}
					color={'white'}
					fontSize={7.5}
					onPress={() => navigateToScreen('sale')}
					label={'comércio'}
					labelColor={theme.black4}
					SvgIcon={CommerceIcon}
					svgScale={['50%', '80%']}
					flexDirection={'column'}
				/>
				<SmallButton
					relativeWidth={relativeScreenWidth(15)}
					height={relativeScreenWidth(15)}
					color={'white'}
					fontSize={7.5}
					onPress={() => navigateToScreen('culture')}
					label={'cultura'}
					labelColor={theme.black4}
					SvgIcon={CultureIcon}
					svgScale={['50%', '80%']}
					flexDirection={'column'}
				/>
				<SmallButton
					relativeWidth={relativeScreenWidth(15)}
					height={relativeScreenWidth(15)}
					color={'white'}
					fontSize={7.5}
					onPress={() => navigateToScreen('service')}
					label={'serviços'}
					labelColor={theme.black4}
					SvgIcon={ServiceIcon}
					svgScale={['50%', '80%']}
					flexDirection={'column'}
				/>
				<SmallButton
					relativeWidth={relativeScreenWidth(15)}
					height={relativeScreenWidth(15)}
					color={'white'}
					fontSize={7.5}
					onPress={() => navigateToScreen('vacancy')}
					label={'vagas'}
					labelColor={theme.black4}
					SvgIcon={VacancyIcon}
					svgScale={['50%', '80%']}
					flexDirection={'column'}
				/>
			</HorizontalPostTypes>
		</Container>
	)
}

export { HomeCatalogMenu }
