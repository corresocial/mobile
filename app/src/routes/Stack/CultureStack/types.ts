import { CultureCategories, CultureType, Id, LocationViewType } from '../../../services/firebase/types'
import { UserStackParamList } from '../UserStack/types'

export type CultureStackParamList = {
	SelectCultureType: undefined
	InsertCultureTitle: { editMode: boolean, initialValue: string, cultureType: CultureType } | undefined // cultureType: CultureType is edit auxiliary
	InsertCultureDescription: { editMode: boolean, initialValue: string, cultureType: CultureType } | undefined
	InsertCulturePicture: undefined
	CulturePicturePreview: { editMode: boolean, initialValue: string[] } | undefined
	SelectCultureCategory: { editMode: boolean, cultureType: CultureType } | undefined
	SelectCultureTags: { categorySelected: CultureCategories, editMode?: boolean }
	InsertEntryValue: { editMode: boolean, initialValue: string } | undefined
	SelectExhibitionPlace: { editMode: boolean } | undefined
	SelectEventPlaceModality: { editMode: boolean } | undefined
	SelectCultureLocationView: { editMode: boolean, initialValue: Id } | undefined
	InsertCultureLocation: { locationView: LocationViewType, editMode?: boolean, initialValue?: Id }
	CultureLocationViewPreview: { locationView: LocationViewType, editMode?: boolean }
	SelectEventRepeat: { editMode: boolean } | undefined
	InsertEventStartDate: { editMode: boolean, initialValue: Date } | undefined
	InsertEventStartHour: { editMode: boolean, initialValue: Date } | undefined
	InsertEventEndDate: { editMode: boolean, initialValue: Date } | undefined
	InsertEventEndHour: { editMode: boolean, initialValue: Date } | undefined
} & UserStackParamList
