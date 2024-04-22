import { updatePostDataDM } from './methods/updatePostDataDM'
import { PostDomainInterface } from './PostDomainInterface'

function usePostDomain(): PostDomainInterface {
	return {
		updatePostData: updatePostDataDM
	}
}

export { usePostDomain }
