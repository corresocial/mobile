export type TourStackParamList = {
    WelcomeNewUser: { userName: string }
    Home: undefined
    Profile: {firstAccess?: boolean, tourType?: TourTypes}
}

export type TourTypes = 'find' | 'post'