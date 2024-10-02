import { useNavigation } from '@react-navigation/native'
import React from 'react'

import { checkFreeTrialRange } from '@services/stripe/checkFreeTrialRange'

import { SubscriptionAdContainer, Container } from './styles'
import CalendarWhiteIcon from '@assets/icons/calendar.svg'
import { relativeScreenHeight } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { OptionButton } from '@components/_buttons/OptionButton'
import { PublicServicesAdButton } from '@components/_buttons/PublicServicesAdButton'
import { SubscriptionButton } from '@components/_buttons/SubscriptionButton'
import { CustomCarousel } from '@components/CustomCarousel'

interface AdsCarouselProps {
	onPressCorreAd?: () => void
	onPressUserLocationAd?: () => void
	onPressPublicServicesAd?: () => void
	onPressEventCalendarAd?: () => void
}

function AdsCarousel({ onPressCorreAd, onPressUserLocationAd, onPressPublicServicesAd, onPressEventCalendarAd }: AdsCarouselProps) {
	const userRange = checkFreeTrialRange('city')

	const navigation = useNavigation<any>()

	const navigateToPostScreen = () => {
		navigation.navigate('Post')
	}

	const promotionTitle = 'PROMOÇÃO'
	const promotionText = 'aproveite 3 meses gratuitos de nosso aplicativo para alcançar a cidade ou o país todo com suas postagens!'

	return (
		<Container>
			<CustomCarousel activeIndicatorColor={theme.colors.white[3]}>
				<SubscriptionAdContainer>
					<PublicServicesAdButton onPress={() => onPressPublicServicesAd && onPressPublicServicesAd()} />
				</SubscriptionAdContainer>
				{/* <SubscriptionAdContainer>
					<UserLocationAdButton onPress={() => onPressUserLocationAd && onPressUserLocationAd()} />
				</SubscriptionAdContainer> */}
				{
					userRange.betweenRange
						? (
							<SubscriptionAdContainer>
								<SubscriptionButton
									customTitle={promotionTitle}
									customDescription={promotionText}
									onPress={navigateToPostScreen}
								/>
							</SubscriptionAdContainer>
						)
						: (
							<SubscriptionAdContainer>
								<SubscriptionButton
									onPress={() => onPressCorreAd && onPressCorreAd()}
								/>
							</SubscriptionAdContainer>
						)
				}
				<SubscriptionAdContainer>
					<OptionButton
						color={theme.colors.white[3]}
						label={'calendário de eventos'}
						highlightedWords={['eventos']}
						labelSize={17}
						relativeHeight={relativeScreenHeight(12)}
						shortDescription={'você de Londrina, aqui você pode saber todos os rolês da cidade'}
						shortDescriptionHighlightedWords={['Londrina,', 'benefícios!', 'seus']}
						SvgIcon={CalendarWhiteIcon}
						svgIconScale={['80%', '80%']}
						leftSideColor={theme.colors.blue[3]}
						leftSideWidth={'25%'}
						onPress={() => onPressEventCalendarAd && onPressEventCalendarAd()}
					/>
				</SubscriptionAdContainer>
			</CustomCarousel>
		</Container>
	)
}

export { AdsCarousel }
