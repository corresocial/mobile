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
require('dotenv').config();
const admin = __importStar(require("firebase-admin"));
const structureExternalVacanciesData_1 = require("./src/methods/structureExternalVacanciesData");
const vacancyFilters_1 = require("./src/methods/vacancyFilters");
const postRepository_1 = require("./src/methods/postRepository");
const generateReport_1 = require("./src/methods/generateReport");
const emailService_1 = require("./src/methods/emailService");
const extractDataFromSite_1 = require("./src/methods/extractDataFromSite");
admin.initializeApp();
exports.fetchAndSyncVacancyPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extração dos dados //
        const vacancyTableUrl = 'https://www1.londrina.pr.gov.br/sistemas/vagas/vagas.php';
        const vacancyTableData = yield (0, extractDataFromSite_1.getVancancyTableDate)(vacancyTableUrl);
        console.log('Número de vagas encontradas:', (0, extractDataFromSite_1.getVacancies)(vacancyTableData).length);
        if (!(0, extractDataFromSite_1.getVacancies)(vacancyTableData).length) {
            console.log('Nenhuma vaga encontrada');
            return;
        }
        // Tratamento dos dados //
        const structuredVacancyPosts = (0, structureExternalVacanciesData_1.structureExternalVacanciesData)(vacancyTableData);
        // Filtragem //
        const registeredExternalEvents = yield (0, postRepository_1.getRegisteredExternalVacancies)();
        const validVacancies = (0, vacancyFilters_1.filterValidVacancies)(structuredVacancyPosts, registeredExternalEvents);
        const invalidVacancies = (0, vacancyFilters_1.filterInvalidVacancies)(structuredVacancyPosts, registeredExternalEvents);
        // Persistência //
        const savedVacancies = yield (0, postRepository_1.saveVacancies)(validVacancies);
        const removedVacancies = yield (0, postRepository_1.updateRegisteredVacancies)(invalidVacancies, registeredExternalEvents);
        console.log('-----------------------------------');
        console.log(`Vagas adicionadas - ${savedVacancies.length}`);
        console.log(savedVacancies.map((e) => e.externalPostId));
        console.log(`Vagas indisponíveis - ${removedVacancies.length}`);
        console.log(removedVacancies.map((e) => e.externalPostId));
        console.log('-----------------------------------');
        const vacanciesReport = (0, generateReport_1.generateReportTable)(savedVacancies, removedVacancies);
        if (!!(savedVacancies && savedVacancies.length) || !!(removedVacancies && removedVacancies.length)) {
            yield (0, emailService_1.sendEmail)(process.env.REPORT_RECIPIENT_EMAIL, vacanciesReport);
        }
        return res.status(200).send('Sucesso ao importar eventos');
    }
    catch (error) {
        console.log('Error:', error);
        return res.status(500).send(error);
    }
});
