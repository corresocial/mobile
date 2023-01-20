import React from 'react'
import { StatusBar } from 'react-native'

import { ButtonsContainer, Container } from './styles'
import { theme } from '../../../common/theme'

import { SelectLocationViewScreenProps } from '../../../routes/Stack/ServiceStack/stackScreenProps'
import { LocationViewType } from '../../../services/firebase/types'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { BackButton } from '../../../components/_buttons/BackButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { ProgressBar } from '../../../components/ProgressBar'
import { TitleDescriptionButton } from '../../../components/_cards/TitleDescriptionButton'

function SelectLocationView({ route, navigation }: SelectLocationViewScreenProps) {
	const saveLocationViewType = (locationViewType: LocationViewType) => {
		navigation.navigate('InsertServicePrestationLocation', {
			locationView: locationViewType,
			...route.params
		})
	}

	const getLocationViewTitle = (locationView: LocationViewType) => {
		switch (locationView) {
			case 'private': return 'localização⠀ \nprivada'
			case 'approximate': return 'localização \naproximada'
			case 'public': return 'localização \npública'
			default: return 'switch option unfount'
		}
	}

	const getLocationViewDescription = (locationView: LocationViewType) => {
		switch (locationView) {
			case 'private': return 'os usuários podem ver seu perfil, mas não tem acesso a sua localização.'
			case 'approximate': return 'os usuários podem a sua região aproximada.'
			case 'public': return 'os usuários podem ver exatamente onde você está.'
			default: return 'switch option unfount'
		}
	}

	const getLocationViewHighlightedWords = (locationView: LocationViewType) => {
		switch (locationView) {
			case 'private': return ['\nprivada', 'não', 'tem', 'acesso', 'a', 'sua', 'localização']
			case 'approximate': return ['\naproximada', 'a', 'sua', 'região', 'aproximada']
			case 'public': return ['\npública', 'exatamente', 'onde', 'você', 'está']
			default: return []
		}
	}

	return (
		<Container>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				relativeHeight={'28%'}
				centralized
				backgroundColor={theme.white3}
			>
				<BackButton onPress={() => navigation.goBack()} />
				<InstructionCard
					borderLeftWidth={3}
					fontSize={18}
					message={'como você prefere que outros usuários vejam sua localização?'}
					highlightedWords={['como', 'você', 'prefere', 'vejam', 'sua', 'localização']}
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
					{/* <PrimaryButton
						justifyContent={'flex-start'}
						color={theme.white3}
						relativeHeight={'18%'}
						labelColor={theme.black4}
						fontSize={18}
						textAlign={'left'}
						label={'localização privada'}
						highlightedWords={['privada']}
						onPress={() => saveLocationViewType('private')}
					/> */}
					<TitleDescriptionButton
						height={'28%'}
						color={theme.white3}
						title={getLocationViewTitle('private')}
						description={getLocationViewDescription('private')}
						highlightedWords={getLocationViewHighlightedWords('private')}
						onPress={() => saveLocationViewType('private')}
					/>
					<TitleDescriptionButton
						height={'28%'}
						color={theme.white3}
						title={getLocationViewTitle('approximate')}
						description={getLocationViewDescription('approximate')}
						highlightedWords={getLocationViewHighlightedWords('approximate')}
						onPress={() => saveLocationViewType('approximate')}
					/>
					<TitleDescriptionButton
						height={'28%'}
						color={theme.white3}
						title={getLocationViewTitle('public')}
						description={getLocationViewDescription('public')}
						highlightedWords={getLocationViewHighlightedWords('public')}
						onPress={() => saveLocationViewType('public')}
					/>
					{/* <PrimaryButton
						justifyContent={'flex-start'}
						color={theme.white3}
						relativeHeight={'18%'}
						labelColor={theme.black4}
						fontSize={18}
						textAlign={'left'}
						label={'localização aproximada'}
						highlightedWords={['aproximada']}
						onPress={() => saveLocationViewType('approximate')}
					/>
					<PrimaryButton
						justifyContent={'flex-start'}
						color={theme.white3}
						relativeHeight={'18%'}
						labelColor={theme.black4}
						fontSize={18}
						textAlign={'left'}
						label={'localização pública'}
						highlightedWords={['pública']}
						onPress={() => saveLocationViewType('public')}
					/> */}
				</ButtonsContainer>
			</FormContainer>
		</Container>
	)
}

export { SelectLocationView }
