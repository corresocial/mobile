import { CloudFunctionServiceInterface } from './CloudFunctionServiceInterface'
import { checkUserPhoneAlreadyRegistredCloud } from './methods/checkUserPhoneAlreadyRegistred'
import { getPostsByLocationCloud } from './methods/getPostsByLocationCloud'
import { searchPostsCloud } from './methods/searchPostsCloud'

function useCloudFunctionService(): CloudFunctionServiceInterface {
	return {
		checkUserPhoneAlreadyRegistredCloud: checkUserPhoneAlreadyRegistredCloud,
		getPostsByLocationCloud: getPostsByLocationCloud,
		searchPostsCloud: searchPostsCloud
	}
}

export { useCloudFunctionService }
