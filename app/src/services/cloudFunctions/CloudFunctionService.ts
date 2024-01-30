import { CloudFunctionServiceInterface } from './CloudFunctionServiceInterface'
import { getNisByUserData } from './methods/getNisByUserData'

function CloudFunctionService(): CloudFunctionServiceInterface {
	return {
		getNisByUserData
	}
}

export { CloudFunctionService }
