import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

import { showMessageWithHighlight } from '@common/auxiliaryFunctions'
import { UiUtils } from '@utils-ui/common/UiUtils'

import { Container, Decimals, LargeFont, SmallFont, ValueArea, ExchangeArea, ExchangeWord } from './styles'

const { textHasOnlyNumbers } = UiUtils()

interface SaleExchangeValueProps {
	saleValue?: string | undefined
	exchangeValue?: string | undefined
	breakRow?: boolean
	smallFontSize?: number,
	largeFontSize?: number
	exchangeFontSize?: number
}

function SaleExchangeValue({
	saleValue,
	exchangeValue,
	breakRow,
	smallFontSize = 12,
	largeFontSize = 18,
	exchangeFontSize = 18
}: SaleExchangeValueProps) {
	const hasSaleValue = !!saleValue
	const hasExchangeValue = !!exchangeValue

	if (!hasSaleValue && !hasExchangeValue) return null

	if (saleValue === 'a combinar') {
		return (
			<LargeFont style={{ fontSize: RFValue(exchangeFontSize - 0.5) }}>
				{saleValue}
			</LargeFont>
		)
	}

	return (
		<Container style={{ flexDirection: !breakRow ? 'row' : 'column' }}>
			{
				textHasOnlyNumbers(saleValue)
					? (
						<ValueArea>
							{
								hasSaleValue
								&& (
									<>
										<SmallFont style={{ fontSize: RFValue(smallFontSize) }}>
											{'r$'}
										</SmallFont>
										<LargeFont style={{ fontSize: RFValue(largeFontSize) }}>
											{saleValue}
										</LargeFont>
										<Decimals style={{ fontSize: RFValue(smallFontSize) }}>
											{',00'}
										</Decimals>
									</>
								)
							}
						</ValueArea>
					)
					: (
						hasSaleValue && (
							<ExchangeWord
								style={{ fontSize: RFValue(smallFontSize) }}
								numberOfLines={1}
							>
								{'vende'}
							</ExchangeWord>
						)
					)
			}
			<ExchangeArea>
				{
					hasExchangeValue
					&& (
						<ExchangeWord
							style={{ fontSize: RFValue(exchangeFontSize), fontFamily: 'Arvo_400Regular' }}
						>
							{showMessageWithHighlight(`${hasSaleValue ? ' ou ' : ''}troca`, ['troca'])}
						</ExchangeWord>
					)
				}
			</ExchangeArea>
		</Container>
	)
}

export { SaleExchangeValue }
