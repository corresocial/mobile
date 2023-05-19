import { CultureCategories } from '../../services/firebase/types'

export const updateCultureTags = (category: CultureCategories, tag: string) => {
	cultureCategories[category].tags = [...cultureCategories[category].tags, tag]
}

const cultureCategories = {
	music: {
		label: 'música',
		value: 'music',
		slug: 'music',
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
		slug: 'danceAndBallet',
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
		slug: 'culturePainting',
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
		slug: 'audiovisual',
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
		slug: 'scenic',
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
		slug: 'tattooAndPiercing',
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
		slug: 'craftsmanship',
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
		slug: 'diversity',
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
		slug: 'others',
		tags: []
	}
}

export { cultureCategories }
