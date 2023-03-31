import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { theme } from '@common/theme'

import { SelectSocialImpactExhibitionRangeScreenProps } from '@routes/Stack/socialImpactStack/stackScreenProps'
import { ExhibitionPlaceType } from '@services/firebase/types'

import { SocialImpactContext } from '@contexts/SocialImpactContext'
import { EditContext } from '@contexts/EditContext'

import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { FormContainer } from '@components/_containers/FormContainer'
import { BackButton } from '@components/_buttons/BackButton'
import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { InstructionCard } from '@components/_cards/InstructionCard'
import { ProgressBar } from '@components/ProgressBar'
import { Container, ButtonsContainer } from './styles'

function SelectSocialImpactExhibitionRange({
	route,
	navigation,
}: SelectSocialImpactExhibitionRangeScreenProps) {
	const { setSocialImpactDataOnContext } = useContext(SocialImpactContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const saveSocialImpactExhibitionRange = (
		exhibitionRange: ExhibitionPlaceType
	) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ range: exhibitionRange })
			navigation.goBack()
			return
		}

		setSocialImpactDataOnContext({ range: exhibitionRange })
		navigation.navigate('SelectSocialImpactLocationView')
	}

	const editModeIsTrue = () => route.params && route.params.editMode

	return (
		<Container>
			<StatusBar
				backgroundColor={theme.white3}
				barStyle={'dark-content'}
			/>
			<DefaultHeaderContainer
				relativeHeight={'27%'}
				centralized
				backgroundColor={theme.white3}
			>
				<BackButton onPress={() => navigation.goBack()} />
				<InstructionCard
					borderLeftWidth={3}
					fontSize={18}
					message={'qual o alcance desse impacto?'}
					highlightedWords={['alcance']}
				>
					<ProgressBar range={5} value={3} />
				</InstructionCard>
			</DefaultHeaderContainer>
			<FormContainer backgroundColor={theme.pink2}>
				<ButtonsContainer>
					<PrimaryButton
						justifyContent={'flex-start'}
						color={theme.white3}
						relativeHeight={'18%'}
						labelColor={theme.black4}
						fontSize={18}
						textAlign={'left'}
						label={'em um bairro'}
						highlightedWords={['em', 'um', 'bairro']}
						onPress={() => saveSocialImpactExhibitionRange('near')}
					/>
					<PrimaryButton
						justifyContent={'flex-start'}
						color={theme.white3}
						relativeHeight={'18%'}
						labelColor={theme.black4}
						fontSize={18}
						textAlign={'left'}
						label={'em uma cidade'}
						highlightedWords={['em', 'uma', 'cidade']}
						onPress={() => saveSocialImpactExhibitionRange('city')}
					/>
					<PrimaryButton
						justifyContent={'flex-start'}
						color={theme.white3}
						relativeHeight={'18%'}
						labelColor={theme.black4}
						fontSize={18}
						textAlign={'left'}
						label={'no brasil inteiro'}
						highlightedWords={['no', 'brasil', 'inteiro']}
						onPress={() => saveSocialImpactExhibitionRange('country')}
					/>
				</ButtonsContainer>
			</FormContainer>
		</Container>
	)
}

export { SelectSocialImpactExhibitionRange }
