export type PollEntityOptional = Partial<PollEntity>
export type PollEntity = {
    pollId: Id
    title: string
    description: string
    createdAt: Date
    range: PollRange
    location: PollLocation
    questions: PollQuestion[]
    owner: UserOwner
    idUsersResponded?: string[]
    completed?: boolean
    privateResponses?: PrivatePollResponse[]
}

export type Id = string

export type UserOwner = {
    userId: string
    name: string
    profilePictureUrl?: string[]
}

export type PollQuestionOptional = Partial<PollQuestion>
export type PollQuestion = {
    questionId: string
    question: string
    questionType: PollQuestionType
    options?: string[]
    multiSelect?: boolean
}

export type PollQuestionType = 'textual' | 'numerical' | 'binary' | 'satisfaction' | 'select'

type PollRange = 'near' | 'city' | 'country'
type PollLocation = {
    country: string
    state: string
    city: string
    district: string
    street: string
    postalCode: string
    number: string
    coordinates: Coordinates
    geohashNearby: string[]
}

export type PrivatePollResponse = {
    userId: string
    location: PollLocation // REFACTOR Centralizar todos os endereços
    responses: PollResponse[]
}

export type PollResponse = {
    questionId: string
    questionType: PollQuestionType
    response: string | string[] | number | boolean | SatisfactionType // Melhorar nomenclaturas
}

export type SatisfactionType = 1 | 2 | 3 | 4 | 5

export type Coordinates = {
    latitude: number
    longitude: number
}
