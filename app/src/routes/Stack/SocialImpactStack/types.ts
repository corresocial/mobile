import { SocialImpactCategories, LocationViewType, LatLong, DaysOfWeek, PostRange } from '../../../services/firebase/types'
import { UserStackParamList } from '../UserStack/types'

export type SocialImpactStackParamList = {
	InsertSocialImpactTitle: { editMode: boolean, initialValue: string } | undefined
	InsertSocialImpactDescription: { editMode: boolean, initialValue: string } | undefined
	InsertSocialImpactPicture: undefined
	SocialImpactPicturePreview: { editMode: boolean, initialValue: string[] } | undefined
	SelectSocialImpactCategory: { editMode: boolean } | undefined
	SelectSocialImpactTags: { categorySelected: SocialImpactCategories, editMode?: boolean }
	SelectSocialImpactRange: { editMode: boolean } | undefined
	SelectSocialImpactLocationView: { editMode: boolean, initialValue?: { coordinates: LatLong, postRange: PostRange } } | undefined
	InsertSocialImpactLocation: { locationView: LocationViewType, editMode?: boolean, initialValue?: LatLong }
	SocialImpactLocationViewPreview: { locationView: LocationViewType, editMode?: boolean }
	SelectSocialImpactExhibitionRange: { editMode: boolean } | undefined
	SelectSocialImpactExhibitionPlace: { editMode: boolean } | undefined
	SelectSocialImpactFrequency: { editMode?: boolean, initialValue: DaysOfWeek[] } | undefined
	SelectSocialImpactDaysOfWeek: { editMode: boolean, initialValue: DaysOfWeek[] } | undefined
	SelectSocialImpactRepeat: { editMode: boolean } | undefined
	InsertSocialImpactStartDate: { editMode: boolean, initialValue: Date } | undefined
	InsertSocialImpactStartHour: { editMode: boolean, initialValue: Date } | undefined
	InsertSocialImpactEndDate: { editMode: boolean, initialValue: Date } | undefined
	InsertSocialImpactEndHour: { editMode: boolean, initialValue: Date } | undefined
	SocialImpactReview: undefined
} & UserStackParamList
