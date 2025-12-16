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
exports.limitPerPage = exports.maxOfPages = void 0;
require('dotenv').config();
const functions = __importStar(require("firebase-functions"));
const admin = __importStar(require("firebase-admin"));
const extractDataFromSite_1 = require("./src/methods/extractDataFromSite");
const structureExternalEventsData_1 = require("./src/methods/structureExternalEventsData");
const eventFilters_1 = require("./src/methods/eventFilters");
const postRepository_1 = require("./src/methods/postRepository");
const generateReport_1 = require("./src/methods/generateReport");
const utils_1 = require("./src/methods/utils");
const emailService_1 = require("./src/methods/emailService");
admin.initializeApp();
// CURRENT Remove limits
exports.maxOfPages = 100; // 100
exports.limitPerPage = 25; // 25 
exports.fetchAndSyncEventPosts = functions.https.onRequest((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extração dos dados //
        const { startDate: startSearchDate, endDate: endSearchDate } = (0, utils_1.getDateRange)();
        const externalEventDetails = [];
        for (let sitePage = 1; sitePage <= exports.maxOfPages; sitePage++) {
            console.log('------------------');
            console.log(`Página: ${sitePage}`);
            console.log('------------------');
            const symplaSiteUrl = `https://www.sympla.com.br/eventos/londrina-pr?page=${sitePage}&ordem=date&d=${startSearchDate}%2C${endSearchDate}`;
            const eventPageData = yield (0, extractDataFromSite_1.getEventCardElements)(symplaSiteUrl);
            console.log('eventPageData', !!eventPageData);
            if (eventPageData) {
                if (!eventPageData.eventElements || (eventPageData.eventElements && !eventPageData.eventElements.length)) {
                    console.log('Página sem eventos');
                    break;
                }
                const eventLinks = (0, extractDataFromSite_1.getEventLinks)(eventPageData.pageRef, eventPageData.eventElements);
                const { detalhedEvents, eventLimitReached } = yield (0, extractDataFromSite_1.getEventDetails)(eventLinks, new Date(endSearchDate));
                if (detalhedEvents && detalhedEvents.length) {
                    externalEventDetails.push(...detalhedEvents);
                }
                if (eventLimitReached || (!detalhedEvents || detalhedEvents && !detalhedEvents.length))
                    break;
            }
        }
        console.log('Número de eventos encontrados:', externalEventDetails.length);
        // Tratamento dos dados //
        const structuredEventPosts = (0, structureExternalEventsData_1.structureEventPostsForApp)(externalEventDetails);
        // Filtragem //
        const registeredExternalEvents = yield (0, postRepository_1.getRegisteredExternalEvents)();
        const validEvents = (0, eventFilters_1.filterValidEvents)(structuredEventPosts, registeredExternalEvents);
        const invalidEvents = (0, eventFilters_1.filterInvalidEvents)(structuredEventPosts, registeredExternalEvents);
        // Persistência //
        const savedEvents = yield (0, postRepository_1.saveEvents)(validEvents);
        const removedEvents = yield (0, postRepository_1.updateRegisteredEvents)(invalidEvents, registeredExternalEvents);
        console.log('-----------------------------------');
        console.log(`Eventos adicionados - ${savedEvents.length}`);
        console.log(savedEvents.map((e) => e.externalPostId));
        console.log(`Eventos indisponíveis - ${removedEvents.length}`);
        console.log(removedEvents.map((e) => e.externalPostId));
        console.log('-----------------------------------');
        // Relatório
        const eventsReport = (0, generateReport_1.generateReportTable)(savedEvents, removedEvents);
        if (!!(savedEvents && savedEvents.length) || !!(removedEvents && removedEvents.length)) {
            yield (0, emailService_1.sendEmail)(process.env.REPORT_RECIPIENT_EMAIL, eventsReport);
        }
        return res.status(200).send('Sucesso ao importar eventos');
    }
    catch (error) {
        console.log('Error:', error);
        return res.status(500).send(error);
    }
}));
