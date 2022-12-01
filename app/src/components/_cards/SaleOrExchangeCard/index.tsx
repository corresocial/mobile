import React from 'react'
import { DefaultHeaderTitle } from '../../DefaultHeaderTitle'

import {
	Decimals,
	LargeFont,
	SmallFont,
	SaleValueArea,
	ExchangeArea,
	ExchangeText,
	InCashValue,
} from './styles'
import DollarIcon from '../../../assets/icons/dollar.svg'

import { showMessageWithHighlight } from '../../../common/auxiliaryFunctions'

import { DefaultCardContainer } from '../DefaultCardContainer'

interface SaleOrExchangeCardProps {
	title: string
	saleValue?: string | number
	exchangeValue?: string
	timesOnCard?: string
}

function SaleOrExchangeCard({ title, saleValue, exchangeValue, timesOnCard = '' }: SaleOrExchangeCardProps) {
	return (
		<DefaultCardContainer>
			<DefaultHeaderTitle
				title={title}
				SvgIcon={DollarIcon}
				dimensions={30}
			/>
			{
				saleValue && (
					<SaleValueArea>
						<InCashValue>
							<SmallFont>
								{'r$'}
							</SmallFont>
							<LargeFont>
								{saleValue}
							</LargeFont>
							<Decimals>
								{',00'}
							</Decimals>
						</InCashValue>
						{
							timesOnCard
								? (
									<SmallFont>
										{showMessageWithHighlight(
											`até ${timesOnCard} no cartão`,
											[timesOnCard]
										)}
									</SmallFont>
								)
								: null
						}
					</SaleValueArea>
				)
			}
			{
				!!exchangeValue && (
					<>
						<SmallFont>
							{'ou'}
						</SmallFont>
						<ExchangeArea>
							<ExchangeText>
								{showMessageWithHighlight(
									'troca por item de valor equivalente',
									['troca', 'valor', 'equivalente']
								)}
								{/* {showMessageWithHighlight(
										`troca por ${exchangeValue}`,
										['troca', ...exchangeValue.split(' ')]
									)} */}
							</ExchangeText>
						</ExchangeArea>
					</>
				)
			}
		</DefaultCardContainer>
	)
}

export { SaleOrExchangeCard }
