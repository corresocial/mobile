import React, { useEffect, useState, useContext } from 'react'
import { StatusBar } from 'react-native'

import { AuthContext } from '../../../contexts/AuthContext'

import { relativeScreenHeight } from '../../../common/screenDimensions'
import { theme } from '../../../common/theme'
import { ScrollContainer, Container, CardArea } from './styles'

import { PostCollection, PostRange } from '../../../services/firebase/types'
import { SelectSubscriptionRangeScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { BackButton } from '../../../components/_buttons/BackButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { TitleDescriptionButton } from '../../../components/_cards/TitleDescriptionButton'
import { SubtitleCard } from '../../../components/_cards/SubtitleCard'
import { VerticalSigh } from '../../../components/VerticalSigh'
import { RangeChangeConfirmationModal } from '../../../components/_modals/RangeChangeConfirmatiomModal'

function SelectSubscriptionRange({ navigation }: SelectSubscriptionRangeScreenProps) {
	const { userDataContext } = useContext(AuthContext)

	const [currentSubscriptionRange, setCurrentSubscriptionRange] = useState<PostRange>(userDataContext.subscription?.subscriptionRange || 'near')
	const [rangeChangeModalIsVisible, setRangeChangeModalIsVisible] = useState(false)

	useEffect(() => {
		const currentRange = userDataContext.subscription?.subscriptionRange || 'near'
		setCurrentSubscriptionRange(currentRange)
	}, [userDataContext.subscription?.subscriptionRange])

	const manageSubscriptionRange = (postRange: PostRange) => {
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
					toggleRangeChangeModalVisibility()
					return
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

	const postRangeHasSelected = (postRange: PostRange) => {
		return currentSubscriptionRange === postRange
	}
	const toggleRangeChangeModalVisibility = () => {
		setRangeChangeModalIsVisible(!rangeChangeModalIsVisible)
	}

	const getLastUserPost = () => {
		const userPosts: PostCollection[] = userDataContext.posts || []
		const lastUserPost: PostCollection = userPosts[userPosts.length - 1]
		return lastUserPost
	}

	const getLastUserPostLocationcity = () => {
		const lastUserPost: PostCollection = getLastUserPost()
		return lastUserPost?.location?.city || ''
	}

	const renderSelectedRangeCard = () => {
		return rangeCards.map((rangeCard) => {
			if (currentSubscriptionRange === rangeCard.id) {
				/* return ( // ERRO AO PROCESSAR PAGAMENTO
					<TitleDescriptionButton
						height={relativeScreenHeight(13)}
						color={theme.red3}
						textColor={theme.white3}
						title={getRangeText(currentSubscriptionRange)}
						description={'não conseguimos processar seu pagamento'}
						highlightedWords={[getRangeText(currentSubscriptionRange), 'não', 'conseguimos', 'processar', 'seu', 'pagamento']}
						checked={currentSubscriptionRange === 'near'}
						onPress={() => manageSubscriptionRange('near')}
					/>
				) */
				return (
					< >
						{rangeCard.component}
					</>
				)
			}
			return <></>
		})
	}

	const renderUnselectedRangeCard = () => {
		return rangeCards.map((rangeCard) => {
			if (currentSubscriptionRange !== rangeCard.id) {
				return (
					< >
						{rangeCard.component}
						< VerticalSigh />
					</>
				)
			}
			return <></>
		})
	}

	const rangeCards = [
		{
			id: 'near',
			component: <TitleDescriptionButton
				key={'near'}
				height={relativeScreenHeight(20)}
				color={theme.white3}
				title={'região'}
				description={'a pessoas encontram seus posts  no bairro'}
				highlightedWords={['região', 'bairro']}
				footerValue={currentSubscriptionRange === 'near' ? 'edit' : 'free'}
				checked={currentSubscriptionRange === 'near'}
				onPress={() => manageSubscriptionRange('near')}
			/>
		},
		{
			id: 'city',
			component: <TitleDescriptionButton
				key={'city'}
				height={relativeScreenHeight(20)}
				color={theme.white3}
				title={'cidade'}
				description={'seus posts aparecem na cidade inteira, também pode postar em bairros!'}
				highlightedWords={['cidade', 'também', 'pode', 'postar', 'em', 'bairros']}
				footerValue={currentSubscriptionRange === 'city' ? 'edit' : '20'}
				checked={currentSubscriptionRange === 'city'}
				onPress={() => manageSubscriptionRange('city')}
			/>
		},
		{
			id: 'country',
			component: <TitleDescriptionButton
				key={'country'}
				height={relativeScreenHeight(20)}
				color={theme.white3}
				title={'brasil'}
				description={'postagens aparecem em cidades vizinhas e no brasil inteiro.'}
				highlightedWords={['brasil', 'cidades', 'vizinhas', 'no', 'brasil', 'inteiro']}
				footerValue={currentSubscriptionRange === 'country' ? 'edit' : '40'}
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
				currentCity={getLastUserPostLocationcity()}
				onPressButton={() => navigation.navigate('SelectSubscriptionPlan', { postRange: 'city' })}
				closeModal={toggleRangeChangeModalVisibility}
			/>
			<DefaultHeaderContainer
				relativeHeight={relativeScreenHeight(22)}
				centralized
				backgroundColor={theme.white3}
				borderBottomWidth={0}
			>
				<BackButton onPress={() => navigation.goBack()} />
				<InstructionCard
					borderLeftWidth={3}
					fontSize={15}
					title={'alcance corre.'}
					message={'aqui você vê o plano que assinou, outros planos disponíveis'}
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
