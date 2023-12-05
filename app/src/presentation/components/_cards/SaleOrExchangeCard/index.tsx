import React from 'react'

import { Decimals, SmallFont, SmallFontBold } from './styles'
import CashWhiteIcon from '@assets/icons/cash-white.svg'
import ChatWhiteIcon from '@assets/icons/chat-white.svg'
import ExchangeWhiteIcon from '@assets/icons/exchange-white.svg'
import PlusWhiteIcon from '@assets/icons/plus-white.svg'
import SalesCartWhiteIcon from '@assets/icons/salesCart-white.svg'
import { showMessageWithHighlight } from '@common/auxiliaryFunctions'

import { EditHeaderContainer } from '@components/_containers/EditHeaderContainer'
import { UiUtils } from '@utils-ui/common/UiUtils'
import { DefaultHeaderTitle } from '../../DefaultHeaderTitle'
import { PostInfoRow } from '../../PostInfoRow'
import { DefaultCardContainer } from '../DefaultCardContainer'

const { textHasOnlyNumbers } = UiUtils()

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

	const getHeaderRightIcon = () => {
		return (!saleValue && !exchangeValue) ? PlusWhiteIcon : undefined
	}

	return (
		<DefaultCardContainer>
			<EditHeaderContainer onPress={onEdit} RightIcon={getHeaderRightIcon()}>
				<DefaultHeaderTitle
					title={title || getDefaultTitle()}
					highlightedWords={hightligtedWords || ['venda', 'troca']}
					SvgIcon={isCulturePost && CashWhiteIcon}
					dimensions={28}
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
