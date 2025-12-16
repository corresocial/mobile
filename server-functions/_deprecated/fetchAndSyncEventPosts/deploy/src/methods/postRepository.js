"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRegisteredEvents = exports.deleteRegisteredEvents = exports.saveEvents = exports.getRegisteredExternalEvents = void 0;
const admin = __importStar(require("firebase-admin"));
function getRegisteredExternalEvents() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = admin.firestore();
        const eventsRef = db.collection('posts');
        try {
            const eventsSnaphot = yield eventsRef
                .where('externalPostId', '>', '0')
                .where('macroCategory', '==', 'event')
                .get();
            return eventsSnaphot.docs.map((doc) => (Object.assign(Object.assign({}, doc.data()), { postId: doc.id })));
        }
        catch (error) {
            console.log(error);
            throw new Error('Erro ao buscar eventos cadastrados');
        }
    });
}
exports.getRegisteredExternalEvents = getRegisteredExternalEvents;
function saveEvents(events) {
    return __awaiter(this, void 0, void 0, function* () {
        let lastEventId = '';
        const savedEvents = [];
        try {
            const db = admin.firestore();
            const batch = db.batch();
            const eventsCollection = db.collection('posts');
            events.forEach((event) => {
                if (Object.keys(event).includes('cancelled'))
                    delete event.cancelled;
                if (Object.keys(event).includes('isClosed'))
                    delete event.isClosed;
                const docRef = eventsCollection.doc();
                batch.create(docRef, Object.assign(Object.assign({}, event), { createdAt: new Date(), source: 'sympla' }));
                // console.log('Salvando evento com o id', event.externalPostId)
                lastEventId = event.externalPostId || docRef.id;
                savedEvents.push(Object.assign(Object.assign({}, event), { postId: docRef.id }));
                batch.update(docRef, { postId: docRef.id });
            });
            yield batch.commit();
            return savedEvents;
        }
        catch (error) {
            console.log(error);
            console.log('Erro ao salvar o evento: ', lastEventId);
            return [];
        }
    });
}
exports.saveEvents = saveEvents;
function deleteRegisteredEvents(events, registeredExternalEvents) {
    return __awaiter(this, void 0, void 0, function* () {
        let lastEventId = '';
        const removedEvents = [];
        try {
            const db = admin.firestore();
            const batch = db.batch();
            const eventsCollection = db.collection('posts');
            events.forEach((event) => {
                const eventId = getPostIdByExternalEventId(event, registeredExternalEvents);
                if (!eventId)
                    return;
                lastEventId = eventId;
                removedEvents.push(event);
                const docRef = eventsCollection.doc(eventId);
                // console.log('Deletando evento com o id', event.externalPostId)
                batch.delete(docRef);
            });
            yield batch.commit();
            return removedEvents;
        }
        catch (error) {
            console.log(error);
            console.log('Erro ao deletar o evento: ', lastEventId);
            return [];
        }
    });
}
exports.deleteRegisteredEvents = deleteRegisteredEvents;
function updateRegisteredEvents(events, registeredExternalEvents) {
    return __awaiter(this, void 0, void 0, function* () {
        let lastEventId = '';
        const updatedEvents = [];
        try {
            const db = admin.firestore();
            const batch = db.batch();
            const eventsCollection = db.collection('posts');
            events.forEach((event) => {
                const eventId = getPostIdByExternalEventId(event, registeredExternalEvents);
                if (!eventId)
                    return;
                lastEventId = eventId;
                updatedEvents.push(event);
                const docRef = eventsCollection.doc(eventId);
                // console.log('Deletando evento com o id', event.externalPostId)
                batch.update(docRef, Object.assign(Object.assign({}, event), { completed: true, source: 'sympla' }));
            });
            yield batch.commit();
            return updatedEvents;
        }
        catch (error) {
            console.log(error);
            console.log('Erro ao atualizar o evento: ', lastEventId);
            throw error;
        }
    });
}
exports.updateRegisteredEvents = updateRegisteredEvents;
function getPostIdByExternalEventId(event, registeredExternalEvents) {
    const currentEvent = registeredExternalEvents.find((registeredEvent) => registeredEvent.externalPostId === event.externalPostId);
    return currentEvent && (currentEvent === null || currentEvent === void 0 ? void 0 : currentEvent.postId) ? currentEvent === null || currentEvent === void 0 ? void 0 : currentEvent.postId : null;
}
