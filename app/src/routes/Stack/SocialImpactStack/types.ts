import {
	SocialImpactCategories,
	LocationViewType,
	LatLong,
	DaysOfWeek,
} from "@services/firebase/types";
import { UserStackParamList } from "../UserStack/types";

export type SocialImpactStackParamList = {
	InsertSocialImpactTitle:
		| { editMode: boolean; initialValue: string }
		| undefined;
	InsertSocialImpactDescription:
		| { editMode: boolean; initialValue: string }
		| undefined;
	InsertSocialImpactPicture: undefined;
	SocialImpactPicturePreview:
		| { editMode: boolean; initialValue: string[] }
		| undefined;
	SelectSocialImpactCategory: { editMode: boolean } | undefined;
	SelectSocialImpactTags: {
		categorySelected: SocialImpactCategories;
		editMode?: boolean;
	};
	SelectSocialImpactExhibitionRange: { editMode: boolean } | undefined;
	SelectSocialImpactLocationView:
		| { editMode: boolean; initialValue?: LatLong }
		| undefined;
	InsertSocialImpactLocation: {
		locationView: LocationViewType;
		editMode?: boolean;
		initialValue?: LatLong;
	};
	SocialImpactLocationViewPreview: {
		locationView: LocationViewType;
		editMode?: boolean;
	};
	SelectDaysOfWeek:
		| { editMode: boolean; initialValue: DaysOfWeek[] }
		| undefined;
	SelectSocialImpactRepeat: { editMode: boolean } | undefined;
	InsertOpeningHour: { editMode: boolean; initialValue: Date } | undefined;
	InsertClosingHour: { editMode: boolean; initialValue: Date } | undefined;
} & UserStackParamList;
