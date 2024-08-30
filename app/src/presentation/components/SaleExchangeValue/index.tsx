import React from 'react'

import { UiUtils } from '@utils-ui/common/UiUtils'

import { Container, Decimals, LargeFont, SmallFont, ValueArea, ExchangeArea, ExchangeWord } from './styles'
import { showMessageWithHighlight } from '@common/auxiliaryFunctions'
import { relativeScreenDensity } from '@common/screenDimensions'

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
			<LargeFont style={{ fontSize: relativeScreenDensity(exchangeFontSize - 0.5) }}>
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
										<SmallFont style={{ fontSize: relativeScreenDensity(smallFontSize) }}>
											{'r$'}
										</SmallFont>
										<LargeFont style={{ fontSize: relativeScreenDensity(largeFontSize) }}>
											{saleValue}
										</LargeFont>
										<Decimals style={{ fontSize: relativeScreenDensity(smallFontSize) }}>
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
								style={{ fontSize: relativeScreenDensity(smallFontSize) }}
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
							style={{ fontSize: relativeScreenDensity(exchangeFontSize), fontFamily: 'Arvo_400Regular' }}
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
