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
		slug: 'ongs',
		tags: commonTags
	},

	popularIniciatives: {
		label: 'iniciativas populares',
		value: 'popularIniciatives',
		slug: 'popularIniciatives',
		tags: commonTags
	},

	charityBazaars: {
		label: 'bazares beneficentes',
		value: 'charityBazaars',
		slug: 'charityBazaars',
		tags: commonTags
	},

	associations: {
		label: 'associações',
		value: 'associations',
		slug: 'associations',
		tags: commonTags
	},
	collective: {
		label: 'coletivos',
		value: 'collective',
		slug: 'collective',
		tags: commonTags
	},

	socialProjects: {
		label: 'projetos sociais',
		value: 'socialProjects',
		slug: 'socialProjects',
		tags: commonTags
	},

	volounteering: {
		label: 'voluntariado',
		value: 'volounteering',
		slug: 'volounteering',
		tags: commonTags
	},

	donations: {
		label: 'doações',
		value: 'donations',
		slug: 'donationHeart',
		tags: commonTags
	},

	others: {
		label: 'outros',
		value: 'others',
		slug: 'others',
		tags: [

		]
	},
}

export { socialImpactCategories }
