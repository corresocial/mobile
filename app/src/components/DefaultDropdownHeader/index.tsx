import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

import { IconArea } from '../LocationNearDropdown/styles'
import { AddressSelectedArea, AddressSelectedText, InitialDropdown, InitialDropdownContainer, PresentationText } from './styles'
import AngleDownIcon from '../../assets/icons/angleDown.svg'
import AngleUpIcon from '../../assets/icons/angleUp.svg'
import CityIcon from '../../assets/icons/city.svg'

interface DefaultDropdownHeaderProps {
	text?: string
	absolute?: boolean
	openDropDown?: () => void
	closeDropDown?: () => void
}

function DefaultDropdownHeader({
	text,
	absolute,
	openDropDown,
	closeDropDown

}: DefaultDropdownHeaderProps) {
	return (
		<InitialDropdownContainer style={{ position: absolute ? 'absolute' : 'relative', bottom: 0 }}>
			<InitialDropdown>
				<IconArea>
					<CityIcon width={RFValue(35)} height={RFValue(35)} />
				</IconArea>
				<AddressSelectedArea>
					<PresentationText>{'o que está rolando por perto de:'}</PresentationText>
					<AddressSelectedText numberOfLines={2}>
						{text}
					</AddressSelectedText>
				</AddressSelectedArea>
				{
					absolute
						? (
							<IconArea onPress={absolute ? closeDropDown : openDropDown}>
								<AngleUpIcon width={RFValue(22)} height={RFValue(22)} />
							</IconArea>
						)
						: (
							<IconArea onPress={absolute ? closeDropDown : openDropDown}>
								<AngleDownIcon width={RFValue(22)} height={RFValue(22)} />
							</IconArea>
						)
				}
			</InitialDropdown>
		</InitialDropdownContainer >
	)
}

export { DefaultDropdownHeader }
