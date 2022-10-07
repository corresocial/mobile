import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthRegisterStackParamList } from "../AuthRegisterStack/types";
import { ServiceStackParamList } from "../ServiceStack/types";
import { UserStackParamList } from "../UserStack/types";

export type SplashScreenProps = NativeStackScreenProps<AuthRegisterStackParamList, 'Splash'>
export type AcceptAndContinueScreenProps = NativeStackScreenProps<AuthRegisterStackParamList, 'AcceptAndContinue'>
export type InsertPhoneScreenProps = NativeStackScreenProps<AuthRegisterStackParamList, 'InsertPhone'>
export type InsertConfirmationCodeScreenProps = NativeStackScreenProps<AuthRegisterStackParamList, 'InsertConfirmationCode'>
export type InsertNameScreenProps = NativeStackScreenProps<AuthRegisterStackParamList, 'InsertName'>
export type InsertProfilePictureScreenProps = NativeStackScreenProps<AuthRegisterStackParamList, 'InsertProfilePicture'>
export type CustomCameraScreenProps = NativeStackScreenProps<AuthRegisterStackParamList, 'CustomCamera'>
export type ProfilePicturePreviewScreenProps = NativeStackScreenProps<AuthRegisterStackParamList, 'ProfilePicturePreview'>

export type WelcomeNewUserScreenProps = NativeStackScreenProps<UserStackParamList, 'WelcomeNewUser'>
export type HomeTabScreenProps = NativeStackScreenProps<UserStackParamList, 'HomeTab'>
export type TourScreenProps = NativeStackScreenProps<UserStackParamList, 'ServiceStack'>

export type SelectPostTypeScreenProps = NativeStackScreenProps<ServiceStackParamList, 'SelectPostType'>
export type InsertProfileDescriptionScreenProps = NativeStackScreenProps<ServiceStackParamList, 'InsertProfileDescription'>
export type InsertServiceNameScreenProps = NativeStackScreenProps<ServiceStackParamList, 'InsertServiceName'>
export type InsertServicePictureScreenProps = NativeStackScreenProps<ServiceStackParamList, 'InsertServicePicture'>
export type ServicePicturePreviewScreenProps = NativeStackScreenProps<ServiceStackParamList, 'ServicePicturePreview'>
export type SelectServiceCategoryScreenProps = NativeStackScreenProps<ServiceStackParamList, 'SelectServiceCategory'>
export type SelectServiceTagsScreenProps = NativeStackScreenProps<ServiceStackParamList, 'SelectServiceTags'>
export type SelectSaleOrExchangeScreenProps = NativeStackScreenProps<ServiceStackParamList, 'SelectSaleOrExchange'>
export type InsertExchangeValueScreenProps = NativeStackScreenProps<ServiceStackParamList, 'InsertExchangeValue'>
export type InsertSaleValueScreenProps = NativeStackScreenProps<ServiceStackParamList, 'InsertSaleValue'>
export type InsertServicePrestationLocationScreenProps = NativeStackScreenProps<ServiceStackParamList, 'InsertServicePrestationLocation'>
export type SelectLocationViewScreenProps = NativeStackScreenProps<ServiceStackParamList, 'SelectLocationView'>
export type LocationViewPreviewScreenProps = NativeStackScreenProps<ServiceStackParamList, 'LocationViewPreview'>
export type SelectDeliveryMethodScreenProps = NativeStackScreenProps<ServiceStackParamList, 'SelectDeliveryMethod'>
export type SelectServiceFrequencyScreenProps = NativeStackScreenProps<ServiceStackParamList, 'SelectServiceFrequency'>


 