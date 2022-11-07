import { WorkplaceType } from "../../../services/Firebase/types"

export type VacancyStackParamList = {
    InsertVacancyTitle: undefined
    InsertVacancyDescription: undefined
    InsertVacancyQuestions: undefined
    InsertCompanyDescription: undefined
    SelectWorkplace: undefined
    InsertWorkplaceLocation: {workplace: WorkplaceType}
}