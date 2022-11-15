import { CultureCategories } from "../../../services/Firebase/types"

export type CultureStackParamList = {
    SelectCultureType: undefined
    InsertCultureTitle: undefined
    InsertCultureDescription: undefined
    InsertCulturePicture: undefined
    CulturePicturePreview: undefined
    SelectCultureCategory: undefined
    SelectCultureTags: {categorySelected: CultureCategories}
    InsertEntryValue: undefined
    SelectExhibitionPlace: undefined
    SelectEventPlaceModality: undefined
}