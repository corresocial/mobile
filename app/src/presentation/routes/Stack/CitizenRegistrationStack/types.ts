import { CitizenRegisterEntity, CitizenRegisterQuestionResponse } from '@domain/citizenRegister/model/entities/types'

import { UserStackParamList } from '../UserStack/types'

export type CitizenRegistrationStackParamList = {
	CitizenRegistrationHome: undefined
	CitizenOfflineRegistrationList: undefined
	CitizenQuestionaryPreview: { registerData: CitizenRegisterEntity } | undefined

	InsertCitizenCellNumber: undefined
	InsertCitizenName: undefined

	InsertBinaryResponse: { questionData: CitizenRegisterQuestionResponse }
	InsertSatisfactionResponse: { questionData: CitizenRegisterQuestionResponse }
	InsertTextualResponse: { questionData: CitizenRegisterQuestionResponse }
	InsertSelectResponse: { questionData: CitizenRegisterQuestionResponse }
	FinishCitizenRegistration: undefined

	WhoWeAre: undefined
	WhoWeAreIncome: undefined
	WhoWeAreCulture: undefined
	WhoWeAreTransformation: undefined
} & UserStackParamList
