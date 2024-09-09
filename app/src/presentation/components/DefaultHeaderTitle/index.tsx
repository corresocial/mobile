import React from 'react'
import { TouchableOpacity, View, ViewStyle } from 'react-native'
import { SvgProps } from 'react-native-svg'

import { Container, Title } from './styles'
import { showMessageWithHighlight } from '@common/auxiliaryFunctions'
import { relativeScreenDensity } from '@common/screenDimensions'

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
								height={relativeScreenDensity(dimensions)}
								width={relativeScreenDensity(dimensions)}
							/>
						)
					}
				</TouchableOpacity>
			)
		}
		return (
			SvgIcon && (
				<SvgIcon
					height={relativeScreenDensity(dimensions)}
					width={relativeScreenDensity(dimensions)}
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
							height={relativeScreenDensity(dimensions)}
							width={relativeScreenDensity(dimensions)}
							style={{ marginRight: relativeScreenDensity(10) }}
						/>
					)
				}
				<Title style={{
					marginLeft: invertTextAndIcon || !SvgIcon ? 0 : relativeScreenDensity(10),
					fontWeight: highlightedWords.length > 0 ? 400 : 700,
					fontSize: relativeScreenDensity(fontSize)
				}}
				>
					{showMessageWithHighlight(title, highlightedWords)}
				</Title>
			</View>
		</Container>
	)
}

export { DefaultHeaderTitle }
