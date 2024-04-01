import { CloudFunctionServiceInterface } from './CloudFunctionServiceInterface'
import { checkUserPhoneAlreadyRegistredCloud } from './methods/checkUserPhoneAlreadyRegistred'
import { getBenefitDataSmasByNis } from './methods/getBenefitDataSmasByNis'
import { getNisByUserData } from './methods/getNisByUserData'
import { getPostsByLocationCloud } from './methods/getPostsByLocationCloud'
import { notifyUsersOnLocation } from './methods/notifyUsersOnLocation'
import { searchPostsCloud } from './methods/searchPostsCloud'

function useCloudFunctionService(): CloudFunctionServiceInterface {
	return {
		checkUserPhoneAlreadyRegistredCloud: checkUserPhoneAlreadyRegistredCloud,
		getPostsByLocationCloud: getPostsByLocationCloud,
		searchPostsCloud: searchPostsCloud,

		getNisByUserData: getNisByUserData,
		getBenefitDataSmasByNis: getBenefitDataSmasByNis,
		notifyUsersOnLocation: notifyUsersOnLocation
	}
}

export { useCloudFunctionService }
