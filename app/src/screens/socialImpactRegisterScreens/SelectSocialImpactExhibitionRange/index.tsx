import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { Container, ButtonsContainer } from './styles'
import { theme } from '../../../common/theme'
import PinWhiteIcon from '../../../assets/icons/pin-white.svg'
import CityWhiteIcon from '../../../assets/icons/city-white.svg'
import BrazilWhiteIcon from '../../../assets/icons/brazil-white.svg'

import { relativeScreenHeight } from '../../../common/screenDimensions'

import { SelectSocialImpactExhibitionRangeScreenProps } from '../../../routes/Stack/SocialImpactStack/stackScreenProps'
import { ExhibitionPlaceType } from '../../../services/firebase/types'

import { SocialImpactContext } from '../../../contexts/SocialImpactContext'
import { EditContext } from '../../../contexts/EditContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { BackButton } from '../../../components/_buttons/BackButton'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { ProgressBar } from '../../../components/ProgressBar'

function SelectSocialImpactExhibitionRange({ route, navigation }: SelectSocialImpactExhibitionRangeScreenProps) {
	const { setSocialImpactDataOnContext } = useContext(SocialImpactContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const saveSocialImpactExhibitionRange = (exhibitionPlace: ExhibitionPlaceType) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ exhibitionPlace })
			navigation.goBack()
			return
		}

		setSocialImpactDataOnContext({ exhibitionPlace })
		navigation.navigate('SelectSocialImpactFrequency')
	}

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	return (
		<Container>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				minHeight={relativeScreenHeight(24)}
				relativeHeight={relativeScreenHeight(24)}
				centralized
				backgroundColor={theme.white3}
			>
				<BackButton onPress={() => navigation.goBack()} />
				<InstructionCard
					borderLeftWidth={3}
					fontSize={17}
					message={'onde essa iniciativa atua?'}
					highlightedWords={['onde']}
				>
					<ProgressBar
						range={4}
						value={4}
					/>
				</InstructionCard>
			</DefaultHeaderContainer>
			<FormContainer
				backgroundColor={theme.pink2}
			>
				<ButtonsContainer>
					<PrimaryButton
						justifyContent={'space-around'}
						color={theme.white3}
						relativeHeight={'18%'}
						labelColor={theme.black4}
						fontSize={18}
						SecondSvgIcon={PinWhiteIcon}
						svgIconScale={['40%', '20%']}
						textAlign={'left'}
						label={'em um bairro'}
						highlightedWords={['em', 'um', 'bairro']}
						onPress={() => saveSocialImpactExhibitionRange('near')}
					/>
					<PrimaryButton
						justifyContent={'space-around'}
						color={theme.white3}
						relativeHeight={'18%'}
						labelColor={theme.black4}
						fontSize={18}
						SecondSvgIcon={CityWhiteIcon}
						svgIconScale={['40%', '20%']}
						textAlign={'left'}
						label={'em uma cidade'}
						highlightedWords={['em', 'uma', 'cidade']}
						onPress={() => saveSocialImpactExhibitionRange('city')}
					/>
					<PrimaryButton
						justifyContent={'space-around'}
						color={theme.white3}
						relativeHeight={'18%'}
						labelColor={theme.black4}
						fontSize={18}
						SecondSvgIcon={BrazilWhiteIcon}
						svgIconScale={['40%', '20%']}
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
