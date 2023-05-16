import React from 'react'
import { Linking, StatusBar } from 'react-native'

import { share } from '../../../common/share'

import { Container, ButtonsContainer, Sigh } from './styles'
import { theme } from '../../../common/theme'
import DollarIcon from '../../../assets/icons/dollar.svg'
import VoluntaryIcon from '../../../assets/icons/voluntary.svg'
import RightCurvedArrowIcon from '../../../assets/icons/rightCurvedArrow.svg'

import { HelpUsScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { BackButton } from '../../../components/_buttons/BackButton'

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

	return (
		<Container>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				relativeHeight={'22%'}
				centralized
				backgroundColor={theme.white3}
			>
				<BackButton onPress={() => navigation.goBack()} />
				<Sigh />
				<InstructionCard
					borderLeftWidth={3}
					fontSize={15}
					message={'quer participar? \nolha o que você pode fazer'}
					highlightedWords={['o', 'que', 'você', 'pode', 'fazer']}
				>
				</InstructionCard>
			</DefaultHeaderContainer>
			<ButtonsContainer>
				<PrimaryButton
					justifyContent={'flex-start'}
					color={theme.white3}
					labelColor={theme.black4}
					fontSize={20}
					labelMarginLeft={5}
					relativeHeight={'18%'}
					textAlign={'left'}
					label={'faça uma doação'}
					highlightedWords={['doação']}
					SecondSvgIcon={DollarIcon}
					svgIconScale={['50%', '20%']}
					onPress={() => openLink('https://doacao.corre.social/')}
				/>
				<PrimaryButton
					justifyContent={'flex-start'}
					color={theme.white3}
					labelColor={theme.black4}
					fontSize={20}
					labelMarginLeft={5}
					relativeHeight={'18%'}
					textAlign={'left'}
					label={'seja voluntário'}
					highlightedWords={['voluntário']}
					SecondSvgIcon={VoluntaryIcon}
					svgIconScale={['50%', '20%']}
					onPress={() => openLink('https://voluntariado.corre.social/')}
				/>
				<PrimaryButton
					justifyContent={'flex-start'}
					color={theme.white3}
					labelColor={theme.black4}
					fontSize={20}
					labelMarginLeft={5}
					relativeHeight={'18%'}
					textAlign={'left'}
					label={'compartilhe!'}
					highlightedWords={['compartilhe!']}
					SecondSvgIcon={RightCurvedArrowIcon}
					svgIconScale={['50%', '20%']}
					onPress={shareMessage}
				/>
			</ButtonsContainer>
		</Container>
	)
}

export { HelpUs }
