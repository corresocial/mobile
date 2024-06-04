import React from 'react'

import { SubscriptionAdContainer, Container } from './styles'
import { theme } from '@common/theme'

import { PublicServicesAdButton } from '@components/_buttons/PublicServicesAdButton'
import { SubscriptionButton } from '@components/_buttons/SubscriptionButton'
import { UserLocationAdButton } from '@components/_buttons/UserLocationAdButton'
import { CustomCarousel } from '@components/CustomCarousel'

interface AdsCarouselProps {
	onPressCorreAd?: () => void
	onPressUserLocationAd?: () => void
	onPressPublicServicesAd?: () => void
}

function AdsCarousel({ onPressCorreAd, onPressUserLocationAd, onPressPublicServicesAd }: AdsCarouselProps) {
	return (
		<Container>
			<CustomCarousel activeIndicatorColor={theme.white3}>
				<SubscriptionAdContainer>
					<UserLocationAdButton onPress={() => onPressUserLocationAd && onPressUserLocationAd()} />
				</SubscriptionAdContainer>
				<SubscriptionAdContainer>
					<PublicServicesAdButton onPress={() => onPressPublicServicesAd && onPressPublicServicesAd()} />
				</SubscriptionAdContainer>
				<SubscriptionAdContainer>
					<SubscriptionButton onPress={() => onPressCorreAd && onPressCorreAd()} />
				</SubscriptionAdContainer>
			</CustomCarousel>
		</Container>
	)
}

export { AdsCarousel }
