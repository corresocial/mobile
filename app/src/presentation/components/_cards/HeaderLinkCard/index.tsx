import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { SvgProps } from 'react-native-svg'

import { CardHeader, ValueContainer, Text } from './styles'
import ClipWhiteIcon from '@assets/icons/clip-white.svg'

import { showMessageWithHighlight } from '../../../common/auxiliaryFunctions'
import { DefaultHeaderTitle } from '../../DefaultHeaderTitle'
import { DefaultCardContainer } from '../DefaultCardContainer'

interface HeaderLinkCardProps {
	title: string
	highlightedWords?: string[]
	value?: string
	profilePictureUrl?: string | null
	SvgIcon?: React.FC<SvgProps>
	onEdit?: () => void
}

function HeaderLinkCard({
	title,
	highlightedWords = [],
	value = '',
	profilePictureUrl = '',
	SvgIcon,
	onEdit,
}: HeaderLinkCardProps) {
	return (
		<DefaultCardContainer withoutPadding={!!profilePictureUrl} >
			<CardHeader
				style={{
					paddingHorizontal: profilePictureUrl ? RFValue(15) : 0,
					paddingVertical: profilePictureUrl ? RFValue(10) : 0
				}}
			>
				<DefaultHeaderTitle
					title={title}
					fontSize={20}
					highlightedWords={highlightedWords}
					onPressIcon={onEdit}
					SvgIcon={SvgIcon || ClipWhiteIcon}
					dimensions={25}
				/>
			</CardHeader>
			<ValueContainer>
				{
					value.length < 150
						? (
							<Text>
								{showMessageWithHighlight(value, highlightedWords)}
							</Text>
						)
						: (
							< Text numberOfLines={4}>{showMessageWithHighlight(value, highlightedWords)}</Text>
						)
				}
			</ValueContainer>
		</DefaultCardContainer >
	)
}

export { HeaderLinkCard }
