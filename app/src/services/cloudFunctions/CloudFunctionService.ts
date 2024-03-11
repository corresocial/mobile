import { CloudFunctionServiceInterface } from './CloudFunctionServiceInterface'
import { getNisByUserData } from './methods/getNisByUserData'
import { notifyUsersOnLocation } from './methods/notifyUsersOnLocation'

function CloudFunctionService(): CloudFunctionServiceInterface {
	return {
		getNisByUserData: getNisByUserData,
		notifyUsersOnLocation: notifyUsersOnLocation
	}
}

export { CloudFunctionService }
