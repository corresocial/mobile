import algoliasearch from 'algoliasearch'
import { ALGOLIA_ID, ALGOLIA_KEY } from '@env'

export const searchClient = algoliasearch(ALGOLIA_ID, ALGOLIA_KEY)

export const postsIndex = searchClient.initIndex('postsIndex')
export const servicesIndex = searchClient.initIndex('servicesIndex')
export const usersIndex = searchClient.initIndex('usersIndex')
