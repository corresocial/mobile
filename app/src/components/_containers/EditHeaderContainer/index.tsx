import React from 'react'
import { TouchableOpacity } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

import { Container } from './styles'
import EditWhiteIcon from '../../../assets/icons/edit-white.svg'

interface EditHeaderContainerProps {
	children: React.ReactNode
	onPress?: () => void
}

function EditHeaderContainer({ children, onPress }: EditHeaderContainerProps) {
	return (
		<Container>
			{children}
			{
				onPress && (
					<TouchableOpacity onPress={onPress} >
						<EditWhiteIcon width={RFValue(30)} height={RFValue(30)} />
					</TouchableOpacity>
				)
			}
		</Container>
	)
}

export { EditHeaderContainer }
