import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

import { Container, Decimals, LargeFont, SmallFont, ValueArea, ExchangeArea, ExchangeWord } from './styles'
import { textHasOnlyNumbers } from '../../utils/validationFunctions'

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
								{'vendo'}
							</ExchangeWord>
						)
					)
			}
			<ExchangeArea>
				{
					hasExchangeValue
					&& (
						<ExchangeWord
							style={{ fontSize: RFValue(exchangeFontSize), padding: breakRow ? '1%' : 0 }}
						>
							{`${hasSaleValue ? ' ou ' : ''}troca`}
						</ExchangeWord>
					)
				}
			</ExchangeArea>
		</Container>
	)
}

export { SaleExchangeValue }
