import { IconMap } from "./types"

import X from '@assets/icons/x.svg'

import Check from '@assets/icons/check-white.svg'
import Description from '@assets/icons/description-white.svg'
import Cash from '@assets/icons/cash.svg'
import Chat from '@assets/icons/chat.svg'
import Exchange from '@assets/icons/exchange.svg'
import Clip from '@assets/icons/clip-white.svg'
import ColorPalet from '@assets/icons/colorPalet.svg'
import Calendar from '@assets/icons/calendar.svg'
import Books from '@assets/icons/books.svg'
import Pin from '@assets/icons/pin.svg'
import MapPoint from '@assets/icons/mapPoint.svg'
import ComputerAndPhone from '@assets/icons/computerAndPhone.svg'
import HandOnPerson from '@assets/icons/handOnPerson.svg'
import Clock from '@assets/icons/clock.svg'
import StaringEyes from '@assets/icons/staring-eyes.svg'
import ThreeDots from '@assets/icons/threeDots.svg'
import Share from '@assets/icons/share-white.svg'
import UsedLabel from '@assets/icons/usedLabel.svg'
import Gift from '@assets/icons/gift-white.svg'

import SalesCart from '@assets/icons/sale-white.svg'
import Toolbox from '@assets/icons/toolBox.svg'
import Briefcase from '@assets/icons/vacancy-white.svg'

import HandOnHeart from '@assets/icons/handOnHeart.svg'
import HeartAndPerson from '@assets/icons/heartAndPerson.svg'
import PaperInfo from '@assets/icons/paperInfo.svg'

import CountryBrazil from '@assets/icons/brazil.svg'
import City from '@assets/icons/city.svg'
import PersonWalking from '@assets/icons/walkingPersonLeft.svg'

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
	},
	staringEyes: {
		default: StaringEyes
	},
	threeDots: {
		default: ThreeDots
	},
	share: {
		default: Share
	},
	usedLabel: {
		default: UsedLabel
	},
	gift: {
		default: Gift
	},
	salesCart: {
		default: SalesCart
	},
	toolbox: {
		default: Toolbox
	},
	briefcase: {
		default: Briefcase
	},
	handOnHeart: {
		default: HandOnHeart
	},
	heartAndPerson: {
		default: HeartAndPerson
	},
	paperInfo: {
		default: PaperInfo
	},
	personWalking: {
		default: PersonWalking
	},
	city: {
		default: City
	},
	countryBrazil: {
		default: CountryBrazil
	}
}

export { icons }


