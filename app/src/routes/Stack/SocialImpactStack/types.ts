import { SocialImpactCategories, LocationViewType } from '../../../services/firebase/types'

export type SocialImpactStackParamList = {
	InsertSocialImpactTitle: { editMode: boolean, initialValue: any } | undefined
	InsertSocialImpactDescription: { editMode: boolean, initialValue: any } | undefined
	InsertSocialImpactPicture: undefined
	SocialImpactPicturePreview: { editMode: boolean, initialValue: any } | undefined
	SelectSocialImpactCategory: { editMode: boolean, initialValue: any } | undefined
	SelectSocialImpactTags: { categorySelected: SocialImpactCategories, editMode?: boolean, initialValue?: any }
	SelectSocialImpactExhibitionRange: { editMode: boolean } | undefined
	InsertSocialImpactLocation: { locationView: LocationViewType, editMode?: boolean, initialValue?: any }
	SelectSocialImpactLocationView: { editMode: boolean, initialValue: any } | undefined
	SocialImpactLocationViewPreview: { locationView: LocationViewType, editMode?: any }
	SelectDaysOfWeek: { editMode: boolean, initialValue: any } | undefined
	InsertOpeningHour: { editMode: boolean, initialValue: any } | undefined
	InsertClosingHour: { editMode: boolean, initialValue: any } | undefined
	SelectSocialImpactRepeat: { editMode: boolean } | undefined
}
