import React from "react";
import { StatusBar } from "react-native";

import {
	Body,
	Container,
	Header,
	Sigh,
	Title,
	TextMedium,
	ButtonContainer,
} from "./styles";
import { theme } from "@common/theme";

import { WhoWeAreTransformationScreenProps } from "@routes/Stack/UserStack/stackScreenProps";

import { DefaultPostViewHeader } from "@components/DefaultPostViewHeader";
import { PrimaryButton } from "@components/_buttons/PrimaryButton";
import { DefaultCardContainer } from "@components/_cards/DefaultCardContainer";
import { DescriptionWithLeftTracing } from "@components/DescriptionWithLeftTracing";

function WhoWeAreTransformation({
	navigation,
}: WhoWeAreTransformationScreenProps) {
	return (
		<Container>
			<StatusBar
				backgroundColor={theme.white3}
				barStyle={"dark-content"}
			/>
			<Header>
				<DefaultPostViewHeader
					onBackPress={() => navigation.goBack()}
					text={"quem somos"}
					highlightedWords={["somos"]}
				/>
			</Header>
			<Body>
				<DefaultCardContainer flex={1}>
					<Sigh />
					<Title>{"transformação"}</Title>
					<TextMedium>
						{"democracia como sempre devia ter sido."}
					</TextMedium>
					<DescriptionWithLeftTracing
						text={
							"colhendo dados em entrevistas e encontros de moradores, abaixos assinados e enquetes criamos planos de ação para priorizar e reivindicar melhorias nas comunidades de baixa renda."
						}
					/>
					<TextMedium>
						{
							"tudo gerido por líderes locais, que entendem a realidade de onde vem!"
						}
					</TextMedium>
					<Sigh />
				</DefaultCardContainer>
				<Sigh />
				<ButtonContainer>
					<PrimaryButton
						color={theme.orange3}
						label={"apoie o corre.!"}
						fontSize={20}
						onPress={() => {
							navigation.navigate("Configurations");
							navigation.navigate("HelpUs");
						}}
					/>
				</ButtonContainer>
			</Body>
		</Container>
	);
}

export { WhoWeAreTransformation };
