import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { RFValue } from 'react-native-responsive-fontsize'
import { SvgProps } from 'react-native-svg'
import { showMessageWithHighlight } from '../../common/auxiliaryFunctions'

import { Container, Title } from './styles'

interface DefaultHeaderTitleProps {
	title: string
	highlightedWords: string[]
	SvgIcon?: React.FC<SvgProps> | any // TODO Type Remove any
	dimensions?: number
	invertTextAndIcon?: boolean
	justifyContent?: any // TODO Type
	onPressIcon?: () => void
}

function DefaultHeaderTitle({
	title,
	highlightedWords = [],
	SvgIcon,
	dimensions = 35,
	invertTextAndIcon,
	justifyContent = 'flex-start',
	onPressIcon
}: DefaultHeaderTitleProps) {
	const renderInteractiveSvgIcon = () => {
		if (onPressIcon) {
			return (
				<TouchableOpacity onPress={() => onPressIcon()}>
					<SvgIcon
						height={RFValue(dimensions)}
						width={RFValue(dimensions)}
					/>
				</TouchableOpacity>
			)
		}
		return (
			<SvgIcon
				height={RFValue(dimensions)}
				width={RFValue(dimensions)}
			/>
		)
	}

	return (
		<Container style={{
			flexDirection: invertTextAndIcon ? 'row-reverse' : 'row',
			justifyContent
		}}
		>
			{
				!!SvgIcon && renderInteractiveSvgIcon()
			}
			<Title style={{
				marginLeft: invertTextAndIcon ? 0 : RFValue(10),
				fontFamily: highlightedWords ? 'Arvo_400Regular' : 'Arvo_700Bold'
			}}
			>
				{showMessageWithHighlight(title, highlightedWords)}
			</Title>
		</Container>
	)
}

export { DefaultHeaderTitle }
