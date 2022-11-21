import { SocialImpactCategories } from './../../services/Firebase/types'

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

let socialImpactCategories = {
    ONGs: {
        label: 'ONGs',
        value: 'ONGs',
        tags: commonTags
    },

    popularIniciatives: {
        label: 'iniciativas populares',
        value: 'popularIniciatives',
        tags: commonTags
    },

    charityBazaars: {
        label: 'bazares beneficentes',
        value: 'charityBazaars',
        tags: commonTags
    },

    associations: {
        label: 'associações',
        value: 'associations',
        tags: commonTags
    },
    collective: {
        label: 'coletivos',
        value: 'collective',
        tags: commonTags
    },

    socialProjects: {
        label: 'projetos sociais',
        value: 'socialProjects',
        tags: commonTags
    },

    volounteering: {
        label: 'voluntariado',
        value: 'volounteering',
        tags: commonTags
    },

    donations: {
        label: 'doações',
        value: 'donations',
        tags: commonTags
    },

    others: {
        label: 'outros',
        value: 'others',
        tags: []
    },
}

export { socialImpactCategories }