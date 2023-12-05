import React, { useEffect, useState, useContext } from 'react'
import { StatusBar } from 'react-native'

import { AuthContext } from '@contexts/AuthContext'
import { StripeContext } from '@contexts/StripeContext'

import { PostCollection, PostRange } from '@services/firebase/types'

import { ScrollContainer, Container, CardArea } from './styles'
import { relativeScreenHeight } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { BackButton } from '@components/_buttons/BackButton'
import { InstructionCard } from '@components/_cards/InstructionCard'
import { SubtitleCard } from '@components/_cards/SubtitleCard'
import { TitleDescriptionButton } from '@components/_cards/TitleDescriptionButton'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { RangeChangeConfirmationModal } from '@components/_modals/RangeChangeConfirmatiomModal'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'

import { SelectSubscriptionRangeScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'
import { UiLocationUtils } from '../../../utils-ui/location/UiLocationUtils'
import { UiSubscriptionUtils } from '../../../utils-ui/subscription/UiSubscriptionUtils'

const { getPostRangeLabel } = UiSubscriptionUtils()
const { getTextualAddress } = UiLocationUtils()

function SelectSubscriptionRange({ navigation }: SelectSubscriptionRangeScreenProps) {
	const { userDataContext, getLastUserPost } = useContext(AuthContext)
	const { stripeProductsPlans, subscriptionHasActive } = useContext(StripeContext)

	const [currentSubscriptionRange, setCurrentSubscriptionRange] = useState<PostRange>(userDataContext.subscription?.subscriptionRange || 'near')
	const [rangeChangeModalIsVisible, setRangeChangeModalIsVisible] = useState(false)

	useEffect(() => {
		const currentRange = userDataContext.subscription?.subscriptionRange || 'near'
		setCurrentSubscriptionRange(currentRange)
	}, [userDataContext.subscription?.subscriptionRange])

	const manageSubscriptionRange = async (postRange: PostRange) => {
		switch (postRange) {
			case 'near': {
				if (postRangeHasSelected(postRange)) return
				const leaveFromPaidSubscription = postRange !== currentSubscriptionRange ? currentSubscriptionRange : ''
				navigation.navigate('EditCurrentSubscription', { postRange: leaveFromPaidSubscription ? currentSubscriptionRange : 'near', leaveFromPaidSubscription })
				break
			}
			case 'city': {
				if (postRangeHasSelected(postRange)) {
					return navigation.navigate('EditCurrentSubscription', { postRange })
				}

				if (userDataContext.subscription?.subscriptionRange === 'country') {
					if (userHasAnyPost()) {
						toggleRangeChangeModalVisibility()
						return
					}
				}

				navigation.navigate('SelectSubscriptionPlan', { postRange })
				break
			}
			case 'country': {
				if (postRangeHasSelected(postRange)) {
					return navigation.navigate('EditCurrentSubscription', { postRange })
				}
				navigation.navigate('SelectSubscriptionPlan', { postRange })
				break
			}
			default: return false
		}
	}

	const userHasAnyPost = () => {
		return userDataContext.posts && userDataContext.posts.length
	}

	const postRangeHasSelected = (postRange: PostRange) => {
		return currentSubscriptionRange === postRange
	}
	const toggleRangeChangeModalVisibility = () => {
		setRangeChangeModalIsVisible(!rangeChangeModalIsVisible)
	}

	const getLastPostAddress = () => {
		const lastUserPost: PostCollection = getLastUserPost()
		return getTextualAddress(lastUserPost?.location)
	}

	const renderSelectedRangeCard = () => {
		return rangeCards.map((rangeCard) => {
			if (currentSubscriptionRange === rangeCard.id) {
				if (!subscriptionHasActive) {
					return (
						<TitleDescriptionButton
							key={'planError'}
							height={relativeScreenHeight(13)}
							color={theme.red3}
							textColor={theme.white3}
							title={getPostRangeLabel(currentSubscriptionRange)}
							description={'não conseguimos processar seu pagamento'}
							highlightedWords={[getPostRangeLabel(currentSubscriptionRange), 'não', 'conseguimos', 'processar', 'seu', 'pagamento']}
							// checked={currentSubscriptionRange === rangeCard.id}
							onPress={() => manageSubscriptionRange('near')}
						/>
					)
				}

				return (
					<React.Fragment key={rangeCard.id}>
						{rangeCard.component}
					</React.Fragment>
				)
			}
			return null
		})
	}

	const renderUnselectedRangeCard = () => {
		return rangeCards.map((rangeCard) => {
			if (currentSubscriptionRange !== rangeCard.id) {
				return (
					<React.Fragment key={rangeCard.id}>
						{rangeCard.component}
						<VerticalSpacing />
					</React.Fragment>
				)
			}
			return null
		})
	}

	const rangeCards = [
		{
			id: 'near' as PostRange,
			component: <TitleDescriptionButton
				height={relativeScreenHeight(20)}
				color={theme.white3}
				title={'região'}
				description={'a pessoas encontram seus posts  no bairro'}
				highlightedWords={['região', 'bairro']}
				footerValue={'free'}
				checked={currentSubscriptionRange === 'near'}
				onPress={() => manageSubscriptionRange('near')}
			/>
		},
		{
			id: 'city' as PostRange,
			component: <TitleDescriptionButton
				height={relativeScreenHeight(20)}
				color={theme.white3}
				title={'cidade'}
				description={'seus posts aparecem na cidade inteira, também pode postar em bairros!'}
				highlightedWords={['cidade', 'também', 'pode', 'postar', 'em', 'bairros']}
				footerValue={currentSubscriptionRange === 'city' ? 'edit' : stripeProductsPlans.cityMonthly.price}
				checked={currentSubscriptionRange === 'city'}
				onPress={() => manageSubscriptionRange('city')}
			/>
		},
		{
			id: 'country' as PostRange,
			component: <TitleDescriptionButton
				height={relativeScreenHeight(20)}
				color={theme.white3}
				title={'brasil'}
				description={'postagens aparecem em cidades vizinhas e no brasil inteiro.'}
				highlightedWords={['brasil', 'cidades', 'vizinhas', 'no', 'brasil', 'inteiro']}
				footerValue={currentSubscriptionRange === 'country' ? 'edit' : stripeProductsPlans.countryMonthly.price}
				checked={currentSubscriptionRange === 'country'}
				onPress={() => manageSubscriptionRange('country')}
			/>
		}
	]

	return (
		<Container>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<RangeChangeConfirmationModal
				visibility={rangeChangeModalIsVisible}
				newRangeSelected={'city'}
				currentPostAddress={getLastPostAddress()}
				onPressButton={() => navigation.navigate('SelectSubscriptionPlan', { postRange: 'city' })}
				closeModal={toggleRangeChangeModalVisibility}
			/>
			<DefaultHeaderContainer
				relativeHeight={relativeScreenHeight(30)}
				grow
				centralized
				backgroundColor={theme.white3}
				borderBottomWidth={0}
			>
				<BackButton onPress={() => navigation.goBack()} />
				<InstructionCard
					borderLeftWidth={3}
					fontSize={14}
					title={'assinatura corre.'}
					message={'com uma assinatura você alcança mais clientes E ao mesmo tempo apoia nossa iniciativa social'}
					highlightedWords={['corre']}
				/>
			</DefaultHeaderContainer>
			<ScrollContainer showsVerticalScrollIndicator={false}>
				<SubtitleCard text={'seu plano'} highlightedText={['seu']} />
				<CardArea>
					{renderSelectedRangeCard()}
				</CardArea>
				<SubtitleCard text={'outros planos'} highlightedText={['outros']} />
				<CardArea>
					{renderUnselectedRangeCard()}
				</CardArea>
			</ScrollContainer>
		</Container>
	)
}

export { SelectSubscriptionRange }
