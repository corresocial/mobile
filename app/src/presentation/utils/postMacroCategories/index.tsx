import { PostMacroCategories } from './types'

import BooksWhiteIcon from '@assets/icons/books-white.svg'
import CalendarSomedayWhiteIcon from '@assets/icons/calendarSomeday-white.svg'
import ColorPaletWhiteIcon from '@assets/icons/colorPalet-white.svg'
import HandOnHeartWhiteIcon from '@assets/icons/handOnHeart-white.svg'
import HeartAndPersonWhiteIcon from '@assets/icons/heartAndPerson-white.svg'
import PaperInfoWhiteIcon from '@assets/icons/paperInfo-white.svg'
import SaleWhiteIcon from '@assets/icons/sale-white.svg'
import ServiceWhiteIcon from '@assets/icons/service-white.svg'
import VacancyWhiteIcon from '@assets/icons/vacancy-white.svg'

// rule / entity
const postMacroCategories: PostMacroCategories = {
	income: {
		sale: {
			label: 'vendas',
			value: 'sale',
			SvgIcon: SaleWhiteIcon
		},
		service: {
			label: 'serviços',
			value: 'service',
			SvgIcon: ServiceWhiteIcon
		},
		vacancy: {
			label: 'vagas',
			value: 'vacancy',
			SvgIcon: VacancyWhiteIcon
		}
	},
	socialImpact: {
		informative: {
			label: 'informativos',
			value: 'informative',
			SvgIcon: PaperInfoWhiteIcon
		},
		iniciative: {
			label: 'iniciativas',
			value: 'iniciative',
			SvgIcon: HeartAndPersonWhiteIcon
		},
		donation: {
			label: 'doações',
			value: 'donation',
			SvgIcon: HandOnHeartWhiteIcon
		}
	},
	culture: {
		art: {
			label: 'arte',
			value: 'art',
			SvgIcon: ColorPaletWhiteIcon
		},
		event: {
			label: 'eventos',
			value: 'event',
			SvgIcon: CalendarSomedayWhiteIcon
		},
		education: {
			label: 'educação',
			value: 'education',
			SvgIcon: BooksWhiteIcon
		}
	}
}

export { postMacroCategories }
