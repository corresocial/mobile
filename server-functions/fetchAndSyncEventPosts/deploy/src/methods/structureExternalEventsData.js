"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.structureEventPostsForApp = exports.getStateNameByUF = void 0;
const ngeohash_1 = require("ngeohash");
const extractDataFromSite_1 = require("./extractDataFromSite");
function structureEventPostsForApp(events) {
    return events.map((externalEvent) => {
        const startDateWeekDay = getDayOfWeek(externalEvent.startDate);
        const endDateWeekDay = getDayOfWeek(externalEvent.endDate);
        const eventWeekDays = [...new Set([startDateWeekDay, endDateWeekDay])];
        const description = (0, extractDataFromSite_1.extractTextFromHTML)(externalEvent.detail);
        return {
            isClosed: externalEvent.isClosed,
            cancelled: externalEvent.cancelled,
            postId: externalEvent.id.toString(),
            externalPostId: externalEvent.id.toString(),
            postType: 'culture',
            category: externalEvent.eventsCategory.description,
            description: `${externalEvent.name}\n\n ${description}`.trim(),
            lookingFor: false,
            completed: false,
            locationView: 'public',
            range: 'city',
            tags: ['evento'],
            daysOfWeek: eventWeekDays,
            startDate: externalEvent.startDate ? new Date(externalEvent.startDate) : undefined,
            endDate: externalEvent.endDate ? new Date(externalEvent.endDate) : undefined,
            startHour: externalEvent.startDate ? new Date(externalEvent.startDate) : undefined,
            endHour: externalEvent.endDate ? new Date(externalEvent.endDate) : undefined,
            picturesUrl: (externalEvent.logoUrl || externalEvent.images.logoUrl || externalEvent.images.logoSmall) ? [(externalEvent.logoUrl || externalEvent.images.logoUrl || externalEvent.images.logoSmall)] : [],
            videosUrl: [],
            links: [externalEvent.newUrl],
            createdAt: new Date(),
            updatedAt: new Date(),
            macroCategory: 'event',
            entryValue: externalEvent.paymentEventType === 'paid' ? 'pago' : '',
            location: Object.assign({ name: externalEvent.eventsAddress.name, country: (externalEvent.eventsAddress.country || '').toLowerCase().charAt(0).toUpperCase() + (externalEvent.eventsAddress.country.toLowerCase() || '').slice(1), state: getStateNameByUF(externalEvent.eventsAddress.state), city: externalEvent.eventsAddress.city, postalCode: externalEvent.eventsAddress.zipCode, district: externalEvent.eventsAddress.neighborhood, street: externalEvent.eventsAddress.address, number: externalEvent.eventsAddress.addressNum, coordinates: {
                    latitude: externalEvent.eventsAddress.geolocation.latitude,
                    longitude: externalEvent.eventsAddress.geolocation.longitude
                } }, generateGeohashes(externalEvent.eventsAddress.geolocation.latitude, externalEvent.eventsAddress.geolocation.longitude)),
            owner: {
                userId: externalEvent.eventsHost.id.toString(),
                redirect: externalEvent.newUrl,
                name: externalEvent.eventsHost.name,
                profilePictureUrl: (externalEvent.logoUrl || externalEvent.images.logoUrl || externalEvent.images.logoSmall) ? [(externalEvent.logoUrl || externalEvent.images.logoUrl || externalEvent.images.logoSmall)] : []
            }
        };
    });
}
exports.structureEventPostsForApp = structureEventPostsForApp;
function getDayOfWeek(dateString) {
    const date = new Date(dateString);
    const daysOfWeek = ["dom", "seg", "ter", "qua", "qui", "sex", "sab"];
    return daysOfWeek[date.getDay()];
}
function generateGeohashes(latitude = 0, longitude = 0) {
    const geohash = (0, ngeohash_1.encode)(latitude, longitude, 6);
    const geohashNearby = [geohash.substring(0, 6)].concat((0, ngeohash_1.neighbors)((0, ngeohash_1.encode)(latitude, longitude, 6)));
    return { geohashNearby };
}
function getStateNameByUF(UF) {
    const states = {
        AC: 'Acre',
        AL: 'Alagoas',
        AP: 'Amapá',
        AM: 'Amazonas',
        BA: 'Bahia',
        CE: 'Ceará',
        DF: 'Distrito Federal',
        ES: 'Espírito Santo',
        GO: 'Goiás',
        MA: 'Maranhão',
        MT: 'Mato Grosso',
        MS: 'Mato Grosso do Sul',
        MG: 'Minas Gerais',
        PA: 'Pará',
        PB: 'Paraíba',
        PR: 'Paraná',
        PE: 'Pernambuco',
        PI: 'Piauí',
        RJ: 'Rio de Janeiro',
        RN: 'Rio Grande do Norte',
        RS: 'Rio Grande do Sul',
        RO: 'Rondônia',
        RR: 'Roraima',
        SC: 'Santa Catarina',
        SP: 'São Paulo',
        SE: 'Sergipe',
        TO: 'Tocantins'
    };
    const name = states[UF.toUpperCase()];
    return name ? name : 'Sigla inválida';
}
exports.getStateNameByUF = getStateNameByUF;
