import React from 'react'

import { Address, AddressArea, Container, HighlightedAddress, IconArea } from './styles'
import AngleRightWhitetIcon from '@assets/icons/angleRight-white.svg'
import ClockIcon from '@assets/icons/clock-white.svg'
import { relativeScreenDensity } from '@common/screenDimensions'
import { theme } from '@common/theme'

interface DropdownItemProps {
	selected?: boolean
	dropdownData?: { addressHighlighted: string, addressThin: string }
	recent?: boolean
	findNearPosts?: () => void
}

function DropdownItem({ selected, dropdownData, recent, findNearPosts }: DropdownItemProps) {
	const getRelativeWidth = () => {
		if (selected) return '100%'
		if (recent) return '70%'
		return '85%'
	}

	return (
		<Container
			style={{
				backgroundColor: !selected ? theme.colors.white[3] : theme.colors.orange[1],
				borderLeftColor: !selected ? theme.colors.black[4] : theme.colors.orange[4],
				borderLeftWidth: !selected ? relativeScreenDensity(2.5) : relativeScreenDensity(5),
			}}
			onPress={() => findNearPosts && findNearPosts()}
		>
			{
				recent && (
					<IconArea>
						<ClockIcon width={relativeScreenDensity(22)} height={relativeScreenDensity(22)} />
					</IconArea>
				)
			}
			<AddressArea
				style={{
					width: getRelativeWidth()
				}}
			>
				<HighlightedAddress
					numberOfLines={2}
					style={{
						color: !selected ? theme.colors.black[4] : theme.colors.orange[4]
					}}
				>
					{dropdownData && dropdownData.addressHighlighted}
				</HighlightedAddress>
				<Address
					numberOfLines={1}
					style={{
						color: !selected ? theme.colors.black[4] : theme.colors.orange[4]
					}}
				>
					{dropdownData && dropdownData.addressThin}
				</Address>
			</AddressArea>
			<IconArea>
				{
					!selected && <AngleRightWhitetIcon width={relativeScreenDensity(18)} height={relativeScreenDensity(18)} />
				}
			</IconArea>
		</Container>
	)
}

export { DropdownItem }
