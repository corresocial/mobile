import React from 'react'

import { SubscriptionAdContainer, Container } from './styles'
import CalendarWhiteIcon from '@assets/icons/calendar.svg'
import { relativeScreenHeight } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { OptionButton } from '@components/_buttons/OptionButton'
import { SubscriptionButton } from '@components/_buttons/SubscriptionButton'
import { CustomCarousel } from '@components/CustomCarousel'

interface AdsCarouselProps {
	onPressCorreAd?: () => void
	onPressUserLocationAd?: () => void
	onPressPublicServicesAd?: () => void
	onPressEventCalendarAd?: () => void
}

function AdsCarousel({ onPressCorreAd, onPressUserLocationAd, onPressPublicServicesAd, onPressEventCalendarAd }: AdsCarouselProps) {
	return (
		<Container>
			<CustomCarousel activeIndicatorColor={theme.white3}>
				{/* <SubscriptionAdContainer>
					<UserLocationAdButton onPress={() => onPressUserLocationAd && onPressUserLocationAd()} />
				</SubscriptionAdContainer> */}
				{/* <SubscriptionAdContainer>
					<PublicServicesAdButton onPress={() => onPressPublicServicesAd && onPressPublicServicesAd()} />
				</SubscriptionAdContainer> */}
				<SubscriptionAdContainer>
					<SubscriptionButton onPress={() => onPressCorreAd && onPressCorreAd()} />
				</SubscriptionAdContainer>
				<SubscriptionAdContainer>
					<OptionButton
						color={theme.white3}
						label={'calendário de eventos'}
						highlightedWords={['eventos']}
						labelSize={17}
						relativeHeight={relativeScreenHeight(12)}
						shortDescription={'você de Londrina, aqui você pode saber todos os rolês da cidade'}
						shortDescriptionHighlightedWords={['Londrina,', 'benefícios!', 'seus']}
						SvgIcon={CalendarWhiteIcon}
						svgIconScale={['80%', '80%']}
						leftSideColor={theme.blue3}
						leftSideWidth={'25%'}
						onPress={() => onPressEventCalendarAd && onPressEventCalendarAd()}
					/>
				</SubscriptionAdContainer>
			</CustomCarousel>
		</Container>
	)
}

export { AdsCarousel }
