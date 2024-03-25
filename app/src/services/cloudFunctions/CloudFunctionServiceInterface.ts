import { SmasRecoveryNISData, SmasService } from '@domain/entities/smas/types'

import { RequestData, NotifyUsersByLocationParams, FeedSearchParams } from './types/types'
import { FeedPosts } from '@services/firebase/types'

// TODO Type functions return

interface CloudFunctionServiceInterface {
	checkUserPhoneAlreadyRegistredCloud: (phoneNumber: string) => Promise<boolean>
	getPostsByLocationCloud: (searchParams: FeedSearchParams, userId: string) => Promise<FeedPosts | void>
	searchPostsCloud: (searchText: string, searchParams: FeedSearchParams, searchByRange: boolean, userId: string) => Promise<boolean>

	getNisByUserData: (searchParams: SmasRecoveryNISData, smasService: SmasService) => Promise<{ NIS: string, status: number }>
	getBenefitDataSmasByNis: (nis: string, smasService: SmasService) => Promise<any>
	notifyUsersOnLocation: (searchParams: NotifyUsersByLocationParams, requestData: RequestData) => Promise<void>
}

export { CloudFunctionServiceInterface }
