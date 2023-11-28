import { CultureCategories, CultureCollectionRemote, DaysOfWeek, LatLong, LocationViewType, PostRange } from '../../../services/firebase/types'
import { UserStackParamList } from '../UserStack/types'

export type CultureStackParamList = {
	SelectCultureType: { editMode: boolean } | undefined
	SelectCulturePurpose: { editMode: boolean } | undefined
	InsertCultureDescription: { editMode: boolean, initialValue: string } | undefined
	InsertCultureLinks: { editMode: boolean, initialValue: string[] } | undefined
	CulturePicturePreview: { editMode: boolean, initialValue: string[] } | undefined
	SelectCultureCategory: { editMode: boolean } | undefined
	SelectCultureTags: { categorySelected: CultureCategories, editMode?: boolean }
	InsertEntryValue: { editMode: boolean, initialValue: string } | undefined
	SelectCulturePlaceModality: { editMode: boolean } | undefined
	SelectCultureRange: { editMode: boolean, initialValue?: { coordinates: LatLong, postRange: PostRange } } | undefined
	SelectCultureLocationView: { editMode: boolean, initialValue?: { coordinates: LatLong, postRange: PostRange } } | undefined
	InsertCultureLocation: { locationView: LocationViewType, editMode?: boolean, initialValue?: LatLong }
	CultureLocationViewPreview: { locationView: LocationViewType, editMode?: boolean, initialValue?: LatLong }
	SelectCultureFrequency: { editMode?: boolean, initialValue: DaysOfWeek[] } | undefined
	SelectCultureDaysOfWeek: { editMode?: boolean, initialValue: DaysOfWeek[] } | undefined
	SelectEventRepeat: { editMode: boolean } | undefined
	InsertCultureStartDate: { editMode: boolean, initialValue: Date } | undefined
	InsertCultureStartHour: { editMode: boolean, initialValue: Date } | undefined
	InsertCultureEndDate: { editMode: boolean, initialValue: Date } | undefined
	InsertCultureEndHour: { editMode: boolean, initialValue: Date } | undefined
	EditCulturePostReview: { postData: CultureCollectionRemote, unsavedPost?: boolean, offlinePost?: boolean, showPresentationModal?: boolean }
} & UserStackParamList
