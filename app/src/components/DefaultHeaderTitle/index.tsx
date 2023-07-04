import React from 'react'
import { TouchableOpacity, View, ViewStyle } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { SvgProps } from 'react-native-svg'
import { showMessageWithHighlight } from '../../common/auxiliaryFunctions'

import { Container, Title } from './styles'

interface DefaultHeaderTitleProps {
	title: string
	fontSize?: number
	highlightedWords?: string[]
	SvgIcon?: React.FC<SvgProps> | false
	SecondSvgIcon?: React.FC<SvgProps>
	dimensions?: number
	invertTextAndIcon?: boolean
	justifyContent?: ViewStyle['justifyContent']
	onPressIcon?: () => void
}

function DefaultHeaderTitle({
	title,
	fontSize = 18,
	highlightedWords = [],
	SvgIcon,
	SecondSvgIcon,
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
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center'
				}}
			>
				{
					!!SecondSvgIcon && (
						<SecondSvgIcon
							height={RFValue(dimensions)}
							width={RFValue(dimensions)}
							style={{ marginRight: RFValue(10) }}
						/>
					)
				}
				<Title style={{
					marginLeft: invertTextAndIcon || !SvgIcon ? 0 : RFValue(10),
					fontFamily: highlightedWords.length > 0 ? 'Arvo_400Regular' : 'Arvo_700Bold',
					fontSize: RFValue(fontSize)
				}}
				>
					{showMessageWithHighlight(title, highlightedWords)}
				</Title>
			</View>
		</Container>
	)
}

export { DefaultHeaderTitle }
