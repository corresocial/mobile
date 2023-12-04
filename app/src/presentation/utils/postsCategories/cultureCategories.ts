import { CultureCategories } from '@services/firebase/types'

import MusicIcon from '../../assets/icons/categories/music.svg'
import DanceAndBalletIcon from '../../assets/icons/categories/danceAndBallet.svg'
import CulturePaintingIcon from '../../assets/icons/categories/culturePainting.svg'
import AudiovisualIcon from '../../assets/icons/categories/audiovisual.svg'
import ScenicIcon from '../../assets/icons/categories/scenic.svg'
import TattooAndPiercingIcon from '../../assets/icons/categories/tattooAndPiercing.svg'
import CraftsmanshipIcon from '../../assets/icons/categories/craftsmanship.svg'
import DiversityIcon from '../../assets/icons/categories/diversity.svg'
import OthersIcon from '../../assets/icons/categories/others.svg'

export const updateCultureTags = (category: CultureCategories, tag: string) => {
	cultureCategories[category].tags = [...cultureCategories[category].tags, tag]
}

const cultureCategories = {
	music: {
		label: 'música',
		value: 'music',
		SvgIcon: MusicIcon,
		tags: [
			'rap',
			'banda',
			'solo',
			'acustico',
			'hiphop',
			'rock',
			'sertanejo',
			'eletronico',
			'reggae',
			'axé',
			'forró',
			'funk',
			'gospel',
			'cantor',
			'clássica',
			'samba',
			'folclore',
			'soul',
			'pop',
			'heavy metal',
			'MPB',
			'Jazz',
			'punk',
			'cover',
			'autoral'
		]
	},

	dance: {
		label: 'dança',
		value: 'dance',
		SvgIcon: DanceAndBalletIcon,
		tags: [
			'balé',
			'axé',
			'forró',
			'rua',
			'break',
			'samba',
			'salão',
			'sertanejo',
			'tango',
			'funk',
			'indígena',
			'zumba'
		]
	},

	painting: {
		label: 'pintura',
		value: 'painting',
		SvgIcon: CulturePaintingIcon,
		tags: [
			'óleo',
			'aquarela',
			'mural',
			'moderna',
			'digital',
			'abstrata'
		]
	},

	audiovisual: {
		label: 'audiovisual',
		value: 'audiovisual',
		SvgIcon: AudiovisualIcon,
		tags: [
			'captacao',
			'animação',
			'cenografia',
			'direção',
			'iluminação',
			'montagem',
			'roteiro',
			'produção',
			'edição'
		]
	},

	scenic: {
		label: 'cênicas',
		value: 'scenic',
		SvgIcon: ScenicIcon,
		tags: [
			'ator',
			'teatro',
			'direção',
			'dança',
			'direção',
			'cenografia',
			'ator',
			'cinema',
			'tv',
			'escritor'
		]
	},

	tattooAndPiercing: {
		label: 'tattoo e piercing',
		value: 'tattooAndPiercing',
		SvgIcon: TattooAndPiercingIcon,
		tags: [
			'blackwork',
			'aquarela',
			'studio',
			'colorida',
			'bodypiercing',
			'oldschool',
			'pontilismo',
			'minimalista',
			'geométrico',
			'septo',
			'sobrancelha',
			'coverup'
		]
	},

	craftsmanship: {
		label: 'artesanato',
		value: 'craftsmanship',
		SvgIcon: CraftsmanshipIcon,
		tags: [
			'crochê',
			'tear',
			'bordado',
			'patchwork',
			'reciclado',
			'ceramica',
			'renda',
			'cestas',
			'madeira',
			'sustentavel'
		]
	},

	diversity: {
		label: 'diversidade',
		value: 'diversity',
		SvgIcon: DiversityIcon,
		tags: [
			'cognitiva',
			'física',
			'visual',
			'auditiva',
			'racial',
			'etária',
			'LGBTQIAP+',
			'religiosa'
		]
	},

	others: {
		label: 'outros',
		value: 'others',
		SvgIcon: OthersIcon,
		tags: []
	}
}

export { cultureCategories }
