import { SocialImpactCategories, LocationViewType } from "../../../services/Firebase/types"

export type SocialImpactStackParamList = {
    InsertSocialImpactTitle: undefined
    InsertSocialImpactDescription: undefined
    InsertSocialImpactPicture: undefined
    SocialImpactPicturePreview: undefined
    SelectSocialImpactCategory: undefined
    SelectSocialImpactTags: {categorySelected: SocialImpactCategories}
    SelectSocialImpactExhibitionRange: undefined
    InsertSocialImpactLocation: undefined
    SelectSocialImpactLocationView: undefined
    SocialImpactLocationViewPreview: { locationView: LocationViewType }
    SelectDaysOfWeek: undefined
    InsertOpeningHour: undefined
    InsertClosingHour: undefined
    SelectSocialImpactRepeat: undefined
}