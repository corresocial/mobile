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
    InsertWorkStartHour: undefined
    InsertWorkEndHour: undefined
    InsertWorkStartDate: undefined
    InsertWorkEndDate: undefined
}