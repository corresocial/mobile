import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { ButtonsContainer, Container } from './styles'
import { theme } from '../../../common/theme'

import { SelectServiceRangeScreenProps } from '../../../routes/Stack/ServiceStack/stackScreenProps'
import { PostRange } from '../../../services/firebase/types'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { BackButton } from '../../../components/_buttons/BackButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { ProgressBar } from '../../../components/ProgressBar'
import { TitleDescriptionButton } from '../../../components/_cards/TitleDescriptionButton'
import { ServiceContext } from '../../../contexts/ServiceContext'
import { relativeScreenHeight } from '../../../common/screenDimensions'

function SelectServiceRange({ route, navigation }: SelectServiceRangeScreenProps) {
	const { setServiceDataOnContext } = useContext(ServiceContext)

	const savePostRange = (postRange: PostRange) => {
		setServiceDataOnContext({ range: postRange })
		navigation.navigate('SelectLocationView')
	}

	return (
		<Container>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				relativeHeight={relativeScreenHeight(24)}
				centralized
				backgroundColor={theme.white3}
			>
				<BackButton onPress={() => navigation.goBack()} />
				<InstructionCard
					borderLeftWidth={3}
					fontSize={17}
					message={'qual alcance você vai querer para esse post?'}
					highlightedWords={['alcance']}
				>
					<ProgressBar
						range={5}
						value={4}
					/>
				</InstructionCard>
			</DefaultHeaderContainer>
			<FormContainer
				backgroundColor={theme.purple2}
			>
				<ButtonsContainer>
					<TitleDescriptionButton
						height={'28%'}
						color={theme.white3}
						title={'região'}
						description={'a pessoas encontram seus posts e perfil  no bairro'}
						highlightedWords={['região']}
						footerText={'near'}
						onPress={() => savePostRange('near')}
					/>
					<TitleDescriptionButton
						height={'28%'}
						color={theme.white3}
						title={'cidade'}
						description={'seus posts aparecem na cidade inteira, também pode postar em bairros!'}
						highlightedWords={['cidade', 'também', 'pode', 'postar', 'em', 'bairros!']}
						footerText={'city'}
						onPress={() => savePostRange('city')}
					/>
					<TitleDescriptionButton
						height={'28%'}
						color={theme.white3}
						title={'brasil'}
						description={'postagens aparecem em cidades vizinhas e no brasil inteiro.'}
						highlightedWords={['brasil']}
						footerText={'country'}
						onPress={() => savePostRange('country')}
					/>
				</ButtonsContainer>
			</FormContainer>
		</Container>
	)
}

export { SelectServiceRange }
