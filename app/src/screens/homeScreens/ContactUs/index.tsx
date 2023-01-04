import React from 'react'
import { StatusBar } from 'react-native'

import { Container, ButtonsContainer, Sigh } from './styles'
import { theme } from '../../../common/theme'
import AngleLeftThin from '../../../assets/icons/angleLeftThin.svg'
import DollarIcon from '../../../assets/icons/dollar.svg'
import VoluntaryIcon from '../../../assets/icons/voluntary.svg'
import RightCurvedArrowIcon from '../../../assets/icons/rightCurvedArrow.svg'

import { ContactUsScreenProps } from '../../../routes/Stack/userStack/stackScreenProps'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { SmallButton } from '../../../components/_buttons/SmallButton'

function ContactUs({ navigation }: ContactUsScreenProps) {
	return (
		<Container>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				relativeHeight={'22%'}
				centralized
				backgroundColor={theme.white3}
			>
				<SmallButton
					relativeWidth={40}
					height={40}
					color={theme.white3}
					SvgIcon={AngleLeftThin}
					onPress={() => navigation.goBack()}
				/>
				<Sigh />
				<InstructionCard
					borderLeftWidth={3}
					fontSize={15}
					message={'sobre o que você quer falar com a gente?'}
					highlightedWords={['o', 'que']}
				>
				</InstructionCard>
			</DefaultHeaderContainer>
			<ButtonsContainer>
				<PrimaryButton
					color={theme.white3}
					labelColor={theme.black4}
					fontSize={16}
					labelMarginLeft={5}
					textAlign={'left'}
					label={'erros'}
					highlightedWords={['erros']}
					onPress={() => { }}
				/>
				<PrimaryButton
					color={theme.white3}
					labelColor={theme.black4}
					fontSize={16}
					labelMarginLeft={5}
					textAlign={'left'}
					label={'denunciar'}
					highlightedWords={['denunciar']}
					onPress={() => { }}
				/>
				<PrimaryButton
					color={theme.white3}
					labelColor={theme.black4}
					fontSize={16}
					labelMarginLeft={5}
					textAlign={'left'}
					label={'melhorias'}
					highlightedWords={['melhorias']}
					onPress={() => { }}
				/>
				<PrimaryButton
					color={theme.white3}
					labelColor={theme.black4}
					fontSize={16}
					labelMarginLeft={5}
					textAlign={'left'}
					label={'outros'}
					highlightedWords={['outros']}
					onPress={() => { }}
				/>
			</ButtonsContainer>
		</Container>
	)
}

export { ContactUs }
