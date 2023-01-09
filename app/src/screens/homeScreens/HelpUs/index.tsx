import React from 'react'
import { StatusBar } from 'react-native'

import { Container, ButtonsContainer, Sigh } from './styles'
import { theme } from '../../../common/theme'
import AngleLeftThin from '../../../assets/icons/angleLeftThin.svg'
import DollarIcon from '../../../assets/icons/dollar.svg'
import VoluntaryIcon from '../../../assets/icons/voluntary.svg'
import RightCurvedArrowIcon from '../../../assets/icons/rightCurvedArrow.svg'

import { relativeScreenWidth } from '../../../common/screenDimensions'

import { HelpUsScreenProps } from '../../../routes/Stack/userStack/stackScreenProps'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { SmallButton } from '../../../components/_buttons/SmallButton'

function HelpUs({ navigation }: HelpUsScreenProps) {
	return (
		<Container>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				relativeHeight={'22%'}
				centralized
				backgroundColor={theme.white3}
			>
				<SmallButton
					relativeWidth={relativeScreenWidth(11)}
					height={relativeScreenWidth(11)}
					color={theme.white3}
					SvgIcon={AngleLeftThin}
					onPress={() => navigation.goBack()}
				/>
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
					onPress={() => { }}
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
					onPress={() => { }}
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
					onPress={() => { }}
				/>
			</ButtonsContainer>
		</Container>
	)
}

export { HelpUs }
