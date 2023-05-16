import React from 'react'
import { TouchableOpacity } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

import { Container } from './styles'
import EditWhiteIcon from '../../../assets/icons/edit-white.svg'
import AngleRightIcon from '../../../assets/icons/angleRight.svg'

interface EditHeaderContainerProps {
	children: React.ReactNode
	navigateIcon?: boolean
	onPress?: () => void
}

function EditHeaderContainer({ children, navigateIcon, onPress }: EditHeaderContainerProps) {
	return (
		<Container>
			{children}
			{
				onPress && (
					<TouchableOpacity onPress={onPress} >
						{
							!navigateIcon
								? <EditWhiteIcon width={RFValue(28)} height={RFValue(28)} />
								: <AngleRightIcon width={RFValue(22)} height={RFValue(22)} />
						}
					</TouchableOpacity>
				)
			}
		</Container>
	)
}

export { EditHeaderContainer }
