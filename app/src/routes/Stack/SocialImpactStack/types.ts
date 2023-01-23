import { SocialImpactCategories, LocationViewType } from '../../../services/firebase/types'

export type SocialImpactStackParamList = {
	InsertSocialImpactTitle: undefined
	InsertSocialImpactDescription: undefined
	InsertSocialImpactPicture: undefined
	SocialImpactPicturePreview: undefined
	SelectSocialImpactCategory: undefined
	SelectSocialImpactTags: { categorySelected: SocialImpactCategories }
	SelectSocialImpactExhibitionRange: undefined
	InsertSocialImpactLocation: { locationView: LocationViewType }
	SelectSocialImpactLocationView: undefined
	SocialImpactLocationViewPreview: { locationView: LocationViewType }
	SelectDaysOfWeek: undefined
	InsertOpeningHour: undefined
	InsertClosingHour: undefined
	SelectSocialImpactRepeat: undefined
}
