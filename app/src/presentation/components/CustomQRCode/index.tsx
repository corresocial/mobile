import React from 'react'
import QRCode from 'react-native-qrcode-svg'

import { CliboardText, ClipboardArea, Container } from './styles'
import CheckWhiteIcon from '@assets/icons/check-white.svg'
import { relativeScreenWidth } from '@common/screenDimensions'

interface CustomQRCodeProps {
	value: string
	keyWasJustCopied?: boolean
}

function CustomQRCode({ value, keyWasJustCopied }: CustomQRCodeProps) {
	return (
		<Container>
			<QRCode
				value={value || 'NA'}
				size={relativeScreenWidth(55)}
			/>
			<ClipboardArea valueHasCliped={keyWasJustCopied}>
				<CliboardText
					valueHasCliped={keyWasJustCopied}
					numberOfLines={1}
					selectable
				>
					{keyWasJustCopied ? 'código copiado!' : value}
				</CliboardText>
				{keyWasJustCopied && <CheckWhiteIcon width={'20%'} height={'90%'} />}
			</ClipboardArea>
		</Container>
	)
}

export { CustomQRCode }
