import { CultureCategories, DaysOfWeek, LatLong, LocationViewType } from '../../../services/firebase/types'
import { UserStackParamList } from '../UserStack/types'

export type CultureStackParamList = {
	InsertCultureTitle: { editMode: boolean, initialValue: string } | undefined
	InsertCultureDescription: { editMode: boolean, initialValue: string } | undefined
	InsertCulturePicture: undefined
	CulturePicturePreview: { editMode: boolean, initialValue: string[] } | undefined
	SelectCultureCategory: { editMode: boolean } | undefined
	SelectCultureTags: { categorySelected: CultureCategories, editMode?: boolean }
	InsertEntryValue: { editMode: boolean, initialValue: string } | undefined
	SelectEventPlaceModality: undefined
	SelectCultureRange: { editMode: boolean } | undefined
	SelectCultureLocationView: { editMode: boolean, initialValue: LatLong } | undefined
	InsertCultureLocation: { locationView: LocationViewType, editMode?: boolean, initialValue?: LatLong }
	CultureLocationViewPreview: { locationView: LocationViewType, editMode?: boolean }
	SelectCultureFrequency: { editMode?: boolean, initialValue: DaysOfWeek[] } | undefined
	SelectDaysOfWeek: { editMode?: boolean, initialValue: DaysOfWeek[] } | undefined
	SelectEventRepeat: { editMode: boolean } | undefined
	InsertCultureStartDate: { editMode: boolean, initialValue: Date } | undefined
	InsertCultureStartHour: { editMode: boolean, initialValue: Date } | undefined
	InsertCultureEndDate: { editMode: boolean, initialValue: Date } | undefined
	InsertCultureEndHour: { editMode: boolean, initialValue: Date } | undefined
} & UserStackParamList
