import { IconMap } from "./types"

import X from '@assets/icons/x.svg'

import Check from '@assets/icons/check-white.svg'
import Description from '@assets/icons/description-white.svg'
import Cash from '@assets/icons/cash.svg'
import Chat from '@assets/icons/chat.svg'
import Exchange from '@assets/icons/exchange.svg'
import Clip from '@assets/icons/clip-white.svg'
import ColorPalet from '@assets/icons/colorPalet-white.svg'
import Calendar from '@assets/icons/calendar.svg'
import Books from '@assets/icons/books-white.svg'
import Pin from '@assets/icons/pin-white.svg'
import MapPoint from '@assets/icons/mapPoint.svg'
import ComputerAndPhone from '@assets/icons/computerAndPhone.svg'
import HandOnPerson from '@assets/icons/handOnPerson.svg'
import Clock from '@assets/icons/clock.svg'


// REFACTOR Definir o novos ícones somente como "icon.svg" sendo o default branco
// Para itens coloridos que não sejam brancos "icon-red.svg"
// Para ícones especiais "icon-outlined.svg" ou "icon-red-outlined.svg" ou "icon-red-outlined.svg"

import ArrowRight from '@assets/icons/angleRight-white.svg'

import ArrowLeft from '@assets/icons/angleLeft-white.svg'

const icons: IconMap = {
	x: {
		default: X
	},
	check: {
		default: Check
	},
	description: {
		default: Description
	},
	cash: {
		default: Cash
	},
	exchange: {
		default: Exchange
	},
	chat: {
		default: Chat
	},
	clip: {
		default: Clip
	},
	colorPalet: {
		default: ColorPalet
	},
	calendarEveryday: {
		default: Calendar
	},
	books: {
		default: Books
	},
	pin: {
		default: Pin
	},
	computerAndPhone: {
		default: ComputerAndPhone
	},
	handOnPerson: {
		default: HandOnPerson
	},
	clock: {
		default: Clock
	},
	mapPoint: {
		default: MapPoint
  },
	arrowRight: {
		default: ArrowRight
	},
	arrowLeft: {
		default: ArrowLeft
	}
}

export { icons }


