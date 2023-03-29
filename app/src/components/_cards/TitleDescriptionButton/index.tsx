import React, { useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";

import { showMessageWithHighlight } from "@common/auxiliaryFunctions";
import { Container, ContainerInner, Description, Title } from "./styles";

interface TitleDescriptionButtonProps {
	height: string | number;
	color: string;
	title: string;
	titleFontSize?: number;
	description: string;
	highlightedWords: string[];
	onPress: () => void;
}

function TitleDescriptionButton({
	height,
	color,
	title,
	titleFontSize = 22,
	description,
	highlightedWords,
	onPress,
}: TitleDescriptionButtonProps) {
	const [buttonPressed, setButtomPressed] = useState<boolean>(false);

	function pressingButton() {
		setButtomPressed(true);
	}

	function notPressingButton() {
		setButtomPressed(false);
	}

	function releaseButton() {
		setButtomPressed(false);
		onPress();
	}

	return (
		<Container style={{ height }}>
			<ContainerInner
				style={{
					backgroundColor: color,
					marginLeft: buttonPressed ? RFValue(5) : 0,
				}}
				onPressIn={pressingButton}
				onPressOut={notPressingButton}
				onPress={releaseButton}
			>
				<Title
					style={{
						fontSize: RFValue(titleFontSize),
					}}
				>
					{showMessageWithHighlight(title, highlightedWords)}
				</Title>
				<Description>
					{showMessageWithHighlight(description, highlightedWords)}
				</Description>
			</ContainerInner>
		</Container>
	);
}

export { TitleDescriptionButton };
