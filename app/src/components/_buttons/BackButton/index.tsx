import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

import AngleLeft from '@assets/icons/angleLeft.svg'
import { Container } from './styles'

interface BackButtonProps {
	onPress: () => void;
}

function BackButton({ onPress }: BackButtonProps) {
	return (
		<Container onPress={onPress}>
			<AngleLeft height={RFValue(25)} width={RFValue(25)} />
		</Container>
	)
}

export { BackButton }
