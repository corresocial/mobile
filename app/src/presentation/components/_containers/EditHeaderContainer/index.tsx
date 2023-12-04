import React from 'react'
import { TouchableOpacity } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { SvgProps } from 'react-native-svg'

import { Container } from './styles'
import EditWhiteIcon from '../../../assets/icons/edit-white.svg'

interface EditHeaderContainerProps {
	children: React.ReactNode
	RightIcon?: React.FC<SvgProps>
	onPress?: () => void
}

function EditHeaderContainer({ children, RightIcon, onPress }: EditHeaderContainerProps) {
	return (
		<Container>
			{children}
			{
				onPress && (
					<TouchableOpacity onPress={onPress} >
						{
							!RightIcon
								? <EditWhiteIcon width={RFValue(28)} height={RFValue(28)} />
								: <RightIcon width={RFValue(28)} height={RFValue(28)} />
						}
					</TouchableOpacity>
				)
			}
		</Container>
	)
}

export { EditHeaderContainer }
