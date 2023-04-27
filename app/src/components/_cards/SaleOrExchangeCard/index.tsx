import React from 'react'
import { DefaultHeaderTitle } from '../../DefaultHeaderTitle'

import { Decimals, SmallFont, SmallFontBold } from './styles'
import CashWhiteIcon from '../../../assets/icons/cash-white.svg'
import ChatWhiteIcon from '../../../assets/icons/chatTabIconInactive.svg'
import SalesCartWhiteIcon from '../../../assets/icons/salesCart-white.svg'
import ExchangeWhiteIcon from '../../../assets/icons/exchange-white.svg'

import { showMessageWithHighlight } from '../../../common/auxiliaryFunctions'
import { textHasOnlyNumbers } from '../../../utils/validationFunctions'

import { DefaultCardContainer } from '../DefaultCardContainer'
import { PostInfoRow } from '../../PostInfoRow'

interface SaleOrExchangeCardProps {
	title?: string
	hightligtedWords?: string[]
	saleValue?: string
	exchangeValue?: string
	showsValueType?: 'sale' | 'exchange' | 'both'
	isCulturePost?: boolean
}

function SaleOrExchangeCard({ title, hightligtedWords, saleValue, exchangeValue, showsValueType, isCulturePost }: SaleOrExchangeCardProps) {
	const getDefaultTitle = () => {
		switch (showsValueType) {
			case 'sale': return 'produto a venda'
			case 'exchange': return 'produto a troca'
			case 'both': return 'venda ou troca'
			default: return 'valor do produto'
		}
	}

	const getRelativeValue = () => {
		if (showsValueType === 'exchange') {
			return showMessageWithHighlight(`${exchangeValue}`, exchangeValue?.split(' ') || [])
		}

		if (saleValue === 'a combinar') {
			return showMessageWithHighlight('preço a combinar', ['combinar'])
		}

		if (textHasOnlyNumbers(saleValue)) {
			return (
				<>
					<SmallFont>{'r$'}</SmallFont>
					<SmallFontBold>{saleValue}</SmallFontBold>
					<Decimals>{',00'}</Decimals>
				</>
			)
		}

		return showMessageWithHighlight(`${saleValue}`, saleValue?.split(' ') || [])
	}

	const getRelativeValueIcon = (isExchange?: boolean) => {
		if (isCulturePost) return false

		if (showsValueType === 'exchange' || isExchange) {
			return ExchangeWhiteIcon
		}

		if (saleValue === 'a combinar') {
			return ChatWhiteIcon
		}

		return SalesCartWhiteIcon
	}

	return (
		<DefaultCardContainer>
			<DefaultHeaderTitle
				title={title || getDefaultTitle()}
				highlightedWords={hightligtedWords || ['venda', 'troca']}
				SvgIcon={isCulturePost && CashWhiteIcon}
				dimensions={32}
			/>
			<PostInfoRow
				text={getRelativeValue()}
				SvgIcon={getRelativeValueIcon()}
			/>
			{
				showsValueType === 'both' && (
					<PostInfoRow
						text={showMessageWithHighlight(`${exchangeValue}`, exchangeValue?.split(' ') || [])}
						SvgIcon={getRelativeValueIcon(true)}
						withoutMarginTop
					/>
				)
			}
		</DefaultCardContainer>
	)
}

export { SaleOrExchangeCard }
