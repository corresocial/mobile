import { SocialImpactCategories } from '../../services/firebase/types'

import OngsIcon from '../../assets/icons/categories/ongs.svg'
import PopularIniciativesIcon from '../../assets/icons/categories/popularIniciatives.svg'
import CharityBazaarsIcon from '../../assets/icons/categories/charityBazaars.svg'
import AssociationsIcon from '../../assets/icons/categories/associations.svg'
import CollectiveIcon from '../../assets/icons/categories/collective.svg'
import SocialProjectsIcon from '../../assets/icons/categories/socialProjects.svg'
import VolounteeringIcon from '../../assets/icons/categories/volounteering.svg'
import DonationHeartIcon from '../../assets/icons/categories/donationHeart.svg'
import DiversityIcon from '../../assets/icons/categories/diversity.svg'
import OthersIcon from '../../assets/icons/categories/others.svg'

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
		SvgIcon: OngsIcon,
		tags: commonTags
	},

	popularIniciatives: {
		label: 'iniciativas populares',
		value: 'popularIniciatives',
		SvgIcon: PopularIniciativesIcon,
		tags: commonTags
	},

	charityBazaars: {
		label: 'bazares beneficentes',
		value: 'charityBazaars',
		SvgIcon: CharityBazaarsIcon,
		tags: commonTags
	},

	associations: {
		label: 'associações',
		value: 'associations',
		SvgIcon: AssociationsIcon,
		tags: commonTags
	},
	collective: {
		label: 'coletivos',
		value: 'collective',
		SvgIcon: CollectiveIcon,
		tags: commonTags
	},

	socialProjects: {
		label: 'projetos sociais',
		value: 'socialProjects',
		SvgIcon: SocialProjectsIcon,
		tags: commonTags
	},

	volounteering: {
		label: 'voluntariado',
		value: 'volounteering',
		SvgIcon: VolounteeringIcon,
		tags: commonTags
	},

	donations: {
		label: 'doações',
		value: 'donations',
		SvgIcon: DonationHeartIcon,
		tags: commonTags
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
	},
}

export { socialImpactCategories }
