import React from 'react'
import { StatusBar } from 'react-native'

import { getLocationViewDescription, getLocationViewHighlightedWords, getLocationViewTitle } from '../../../utils/locationMessages'

import { ButtonsContainer, Container } from './styles'
import { theme } from '../../../common/theme'

import { SelectSocialImpactLocationViewScreenProps } from '../../../routes/Stack/SocialImpactStack/stackScreenProps'
import { LocationViewType } from '../../../services/firebase/types'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { BackButton } from '../../../components/_buttons/BackButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { ProgressBar } from '../../../components/ProgressBar'
import { TitleDescriptionButton } from '../../../components/_cards/TitleDescriptionButton'

function SelectSocialImpactLocationView({ route, navigation }: SelectSocialImpactLocationViewScreenProps) {
	const saveLocationViewType = (locationViewType: LocationViewType) => {
		navigation.navigate('InsertSocialImpactLocation', {
			locationView: locationViewType,
			...route.params
		})
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
					message={'como você prefere que outros usuários vejam a localização?'}
					highlightedWords={['como', 'você', 'prefere', 'vejam', 'a', 'localização']}
				>
					<ProgressBar
						range={5}
						value={3}
					/>
				</InstructionCard>
			</DefaultHeaderContainer>
			<FormContainer
				backgroundColor={theme.pink2}
			>
				<ButtonsContainer>
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
				</ButtonsContainer>
			</FormContainer>
		</Container>
	)
}

export { SelectSocialImpactLocationView }
