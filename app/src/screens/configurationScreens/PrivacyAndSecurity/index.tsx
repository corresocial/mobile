import React from "react";
import { StatusBar } from "react-native";

import { Container, Sigh } from "./styles";
import { theme } from "@common/theme";
import AngleLeftThin from "@assets/icons/angleLeftThin.svg";

import { relativeScreenWidth } from "@common/screenDimensions";

import { PrivacyAndSecurityScreenProps } from "@routes/Stack/userStack/stackScreenProps";

import { DefaultHeaderContainer } from "@components/_containers/DefaultHeaderContainer";
import { InstructionCard } from "@components/_cards/InstructionCard";
import { SmallButton } from "@components/_buttons/SmallButton";
import { TermsOfService } from "@components/TermsOfService";

function PrivacyAndSecurity({ navigation }: PrivacyAndSecurityScreenProps) {
	return (
		<Container>
			<StatusBar
				backgroundColor={theme.white3}
				barStyle={"dark-content"}
			/>
			<DefaultHeaderContainer
				relativeHeight={"18%"}
				centralized
				backgroundColor={theme.white3}
			>
				<SmallButton
					relativeWidth={relativeScreenWidth(11)}
					height={relativeScreenWidth(11)}
					color={theme.white3}
					SvgIcon={AngleLeftThin}
					onPress={() => navigation.goBack()}
				/>
				<Sigh />
				<InstructionCard
					borderLeftWidth={3}
					fontSize={15}
					message={"privacidade e segurança"}
					highlightedWords={["privacidade", "segurança"]}
				></InstructionCard>
			</DefaultHeaderContainer>
			<TermsOfService
				onPress={() => navigation.navigate("Configurations")}
			/>
		</Container>
	);
}

export { PrivacyAndSecurity };
