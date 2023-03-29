import React from "react";

import { showMessageWithHighlight } from "@common/auxiliaryFunctions";

import { theme } from "@common/theme";
import { Container, Title, Text } from "./styles";
import MapIcon from "@assets/icons/map.svg";

import { PrimaryButton } from "../_buttons/PrimaryButton";

interface RequestLocationProps {
	getLocationPermissions: () => void;
}

function RequestLocation({ getLocationPermissions }: RequestLocationProps) {
	return (
		<Container>
			<Title>{"Opa!"}</Title>
			<Text>
				{showMessageWithHighlight(
					"precisamos da sua localização para encontra os posts e perfis perto de você",
					[
						"sua",
						"localização",
						"posts",
						"e",
						"perfis",
						"perto",
						"de",
						"você",
					]
				)}
			</Text>
			<PrimaryButton
				startsHidden={false}
				color={theme.green3}
				label={"usar minha localização"}
				highlightedWords={["minha", "localização"]}
				labelColor={theme.white3}
				fontSize={16}
				SecondSvgIcon={MapIcon}
				svgIconScale={["50%", "30%"]}
				onPress={getLocationPermissions}
			/>
		</Container>
	);
}

export { RequestLocation };
