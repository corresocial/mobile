import React from 'react'
import { StatusBar } from 'react-native'

import { ButtonsContainer, Container } from './styles'
import { relativeScreenHeight } from '../../../common/screenDimensions'
import { theme } from '../../../common/theme'
import XWhiteIcon from '../../../assets/icons/x-white.svg'
import CheckWhiteIcon from '../../../assets/icons/check-white.svg'

import { InsertSalePictureScreenProps } from '../../../routes/Stack/SaleStack/stackScreenProps'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { BackButton } from '../../../components/_buttons/BackButton'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { ProgressBar } from '../../../components/ProgressBar'

function InsertSalePicture({ navigation }: InsertSalePictureScreenProps) {
	return (
		<Container>
			<StatusBar backgroundColor={theme.green2} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				relativeHeight={relativeScreenHeight(26)}
				centralized
				backgroundColor={theme.green2}
			>
				<BackButton onPress={() => navigation.goBack()} />
				<InstructionCard
					borderLeftWidth={3}
					fontSize={17}
					message={'que tal adicionar algumas fotos?'}
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
						label={'não, obrigado'}
						highlightedWords={['não']}
						SecondSvgIcon={XWhiteIcon}
						svgIconScale={['40%', '18%']}
						onPress={() => navigation.navigate('SelectPaymentType')}
					/>
					<PrimaryButton
						flexDirection={'row-reverse'}
						color={theme.green3}
						relativeHeight={'30%'}
						labelColor={theme.white3}
						label={'opa, vou adicionar'}
						highlightedWords={['vou', 'adicionar']}
						SvgIcon={CheckWhiteIcon}
						svgIconScale={['40%', '25%']}
						onPress={() => navigation.navigate('SalePicturePreview')}
					/>
				</ButtonsContainer>
			</FormContainer>
		</Container>
	)
}

export { InsertSalePicture }
