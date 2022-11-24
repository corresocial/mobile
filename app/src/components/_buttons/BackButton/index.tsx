import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

import { Container } from './styles'
import AngleLeft from '../../../assets/icons/angleLeft.svg'

interface BackButtonProps {
	onPress: () => void
}

function BackButton({ onPress }: BackButtonProps) {
	return (
		<Container onPress={onPress}>
			<AngleLeft height={RFValue(25)} width={RFValue(25)} />
		</Container>
	)
}

export { BackButton }
