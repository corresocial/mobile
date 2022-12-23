import algoliasearch from 'algoliasearch'
import { ALGOLIA_ID, ALGOLIA_KEY } from '@env'

export const searchClient = algoliasearch(ALGOLIA_ID, ALGOLIA_KEY)

export const servicesIndex = searchClient.initIndex('servicesIndex')
export const salesIndex = searchClient.initIndex('salesIndex')
export const vacanciesIndex = searchClient.initIndex('vacanciesIndex')
export const culturesIndex = searchClient.initIndex('culturesIndex')
export const socialImpactsIndex = searchClient.initIndex('socialImpactsIndex')
