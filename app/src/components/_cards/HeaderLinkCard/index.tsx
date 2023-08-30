import React from 'react'
import { SvgProps } from 'react-native-svg'
import { RFValue } from 'react-native-responsive-fontsize'

import { CardHeader, ValueContainer, Text } from './styles'
import ClipWhiteIcon from '../../../assets/icons/clip-white.svg'

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
					fontSize={24}
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
								{value}
							</Text>
						)
						: (
							< Text numberOfLines={4}>{value}</Text>
						)
				}
			</ValueContainer>
		</DefaultCardContainer >
	)
}

export { HeaderLinkCard }
