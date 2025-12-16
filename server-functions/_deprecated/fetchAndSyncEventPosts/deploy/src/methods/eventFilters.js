"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterInvalidEvents = exports.filterValidEvents = void 0;
const utils_1 = require("./utils");
function filterValidEvents(events, registeredExternalEvents) {
    const validEvents = events.filter((event) => {
        if (event.isClosed)
            return false;
        if (event.cancelled)
            return false;
        if (!(event.startDate && (0, utils_1.isValidDate)(event.startDate)))
            return false;
        if (!event.description)
            return false;
        if (!event.links || (event.links && !event.links[0]))
            return false;
        if (!event.location || (event.location
            && (!event.location.country
                || !event.location.district
                || !event.location.city
                || (!event.location.coordinates || (event.location.coordinates && !event.location.coordinates.latitude))
                || (!event.location.geohashNearby || event.location.geohashNearby && event.location.geohashNearby.length === 0))))
            return false;
        return true;
    });
    return removeEventsAlreadyPosted(validEvents, registeredExternalEvents);
}
exports.filterValidEvents = filterValidEvents;
function removeEventsAlreadyPosted(newExternalEvents, registeredExternalEvents) {
    console.log(`Eventos cadastrados - ${registeredExternalEvents.length}`);
    console.log(registeredExternalEvents.map((ev) => ev.externalPostId));
    const newEvents = newExternalEvents.filter((newExternalEvent) => {
        return !registeredExternalEvents.some((registeredEvent) => newExternalEvent.externalPostId === registeredEvent.externalPostId);
    });
    console.log(`Eventos ainda não cadastrados - ${newEvents.length}`);
    console.log(newEvents.map((ev) => ev.externalPostId));
    return newEvents;
}
function filterInvalidEvents(events, registeredEvents) {
    const invalidEvents = events.filter((event) => {
        if (event.isClosed)
            return true;
        if (event.cancelled)
            return true;
        return false;
    });
    const registeredEventsToRemove = registeredEvents.filter((registeredEvent) => {
        if (!events.some((event) => registeredEvent.externalPostId === event.externalPostId))
            return true;
        return false;
    });
    return [...invalidEvents, ...registeredEventsToRemove];
}
exports.filterInvalidEvents = filterInvalidEvents;
