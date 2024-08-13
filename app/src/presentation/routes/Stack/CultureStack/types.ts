import { CultureCategories, CultureEntity, DaysOfWeek, LatLong, LocationViewType, PostRange } from '@domain/post/entity/types'

import { UserStackParamList } from '../UserStack/types'

export type CultureStackParamList = {
	InsertCultureDescription: { editMode: boolean, initialValue: string } | undefined
	SelectCulturePostMedia: { editMode: boolean, initialValue: { picturesUrl: string[], videosUrl: string[] } } | undefined
	SelectCultureLocation: { locationView: LocationViewType, editMode?: boolean, initialValue?: LatLong }
	CulturePostReview: { postData: CultureEntity, approvedPostData: CultureEntity, unsavedPost?: boolean, offlinePost?: boolean, showPresentationModal?: boolean }

	SelectCultureType: { editMode: boolean } | undefined
	InsertCultureLinks: { editMode: boolean, initialValue: string[] } | undefined
	SelectCultureCategory: { editMode: boolean } | undefined
	SelectCultureTags: { categorySelected: CultureCategories, editMode?: boolean }
	InsertEntryValue: { editMode: boolean, initialValue: string } | undefined
	SelectCulturePlaceModality: { editMode: boolean } | undefined
	SelectCultureRange: { editMode: boolean, initialValue?: { coordinates: LatLong, postRange: PostRange } } | undefined
	SelectCultureLocationView: { editMode: boolean, initialValue?: { coordinates: LatLong, postRange: PostRange } } | undefined
	SelectCultureFrequency: { editMode?: boolean, initialValue: DaysOfWeek[] } | undefined
	SelectCultureDaysOfWeek: { editMode?: boolean, initialValue: DaysOfWeek[] } | undefined
	SelectEventRepeat: { editMode: boolean } | undefined
	InsertCultureStartDate: { editMode: boolean, initialValue: Date } | undefined
	InsertCultureStartHour: { editMode: boolean, initialValue: Date } | undefined
	InsertCultureEndDate: { editMode: boolean, initialValue: Date } | undefined
	InsertCultureEndHour: { editMode: boolean, initialValue: Date } | undefined
} & UserStackParamList
