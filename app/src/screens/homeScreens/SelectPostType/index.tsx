import React, { useContext, useEffect, useState } from 'react'

import { BottomSafeAreaColor, Container, SubscriptionButtonContainer } from './styles'
import { theme } from '../../../common/theme'

import DescriptionWhiteIcon from '../../../assets/icons/description-white.svg'
import HandOnMoneyWhiteIcon from '../../../assets/icons/handOnMoney-white.svg'
import SocialImpactWhiteIcon from '../../../assets/icons/socialImpact-white.svg'
import CashWhiteIcon from '../../../assets/icons/cash-white.svg'
import CultureWhiteIcon from '../../../assets/icons/culture-white.svg'
import WirelessOffWhiteIcon from '../../../assets/icons/wirelessOff-white.svg'
import WirelessOnWhiteIcon from '../../../assets/icons/wirelessOn-white.svg'

import { SelectPostTypeScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'

import { FormContainer } from '../../../components/_containers/FormContainer'
import { OptionButton } from '../../../components/_buttons/OptionButton'
import { FocusAwareStatusBar } from '../../../components/FocusAwareStatusBar'
import { SubtitleCard } from '../../../components/_cards/SubtitleCard'
import { SubscriptionButton } from '../../../components/_buttons/SubscriptionButton'
import { SubscriptionPresentationModal } from '../../../components/_modals/SubscriptionPresentationModal'
import { AuthContext } from '../../../contexts/AuthContext'
import { getNumberOfStoredOfflinePosts } from '../../../utils/offlinePost'
import { getNetworkStatus } from '../../../utils/deviceNetwork'

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
		const numberOfOfflinePosts = await getNumberOfStoredOfflinePosts()
		setNumberOfOfflinePostsStored(numberOfOfflinePosts)
	}

	const checkNetworkConnection = async () => {
		const networkStatus = await getNetworkStatus()
		setHasNetworkConnection(!!networkStatus.isConnected && !!networkStatus.isInternetReachable)
	}

	const navigateToSelectSubscriptionRange = () => {
		navigation.navigate('SelectSubscriptionRange')
	}

	const profilePictureUrl = userDataContext.profilePictureUrl ? userDataContext.profilePictureUrl[0] : ''

	return (
		<>
			<Container>
				<FocusAwareStatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
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
					backgroundColor={theme.orange2}
				>
					<OptionButton
						color={theme.white3}
						label={'renda'}
						highlightedWords={['renda']}
						labelSize={18}
						relativeHeight={'20%'}
						shortDescription={'compra e venda, serviços e vagas'}
						SvgIcon={CashWhiteIcon}
						svgIconScale={['80%', '80%']}
						leftSideColor={theme.green3}
						leftSideWidth={'25%'}
						onPress={() => navigation.navigate('SelectIncomeType')}
					/>
					<OptionButton
						color={theme.white3}
						label={'impacto social'}
						highlightedWords={['impacto', 'social']}
						labelSize={18}
						relativeHeight={'20%'}
						shortDescription={'iniciativas, doações, etc'}
						SvgIcon={SocialImpactWhiteIcon}
						svgIconScale={['80%', '80%']}
						leftSideColor={theme.pink3}
						leftSideWidth={'25%'}
						onPress={() => navigation.navigate('SocialImpactStack')}
					/>
					<OptionButton
						color={theme.white3}
						label={'cultura'}
						highlightedWords={['cultura']}
						labelSize={18}
						relativeHeight={'20%'}
						shortDescription={'arte, eventos e educação'}
						SvgIcon={CultureWhiteIcon}
						svgIconScale={['80%', '80%']}
						leftSideColor={theme.blue3}
						leftSideWidth={'25%'}
						onPress={() => navigation.navigate('CultureStack')}
					/>
					{
						!!numberOfOfflinePostsStored && (
							<OptionButton
								label={`você tem ${numberOfOfflinePostsStored} ${numberOfOfflinePostsStored === 1 ? 'post pronto' : 'posts prontos'} `}
								shortDescription={hasNetworkConnection ? 'você já pode postá-los' : 'esperando conexão com internet'}
								highlightedWords={['posts', 'post']}
								labelSize={15}
								relativeHeight={'20%'}
								leftSideWidth={'25%'}
								leftSideColor={hasNetworkConnection ? theme.green3 : theme.yellow3}
								SvgIcon={hasNetworkConnection ? WirelessOnWhiteIcon : WirelessOffWhiteIcon}
								svgIconScale={['70%', '70%']}
								onPress={() => navigation.navigate('OfflinePostsManagement')}
							/>
						)
					}
				</FormContainer>
				<SubtitleCard
					text={'assinar o corre.'}
					highlightedText={['corre']}
					SvgIcon={HandOnMoneyWhiteIcon}
				/>
				<SubscriptionButtonContainer>
					<SubscriptionButton onPress={() => setSubscriptionModalIsVisible(true)} />
				</SubscriptionButtonContainer>
			</Container >
			<BottomSafeAreaColor safeAreaColor={theme.orange2} withoutFlex />
		</>
	)
}

export { SelectPostType }
