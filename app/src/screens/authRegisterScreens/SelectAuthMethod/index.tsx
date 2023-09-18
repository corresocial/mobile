import React from 'react'
import { StatusBar } from 'react-native'

import { Container } from './styles'
import { theme } from '../../../common/theme'
import GoogleWhiteIcon from '../../../assets/icons/google-white.svg'
import AppleWhiteIcon from '../../../assets/icons/apple-white.svg'
import SmartphoneWhiteIcon from '../../../assets/icons/smartphone-white.svg'

import { SelectAuthMethodScreenProps } from '../../../routes/Stack/AuthRegisterStack/stackScreenProps'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { BackButton } from '../../../components/_buttons/BackButton'

function SelectAuthMethod({ navigation }: SelectAuthMethodScreenProps) {
	const navigateBackwards = () => navigation.goBack()

	const performSigninWithCellNumber = async () => {
		navigation.navigate('InsertCellNumber')
	}

	const performSigninWithGoogle = () => {
		console.log('performSigninWithGoogle')
	}

	const performSigninWithApple = () => {
		console.log('performSigninWithApple')
	}

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
					message={'como você prefere entrar?'}
					highlightedWords={['entrar']}
				/>
			</DefaultHeaderContainer>
			<FormContainer backgroundColor={theme.white2} justifyContent={'space-around'}>
				<PrimaryButton
					color={theme.green3}
					SecondSvgIcon={SmartphoneWhiteIcon}
					svgIconScale={['50%', '25%']}
					label={'telefone'}
					highlightedWords={['telefone']}
					labelColor={theme.white3}
					onPress={performSigninWithCellNumber}
				/>
				<PrimaryButton
					color={theme.purple3}
					SecondSvgIcon={GoogleWhiteIcon}
					svgIconScale={['50%', '25%']}
					labelColor={theme.white3}
					label={'google'}
					highlightedWords={['google']}
					onPress={performSigninWithGoogle}
				/>
				<PrimaryButton
					color={theme.purple3}
					SecondSvgIcon={AppleWhiteIcon}
					svgIconScale={['50%', '25%']}
					labelColor={theme.white3}
					label={'apple'}
					highlightedWords={['apple']}
					onPress={performSigninWithApple}
				/>
			</FormContainer>
		</Container >
	)
}

export { SelectAuthMethod }
