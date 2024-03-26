import { PostRange } from '@domain/post/entity/types'

const getPossessivePronounByRange = (range: PostRange | undefined) => {
	return range !== 'country' ? 'sua' : 'seu'
}

const getPostRangeLabel = (postRange?: PostRange) => {
	switch (postRange) {
		case 'near': return 'região'
		case 'city': return 'cidade'
		case 'country': return 'brasil'
		default: return 'indefinido'
	}
}

export { getPossessivePronounByRange, getPostRangeLabel }
