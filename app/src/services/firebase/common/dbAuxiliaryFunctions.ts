import { PostType } from '../types'

const getPostCollectionName = (postType: PostType) => {
	switch (postType) {
		case 'service': return 'services'
		case 'sale': return 'sales'
		case 'vacancy': return 'vacancies'
		case 'culture': return 'cultures'
		case 'socialImpact': return 'socialImpacts'
		default: return ''
	}
}

export { getPostCollectionName }
