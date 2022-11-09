import { VacancyCategories, WorkplaceType } from "../../../services/Firebase/types"

export type VacancyStackParamList = {
    InsertVacancyTitle: undefined
    InsertVacancyDescription: undefined
    InsertVacancyQuestions: undefined
    InsertCompanyDescription: undefined
    SelectWorkplace: undefined
    InsertWorkplaceLocation: {workplace: WorkplaceType}
    SelectVacancyCategory: undefined
    SelectVacancyTags: {categorySelected: VacancyCategories}
    SelectVacancyType: undefined
    SelectWorkWeekdays: undefined
    InsertStartWorkHour: undefined
    InsertEndWorkHour: undefined
    InsertStartWorkDate: undefined
    InsertEndWorkDate: undefined
}