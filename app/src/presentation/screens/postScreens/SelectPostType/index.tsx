import React, { useContext, useEffect, useState } from 'react'

import { PostType } from '@domain/post/entity/types'

import { usePostRepository } from '@data/post/usePostRepository'

import { AuthContext } from '@contexts/AuthContext'

import { SelectPostTypeScreenProps } from '@routes/Stack/UserStack/screenProps'
import { MacroCategoriesType } from '@utils/postMacroCategories/types'

import { getNetworkStatus } from '@utils/deviceNetwork'

import { CardsContainer, CardsContent, Container, SubscriptionButtonContainer } from './styles'
import DescriptionWhiteIcon from '@assets/icons/description-white.svg'
import HandOnMoneyWhiteIcon from '@assets/icons/handOnMoney-white.svg'
import WirelessOffWhiteIcon from '@assets/icons/wirelessOff-white.svg'
import WirelessOnWhiteIcon from '@assets/icons/wirelessOn-white.svg'
import { theme } from '@common/theme'

import { OptionButton } from '@components/_buttons/OptionButton'
import { SubscriptionButton } from '@components/_buttons/SubscriptionButton'
import { LargeCard } from '@components/_cards/LargeCard'
import { SubtitleCard } from '@components/_cards/SubtitleCard'
import { SubscriptionPresentationModal } from '@components/_modals/SubscriptionPresentationModal'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { FocusAwareStatusBar } from '@components/FocusAwareStatusBar'
import { ScreenContainer } from '@newComponents/ScreenContainer'

const { localStorage } = usePostRepository()

type RedirectStacks = 'IncomeStack' | 'SocialImpactStack' | 'CultureStack'

function SelectPostType({ navigation }: SelectPostTypeScreenProps) {
	const { userDataContext } = useContext(AuthContext)

	const [subscriptionModalIsVisible, setSubscriptionModalIsVisible] = useState(false)
	const [hasNetworkConnection, setHasNetworkConnection] = useState(false)
	const [numberOfOfflinePostsStored, setNumberOfOfflinePostsStored] = useState(0)

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			checkNetworkConnection()
			checkHasOfflinePosts()
		})

		return unsubscribe
	}, [navigation])

	const checkHasOfflinePosts = async () => {
		const numberOfOfflinePosts = await localStorage.getNumberOfOfflinePosts()
		setNumberOfOfflinePostsStored(numberOfOfflinePosts)
	}

	const checkNetworkConnection = async () => {
		const networkStatus = await getNetworkStatus()
		setHasNetworkConnection(!!networkStatus.isConnected && !!networkStatus.isInternetReachable)
	}

	const navigateToSelectSubscriptionRange = () => {
		navigation.navigate('SelectSubscriptionRange')
	}

	const selectPostMacroCategory = (routeNavigate: RedirectStacks, postType: PostType, macroCategory: MacroCategoriesType) => {
		navigation.navigate(routeNavigate as any, { postType, macroCategory })
	}

	const adSubscriptionHandle = () => {
		setSubscriptionModalIsVisible(true)
	}

	const profilePictureUrl = userDataContext.profilePictureUrl ? userDataContext.profilePictureUrl[0] : ''

	const cardDimensions = { relativeWidth: 28, relativeHeight: 110 }

	return (
		<ScreenContainer topSafeAreaColor={theme.colors.orange[3]}>
			<FocusAwareStatusBar backgroundColor={theme.colors.orange[3]} barStyle={'dark-content'} />
			<Container>
				<SubscriptionPresentationModal
					visibility={subscriptionModalIsVisible}
					profilePictureUri={profilePictureUrl}
					closeModal={() => setSubscriptionModalIsVisible(false)}
					onPressButton={navigateToSelectSubscriptionRange}
				/>
				<SubtitleCard
					text={'O que você quer postar?'}
					highlightedText={['postar?']}
					backgroundColor={theme.colors.orange[3]}
					fontSize={theme.fontSizes[7]}
					SvgIcon={DescriptionWhiteIcon}
				/>
				<CardsContainer>
					<CardsContent>
						<LargeCard
							{...cardDimensions}
							text={'Serviços'}
							icon={'nailPolishAndScissors'}
							tone={'green'}
							onPress={() => selectPostMacroCategory('IncomeStack', 'income', 'service')}
						/>
						<LargeCard
							{...cardDimensions}
							text={'Comércio'}
							icon={'cash'}
							tone={'green'}
							onPress={() => selectPostMacroCategory('IncomeStack', 'income', 'sale')}
						/>
						<LargeCard
							{...cardDimensions}
							text={'Vagas'}
							icon={'briefcase'}
							tone={'green'}
							onPress={() => selectPostMacroCategory('IncomeStack', 'income', 'vacancy')}
						/>
						<VerticalSpacing />

						<LargeCard
							{...cardDimensions}
							text={'Eventos'}
							icon={'calendarEveryday'}
							tone={'blue'}
							onPress={() => selectPostMacroCategory('CultureStack', 'culture', 'event')}
						/>
						<LargeCard
							{...cardDimensions}
							text={'Arte'}
							icon={'colorPalet'}
							tone={'blue'}
							onPress={() => selectPostMacroCategory('CultureStack', 'culture', 'art')}
						/>
						<LargeCard
							{...cardDimensions}
							text={'Educação'}
							icon={'books'}
							tone={'blue'}
							onPress={() => selectPostMacroCategory('CultureStack', 'culture', 'education')}
						/>
						<VerticalSpacing />

						<LargeCard
							{...cardDimensions}
							text={'Iniciativas'}
							icon={'handOnPerson'}
							tone={'pink'}
							onPress={() => selectPostMacroCategory('SocialImpactStack', 'socialImpact', 'iniciative')}
						/>
						<LargeCard
							{...cardDimensions}
							text={'Doações'}
							icon={'heartAndPerson'}
							tone={'pink'}
							onPress={() => selectPostMacroCategory('SocialImpactStack', 'socialImpact', 'donation')}
						/>
						<LargeCard
							{...cardDimensions}
							text={'Informativos'}
							icon={'paperInfo'}
							tone={'pink'}
							onPress={() => selectPostMacroCategory('SocialImpactStack', 'socialImpact', 'informative')}
						/>
						{
							numberOfOfflinePostsStored ? (
								<>
									<VerticalSpacing height={3} />
									<OptionButton
										label={`você tem ${numberOfOfflinePostsStored} ${numberOfOfflinePostsStored === 1 ? 'post pronto' : 'posts prontos'} `}
										shortDescription={hasNetworkConnection ? 'você já pode postá-los' : 'esperando conexão com internet'}
										highlightedWords={['posts', 'post']}
										labelSize={15}
										relativeHeight={'12%'}
										leftSideWidth={'25%'}
										leftSideColor={hasNetworkConnection ? theme.colors.green[3] : theme.colors.yellow[3]}
										SvgIcon={hasNetworkConnection ? WirelessOnWhiteIcon : WirelessOffWhiteIcon}
										svgIconScale={['70%', '70%']}
										onPress={() => navigation.navigate('OfflinePostsManagement')}
									/>
								</>

							) : <></>
						}
					</CardsContent>
				</CardsContainer>
				<SubtitleCard
					text={'assinar o corre.'}
					highlightedText={['corre']}
					SvgIcon={HandOnMoneyWhiteIcon}
				/>
				<SubscriptionButtonContainer>
					<SubscriptionButton onPress={adSubscriptionHandle} />
					<VerticalSpacing />
				</SubscriptionButtonContainer>
			</Container >
		</ScreenContainer>
	)
}

export { SelectPostType }
