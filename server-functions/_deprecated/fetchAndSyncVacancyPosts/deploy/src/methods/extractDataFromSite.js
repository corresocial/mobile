"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPresentialLink = exports.getWhatsAppLink = exports.getVacancies = exports.getVancancyTableDate = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = require("cheerio");
function getVancancyTableDate(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield axios_1.default.get(url, {
            httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false })
        });
        const vacanciesPage = (0, cheerio_1.load)(response.data);
        const table = vacanciesPage('table');
        const tableData = [];
        table.find('tr').each((index, element) => {
            const row = [];
            vacanciesPage(element).find('td').each((index, element) => {
                row.push(vacanciesPage(element).text().trim()); // Use .trim() para remover espaços em branco desnecessários
            });
            tableData.push(row);
        });
        return tableData;
    });
}
exports.getVancancyTableDate = getVancancyTableDate;
function getVacancies(data) {
    const vacancyList = [];
    data.forEach((entry) => {
        // Verifica se a entrada tem exatamente 7 elementos e o primeiro é um ID de 7 dígitos
        if (entry.length === 7 && /^\d{7}$/.test(entry[0])) {
            const vacancyEntry = {
                id: entry[0],
                position: entry[1],
                quantity: entry[2],
                education: entry[3],
                experience: entry[4],
                details: entry[5],
                salary: entry[6],
            };
            vacancyList.push(vacancyEntry);
        }
    });
    return vacancyList;
}
exports.getVacancies = getVacancies;
function getWhatsAppLink(data) {
    const whatsappLinkEntry = data.find((entry) => entry.length >= 3 && entry[1] === "Via WhatsApp:");
    return whatsappLinkEntry ? whatsappLinkEntry[2] : null;
}
exports.getWhatsAppLink = getWhatsAppLink;
function getPresentialLink(data) {
    const presentialLinkEntry = data.find((entry) => entry.length >= 3 && entry[1] === "Presencial:");
    return presentialLinkEntry ? presentialLinkEntry[2] : null;
}
exports.getPresentialLink = getPresentialLink;
