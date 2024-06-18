import { CitizenRegisterEntity, CitizenRegisterQuestion } from '@domain/citizenRegister/model/entities/types'

import { UserStackParamList } from '../UserStack/types'

export type CitizenRegistrationStackParamList = {
	CitizenRegistrationHome: undefined
	CitizenOfflineRegistrationList: undefined
	CitizenQuestionsList: { registerData: CitizenRegisterEntity } | undefined

	InsertBinaryResponse: { questionData: CitizenRegisterQuestion }
	InsertSatisfactionResponse: { questionData: CitizenRegisterQuestion }
	InsertTextualResponse: { questionData: CitizenRegisterQuestion }
	InsertSelectResponse: { questionData: CitizenRegisterQuestion }
	FinishCitizenRegistration: undefined

	WhoWeAre: undefined
	WhoWeAreIncome: undefined
	WhoWeAreCulture: undefined
	WhoWeAreTransformation: undefined
} & UserStackParamList
