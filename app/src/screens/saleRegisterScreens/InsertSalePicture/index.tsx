import React from 'react'
import { StatusBar } from 'react-native'

import { screenHeight, statusBarHeight } from '@common/screenDimensions'
import { theme } from '@common/theme'
import Uncheck from '@assets/icons/uncheck.svg'
import Check from '@assets/icons/check.svg'

import { InsertSalePictureScreenProps } from '@routes/Stack/SaleStack/stackScreenProps'

import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { FormContainer } from '@components/_containers/FormContainer'
import { BackButton } from '@components/_buttons/BackButton'
import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { InstructionCard } from '@components/_cards/InstructionCard'
import { ProgressBar } from '@components/ProgressBar'
import { ButtonsContainer, Container } from './styles'

function InsertSalePicture({ navigation }: InsertSalePictureScreenProps) {
	return (
		<Container>
			<StatusBar
				backgroundColor={theme.green2}
				barStyle={'dark-content'}
			/>
			<DefaultHeaderContainer
				minHeight={(screenHeight + statusBarHeight) * 0.26}
				relativeHeight={'22%'}
				centralized
				backgroundColor={theme.green2}
			>
				<BackButton onPress={() => navigation.goBack()} />
				<InstructionCard
					borderLeftWidth={3}
					fontSize={18}
					message={
						'que tal adicionar algumas fotos para atrair clientes?'
					}
					highlightedWords={['adicionar', 'algumas', 'fotos']}
				>
					<ProgressBar range={5} value={2} />
				</InstructionCard>
			</DefaultHeaderContainer>
			<FormContainer backgroundColor={theme.white3}>
				<ButtonsContainer>
					<PrimaryButton
						flexDirection={'row-reverse'}
						color={theme.red3}
						relativeHeight={'30%'}
						labelColor={theme.white3}
						label={'não precisa, valew'}
						highlightedWords={['não', 'precisa']}
						SvgIcon={Uncheck}
						svgIconScale={['22%', '18%']}
						onPress={() => navigation.navigate('SelectPaymentType')}
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
						onPress={() => navigation.navigate('SalePicturePreview')}
					/>
				</ButtonsContainer>
			</FormContainer>
		</Container>
	)
}

export { InsertSalePicture }
