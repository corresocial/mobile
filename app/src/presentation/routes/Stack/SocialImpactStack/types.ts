import { SocialImpactCategories, LocationViewType, LatLong, DaysOfWeek, PostRange, SocialImpactEntity } from '@domain/post/entity/types'

import { UserStackParamList } from '../UserStack/types'

export type SocialImpactStackParamList = {
	SelectSocialImpactType: { editMode: boolean } | undefined
	SelectSocialImpactPurpose: { editMode: boolean } | undefined
	InsertSocialImpactDescription: { editMode: boolean, initialValue: string } | undefined
	InsertSocialImpactLinks: { editMode: boolean, initialValue: string[] } | undefined
	SocialImpactPicturePreview: { editMode: boolean, initialValue: { picturesUrl: string[], videosUrl: string[] } } | undefined
	SelectSocialImpactCategory: { editMode: boolean } | undefined
	SelectSocialImpactTags: { categorySelected: SocialImpactCategories, editMode?: boolean }
	SelectSocialImpactRange: { editMode: boolean } | undefined
	SelectSocialImpactLocationView: { editMode: boolean, initialValue?: { coordinates: LatLong, postRange: PostRange } } | undefined
	InsertSocialImpactLocation: { locationView: LocationViewType, editMode?: boolean, initialValue?: LatLong }
	SocialImpactLocationViewPreview: { locationView: LocationViewType, editMode?: boolean }
	SelectSocialImpactExhibitionRange: { editMode: boolean } | undefined
	SelectSocialImpactFrequency: { editMode?: boolean, initialValue: DaysOfWeek[] } | undefined
	SelectSocialImpactDaysOfWeek: { editMode: boolean, initialValue: DaysOfWeek[] } | undefined
	SelectSocialImpactRepeat: { editMode: boolean } | undefined
	InsertSocialImpactStartDate: { editMode: boolean, initialValue: Date } | undefined
	InsertSocialImpactStartHour: { editMode: boolean, initialValue: Date } | undefined
	InsertSocialImpactEndDate: { editMode: boolean, initialValue: Date } | undefined
	InsertSocialImpactEndHour: { editMode: boolean, initialValue: Date } | undefined
	EditSocialImpactPostReview: { postData: SocialImpactEntity, approvedPostData: SocialImpactEntity, unsavedPost?: boolean, offlinePost?: boolean, showPresentationModal?: boolean }
} & UserStackParamList
