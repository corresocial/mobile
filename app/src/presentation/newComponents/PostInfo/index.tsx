import React, { ReactNode, useState } from 'react'
import { Linking, Text } from 'react-native'
import DateTimePicker from 'react-native-modal-datetime-picker'
import { useTheme } from 'styled-components'

import { DaysOfWeek, EventRepeatType, PlaceModalityType, WeekdaysFrequency } from '@domain/post/entity/types'

import { IconName } from '@assets/icons/iconMap/types'
import { MacroCategoriesType } from '@utils/postMacroCategories/types'

import { UiUtils } from '@utils-ui/common/UiUtils'

import { Container, Content, HyperlinkContainer, LinkContainer, LinksContainer, LongText, PriceLabel, SeeMoreLabel, TextLink, Title, Value } from './styles'
import { getShortText } from '@common/auxiliaryFunctions'

import { IconComponent } from '@newComponents/IconComponent'

const { arrayIsEmpty, textHasOnlyNumbers, formatDate, formatHour } = UiUtils()

export type PostInfoType = 'description' | 'price' | 'link' | 'macroCategory' | 'placeModality' | 'dateTime'

type PriceValues = { saleValue?: string, exchangeValue?: string }
type DateTimeInfos = {
	weekDaysfrequency?: WeekdaysFrequency
	daysOfWeek?: DaysOfWeek[]
	startTime?: Date | any
	endTime?: Date | any
	startDate?: Date | any
	endDate?: Date | any
	repetition?: EventRepeatType
}

interface PostInfoProps {
	type: PostInfoType
	title?: string
	value: string | string[] | MacroCategoriesType | PriceValues | DateTimeInfos
	icon?: IconName
}

