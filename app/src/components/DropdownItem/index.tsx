import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

import { Address, AddressArea, Container, HighlightedAddress, IconArea } from './styles'
import AngleRightIcon from '../../assets/icons/angleRight.svg'
import ClockIcon from '../../assets/icons/clock.svg'
import { theme } from '../../common/theme'

interface DropdownItemProps {
	selected?: boolean
	recent?: boolean
}

function DropdownItem({ selected, recent }: DropdownItemProps) {
	const getRelativeWidth = () => {
		if (selected) return '100%'
		if (recent) return '70%'
		return '85%'
	}

	return (
		<Container
			style={{
				backgroundColor: !selected ? theme.white3 : theme.orange1,
				borderLeftColor: !selected ? theme.black4 : theme.orange5,
			}}
		>
			{
				recent && (
					<IconArea>
						<ClockIcon width={RFValue(22)} height={RFValue(22)} />
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
						color: !selected ? theme.black4 : theme.orange5
					}}
				>
					{'R. Guarapuava, 90 - Jardim Santo Antonio asd asd asd as dasdas da d'}
				</HighlightedAddress>
				<Address
					numberOfLines={1}
					style={{
						color: !selected ? theme.black4 : theme.orange5
					}}
				>
					{'Londrina - PR, 76956-000'}
				</Address>
			</AddressArea>
			<IconArea>
				{
					!selected && <AngleRightIcon width={RFValue(18)} height={RFValue(18)} />
				}
			</IconArea>
		</Container>
	)
}

export { DropdownItem }
