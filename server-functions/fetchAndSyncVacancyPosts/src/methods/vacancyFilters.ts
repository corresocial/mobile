
import { VacancyPost } from "../types/vacancyPost";

function filterValidVacancies(vacancies: VacancyPost[], registeredVacancies: VacancyPost[]) {
    const validVacancies = vacancies.filter((vacancy) => {
        if (!(vacancy.createdAt)) return false
        if (!vacancy.description) return false
        return true
    })
    return removeEventsAlreadyPosted(validVacancies, registeredVacancies)
}

function removeEventsAlreadyPosted(newExternalEvents: VacancyPost[], registeredExternalEvents: VacancyPost[]) {
    console.log(`Vagas cadastradas - ${registeredExternalEvents.length}`)
    console.log(registeredExternalEvents.map((ev) => ev.externalPostId))
    const newEvents = newExternalEvents.filter((newExternalEvent) => {
        return !registeredExternalEvents.some((registeredVacancy) => newExternalEvent.externalPostId === registeredVacancy.externalPostId);
    })
    console.log(`Vagas ainda não cadastradas - ${newEvents.length}`)
    console.log(newEvents.map((ev) => ev.externalPostId))
    return newEvents
}

function filterInvalidVacancies(vacancies: VacancyPost[], registeredVacancies: VacancyPost[]) {
    const invalidEvents = vacancies.filter((vacancy) => {
        if (!vacancy.description) return true
        if (vacancy.cancelled) return true
        return false
    })

    const registeredVacanciesToRemove = registeredVacancies.filter((registeredVacancy) => {
        if (!vacancies.some((vacancy) => registeredVacancy.externalPostId === vacancy.externalPostId)) return true
        return false
    })

    return [...invalidEvents, ...registeredVacanciesToRemove]
}

export { filterValidVacancies, filterInvalidVacancies }