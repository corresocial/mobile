import React from "react";
import { RFValue } from "react-native-responsive-fontsize";

import {
	Address,
	AddressArea,
	Container,
	HighlightedAddress,
	IconArea,
} from "./styles";
import AngleRightIcon from "@assets/icons/angleRight.svg";
import ClockIcon from "@assets/icons/clock.svg";
import { theme } from "@common/theme";

interface DropdownItemProps {
	selected?: boolean;
	dropdownData?: { addressHighlighted: string; addressThin: string };
	recent?: boolean;
	findNearPosts?: () => void;
}

function DropdownItem({
	selected,
	dropdownData,
	recent,
	findNearPosts,
}: DropdownItemProps) {
	const getRelativeWidth = () => {
		if (selected) return "100%";
		if (recent) return "70%";
		return "85%";
	};

	return (
		<Container
			style={{
				backgroundColor: !selected ? theme.white3 : theme.orange1,
				borderLeftColor: !selected ? theme.black4 : theme.orange5,
				borderLeftWidth: !selected ? RFValue(2.5) : RFValue(5),
			}}
			onPress={() => findNearPosts && findNearPosts()}
		>
			{recent && (
				<IconArea>
					<ClockIcon width={RFValue(22)} height={RFValue(22)} />
				</IconArea>
			)}
			<AddressArea
				style={{
					width: getRelativeWidth(),
				}}
			>
				<HighlightedAddress
					numberOfLines={2}
					style={{
						color: !selected ? theme.black4 : theme.orange5,
					}}
				>
					{dropdownData && dropdownData.addressHighlighted}
				</HighlightedAddress>
				<Address
					numberOfLines={1}
					style={{
						color: !selected ? theme.black4 : theme.orange5,
					}}
				>
					{dropdownData && dropdownData.addressThin}
				</Address>
			</AddressArea>
			<IconArea>
				{!selected && (
					<AngleRightIcon width={RFValue(18)} height={RFValue(18)} />
				)}
			</IconArea>
		</Container>
	);
}

export { DropdownItem };
