import React, { ReactNode, useState } from 'react'
import { Linking } from 'react-native'
import { useTheme } from 'styled-components'

import { DaysOfWeek, DeliveryMethod, EventRepeatType, ItemStatus, PlaceModalityType, PostRange, WeekdaysFrequency, WorkplaceType } from '@domain/post/entity/types'

import { IconName } from '@assets/icons/iconMap/types'
import { MacroCategoriesType } from '@utils/postMacroCategories/types'

import { UiUtils } from '@utils-ui/common/UiUtils'

import { Container, Content, ColumnContainer, DateTimeLabel, HyperlinkContainer, LinkContainer, LinksContainer, ListItem, LongText, PriceLabel, SeeMoreLabel, TextLink, Title, Value } from './styles'
import { getShortText, showMessageWithHighlight } from '@common/auxiliaryFunctions'

import { IconComponent } from '@newComponents/IconComponent'

const { arrayIsEmpty, textHasOnlyNumbers, formatDate, formatHour } = UiUtils()

export type PostInfoType = 'description' | 'price' | 'link' | 'macroCategory' | 'placeModality' | 'dateTime' | 'productStatus' | 'range' | 'deliveryMethod' | 'importantPoints'

type PriceValues = { saleValue?: string, exchangeValue?: string, isEvent?: boolean }
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
	value: string | string[] | MacroCategoriesType | PriceValues | DateTimeInfos | ItemStatus | DeliveryMethod | PostRange
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
			case 'donation': return 'doação'
			case 'informative': return 'informativo'
			case 'iniciative': return 'iniciativa'
			case 'sale': return 'venda'
			case 'service': return 'serviço'
			case 'vacancy': return 'vagas'
			default: return 'indisponível'
		}
	}

	const getRelaticePostTypeIcon = (macroCategory: MacroCategoriesType): IconName => {
		switch (macroCategory) {
			case 'art': return 'colorPalet'
			case 'event': return 'calendarEveryday'
			case 'education': return 'books'
			case 'donation': return 'handOnHeart'
			case 'informative': return 'paperInfo'
			case 'iniciative': return 'heartAndPerson'
			case 'sale': return 'salesCart'
			case 'service': return 'toolbox'
			case 'vacancy': return 'briefcase'
			default: return 'x'
		}
	}

	const getRelativePlaceModalityLabel = (placeModality: PlaceModalityType | WorkplaceType) => {
		switch (placeModality) {
			case 'presential': return 'presencial'
			case 'online': return 'online'
			case 'both': return 'online e presencial'
			case 'homeoffice': return 'online e presencial'
			case 'hybrid': return 'online e presencial'
			default: return ''
		}
	}

	const getRelativePlaceModalityIcon = (placeModality: PlaceModalityType | WorkplaceType): IconName => {
		switch (placeModality) {
			case 'online': return 'computerAndPhone'
			case 'presential': return 'handOnPerson'
			case 'both': return 'personAndGlobe'
			case 'homeoffice': return 'computerAndPhone'
			case 'hybrid': return 'personAndGlobe'
			default: return 'computerAndPhone'
		}
	}

	const getRelativePriceValueLabel = (priceValue: PriceValues) => {
		const formattedValue = []

		if (priceValue.isEvent && (priceValue.saleValue === '')) {
			formattedValue.push(
				<PriceLabel bold>{'gratuito'}</PriceLabel>
			)
			return formattedValue
		}

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

		formattedValue.push(
			<PriceLabel bold>{priceValue.saleValue || ''}</PriceLabel>
		)
		return formattedValue
	}

	const getRelativeValueIcon = (priceValue: PriceValues): IconName => {
		if (priceValue.saleValue === 'a combinar') { return 'chat' }
		if (priceValue.exchangeValue && priceValue.saleValue) { return 'trade' }
		if (priceValue.exchangeValue && !priceValue.saleValue) { return 'exchange' }
		if (!priceValue.exchangeValue && priceValue.saleValue) { return 'cash' }
		return 'cash'
	}

	const listDaysOfWeek = (daysOfWeek: DaysOfWeek[]) => {
		const allDaysOfWeek = ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'] as DaysOfWeek[]
		const ordenedDaysOfWeek = allDaysOfWeek.filter((weekDay: DaysOfWeek) => daysOfWeek?.includes(weekDay))
		return ordenedDaysOfWeek?.toString().split(',').join(', ')
	}

	const getRelativeWeekDaysfrequency = (dateTimeInfo: DateTimeInfos) => {
		const dateTimeInfosToRender = []

		switch (dateTimeInfo.weekDaysfrequency) {
			case 'today': dateTimeInfosToRender.push(
				<>
					<DateTimeLabel>
						{showMessageWithHighlight('só hoje', ['só', 'hoje'])}
					</DateTimeLabel>
				</>
			); break
			case 'everyday': dateTimeInfosToRender.push(
				<>
					<DateTimeLabel>
						{showMessageWithHighlight('todos os dias', ['todos', 'os', 'dias'])}
					</DateTimeLabel>
				</>
			); break
			case 'businessDay': dateTimeInfosToRender.push(
				<>
					<DateTimeLabel>
						{showMessageWithHighlight('seg à sex', ['seg', 'à', 'sex'])}
					</DateTimeLabel>
				</>
			); break
			case 'someday': dateTimeInfosToRender.push(
				<>
					<DateTimeLabel>
						{showMessageWithHighlight(
							`${listDaysOfWeek(dateTimeInfo.daysOfWeek || [])}`,
							listDaysOfWeek(dateTimeInfo.daysOfWeek || []).split(' ')
						)}
					</DateTimeLabel>
				</>

			); break
		}

		if (dateTimeInfo.startDate || dateTimeInfo.startTime) {
			const startDate = dateTimeInfo.startDate ? formatDate(dateTimeInfo.startDate) : null
			const startTime = dateTimeInfo.startTime ? formatHour(dateTimeInfo.startTime) : null
			dateTimeInfosToRender.push(
				<>
					<DateTimeLabel>
						{showMessageWithHighlight(
							`começa${startDate ? ` dia ${startDate}` : ''} ${startTime ? `às ${startTime}` : ''}`,
							[startDate ?? '', startTime ?? '']
						)}
					</DateTimeLabel>
				</>
			)
		}

		if (dateTimeInfo.endDate || dateTimeInfo.endTime) {
			const endDate = dateTimeInfo.endDate ? formatDate(dateTimeInfo.endDate) : null
			const endTime = dateTimeInfo.endTime ? formatHour(dateTimeInfo.endTime) : null
			dateTimeInfosToRender.push(
				<>
					<DateTimeLabel>
						{showMessageWithHighlight(
							`termina${endDate ? ` dia ${endDate}` : ''} ${endTime ? `às ${endTime}` : ''}`,
							[endDate ?? '', endTime ?? '']
						)}
					</DateTimeLabel>
				</>
			)
		}

		switch (dateTimeInfo.repetition) {
			case 'unrepeatable': dateTimeInfosToRender.push(
				<>
					<DateTimeLabel>
						{showMessageWithHighlight('não se repete', ['não', 'se', 'repete'])}
					</DateTimeLabel>
				</>
			); break
			case 'everyDay': dateTimeInfosToRender.push(
				<>
					<DateTimeLabel>
						{showMessageWithHighlight('repete todos os dias', ['repete', 'todos', 'os', 'dias'])}
					</DateTimeLabel>
				</>
			); break
			case 'weekly': dateTimeInfosToRender.push(
				<>
					<DateTimeLabel>
						{showMessageWithHighlight('repete semanalmente', ['repete', 'semanalmente'])}
					</DateTimeLabel>
				</>
			); break
			case 'biweekly': dateTimeInfosToRender.push(
				<>
					<DateTimeLabel>
						{showMessageWithHighlight('repete a cada 15 dias', ['repete', 'a', 'cada', '15', 'dias'])}
					</DateTimeLabel>
				</>
			); break
			case 'monthly': dateTimeInfosToRender.push(
				<>
					<DateTimeLabel>
						{showMessageWithHighlight('repete mensalmente', ['repete', 'mensalmente'])}
					</DateTimeLabel>
				</>
			); break
		}

		return (
			<ColumnContainer>
				{dateTimeInfosToRender}
			</ColumnContainer>
		)
	}

	const getFormattedDeliveryMethod = (delivery: DeliveryMethod) => {
		switch (delivery) {
			case 'unavailable': return 'comprador busca'
			case 'city': return 'entrega na cidade'
			case 'near': return 'entrega no bairro'
			case 'country': return 'entrega no Brasil'
		}
	}

	const getFormattedPostRange = (range: PostRange) => {
		switch (range) {
			case 'city': return 'cidade'
			case 'near': return 'bairro'
			case 'country': return 'Brasil'
		}
	}

	const getRangeIcon = (range: DeliveryMethod | PostRange): IconName => {
		switch (range) {
			case 'unavailable': return 'personWalking'
			case 'city': return 'city'
			case 'country': return 'countryBrazil'
			case 'near': return 'pin'
		}
	}

	const getFormattedImportantPoints = (importantPoints: string[]) => {
		return importantPoints && importantPoints.map((point) => {
			return <ListItem>{`●  ${point}`}</ListItem>
		})
	}

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
				render: getRelativeWeekDaysfrequency(value as DateTimeInfos),
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
			case 'productStatus': return {
				title: 'Estado do produto:',
				icon: value === 'new' ? 'gift' : 'usedLabel',
				formattedValue: value === 'new' ? 'novo' : 'usado'
			}
			case 'range': return {
				title: 'Alcance do post:',
				icon: getRangeIcon(value as PostRange),
				formattedValue: getFormattedPostRange(value as PostRange)
			}
			case 'deliveryMethod': return {
				title: 'Método de entrega:',
				icon: getRangeIcon(value as DeliveryMethod),
				formattedValue: getFormattedDeliveryMethod(value as DeliveryMethod)
			}
			case 'importantPoints': return {
				title: 'Pontos importantes:',
				render: (
					<ColumnContainer>
						{getFormattedImportantPoints(value as string[])}
					</ColumnContainer>
				),
				icon: ''
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

	const postInfoValueIsValid = () => {
		if (!value) return false
		if (Array.isArray(value) && !value.length) return false
		if (type === 'dateTime') {
			const dateTime = value as DateTimeInfos
			return (
				dateTime.weekDaysfrequency
				|| dateTime.daysOfWeek
				|| dateTime.repetition
				|| dateTime.startDate
				|| dateTime.endDate
				|| dateTime.startTime
				|| dateTime.endTime
			)
		}
		if (type === 'price') {
			const price = value as PriceValues
			if ((!price.exchangeValue || !price.saleValue) && !price.isEvent) return false
		}

		return true
	}

	if (!postInfoValueIsValid()) {
		return <></>
	}

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