function PostInfo({ title, value, type, icon }: PostInfoProps) {
	const theme = useTheme()

	const sumarizedSubscriptionSize = 200

	const showResizeLabel = () => (value as string || '').length >= sumarizedSubscriptionSize
	const [descriptionIsExpanded, setDescriptionIsExpanded] = useState(false)

	const toggleDescriptionIsExpanded = () => {
		setDescriptionIsExpanded((previousState) => !previousState)
	}

	const linkStyle = {
		color: theme.colors.orange[3],
		fontFamily: theme.fonts.nunitoBold,
		fontSize: theme.fontSizes.nunito[3]
	}

	const renderLinks = (links: string[]) => {
		return links.map((link) => (
			<LinkContainer
				key={link}
				activeOpacity={0.6}
				onPress={() => openLink(link)}
			>
				<IconComponent
					iconName={'clip'}
					relativeHeight={25}
					relativeWidth={25}
				/>
				<TextLink numberOfLines={1}>{link}</TextLink>
			</LinkContainer>
		))
	}

	const openLink = async (link: string) => {
		try {
			const supportedLink = await Linking.canOpenURL(link)
			if (!supportedLink) { throw new Error('Link inválido') }
			if (link.includes('http')) { return await Linking.openURL(link) }
			await Linking.openURL(`http://${link}`)
		} catch (error: any) {
			console.log(error)
			throw new Error(error)
		}
	}

	const getRelativePostTypeLabel = (macroCategory: MacroCategoriesType) => {
		switch (macroCategory) {
			case 'art': return 'arte'
			case 'event': return 'evento'
			case 'education': return 'educação'
			default: return 'indisponível'
		}
	}

	const getRelaticePostTypeIcon = (macroCategory: MacroCategoriesType): IconName => {
		switch (macroCategory) {
			case 'art': return 'colorPalet'
			case 'event': return 'calendarEveryday'
			case 'education': return 'books'
			default: return 'x'
		}
	}

	const getRelativePlaceModalityLabel = (placeModality: PlaceModalityType) => {
		switch (placeModality) {
			case 'presential': return 'presencial'
			case 'online': return 'online'
			case 'both': return 'online e presencial'
			default: return ''
		}
	}

	const getRelativePlaceModalityIcon = (placeModality: PlaceModalityType): IconName => {
		switch (placeModality) {
			case 'online': return 'computerAndPhone'
			case 'presential': return 'handOnPerson'
			case 'both': return 'x' // CURRENT Ver com Rafa um ícone para isso
			default: return 'x'
		}
	}

	const getRelativePriceValueLabel = (priceValue: PriceValues) => {
		const formattedValue = []

		if (textHasOnlyNumbers(priceValue.saleValue)) {
			formattedValue.push(
				<>
					<PriceLabel>{'R$'}</PriceLabel>
					<PriceLabel bold>{`${priceValue.saleValue},00`}</PriceLabel>
				</>
			)
		}

		if (priceValue.saleValue === 'a combinar') {
			formattedValue.push('a combinar')
		}

		if (priceValue.exchangeValue) {
			formattedValue.push(`${priceValue.saleValue ? ' ou' : ''} troco por ${priceValue.exchangeValue}`)
		}

		console.log(formattedValue)
		return formattedValue
	}

	const getRelativeValueIcon = (priceValue: PriceValues): IconName => {
		if (priceValue.saleValue === 'a combinar') { return 'chat' }
		if (priceValue.exchangeValue && priceValue.saleValue) { return 'x' } // CURRENT Ver com Rafa ícone para isso, ícone que represente tanto venda quanto troca
		if (priceValue.exchangeValue && !priceValue.saleValue) { return 'cash' }
		if (!priceValue.exchangeValue && priceValue.saleValue) { return 'exchange' }
		return 'x'
	}

	const listDaysOfWeek = (daysOfWeek: DaysOfWeek[]) => {
		const allDaysOfWeek = ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'] as DaysOfWeek[]
		const ordenedDaysOfWeek = allDaysOfWeek.filter((weekDay: DaysOfWeek) => daysOfWeek?.includes(weekDay))
		return ordenedDaysOfWeek?.toString().split(',').join(', ')
	}

	const getRelativeWeekDaysfrequency = (dateTimeInfo: DateTimeInfos) => {
		const dateTimeInfosToRender = []

		switch (dateTimeInfo.weekDaysfrequency) {
			case 'today': dateTimeInfosToRender.push('só hoje'); break
			case 'everyday': dateTimeInfosToRender.push('todos os dias'); break
			case 'businessDay': dateTimeInfosToRender.push('seg à sex'); break
			case 'someday': dateTimeInfosToRender.push(`${listDaysOfWeek(dateTimeInfo.daysOfWeek || [])}`); break
		}

		if (dateTimeInfo.startDate || dateTimeInfo.startTime) {
			const startDate = dateTimeInfo.startDate ? formatDate(dateTimeInfo.startDate) : null
			const startTime = dateTimeInfo.startTime ? formatHour(dateTimeInfo.startTime) : null
			dateTimeInfosToRender.push(`começa dia ${startDate} ${startTime ? `${startDate ? 'às' : ''} ${startTime}` : ''}`)
		}

		if (dateTimeInfo.endDate || dateTimeInfo.endTime) {
			const endDate = dateTimeInfo.endDate ? formatDate(dateTimeInfo.endDate) : null
			const endTime = dateTimeInfo.endTime ? formatHour(dateTimeInfo.endTime) : null
			dateTimeInfosToRender.push(`começa dia ${endDate} ${endTime ? `${endDate ? 'às' : ''} ${endTime}` : ''}`)
		}

		switch (dateTimeInfo.repetition) {
			case 'unrepeatable': dateTimeInfosToRender.push('não se repete'); break
			case 'everyDay': dateTimeInfosToRender.push('repete todos os dias'); break
			case 'weekly': dateTimeInfosToRender.push('repete semanalmente'); break
			case 'biweekly': dateTimeInfosToRender.push('repete a cada 15 dias'); break
			case 'monthly': dateTimeInfosToRender.push('repete mensalmnte'); break
		}

		return dateTimeInfosToRender.join('\n')
	}

	/*
		--- CARDS DE CULTURA ---

		DescriptionCard - description
		LinkCard - link
		PostType - macroCategory
		PlaceModality
		SaleOrExchangeCard - price
		DateTimeCard

		ImageCarousel
		LocationViewCard
	*/

	const getStyleByType = (): CurrentStyle => {
		switch (type) {
			case 'description': return {
				title: 'Sobre',
				icon: '',
				titleLarge: true,
				render: (
					<LongText >
						<HyperlinkContainer
							text={descriptionIsExpanded && showResizeLabel() ? value : getShortText(value as string, sumarizedSubscriptionSize)}
							linkStyle={linkStyle}
						>
							{descriptionIsExpanded && showResizeLabel() ? value : getShortText(value as string, sumarizedSubscriptionSize)}
						</HyperlinkContainer>
						{showResizeLabel() && <SeeMoreLabel onPress={toggleDescriptionIsExpanded}>{descriptionIsExpanded ? ' mostrar menos' : 'mostrar mais'}</SeeMoreLabel>}
					</LongText>
				)
			}
			case 'macroCategory': return {
				title: 'Categoria:',
				formattedValue: getRelativePostTypeLabel(value as MacroCategoriesType),
				icon: getRelaticePostTypeIcon(value as MacroCategoriesType),
			}
			case 'placeModality': return {
				title: 'Participação:',
				formattedValue: getRelativePlaceModalityLabel(value as PlaceModalityType),
				icon: getRelativePlaceModalityIcon(value as PlaceModalityType),
			}
			case 'price': return {
				title: 'Preço:',
				formattedValue: getRelativePriceValueLabel(value as PriceValues),
				icon: getRelativeValueIcon(value as PriceValues),
			}
			case 'dateTime': return {
				title: 'Quando vai ser:',
				formattedValue: getRelativeWeekDaysfrequency(value as DateTimeInfos),
				icon: 'clock'
			}
			case 'link': return {
				title: 'Links:',
				icon: '',
				render: !arrayIsEmpty(value) && (
					<LinksContainer>
						{renderLinks(value as string[])}
					</LinksContainer>
				)
			}
			default: return {
				title: 'Info:',
				icon: ''
			}
		}
	}

	type CurrentStyle = {
		title: string
		icon: IconName | string
		titleLarge?: true
		formattedValue?: any
		render?: ReactNode
	}

	const currentStyle = getStyleByType() as CurrentStyle

	return (
		<Container>
			<Title
				titleLarge={currentStyle.titleLarge}
			>
				{`${title || currentStyle.title}`}
			</Title>
			<Content enableIconSpace={!!(currentStyle.icon || icon)}>
				{(currentStyle.icon || icon) && (
					<IconComponent
						iconName={currentStyle.icon as IconName || icon}
						relativeHeight={35}
						relativeWidth={35}
					/>
				)}
				{currentStyle.render || <Value>{currentStyle.formattedValue || value}</Value>}
			</Content>
		</Container>
	)
}

export { PostInfo }
