import React from 'react'
import { StatusBar } from 'react-native'

import { Container, Body } from './styles'
import { theme } from '../../../common/theme'
import CheckIcon from '../../../assets/icons/check-white.svg'

import { ContactUsSuccessScreenProps } from '../../../routes/Stack/userStack/stackScreenProps'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { relativeScreenHeight } from '../../../common/screenDimensions'
import { InstructionCard } from '../../../components/_cards/InstructionCard'

function ContactUsSuccess({ route, navigation }: ContactUsSuccessScreenProps) {
	const navigateToConfig = () => {
		if (route.params?.reportType !== 'none') {
			navigation.goBack()
			navigation.goBack()
			return
		}
		navigation.navigate('Configurations')
	}

	return (
		<Container>
			<StatusBar backgroundColor={theme.orange2} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				relativeHeight={relativeScreenHeight(50)}
				centralized
				backgroundColor={theme.orange2}
			>
				<InstructionCard
					message={'pronto! \n\nrecebemos seu feedback, nossa equipe vai avalizar e tratar o ocorrido.'}
					highlightedWords={['\n\nrecebemos', 'seu', 'feedback', 'avaliar', 'tratar']}
					fontSize={18}
				>
				</InstructionCard>
			</DefaultHeaderContainer>
			<Body>
				<PrimaryButton
					color={theme.green3}
					labelColor={theme.white3}
					fontSize={18}
					labelMarginLeft={5}
					textAlign={'left'}
					label={'finalizar'}
					SecondSvgIcon={CheckIcon}
					svgIconScale={['30%', '15%']}
					onPress={navigateToConfig}
				/>
			</Body>
		</Container >
	)
}

export { ContactUsSuccess }
