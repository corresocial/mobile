import React from 'react'
import { DefaultHeaderTitle } from '../../DefaultHeaderTitle'

import {
	Decimals,
	LargeFont,
	SmallFont,
	SaleValueArea,
	ExchangeArea,
	ExchangeText,
} from './styles'
import DollarIcon from '../../../assets/icons/dollar.svg'

import { showMessageWithHighlight } from '../../../common/auxiliaryFunctions'

import { DefaultCardContainer } from '../DefaultCardContainer'

interface SaleOrExchangeCardProps {
	title: string
	saleValue?: string | number
	exchangeValue?: string
	withoutExchangePresentation?: boolean
}

function SaleOrExchangeCard({ title, saleValue, exchangeValue, withoutExchangePresentation }: SaleOrExchangeCardProps) {
	const renderSaleValue = () => {
		if (saleValue === 'a combinar') {
			return (
				<SaleValueArea>
					<SmallFont>
						{saleValue}
					</SmallFont>
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
