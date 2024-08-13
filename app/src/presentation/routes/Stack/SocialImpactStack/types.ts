import { SocialImpactCategories, LocationViewType, LatLong, DaysOfWeek, PostRange, SocialImpactEntity } from '@domain/post/entity/types'

import { UserStackParamList } from '../UserStack/types'

export type SocialImpactStackParamList = {
	InsertSocialImpactDescription: { editMode: boolean, initialValue: string } | undefined
	SelectSocialImpactPostMedia: { editMode: boolean, initialValue: { picturesUrl: string[], videosUrl: string[] } } | undefined
	SelectSocialImpactLocation: { locationView: LocationViewType, editMode?: boolean, initialValue?: LatLong }
	SocialImpactPostReview: { postData: SocialImpactEntity, approvedPostData: SocialImpactEntity, unsavedPost?: boolean, offlinePost?: boolean, showPresentationModal?: boolean }

	SelectSocialImpactType: { editMode: boolean } | undefined
	InsertSocialImpactLinks: { editMode: boolean, initialValue: string[] } | undefined
	SelectSocialImpactCategory: { editMode: boolean } | undefined
	SelectSocialImpactTags: { categorySelected: SocialImpactCategories, editMode?: boolean }
	SelectSocialImpactRange: { editMode: boolean } | undefined
	SelectSocialImpactLocationView: { editMode: boolean, initialValue?: { coordinates: LatLong, postRange: PostRange } } | undefined
	SelectSocialImpactExhibitionRange: { editMode: boolean } | undefined
	SelectSocialImpactFrequency: { editMode?: boolean, initialValue: DaysOfWeek[] } | undefined
	SelectSocialImpactDaysOfWeek: { editMode: boolean, initialValue: DaysOfWeek[] } | undefined
	SelectSocialImpactRepeat: { editMode: boolean } | undefined
	InsertSocialImpactStartDate: { editMode: boolean, initialValue: Date } | undefined
	InsertSocialImpactStartHour: { editMode: boolean, initialValue: Date } | undefined
	InsertSocialImpactEndDate: { editMode: boolean, initialValue: Date } | undefined
	InsertSocialImpactEndHour: { editMode: boolean, initialValue: Date } | undefined
} & UserStackParamList
