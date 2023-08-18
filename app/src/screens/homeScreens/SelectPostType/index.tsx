import React, { useContext } from 'react'

import { BottomSafeAreaColor, Container, SubscriptionButtonContainer } from './styles'
import { theme } from '../../../common/theme'

import DescriptionWhiteIcon from '../../../assets/icons/description-white.svg'
import HandOnMoneyWhiteIcon from '../../../assets/icons/handOnMoney-white.svg'
import VacancyWhiteIcon from '../../../assets/icons/vacancy-white.svg'
import SocialImpactWhiteIcon from '../../../assets/icons/socialImpact-white.svg'
import ServiceWhiteIcon from '../../../assets/icons/service-white.svg'
import SaleCartWhiteIcon from '../../../assets/icons/sale-white.svg'
import CultureWhiteIcon from '../../../assets/icons/culture-white.svg'

import { SelectPostTypeScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'

import { FormContainer } from '../../../components/_containers/FormContainer'
import { OptionButton } from '../../../components/_buttons/OptionButton'
import { FocusAwareStatusBar } from '../../../components/FocusAwareStatusBar'
import { SubtitleCard } from '../../../components/_cards/SubtitleCard'
import { SubscriptionButton } from '../../../components/_buttons/SubscriptionButton'
import { SubscriptionInfoModal } from '../../../components/_modals/SubscriptionInfoModal'
import { AuthContext } from '../../../contexts/AuthContext'

function SelectPostType({ navigation }: SelectPostTypeScreenProps) {
	const { userDataContext } = useContext(AuthContext)

	const [subscriptionModalIsVisible, setSubscriptionModalIsVisible] = React.useState(false)

	const navigateToSelectSubscriptionRange = () => {
		navigation.navigate('SelectSubscriptionRange')
	}

	const profilePictureUrl = userDataContext.profilePictureUrl ? userDataContext.profilePictureUrl[0] : ''

	return (
		<>
			<Container>
				<FocusAwareStatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
				<SubscriptionInfoModal
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
						label={'um serviço'}
						highlightedWords={['um', 'serviço']}
						labelSize={18}
						relativeHeight={'17%'}
						shortDescription={'ofereço um serviço'}
						SvgIcon={ServiceWhiteIcon}
						svgIconScale={['75%', '75%']}
						leftSideColor={theme.purple3}
						leftSideWidth={'25%'}
						onPress={() => navigation.navigate('ServiceStack')}
					/>
					<OptionButton
						color={theme.white3}
						label={'uma venda'}
						highlightedWords={['uma', 'venda']}
						labelSize={18}
						relativeHeight={'17%'}
						shortDescription={'venda de novos ou usados'}
						SvgIcon={SaleCartWhiteIcon}
						svgIconScale={['75%', '75%']}
						leftSideColor={theme.green3}
						leftSideWidth={'25%'}
						onPress={() => navigation.navigate('SaleStack')}
					/>
					<OptionButton
						color={theme.white3}
						label={'uma vaga'}
						highlightedWords={['uma', 'vaga']}
						labelSize={18}
						relativeHeight={'17%'}
						shortDescription={'procurando vaga ou profissional'}
						SvgIcon={VacancyWhiteIcon}
						svgIconScale={['75%', '75%']}
						leftSideColor={theme.yellow3}
						leftSideWidth={'25%'}
						onPress={() => navigation.navigate('VacancyStack')}
					/>
					<OptionButton
						color={theme.white3}
						label={'impacto social'}
						highlightedWords={['impacto', 'social']}
						labelSize={18}
						relativeHeight={'17%'}
						shortDescription={'iniciativas, doações, etc'}
						SvgIcon={SocialImpactWhiteIcon}
						svgIconScale={['75%', '75%']}
						leftSideColor={theme.pink3}
						leftSideWidth={'25%'}
						onPress={() => navigation.navigate('SocialImpactStack')}
					/>
					<OptionButton
						color={theme.white3}
						label={'cultura'}
						highlightedWords={['cultura']}
						labelSize={18}
						relativeHeight={'17%'}
						shortDescription={'arte, eventos e educação'}
						SvgIcon={CultureWhiteIcon}
						svgIconScale={['75%', '75%']}
						leftSideColor={theme.blue3}
						leftSideWidth={'25%'}
						onPress={() => navigation.navigate('CultureStack')}
					/>
				</FormContainer>
				<SubtitleCard
					text={'assinar o corre.'}
					highlightedText={['corre']}
					SvgIcon={HandOnMoneyWhiteIcon}
				/>
				<SubscriptionButtonContainer>
					<SubscriptionButton onPress={() => setSubscriptionModalIsVisible(true)} />
				</SubscriptionButtonContainer>
			</Container>
			<BottomSafeAreaColor safeAreaColor={theme.orange2} withoutFlex />
		</>
	)
}

export { SelectPostType }
