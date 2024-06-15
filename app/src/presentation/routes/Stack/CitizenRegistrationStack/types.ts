import { CitizenRegisterQuestion } from '@domain/citizenRegister/model/entities/types'

import { UserStackParamList } from '../UserStack/types'

export type CitizenRegistrationStackParamList = {
	CitizenRegistrationHome: undefined
	CitizenOfflineRegistrationList: undefined

	InsertBinaryResponse: { questionData: CitizenRegisterQuestion }
	InsertSatisfactionResponse: { questionData: CitizenRegisterQuestion }
	InsertTextualResponse: { questionData: CitizenRegisterQuestion }
	InsertSelectResponse: { questionData: CitizenRegisterQuestion }
	FinishCitizenRegistration: undefined
	// AnswerSatisfactionQuestion: { questionData: PollQuestion }
	// AnswerBinaryQuestion: { questionData: PollQuestion }
	// AnswerTextualQuestion: { questionData: PollQuestion }
	// AnswerSelectQuestion: { questionData: PollQuestion }

	WhoWeAre: undefined
	WhoWeAreIncome: undefined
	WhoWeAreCulture: undefined
	WhoWeAreTransformation: undefined
} & UserStackParamList
