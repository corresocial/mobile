import MapPointOrange from '../../assets/icons/mapPoint-orange.svg'
import MapPointWhiteIcon from '../../assets/icons/mapPoint-white.svg'
import mapPointApproximateWhiteIcon from '../../assets/icons/pin-white.svg'
import EyeTracedWhiteIcon from '../../assets/icons/eyeDashed-white.svg'

import { LocationViewType, PostRange } from '../../services/firebase/types'
import { getPossessivePronounByRange, getPostRangeLabel } from './commonMessages'

const getLocationViewDescription = (locationView: LocationViewType, error?: boolean, customErrorMessage?: string) => {
	if (error) return customErrorMessage || 'não foi possível localizar este endereço'
	switch (locationView) {
		case 'private': return 'os usuários podem ver seu perfil, mas não tem acesso a sua localização.'
		case 'approximate': return 'os usuários podem ver a sua região aproximada.'
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

const getLocationViewIcon = (locationView: LocationViewType) => {
	switch (locationView) {
		case 'private': return EyeTracedWhiteIcon
		case 'approximate': return mapPointApproximateWhiteIcon
		case 'public': return MapPointWhiteIcon
		default: return MapPointOrange
	}
}

const getLocationViewLabel = (locationView: LocationViewType) => {
	switch (locationView) {
		case 'private': return 'privada'
		case 'approximate': return 'aproximada'
		case 'public': return 'pública'
		default: return 'indefinida'
	}
}

const generateLocationHeaderText = (locationView: LocationViewType, range: PostRange | undefined) => {
	const rangeLabel = `${getPossessivePronounByRange(range)} ${getPostRangeLabel(range)}`

	switch (locationView) {
		case 'private': return `seus posts podem ser vistos por pessoas da ${rangeLabel}`
		case 'approximate': return `seus posts aparecem para pessoas da ${rangeLabel}`
		case 'public': return `seus posts são visíveis para pessoas da ${rangeLabel}`
		default: return ''
	}
}

export {
	getLocationViewDescription,
	getLocationViewHighlightedWords,
	getLocationViewIcon,
	getLocationViewLabel,
	generateLocationHeaderText
}
