import React from 'react'
import { DefaultHeaderTitle } from '../../DefaultHeaderTitle'

import {
	Decimals,
	LargeFont,
	SmallFont,
	SaleValueArea,
	ExchangeArea,
	ExchangeText,
	SmallFontBold,
} from './styles'
import DollarIcon from '../../../assets/icons/dollar.svg'

import { showMessageWithHighlight } from '../../../common/auxiliaryFunctions'
import { textHasOnlyNumbers } from '../../../utils/validationFunctions'

import { DefaultCardContainer } from '../DefaultCardContainer'

interface SaleOrExchangeCardProps {
	title: string
	saleValue?: string | number
	exchangeValue?: string
	withoutExchangePresentation?: boolean
}

function SaleOrExchangeCard({ title, saleValue, exchangeValue, withoutExchangePresentation }: SaleOrExchangeCardProps) {
	const renderSaleValue = () => {
		if (!textHasOnlyNumbers(saleValue)) {
			return (
				<SaleValueArea>
					<SmallFontBold>
						{saleValue}
					</SmallFontBold>
				</SaleValueArea>
			)
		}

		return (
			<SaleValueArea>
				<SmallFont>
					{'r$'}
				</SmallFont>
				<LargeFont>
					{saleValue}
				</LargeFont>
				<Decimals>
					{',00'}
				</Decimals>
			</SaleValueArea>
		)
	}

	return (
		<DefaultCardContainer>
			<DefaultHeaderTitle
				title={title}
				SvgIcon={DollarIcon}
				dimensions={30}
			/>
			{saleValue && renderSaleValue()}
			{
				!!saleValue && !!exchangeValue && (
					<SmallFont>
						{'ou'}
					</SmallFont>
				)
			}
			{
				!!exchangeValue && (
					<ExchangeArea>
						<ExchangeText>
							{showMessageWithHighlight(
								withoutExchangePresentation ? exchangeValue : `troca por ${exchangeValue}`,
								['troca', ...exchangeValue.split(' ')]
							)}
						</ExchangeText>
					</ExchangeArea>

				)
			}
		</DefaultCardContainer>
	)
}

export { SaleOrExchangeCard }
