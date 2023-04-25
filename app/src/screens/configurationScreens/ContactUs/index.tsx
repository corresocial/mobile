import React from 'react'
import { StatusBar } from 'react-native'

import { Container, ButtonsContainer, Sigh } from './styles'
import { theme } from '../../../common/theme'
import AngleLeftThin from '../../../assets/icons/angleLeftThin.svg'

import { relativeScreenWidth } from '../../../common/screenDimensions'

import { ContactUsScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'

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
					onPress={() => navigation.navigate('ContactUsInsertMessage', { title: 'erros', contactUsType: 'erro' })}
				/>
				<PrimaryButton
					color={theme.white3}
					labelColor={theme.black4}
					fontSize={16}
					labelMarginLeft={5}
					textAlign={'left'}
					label={'denunciar'}
					highlightedWords={['denunciar']}
					onPress={() => navigation.navigate('ContactUsInsertMessage', { title: 'denunciar', contactUsType: 'denúncia' })}
				/>
				<PrimaryButton
					color={theme.white3}
					labelColor={theme.black4}
					fontSize={16}
					labelMarginLeft={5}
					textAlign={'left'}
					label={'melhorias'}
					highlightedWords={['melhorias']}
					onPress={() => navigation.navigate('ContactUsInsertMessage', { title: 'melhorias', contactUsType: 'melhoria' })}
				/>
				<PrimaryButton
					color={theme.white3}
					labelColor={theme.black4}
					fontSize={16}
					labelMarginLeft={5}
					textAlign={'left'}
					label={'outros'}
					highlightedWords={['outros']}
					onPress={() => navigation.navigate('ContactUsInsertMessage', { title: 'outros', contactUsType: 'outro' })}
				/>
			</ButtonsContainer>
		</Container>
	)
}

export { ContactUs }
