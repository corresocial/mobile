import React from 'react'
import { Platform, StatusBar } from 'react-native'

import { ButtonsContainer, Container } from './styles'
import { screenHeight, statusBarHeight } from '../../../common/screenDimensions'
import { theme } from '../../../common/theme'
import Uncheck from '../../../assets/icons/uncheck.svg'
import Check from '../../../assets/icons/check.svg'

import { InsertSocialImpactPictureScreenProps } from '../../../routes/Stack/SocialImpactStack/stackScreenProps'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { BackButton } from '../../../components/_buttons/BackButton'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { ProgressBar } from '../../../components/ProgressBar'

function InsertSocialImpactPicture({ navigation }: InsertSocialImpactPictureScreenProps) {
	return (
		<Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<StatusBar backgroundColor={theme.pink2} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				minHeight={(screenHeight + statusBarHeight) * 0.26}
				relativeHeight={'22%'}
				centralized
				backgroundColor={theme.pink2}
			>
				<BackButton onPress={() => navigation.goBack()} />
				<InstructionCard
					borderLeftWidth={3}
					fontSize={18}
					message={'que tal adicionar algumas fotos para atrair quem acredita?'}
					highlightedWords={['adicionar', 'algumas', 'fotos']}
				>
					<ProgressBar
						range={5}
						value={2}
					/>
				</InstructionCard>
			</DefaultHeaderContainer>
			<FormContainer
				backgroundColor={theme.white3}
			>
				<ButtonsContainer>
					<PrimaryButton
						flexDirection={'row-reverse'}
						color={theme.red3}
						relativeHeight={'30%'}
						labelColor={theme.white3}
						label={'não precisa, valew'}
						highlightedWords={['não', 'precisa,']}
						SvgIcon={Uncheck}
						svgIconScale={['22%', '18%']}
						onPress={() => navigation.navigate('SelectSocialImpactExhibitionRange')}
					/>
					<PrimaryButton
						flexDirection={'row-reverse'}
						color={theme.green3}
						relativeHeight={'30%'}
						labelColor={theme.white3}
						label={'opa, vou adicionar'}
						highlightedWords={['vou', 'adicionar']}
						SvgIcon={Check}
						svgIconScale={['22%', '18%']}
						onPress={() => navigation.navigate('SocialImpactPicturePreview')}
					/>
				</ButtonsContainer>
			</FormContainer>
		</Container>
	)
}

export { InsertSocialImpactPicture }
