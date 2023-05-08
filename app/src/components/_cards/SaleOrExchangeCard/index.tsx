import React from 'react'
import { DefaultHeaderTitle } from '../../DefaultHeaderTitle'

import { Decimals, SmallFont, SmallFontBold } from './styles'
import ChatWhiteIcon from '../../../assets/icons/chatTabIconInactive.svg'
import SalesCartWhiteIcon from '../../../assets/icons/salesCart-white.svg'
import ExchangeWhiteIcon from '../../../assets/icons/exchange-white.svg'
import CashWhiteIcon from '../../../assets/icons/cash-white.svg'

import { showMessageWithHighlight } from '../../../common/auxiliaryFunctions'
import { textHasOnlyNumbers } from '../../../utils/validationFunctions'

import { DefaultCardContainer } from '../DefaultCardContainer'
import { PostInfoRow } from '../../PostInfoRow'
import { EditHeaderContainer } from '../../_containers/EditHeaderContainer'

interface SaleOrExchangeCardProps {
	title?: string
	hightligtedWords?: string[]
	saleValue?: string
	exchangeValue?: string
	isCulturePost?: boolean
	isPayment?: boolean
	onEdit?: () => void
}

function SaleOrExchangeCard({
	title,
	hightligtedWords,
	saleValue,
	exchangeValue,
	isCulturePost,
	isPayment,
	onEdit
}: SaleOrExchangeCardProps) {
	const getDefaultTitle = () => {
		if (saleValue && !exchangeValue) return 'produto a venda'
		if (exchangeValue && !saleValue) return 'produto a troca'
		if (saleValue && exchangeValue) return 'venda ou troca'

		return 'venda ou troca'
	}

	const getRelativeValue = () => {
		if (exchangeValue && !saleValue) {
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

		if ((exchangeValue && !saleValue) || isExchange) {
			return ExchangeWhiteIcon
		}

		if (saleValue === 'a combinar') {
			return ChatWhiteIcon
		}

		return !isPayment ? SalesCartWhiteIcon : CashWhiteIcon
	}

	return (
		<DefaultCardContainer>
			<EditHeaderContainer onPress={onEdit}>
				<DefaultHeaderTitle
					title={title || getDefaultTitle()}
					highlightedWords={hightligtedWords || ['venda', 'troca']}
					SvgIcon={isCulturePost && CashWhiteIcon}
					dimensions={32}
				/>
			</EditHeaderContainer>
			{
				(saleValue || exchangeValue) && (
					<>
						<PostInfoRow
							text={getRelativeValue()}
							SvgIcon={getRelativeValueIcon()}
						/>
						{
							saleValue && exchangeValue && (
								<PostInfoRow
									text={showMessageWithHighlight(`${exchangeValue}`, exchangeValue?.split(' ') || [])}
									SvgIcon={getRelativeValueIcon(true)}
									withoutMarginTop
								/>
							)
						}
					</>
				)
			}
		</DefaultCardContainer>
	)
}

export { SaleOrExchangeCard }
