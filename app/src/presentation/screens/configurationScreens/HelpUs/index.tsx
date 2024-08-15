import React from 'react'
import { Linking, StatusBar } from 'react-native'

import { HelpUsScreenProps } from '@routes/Stack/ProfileStack/screenProps'

import { Container, ButtonsContainer } from './styles'
import HandOnHeartWhiteIcon from '@assets/icons/handOnHeart-white.svg'
import HandOnPersonWhiteIcon from '@assets/icons/handOnPerson-white.svg'
import ShareWhiteIcon from '@assets/icons/share-white.svg'
import { relativeScreenHeight } from '@common/screenDimensions'
import { share } from '@common/share'
import { theme } from '@common/theme'

import { BackButton } from '@components/_buttons/BackButton'
import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { InstructionCard } from '@components/_cards/InstructionCard'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'

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
			<StatusBar backgroundColor={theme.colors.white[3]} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				relativeHeight={relativeScreenHeight(27)}
				centralized
				backgroundColor={theme.colors.white[3]}
			>
				<BackButton onPress={() => navigation.goBack()} />
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
					color={theme.colors.white[3]}
					labelColor={theme.colors.black[4]}
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
					color={theme.colors.white[3]}
					labelColor={theme.colors.black[4]}
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
					color={theme.colors.white[3]}
					labelColor={theme.colors.black[4]}
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
