import React, { ReactElement } from "react";
import { Animated } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { relativeScreenWidth } from "@common/screenDimensions";

import { Container } from "./styles";

interface DefaultHeaderContainerProps {
	children: ReactElement | ReactElement[];
	backgroundColor: string | Animated.AnimatedInterpolation<string>;
	relativeHeight?: string | Animated.AnimatedInterpolation<string> | number;
	centralized?: boolean;
	flexDirection?: string;
	justifyContent?: string;
	minHeight?: number;
	borderBottomWidth?: number;
	grow?: boolean;
	paddingVertical?: number;
	withoutPadding?: boolean;
}

function DefaultHeaderContainer({
	children,
	relativeHeight = "55%",
	centralized,
	flexDirection = "row",
	justifyContent,
	backgroundColor,
	minHeight = 0,
	borderBottomWidth = 5,
	grow,
	paddingVertical,
	withoutPadding,
}: DefaultHeaderContainerProps) {
	return (
		<Container
			style={
				{
					minHeight: RFValue(minHeight),
					height: grow ? "auto" : relativeHeight,
					flexDirection,
					backgroundColor,
					borderBottomWidth: RFValue(borderBottomWidth),
					paddingVertical: paddingVertical
						? RFValue(paddingVertical)
						: relativeScreenWidth(5),
					padding: withoutPadding ? 0 : relativeScreenWidth(5),
					alignItems: centralized ? "center" : "flex-start",
					justifyContent:
						justifyContent ||
						(centralized ? "center" : "flex-start"),
				} as { [key: string]: React.CSSProperties }
			}
		>
			{children}
		</Container>
	);
}

export { DefaultHeaderContainer };
