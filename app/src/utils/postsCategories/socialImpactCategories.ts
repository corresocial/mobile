import { SocialImpactCategories } from '../../services/firebase/types'

export const updateSocialImpactTags = (category: SocialImpactCategories, tag: string) => {
	socialImpactCategories[category].tags = [...socialImpactCategories[category].tags, tag]
}

const commonTags = [
	'fome',
	'roupas',
	'educação',
	'renda e trabalho',
	'paz e justiça',
	'igualdade social',
	'moradia',
	'igualdade de gênero',
	'energia',
	'água',
	'mudança climática',
	'biodiversidade',
	'polução',
	'preservação ',
]

const socialImpactCategories = {
	ONGs: {
		label: 'ONGs',
		value: 'ONGs',
		iconUri: '',
		tags: commonTags
	},

	popularIniciatives: {
		label: 'iniciativas populares',
		value: 'popularIniciatives',
		iconUri: '',
		tags: commonTags
	},

	charityBazaars: {
		label: 'bazares beneficentes',
		value: 'charityBazaars',
		iconUri: '',
		tags: commonTags
	},

	associations: {
		label: 'associações',
		value: 'associations',
		iconUri: '',
		tags: commonTags
	},
	collective: {
		label: 'coletivos',
		value: 'collective',
		iconUri: '',
		tags: commonTags
	},

	socialProjects: {
		label: 'projetos sociais',
		value: 'socialProjects',
		iconUri: '',
		tags: commonTags
	},

	volounteering: {
		label: 'voluntariado',
		value: 'volounteering',
		iconUri: '',
		tags: commonTags
	},

	donations: {
		label: 'doações',
		value: 'donations',
		iconUri: '',
		tags: commonTags
	},

	others: {
		label: 'outros',
		value: 'others',
		tags: []
	},
}

export { socialImpactCategories }
