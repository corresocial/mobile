import algoliasearch from 'algoliasearch'

import { getEnvVars } from '@infrastructure/environment'

const { ALGOLIA_ID, ALGOLIA_KEY } = getEnvVars()

export const searchClient = algoliasearch(ALGOLIA_ID, ALGOLIA_KEY)

export const postsIndex = searchClient.initIndex('postsIndex')
