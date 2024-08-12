import React, { useContext, useEffect, useState } from 'react'

import { PostType } from '@domain/post/entity/types'

import { usePostRepository } from '@data/post/usePostRepository'

import { AuthContext } from '@contexts/AuthContext'

import { SelectPostTypeScreenProps } from '@routes/Stack/UserStack/screenProps'
import { MacroCategoriesType } from '@utils/postMacroCategories/types'

import { getNetworkStatus } from '@utils/deviceNetwork'

import { Container, SubscriptionButtonContainer } from './styles'
import CashWhiteIcon from '@assets/icons/cash-white.svg'
import CultureWhiteIcon from '@assets/icons/culture-white.svg'
import DescriptionWhiteIcon from '@assets/icons/description-white.svg'
import HandOnMoneyWhiteIcon from '@assets/icons/handOnMoney-white.svg'
import SocialImpactWhiteIcon from '@assets/icons/socialImpact-white.svg'
import WirelessOffWhiteIcon from '@assets/icons/wirelessOff-white.svg'
import WirelessOnWhiteIcon from '@assets/icons/wirelessOn-white.svg'
import { theme } from '@common/theme'

import { OptionButton } from '@components/_buttons/OptionButton'
import { SubscriptionButton } from '@components/_buttons/SubscriptionButton'
import { SubtitleCard } from '@components/_cards/SubtitleCard'
import { FormContainer } from '@components/_containers/FormContainer'
import { SubscriptionPresentationModal } from '@components/_modals/SubscriptionPresentationModal'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { FocusAwareStatusBar } from '@components/FocusAwareStatusBar'

const { localStorage } = usePostRepository()

