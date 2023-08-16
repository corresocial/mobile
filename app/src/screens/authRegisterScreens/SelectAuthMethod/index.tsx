import React from 'react'
import { StatusBar } from 'react-native'

import { Container } from './styles'
import { theme } from '../../../common/theme'
import WhatsAppWhiteIcon from '../../../assets/icons/whatsapp.svg'
import SmartphoneIcon from '../../../assets/icons/smartphone.svg'

import { SelectAuthMethodScreenProps } from '../../../routes/Stack/AuthRegisterStack/stackScreenProps'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { VerticalSigh } from '../../../components/VerticalSigh'
import { relativeScreenHeight } from '../../../common/screenDimensions'
import { BackButton } from '../../../components/_buttons/BackButton'

type AuthMethod = 'sms' | 'whatsapp'

function SelectAuthMethod({ navigation }: SelectAuthMethodScreenProps) {
	const navigateToInsertCellNumberScreen = async (authMethod: AuthMethod) => {
		navigation.navigate('InsertCellNumber', { authByWhatsapp: authMethod === 'whatsapp' })
	}

	const navigateBackwards = () => navigation.goBack()

	return (
		<Container >
			<StatusBar backgroundColor={theme.purple2} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				relativeHeight={'55%'}
				centralized
				backgroundColor={theme.purple2}
			>
				<BackButton onPress={navigateBackwards} />
				<InstructionCard
					message={'como você quer acessar o corre.?'}
					highlightedWords={['como', 'acessar', 'o', 'corre.']}
				/>
			</DefaultHeaderContainer>
			<FormContainer backgroundColor={theme.white2} justifyContent={'center'}>
				<PrimaryButton
					color={theme.purple3}
					SecondSvgIcon={SmartphoneIcon}
					svgIconScale={['50%', '25%']}
					label={'sms'}
					highlightedWords={['sms']}
					labelColor={theme.white3}
					onPress={() => navigateToInsertCellNumberScreen('sms')}
				/>
				<VerticalSigh height={relativeScreenHeight(5)} />
				<PrimaryButton
					color={theme.green3}
					SecondSvgIcon={WhatsAppWhiteIcon}
					svgIconScale={['50%', '25%']}
					labelColor={theme.white3}
					label={'whatsapp'}
					highlightedWords={['whatsapp']}
					onPress={() => navigateToInsertCellNumberScreen('whatsapp')}
				/>
			</FormContainer>
		</Container >
	)
}

export { SelectAuthMethod }
