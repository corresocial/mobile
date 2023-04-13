import MapPointOrange from '../assets/icons/mapPoint-orange.svg'
import Eye from '../assets/icons/eye.svg'
import EyeHalfTraced from '../assets/icons/eyeHalfTraced.svg'
import EyeTraced from '../assets/icons/eyeTraced.svg'

import { LocationViewType, PostRange } from '../services/firebase/types'

const getLocationViewTitle = (locationView: LocationViewType, error?: boolean) => {
	if (error) return 'ops!'
	switch (locationView) {
		case 'private': return 'localização⠀ \nprivada'
		case 'approximate': return 'localização \naproximada'
		case 'public': return 'localização \npública'
		default: return 'switch option unfount'
	}
}

const getLocationViewDescription = (locationView: LocationViewType, error?: boolean, customErrorMessage?: string) => {
	if (error) return customErrorMessage || 'não foi possível localizar este endereço'
	switch (locationView) {
		case 'private': return 'os usuários podem ver seu perfil, mas não tem acesso a sua localização.'
		case 'approximate': return 'os usuários podem a sua região aproximada.'
		case 'public': return 'os usuários podem ver exatamente onde você está.'
		default: return 'switch option unfount'
	}
}

const getLocationViewHighlightedWords = (locationView: LocationViewType, error?: boolean, customErrorHighlight?: string[]) => {
	if (error) return customErrorHighlight || ['ops!', 'não', 'endereço']
	switch (locationView) {
		case 'private': return ['\nprivada', 'não', 'tem', 'acesso', 'a', 'sua', 'localização']
		case 'approximate': return ['\naproximada', 'a', 'sua', 'região', 'aproximada']
		case 'public': return ['\npública', 'exatamente', 'onde', 'você', 'está']
		default: return []
	}
}

const getLocationViewIcon = (locationView: LocationViewType, error?: boolean) => {
	switch (locationView) {
		case 'private': return EyeTraced
		case 'approximate': return EyeHalfTraced
		case 'public': return Eye
		default: return MapPointOrange
	}
}

const getRelativeLocationView = (locationView: LocationViewType) => {
	switch (locationView) {
		case 'private': return 'privada'
		case 'approximate': return 'aproximada'
		case 'public': return 'pública'
		default: return 'indefinida'
	}
}

const getRelativeRange = (range: PostRange | undefined) => {
	switch (range) {
		case 'near': return 'região'
		case 'city': return 'cidade'
		case 'country': return 'país'
		default: return 'local'
	}
}

const getPossessivePronoun = (range: PostRange | undefined) => {
	return range !== 'country' ? 'sua' : 'seu'
}

const generateLocationHeaderText = (locationView: LocationViewType, range: PostRange | undefined) => {
	const rangeLabel = `${getPossessivePronoun(range)} ${getRelativeRange(range)}`

	switch (locationView) {
		case 'private': return `seus posts podem ser vistos por pessoas da ${rangeLabel}, mas seu	endereço não é visível`
		case 'approximate': return `seus posts aparecem para pessoas da ${rangeLabel} assim como sua	localização aproximada	`
		case 'public': return `seus posts e seu	endereço são visíveis para pessoas da ${rangeLabel}`
		default: return ''
	}
}

export {
	getLocationViewTitle,
	getLocationViewDescription,
	getLocationViewHighlightedWords,
	getLocationViewIcon,
	getRelativeLocationView,
	getRelativeRange,
	getPossessivePronoun,
	generateLocationHeaderText
}