type RedirectStacks = 'IncomeStack' | 'SaleStack' | 'ServiceStack' | 'VacancyStack' | 'SocialImpactStack' | 'CultureStack'

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
		navigation.navigate(routeNavigate, { postType, macroCategory } as any) // CURRENT Type
	}

	const profilePictureUrl = userDataContext.profilePictureUrl ? userDataContext.profilePictureUrl[0] : ''

	return (
		<>
			<Container>
				<FocusAwareStatusBar backgroundColor={theme.colors.white[3]} barStyle={'dark-content'} />
				<SubscriptionPresentationModal
					visibility={subscriptionModalIsVisible}
					profilePictureUri={profilePictureUrl}
					closeModal={() => setSubscriptionModalIsVisible(false)}
					onPressButton={navigateToSelectSubscriptionRange}
				/>
				<SubtitleCard
					text={'criar post'}
					highlightedText={['post']}
					SvgIcon={DescriptionWhiteIcon}
				/>
				<FormContainer
					backgroundColor={theme.colors.orange[2]}
				>
					<OptionButton
						color={theme.colors.white[3]}
						label={'serviços'}
						highlightedWords={['serviços']}
						labelSize={12}
						relativeHeight={'10%'}
						SvgIcon={CashWhiteIcon}
						svgIconScale={['80%', '80%']}
						leftSideColor={theme.colors.green[3]}
						leftSideWidth={'25%'}
						onPress={() => selectPostMacroCategory('IncomeStack', 'income', 'service')}
					/>
					<OptionButton
						color={theme.colors.white[3]}
						label={'comércio'}
						highlightedWords={['comércio']}
						labelSize={12}
						relativeHeight={'10%'}
						SvgIcon={CashWhiteIcon}
						svgIconScale={['80%', '80%']}
						leftSideColor={theme.colors.green[3]}
						leftSideWidth={'25%'}
						onPress={() => selectPostMacroCategory('IncomeStack', 'income', 'sale')}
					/>
					<OptionButton
						color={theme.colors.white[3]}
						label={'vagas'}
						highlightedWords={['vagas']}
						labelSize={12}
						relativeHeight={'10%'}
						SvgIcon={CashWhiteIcon}
						svgIconScale={['80%', '80%']}
						leftSideColor={theme.colors.green[3]}
						leftSideWidth={'25%'}
						onPress={() => selectPostMacroCategory('IncomeStack', 'income', 'vacancy')}
					/>
					<OptionButton
						color={theme.colors.white[3]}
						label={'eventos'}
						highlightedWords={['eventos']}
						labelSize={12}
						relativeHeight={'10%'}
						SvgIcon={CultureWhiteIcon}
						svgIconScale={['80%', '80%']}
						leftSideColor={theme.colors.blue[3]}
						leftSideWidth={'25%'}
						onPress={() => selectPostMacroCategory('CultureStack', 'culture', 'event')}
					/>
					<OptionButton
						color={theme.colors.white[3]}
						label={'arte'}
						highlightedWords={['arte']}
						labelSize={12}
						relativeHeight={'10%'}
						SvgIcon={CultureWhiteIcon}
						svgIconScale={['80%', '80%']}
						leftSideColor={theme.colors.blue[3]}
						leftSideWidth={'25%'}
						onPress={() => selectPostMacroCategory('CultureStack', 'culture', 'art')}
					/>
					<OptionButton
						color={theme.colors.white[3]}
						label={'educação'}
						highlightedWords={['educação']}
						labelSize={12}
						relativeHeight={'10%'}
						SvgIcon={CultureWhiteIcon}
						svgIconScale={['80%', '80%']}
						leftSideColor={theme.colors.blue[3]}
						leftSideWidth={'25%'}
						onPress={() => selectPostMacroCategory('CultureStack', 'culture', 'education')}
					/>
					<OptionButton
						color={theme.colors.white[3]}
						label={'Iniciativas'}
						highlightedWords={['Iniciativas']}
						labelSize={12}
						relativeHeight={'10%'}
						SvgIcon={SocialImpactWhiteIcon}
						svgIconScale={['80%', '80%']}
						leftSideColor={theme.colors.pink[3]}
						leftSideWidth={'25%'}
						onPress={() => selectPostMacroCategory('SocialImpactStack', 'socialImpact', 'iniciative')}
					/>
					<OptionButton
						color={theme.colors.white[3]}
						label={'informativos'}
						highlightedWords={['informativos']}
						labelSize={12}
						relativeHeight={'10%'}
						SvgIcon={SocialImpactWhiteIcon}
						svgIconScale={['80%', '80%']}
						leftSideColor={theme.colors.pink[3]}
						leftSideWidth={'25%'}
						onPress={() => selectPostMacroCategory('SocialImpactStack', 'socialImpact', 'informative')}
					/>
					<OptionButton
						color={theme.colors.white[3]}
						label={'doações'}
						highlightedWords={['doações']}
						labelSize={12}
						relativeHeight={'10%'}
						SvgIcon={SocialImpactWhiteIcon}
						svgIconScale={['80%', '80%']}
						leftSideColor={theme.colors.pink[3]}
						leftSideWidth={'25%'}
						onPress={() => selectPostMacroCategory('SocialImpactStack', 'socialImpact', 'donation')}
					/>
					{
						numberOfOfflinePostsStored ? (
							<OptionButton
								label={`você tem ${numberOfOfflinePostsStored} ${numberOfOfflinePostsStored === 1 ? 'post pronto' : 'posts prontos'} `}
								shortDescription={hasNetworkConnection ? 'você já pode postá-los' : 'esperando conexão com internet'}
								highlightedWords={['posts', 'post']}
								labelSize={15}
								relativeHeight={'20%'}
								leftSideWidth={'25%'}
								leftSideColor={hasNetworkConnection ? theme.colors.green[3] : theme.colors.yellow[3]}
								SvgIcon={hasNetworkConnection ? WirelessOnWhiteIcon : WirelessOffWhiteIcon}
								svgIconScale={['70%', '70%']}
								onPress={() => navigation.navigate('OfflinePostsManagement')}
							/>
						) : <></>
					}
				</FormContainer>
				<SubtitleCard
					text={'assinar o corre.'}
					highlightedText={['corre']}
					SvgIcon={HandOnMoneyWhiteIcon}
				/>
				<SubscriptionButtonContainer>
					<SubscriptionButton onPress={() => setSubscriptionModalIsVisible(true)} />
					<VerticalSpacing />
				</SubscriptionButtonContainer>
			</Container >
		</>
	)
}

export { SelectPostType }
