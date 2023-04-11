import React, { useContext } from 'react'
import { Platform, StatusBar } from 'react-native'

import { ButtonsContainer, Container } from './styles'
import { screenHeight, statusBarHeight } from '../../../common/screenDimensions'
import { theme } from '../../../common/theme'
import Uncheck from '../../../assets/icons/uncheck.svg'
import CheckWhiteIcon from '../../../assets/icons/check-white.svg'

import { InsertCulturePictureScreenProps } from '../../../routes/Stack/CultureStack/stackScreenProps'

import { CultureContext } from '../../../contexts/CultureContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { BackButton } from '../../../components/_buttons/BackButton'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { ProgressBar } from '../../../components/ProgressBar'

function InsertCulturePicture({ navigation }: InsertCulturePictureScreenProps) {
	const { cultureDataContext } = useContext(CultureContext)

	return (
		<Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<StatusBar backgroundColor={theme.blue2} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				minHeight={(screenHeight + statusBarHeight) * 0.26}
				relativeHeight={'22%'}
				centralized
				backgroundColor={theme.blue2}
			>
				<BackButton onPress={() => navigation.goBack()} />
				<InstructionCard
					borderLeftWidth={3}
					fontSize={18}
					message={
						cultureDataContext.cultureType === 'artistProfile'
							? 'que tal adicionar algumas fotos da sua arte?'
							: 'que tal adicionar algumas fotos do seu role?'
					}
					highlightedWords={
						cultureDataContext.cultureType === 'artistProfile'
							? ['adicionar', 'algumas', 'fotos', 'sua', 'arte']
							: ['adicionar', 'algumas', 'fotos', 'seu', 'role']
					}
				>
					<ProgressBar
						range={cultureDataContext.cultureType === 'artistProfile' ? 3 : 5}
						value={1}
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
						highlightedWords={['não', 'precisa']}
						SecondSvgIcon={Uncheck}
						svgIconScale={['40%', '18%']}
						onPress={() => navigation.navigate('SelectCultureCategory')}
					/>
					<PrimaryButton
						flexDirection={'row-reverse'}
						color={theme.green3}
						relativeHeight={'30%'}
						labelColor={theme.white3}
						label={'opa, vou adicionar'}
						highlightedWords={['vou', 'adicionar']}
						SvgIcon={CheckWhiteIcon}
						svgIconScale={['22%', '18%']}
						onPress={() => navigation.navigate('CulturePicturePreview')}
					/>
				</ButtonsContainer>
			</FormContainer>
		</Container>
	)
}

export { InsertCulturePicture }
