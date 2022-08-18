import { Alert, Animated, Keyboard } from 'react-native';
import React, { useEffect, useRef, useState } from 'react'

import { Container, InputsContainer } from './styles';

import { theme } from '../../common/theme';
import { InsertNameScreenProps } from '../../routes/Stack/screenProps';
import { DefaultHeaderContainer } from '../../components/DefaultHeaderContainer';
import { FormContainer } from '../../components/FormContainer';
import { InstructionCard } from '../../components/InstructionCard';
import { LineInput } from '../../components/LineInput';
import { PrimaryButton } from '../../components/PrimaryButton';

function InsertName({ navigation, route }: InsertNameScreenProps) {

	const [name, setName] = useState<string>('')
	const [invalidNameAfterSubmit, setInvaliNameAfterSubmit] = useState<boolean>(false)

	const inputRefs = {
		nameInput: useRef<React.MutableRefObject<any>>(null),
	}

	const validateName = (text: string) => {
		const isValid = text.length >= 5
		if (isValid) {
			setInvaliNameAfterSubmit(false)
			return true
		}
		return false
	}

	const sendUserDataToNextScreen = () => {
		const nameIsValid = validateName(name)
		const userPhone = route.params.userPhone

		if (nameIsValid) {
			// navigation.navigate('InsertName', { userPhone }) // Navigation to this screen
			Alert.alert('Signin!', `Phone: ${userPhone}\nName: ${name}`)
			navigation.navigate('InsertProfilePicture', { userPhone, userName: name })
		} else {
			!nameIsValid && setInvaliNameAfterSubmit(true)
		}
	}

	const someInvalidFieldSubimitted = () => {
		return invalidNameAfterSubmit
	}

	const headerBackgroundAnimatedValue = useRef(new Animated.Value(0))
	const animateDefaultHeaderBackgound = () => {
		const existsError = someInvalidFieldSubimitted()

		Animated.timing(headerBackgroundAnimatedValue.current, {
			toValue: existsError ? 1 : 0,
			duration: 300,
			useNativeDriver: false,
		}).start()

		return headerBackgroundAnimatedValue.current.interpolate({
			inputRange: [0, 1],
			outputRange: [theme.green2, theme.red2],
		})
	}

	return (
		<Container >
			<DefaultHeaderContainer
				relativeHeight={'55%'}
				centralized
				backgroundColor={animateDefaultHeaderBackgound()}
			>
				<InstructionCard
					message={
						someInvalidFieldSubimitted()
							? 'não deu!\nparece que este nome é \nmuito curto '
							: 'boa!\n\nagora vamos \ncriar o seu perfil'
					}
					highlightedWords={
						someInvalidFieldSubimitted()
							? ['\nmuito', 'curto']
							: ['\ncriar', 'o', 'seu', 'perfil']
					}
				/>
			</DefaultHeaderContainer>
			<FormContainer backgroundColor={theme.white2}>
				<InputsContainer>
					<LineInput
						value={name}
						relativeWidth={'100%'}
						textInputRef={inputRefs.nameInput}
						defaultBackgroundColor={theme.white2}
						defaultBorderBottomColor={theme.black4}
						validBackgroundColor={theme.green1}
						validBorderBottomColor={theme.green5}
						invalidBackgroundColor={theme.red1}
						invalidBorderBottomColor={theme.red5}
						maxLength={50}
						invalidTextAfterSubmit={invalidNameAfterSubmit}
						placeholder={'qual é o seu nome?'}
						keyboardType={'default'}
						validateText={(text: string) => validateName(text)}
						onChangeText={(text: string) => setName(text)}
					/>
				</InputsContainer>
				<PrimaryButton
					color={someInvalidFieldSubimitted() ? theme.red3 : theme.green3}
					iconName={'arrow-right'}
					iconColor={theme.white3}
					label='continuar'
					labelColor={theme.white3}
					highlightedWords={['continuar']}
					onPress={sendUserDataToNextScreen}
				/>
			</FormContainer>
		</Container>
	);
}

export { InsertName }