import React, { useContext } from "react";
import { StatusBar } from "react-native";

import { Container, ButtonsContainer } from "./styles";
import { theme } from "@common/theme";

import { SelectSocialImpactRepeatScreenProps } from "@routes/Stack/socialImpactStack/stackScreenProps";
import { EventRepeatType } from "@services/firebase/types";

import { SocialImpactContext } from "@contexts/SocialImpactContext";
import { EditContext } from "@contexts/EditContext";

import { DefaultHeaderContainer } from "@components/_containers/DefaultHeaderContainer";
import { FormContainer } from "@components/_containers/FormContainer";
import { BackButton } from "@components/_buttons/BackButton";
import { PrimaryButton } from "@components/_buttons/PrimaryButton";
import { InstructionCard } from "@components/_cards/InstructionCard";
import { ProgressBar } from "@components/ProgressBar";

function SelectSocialImpactRepeat({
	route,
	navigation,
}: SelectSocialImpactRepeatScreenProps) {
	const { setSocialImpactDataOnContext } = useContext(SocialImpactContext);
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext);

	const saveSocialImpactRepeat = async (
		socialImpactRepeat: EventRepeatType
	) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ socialImpactRepeat });
			navigation.goBack();
			return;
		}

		setSocialImpactDataOnContext({ socialImpactRepeat });
		navigation.navigate("InsertOpeningHour");
	};

	const editModeIsTrue = () => route.params && route.params.editMode;

	return (
		<Container>
			<StatusBar
				backgroundColor={theme.white3}
				barStyle={"dark-content"}
			/>
			<DefaultHeaderContainer
				relativeHeight={"25%"}
				centralized
				backgroundColor={theme.white3}
			>
				<BackButton onPress={() => navigation.goBack()} />
				<InstructionCard
					borderLeftWidth={3}
					fontSize={18}
					message={"esse impacto, se repete?"}
					highlightedWords={["repete"]}
				>
					<ProgressBar range={5} value={4} />
				</InstructionCard>
			</DefaultHeaderContainer>
			<FormContainer backgroundColor={theme.pink2}>
				<ButtonsContainer>
					<PrimaryButton
						justifyContent={"flex-start"}
						color={theme.white3}
						relativeHeight={"16%"}
						labelColor={theme.black4}
						fontSize={18}
						textAlign={"left"}
						label={"1 vez por semana"}
						highlightedWords={["1", "vez", "por", "semana"]}
						onPress={() => saveSocialImpactRepeat("weekly")}
					/>
					<PrimaryButton
						justifyContent={"flex-start"}
						color={theme.white3}
						relativeHeight={"16%"}
						labelColor={theme.black4}
						fontSize={18}
						textAlign={"left"}
						label={"todos os dias"}
						highlightedWords={["todos", "os", "dias"]}
						onPress={() => saveSocialImpactRepeat("everyDay")}
					/>
					<PrimaryButton
						justifyContent={"flex-start"}
						color={theme.white3}
						relativeHeight={"16%"}
						labelColor={theme.black4}
						fontSize={18}
						textAlign={"left"}
						label={"a cada 15 dias"}
						highlightedWords={["a", "cada", "15", "dias"]}
						onPress={() => saveSocialImpactRepeat("biweekly")}
					/>
					<PrimaryButton
						justifyContent={"flex-start"}
						color={theme.white3}
						relativeHeight={"16%"}
						labelColor={theme.black4}
						fontSize={18}
						textAlign={"left"}
						label={"1 vez no mês"}
						highlightedWords={["1", "vez", "no", "mês"]}
						onPress={() => saveSocialImpactRepeat("monthly")}
					/>
					<PrimaryButton
						justifyContent={"flex-start"}
						color={theme.white3}
						relativeHeight={"16%"}
						labelColor={theme.black4}
						fontSize={18}
						textAlign={"left"}
						label={"não se repete"}
						highlightedWords={["não", "se", "repete"]}
						onPress={() => saveSocialImpactRepeat("unrepeatable")}
					/>
				</ButtonsContainer>
			</FormContainer>
		</Container>
	);
}

export { SelectSocialImpactRepeat };
