import { CultureCategories, CultureType, LocationViewType } from '../../../services/firebase/types'

export type CultureStackParamList = {
	SelectCultureType: undefined
	InsertCultureTitle: { editMode: boolean, initialValue: any, cultureType: CultureType } | undefined
	InsertCultureDescription: { editMode: boolean, initialValue: any, cultureType: CultureType } | undefined
	InsertCulturePicture: undefined
	CulturePicturePreview: { editMode: boolean, initialValue: any } | undefined
	SelectCultureCategory: { editMode?: boolean, initialValue?: any, cultureType?: CultureType } | undefined
	SelectCultureTags: { categorySelected: CultureCategories, editMode?: boolean }
	InsertEntryValue: { editMode: boolean, initialValue: any } | undefined
	SelectExhibitionPlace: { editMode: boolean } | undefined
	SelectEventPlaceModality: { editMode: boolean } | undefined
	InsertCultureLocation: { locationView: LocationViewType, editMode?: boolean, initialValue?: any }
	SelectCultureLocationView: { editMode: boolean, initialValue: any } | undefined
	CultureLocationViewPreview: { locationView: LocationViewType, editMode?: boolean }
	SelectEventRepeat: { editMode: boolean } | undefined
	InsertEventStartDate: { editMode: boolean, initialValue: any } | undefined
	InsertEventStartHour: { editMode: boolean, initialValue: any } | undefined
	InsertEventEndDate: { editMode: boolean, initialValue: any } | undefined
	InsertEventEndHour: { editMode: boolean, initialValue: any } | undefined
}
