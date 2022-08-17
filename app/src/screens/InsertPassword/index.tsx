import { Alert, Animated, TouchableOpacity } from 'react-native';
import React, { useRef, useState } from 'react'

import { Container, InputsContainer } from './styles';

import { theme } from '../../common/theme';
import { InsertPasswordScreenProps } from '../../routes/Stack/screenProps';
import { DefaultHeaderContainer } from '../../components/DefaultHeaderContainer';
import { FormContainer } from '../../components/FormContainer';
import { InstructionCard } from '../../components/InstructionCard';
import { LineInput } from '../../components/LineInput';
import { PrimaryButton } from '../../components/PrimaryButton';

function InsertPassword({ navigation, route }: InsertPasswordScreenProps) {

	const [password, setPassword] = useState<string>('')
	const [invalidPasswordAfterSubmit, setInvaliPasswordAfterSubmit] = useState<boolean>(false)

	const inputRefs = {
		passwordInput: useRef<React.MutableRefObject<any>>(null),
	}

	const validatePassword = (text: string) => {
		const isValid = text.length >= 8
		if (isValid) {
			setInvaliPasswordAfterSubmit(false)
			return true
		}
		return false
	}

	const performSignin = () => {
		const passwordIsValid = validatePassword(password)
		const userPhone= route.params.userPhone

		console.log(userPhone)
		
		if (passwordIsValid) {
			// navigation.navigate('InsertPassword', { userPhone }) // Navigation to this screen
			Alert.alert('Signin!', `Phone: ${userPhone}\nPassword: ${password}`)

		} else {
			!passwordIsValid && setInvaliPasswordAfterSubmit(true)
		}
	}

	const someInvalidFieldSubimitted = () => {
		return invalidPasswordAfterSubmit
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
			outputRange: [theme.blue2  , theme.red2],
		})
	}

	return (
		<Container >
			<DefaultHeaderContainer
				relativeHeight='55%'
				centralized
				backgroundColor={animateDefaultHeaderBackgound()}
			>
				<InstructionCard
					message={
						someInvalidFieldSubimitted()
							? 'não deu!\n\nparece que a senha tá errada'
							: 'bom ter você de volta!\n\nmanda tua senha aí'
					}
					highlightedWords={
						someInvalidFieldSubimitted()
							? ['senha', 'tá', 'errada']
							: ['senha']
					}
				/>
			</DefaultHeaderContainer>
			<FormContainer backgroundColor={theme.white2}>
				<InputsContainer>
					<LineInput
						value={password}
						relativeWidth={'100%'}
						textInputRef={inputRefs.passwordInput}
						defaultBackgroundColor={theme.white2}
						defaultBorderBottomColor={theme.black4}
						validBackgroundColor={theme.blue1}
						validBorderBottomColor={theme.blue5}
						invalidBackgroundColor={theme.red1}
						invalidBorderBottomColor={theme.red5}
						maxLength={16}
						secureTextEntry
						invalidTextAfterSubmit={invalidPasswordAfterSubmit}
						placeholder={'22'}
						keyboardType={'default'}
						validateText={(text: string) => validatePassword(text)}
						onChangeText={(text: string) => setPassword(text)}
					/>
				</InputsContainer>
				<PrimaryButton
					color={someInvalidFieldSubimitted() ? theme.red3 : theme.yellow3}
					iconName={'arrow-right'}
					iconColor={theme.white3}
					label='continuar'
					labelColor={theme.white3}
					highlightedWords={['continuar']}
					onPress={performSignin}
				/>
			</FormContainer>
		</Container>
	);
}

export { InsertPassword }