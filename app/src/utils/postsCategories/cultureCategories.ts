import { CultureCategories } from '../../services/firebase/types'

export const updateCultureTags = (category: CultureCategories, tag: string) => {
	cultureCategories[category].tags = [...cultureCategories[category].tags, tag]
}

const cultureCategories = {
	music: {
		label: 'música',
		value: 'music',
		iconUri: '',
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
		iconUri: '',
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
		iconUri: '',
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
		iconUri: '',
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
		iconUri: '',
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
		iconUri: '',
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
		iconUri: '',
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

	others: {
		label: 'outros',
		value: 'others',
		tags: [

		]
	}
}

export { cultureCategories }
