"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterInvalidVacancies = exports.filterValidVacancies = void 0;
function filterValidVacancies(vacancies, registeredVacancies) {
    const validVacancies = vacancies.filter((vacancy) => {
        if (!(vacancy.createdAt))
            return false;
        if (!vacancy.description)
            return false;
        return true;
    });
    return removeEventsAlreadyPosted(validVacancies, registeredVacancies);
}
exports.filterValidVacancies = filterValidVacancies;
function removeEventsAlreadyPosted(newExternalEvents, registeredExternalEvents) {
    console.log(`Vagas cadastradas - ${registeredExternalEvents.length}`);
    console.log(registeredExternalEvents.map((ev) => ev.externalPostId));
    const newEvents = newExternalEvents.filter((newExternalEvent) => {
        return !registeredExternalEvents.some((registeredVacancy) => newExternalEvent.externalPostId === registeredVacancy.externalPostId);
    });
    console.log(`Vagas ainda não cadastradas - ${newEvents.length}`);
    console.log(newEvents.map((ev) => ev.externalPostId));
    return newEvents;
}
function filterInvalidVacancies(vacancies, registeredVacancies) {
    const invalidEvents = vacancies.filter((vacancy) => {
        if (!vacancy.description)
            return true;
        if (vacancy.cancelled)
            return true;
        return false;
    });
    const registeredVacanciesToRemove = registeredVacancies.filter((registeredVacancy) => {
        if (!vacancies.some((vacancy) => registeredVacancy.externalPostId === vacancy.externalPostId))
            return true;
        return false;
    });
    return [...invalidEvents, ...registeredVacanciesToRemove];
}
exports.filterInvalidVacancies = filterInvalidVacancies;
