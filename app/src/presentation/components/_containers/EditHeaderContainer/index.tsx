import React from 'react'
import { TouchableOpacity } from 'react-native'
import { SvgProps } from 'react-native-svg'

import { Container } from './styles'
import EditWhiteIcon from '@assets/icons/edit-white.svg'
import { relativeScreenDensity } from '@common/screenDimensions'

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
								? <EditWhiteIcon width={relativeScreenDensity(28)} height={relativeScreenDensity(28)} />
								: <RightIcon width={relativeScreenDensity(28)} height={relativeScreenDensity(28)} />
						}
					</TouchableOpacity>
				)
			}
		</Container>
	)
}

export { EditHeaderContainer }
