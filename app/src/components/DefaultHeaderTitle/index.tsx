import React from 'react'
import { TouchableOpacity } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { SvgProps } from 'react-native-svg'
import { showMessageWithHighlight } from '../../common/auxiliaryFunctions'

import { Container, Title } from './styles'

interface DefaultHeaderTitleProps {
	title: string
	fontSize?: number
	highlightedWords?: string[]
	SvgIcon?: React.FC<SvgProps>
	dimensions?: number
	invertTextAndIcon?: boolean
	justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
	onPressIcon?: () => void
}

function DefaultHeaderTitle({
	title,
	fontSize = 18,
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
					{
						SvgIcon && (
							<SvgIcon
								height={RFValue(dimensions)}
								width={RFValue(dimensions)}
							/>
						)
					}
				</TouchableOpacity>
			)
		}
		return (
			SvgIcon && (
				<SvgIcon
					height={RFValue(dimensions)}
					width={RFValue(dimensions)}
				/>
			)
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
				fontFamily: highlightedWords.length > 0 ? 'Arvo_400Regular' : 'Arvo_700Bold',
				fontSize: RFValue(fontSize)
			}}
			>
				{showMessageWithHighlight(title, highlightedWords)}
			</Title>
		</Container>
	)
}

export { DefaultHeaderTitle }
