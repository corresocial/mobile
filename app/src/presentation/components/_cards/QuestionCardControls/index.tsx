import React from 'react'
import { SvgProps } from 'react-native-svg'

import { Container, QuestionArea, RightOptions, Text, TouchableIcon } from './styles'
import EditWhiteIcon from '@assets/icons/edit-white.svg'
import MinusWhiteIcon from '@assets/icons/minus-white.svg'
import QuestionMarkWhiteIcon from '@assets/icons/questionMark-white.svg'
import { relativeScreenDensity } from '@common/screenDimensions'

interface QuestionCardControlsProps {
	title?: string
	CustonLeftIcon?: React.FC<SvgProps>
	onEdit?: () => void
	onRemove?: () => void
}

function QuestionCardControls({ title, CustonLeftIcon, onEdit, onRemove }: QuestionCardControlsProps) {
	return (
		<Container>
			<QuestionArea>
				{
					CustonLeftIcon
						? <CustonLeftIcon width={relativeScreenDensity(28)} height={relativeScreenDensity(28)} />
						: <QuestionMarkWhiteIcon width={relativeScreenDensity(28)} height={relativeScreenDensity(28)} />
				}
				<Text>{title}</Text>
			</QuestionArea>
			<RightOptions>
				<TouchableIcon onPress={onEdit} >
					<EditWhiteIcon width={relativeScreenDensity(28)} height={relativeScreenDensity(28)} />
				</TouchableIcon>
				<TouchableIcon onPress={onRemove} >
					<MinusWhiteIcon width={relativeScreenDensity(28)} height={relativeScreenDensity(28)} />
				</TouchableIcon>
			</RightOptions>

		</Container>
	)
}

export { QuestionCardControls }
