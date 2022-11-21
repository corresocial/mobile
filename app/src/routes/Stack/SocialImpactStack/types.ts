import { SocialImpactCategories } from "../../../services/Firebase/types"

export type SocialImpactStackParamList = {
    InsertSocialImpactTitle: undefined
    InsertSocialImpactDescription: undefined
    InsertSocialImpactPicture: undefined
    SocialImpactPicturePreview: undefined
    SelectSocialImpactCategory: undefined
    SelectSocialImpactTags: {categorySelected: SocialImpactCategories}
    SelectSocialImpactExhibitionRange: undefined
}