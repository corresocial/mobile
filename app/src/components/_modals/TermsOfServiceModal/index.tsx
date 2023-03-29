import React from "react";
import { Modal, StatusBar } from "react-native";
import { theme } from "@common/theme";

import { TermsOfService } from "../../TermsOfService";

interface TermsOfServiceModalProps {
	visibility: boolean;
	closeModal: () => void;
}

function TermsOfServiceModal({
	visibility,
	closeModal,
}: TermsOfServiceModalProps) {
	return (
		<Modal visible={visibility} transparent animationType={"fade"}>
			<StatusBar
				backgroundColor={theme.transparence.orange2}
				barStyle={"dark-content"}
			/>
			<TermsOfService onPress={closeModal} />
		</Modal>
	);
}

export { TermsOfServiceModal };
