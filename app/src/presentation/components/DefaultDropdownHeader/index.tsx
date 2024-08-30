import React from 'react'

import { AddressSelectedArea, AddressSelectedText, IconArea, InitialDropdown, InitialDropdownContainer, PresentationText } from './styles'
import AngleDownWhiteIcon from '@assets/icons/angleDown-white.svg'
import AngleUpWhiteIcon from '@assets/icons/angleUp-white.svg'
import CityIcon from '@assets/icons/mapPoint-white.svg'
import { relativeScreenDensity } from '@common/screenDimensions'

interface DefaultDropdownHeaderProps {
	text?: string
	absolute?: boolean
	toggleDropdownVisibility?: () => void
}

function DefaultDropdownHeader({
	text,
	absolute,
	toggleDropdownVisibility

}: DefaultDropdownHeaderProps) {
	return (
		<InitialDropdownContainer
			style={{ position: absolute ? 'absolute' : 'relative', bottom: 0 }}
		>
			<InitialDropdown
				onPress={toggleDropdownVisibility}
			>
				<IconArea>
					<CityIcon width={relativeScreenDensity(30)} height={relativeScreenDensity(30)} />
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
							<IconArea >
								<AngleUpWhiteIcon width={relativeScreenDensity(22)} height={relativeScreenDensity(22)} />
							</IconArea>
						)
						: (
							<IconArea >
								<AngleDownWhiteIcon width={relativeScreenDensity(22)} height={relativeScreenDensity(22)} />
							</IconArea>
						)
				}
			</InitialDropdown>
		</InitialDropdownContainer >
	)
}

export { DefaultDropdownHeader }
