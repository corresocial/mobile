import { Animated, Keyboard, Platform, StatusBar } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";

import { ButtonContainer, Container, InputsContainer } from "./styles";
import { theme } from "@common/theme";

import { EditUserNameScreenProps } from "@routes/Stack/UserStack/stackScreenProps";

import { EditContext } from "@contexts/EditContext";

import { DefaultHeaderContainer } from "@components/_containers/DefaultHeaderContainer";
import { FormContainer } from "@components/_containers/FormContainer";
import { PrimaryButton } from "@components/_buttons/PrimaryButton";
import { InstructionCard } from "@components/_cards/InstructionCard";
import { LineInput } from "@components/LineInput";

function EditUserName({ navigation, route }: EditUserNameScreenProps) {
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext);

	const [inputName, setInputName] = useState<string>(route.params.userName);
	const [nameIsValid, setInputNameIsValid] = useState<boolean>(false);
	const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false);
	const [invalidNameAfterSubmit, setInvaliNameAfterSubmit] =
		useState<boolean>(false);
	const inputRefs = {
		nameInput: useRef<React.MutableRefObject<any>>(null),
	};

	useEffect(() => {
		const unsubscribe = navigation.addListener("focus", () => {
			Keyboard.addListener("keyboardDidShow", () =>
				setKeyboardOpened(true)
			);
			Keyboard.addListener("keyboardDidHide", () =>
				setKeyboardOpened(false)
			);
		});
		return unsubscribe;
	}, [navigation]);

	useEffect(() => {
		const validation = validateName(inputName);
		setInputNameIsValid(validation);
	}, [inputName]);

	const validateName = (text: string) => {
		const isValid = text?.trim().length >= 1;
		if (isValid) {
			setInvaliNameAfterSubmit(false);
			return true;
		}
		return false;
	};

	const someInvalidFieldSubimitted = () => invalidNameAfterSubmit;

	const saveUserName = async () => {
		addNewUnsavedFieldToEditContext({ name: inputName });
		navigation.goBack();
	};

	const headerBackgroundAnimatedValue = useRef(new Animated.Value(0));
	const animateDefaultHeaderBackgound = () => {
		const existsError = someInvalidFieldSubimitted();

		Animated.timing(headerBackgroundAnimatedValue.current, {
			toValue: existsError ? 1 : 0,
			duration: 300,
			useNativeDriver: false,
		}).start();

		return headerBackgroundAnimatedValue.current.interpolate({
			inputRange: [0, 1],
			outputRange: [theme.green2, theme.red2],
		});
	};

	return (
		<Container behavior={Platform.OS === "ios" ? "padding" : "height"}>
			<StatusBar
				backgroundColor={
					someInvalidFieldSubimitted() ? theme.red2 : theme.green2
				}
				barStyle={"dark-content"}
			/>
			<DefaultHeaderContainer
				relativeHeight={"55%"}
				centralized
				backgroundColor={animateDefaultHeaderBackgound()}
			>
				<InstructionCard
					message={
						someInvalidFieldSubimitted()
							? "ops! \nparece que algo deu errado do nosso lado! \npor favor tente novamente em alguns instantes"
							: "edite o seu nome"
					}
					highlightedWords={
						someInvalidFieldSubimitted()
							? [
									"ops,",
									"\nparece",
									"que",
									"algo",
									"deu",
									"errado",
									"do",
									"nosso",
									"lado!",
							  ]
							: ["nome"]
					}
				/>
			</DefaultHeaderContainer>
			<FormContainer backgroundColor={theme.white2}>
				<InputsContainer>
					<LineInput
						value={inputName}
						relativeWidth={"100%"}
						textInputRef={inputRefs.nameInput}
						defaultBackgroundColor={theme.white2}
						defaultBorderBottomColor={theme.black4}
						validBackgroundColor={theme.green1}
						validBorderBottomColor={theme.green5}
						invalidBackgroundColor={theme.red1}
						invalidBorderBottomColor={theme.red5}
						maxLength={50}
						lastInput
						invalidTextAfterSubmit={invalidNameAfterSubmit}
						placeholder={"qual é o seu nome?"}
						keyboardType={"default"}
						textIsValid={nameIsValid && !keyboardOpened}
						onChangeText={(text: string) => setInputName(text)}
					/>
				</InputsContainer>
				<ButtonContainer>
					{nameIsValid && !keyboardOpened && (
						<PrimaryButton
							color={
								someInvalidFieldSubimitted()
									? theme.red3
									: theme.green3
							}
							iconName={"arrow-right"}
							iconColor={theme.white3}
							label={"salvar"}
							labelColor={theme.white3}
							highlightedWords={["salvar"]}
							startsHidden={false}
							onPress={saveUserName}
						/>
					)}
				</ButtonContainer>
			</FormContainer>
		</Container>
	);
}

export { EditUserName };
