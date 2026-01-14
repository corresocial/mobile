import React from "react";
import { useTheme } from "styled-components/native";

import LogoOutlinedWhiteIcon from "@assets/icons/logo-outlined.svg";
import { relativeScreenHeight } from "@common/screenDimensions";

import { OptionButton } from "../OptionButton";

interface SubscriptionButtonProps {
	customTitle?: string;
	customDescription?: string;
	onPress: () => void;
}

function SubscriptionButton({
	customTitle = "",
	customDescription = "",
	onPress,
}: SubscriptionButtonProps) {
	const theme = useTheme();

	return (
		<OptionButton
			color={theme.colors.white[3]}
			label={customTitle || "apoie o corre"}
			highlightedWords={[
				...customTitle.split(" "),
				"apoie",
				"o",
				"corre",
				"PROMOÇÃO",
			]}
			labelSize={17}
			relativeHeight={relativeScreenHeight(12)}
			shortDescription={
				customDescription ||
				"com uma assinatura e doação mensal você nos ajuda a criar a rede social do futuro do país "
			}
			SvgIcon={LogoOutlinedWhiteIcon}
			svgIconScale={["65%", "65%"]}
			leftSideColor={theme.colors.orange[3]}
			leftSideWidth={"25%"}
			onPress={onPress}
		/>
	);
}

export { SubscriptionButton };
