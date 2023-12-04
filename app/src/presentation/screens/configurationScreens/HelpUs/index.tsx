import React from 'react'
import { Linking, StatusBar } from 'react-native'

import { share } from '../../../common/share'

import { Container, ButtonsContainer } from './styles'
import { theme } from '../../../common/theme'
import HandOnHeartWhiteIcon from '../../../assets/icons/handOnHeart-white.svg'
import HandOnPersonWhiteIcon from '../../../assets/icons/handOnPerson-white.svg'
import ShareWhiteIcon from '../../../assets/icons/share-white.svg'

import { HelpUsScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { BackButton } from '../../../components/_buttons/BackButton'
import { relativeScreenHeight } from '../../../common/screenDimensions'
import { VerticalSpacing } from '../../../components/_space/VerticalSpacing'

function HelpUs({ navigation }: HelpUsScreenProps) {
	const shareMessage = () => {
		share('oi, já conhece o https://corre.social/ !? meu novo app favorito')
	}

	const openLink = async (link: string) => {
		const validUrl = await Linking.canOpenURL(link)
		if (validUrl) {
			Linking.openURL(link)
		} else {
			console.log('URL inválida')
		}
	}

	const navigateToSelectSubscriptionRange = () => {
		navigation.navigate('Configurations')
		navigation.navigate('SelectSubscriptionRange')
	}

	return (
		<Container>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				relativeHeight={relativeScreenHeight(27)}
				centralized
				backgroundColor={theme.white3}
			>
				<BackButton onPress={() => navigation.goBack()} />
				<VerticalSpacing height={relativeScreenHeight(3)} />
				<InstructionCard
					borderLeftWidth={3}
					fontSize={16}
					message={'renda + cultura + impacto social = ascensão social, e você pode fazer parte dessa transformação conosco!'}
					highlightedWords={['renda', '+', 'cultura', 'impacto', 'social', '=', 'ascensão']}
				/>
			</DefaultHeaderContainer>
			<ButtonsContainer>
				<PrimaryButton
					justifyContent={'center'}
					color={theme.white3}
					labelColor={theme.black4}
					fontSize={17}
					relativeHeight={'16%'}
					label={'apoie o corre.!'}
					highlightedWords={['apoie']}
					SecondSvgIcon={HandOnHeartWhiteIcon}
					svgIconScale={['40%', '30%']}
					onPress={navigateToSelectSubscriptionRange}
				/>
				<PrimaryButton
					justifyContent={'center'}
					color={theme.white3}
					labelColor={theme.black4}
					fontSize={17}
					relativeHeight={'16%'}
					label={'seja voluntário'}
					highlightedWords={['voluntário']}
					SecondSvgIcon={HandOnPersonWhiteIcon}
					svgIconScale={['40%', '30%']}
					onPress={() => openLink('https://voluntariado.corre.social/')}
				/>
				<PrimaryButton
					justifyContent={'center'}
					color={theme.white3}
					labelColor={theme.black4}
					fontSize={16}
					relativeHeight={'16%'}
					label={'compartilhe a nova \ne melhor rede social \nbrasileira!!'}
					SecondSvgIcon={ShareWhiteIcon}
					svgIconScale={['40%', '30%']}
					onPress={shareMessage}
				/>
			</ButtonsContainer>
		</Container>
	)
}

export { HelpUs }
