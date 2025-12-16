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
exports.extractTextFromHTML = exports.getEventDetails = exports.getEventLinks = exports.getEventCardElements = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = require("cheerio");
const __1 = require("../..");
function getEventCardElements(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data } = yield axios_1.default.get(url, { timeout: 10000 });
            const pageRef = (0, cheerio_1.load)(data);
            const eventElements = pageRef("div[class^=CustomGridstyle__CustomGridCardType]");
            return { eventElements, pageRef };
        }
        catch (error) {
            console.log(error);
            return undefined;
        }
    });
}
exports.getEventCardElements = getEventCardElements;
function getEventLinks(pageRef, eventElements) {
    const links = eventElements.slice(0, __1.limitPerPage).map((i, event) => {
        return pageRef(event).find('a').attr('href');
    });
    return links.get();
}
exports.getEventLinks = getEventLinks;
function getEventDetails(eventLinks, dateLimit) {
    return __awaiter(this, void 0, void 0, function* () {
        const detalhedEvents = [];
        let eventLimitReached = false;
        for (const eventUrl of eventLinks) {
            try {
                const { data } = yield axios_1.default.get(eventUrl);
                if (!data)
                    throw new Error(`Evento não encontrado ${eventUrl}`);
                const eventPage = (0, cheerio_1.load)(data);
                const scriptTagElement = eventPage('script#__NEXT_DATA__');
                if (!scriptTagElement || !Object.keys(scriptTagElement).length) {
                    console.log('Script tag not found');
                    continue;
                }
                const pageDataJson = scriptTagElement.html().trim();
                const pageData = JSON.parse(pageDataJson);
                const event = pageData.props.pageProps.hydrationData.eventHydration.event;
                const eventStartDate = new Date(event.startDate);
                console.log(`${eventStartDate.getDate()}/${eventStartDate.getMonth() + 1}`, '-', event.name);
                // if (eventStartDate.getTime() > dateLimit.getTime()) {
                //     console.log('eventLimitReached')
                //     eventLimitReached = true
                //     break
                // }
                detalhedEvents.push(event);
            }
            catch (error) {
                console.log(`Evento não encontrado ${eventUrl}`);
            }
        }
        return { detalhedEvents, eventLimitReached };
    });
}
exports.getEventDetails = getEventDetails;
function extractTextFromHTML(element) {
    const $ = (0, cheerio_1.load)(element);
    function getTextFromElement(element) {
        return $(element).text().trim();
    }
    let result = '';
    // Função para adicionar texto ao resultado, incluindo novas linhas
    function addText(text) {
        if (text) {
            result += text + '\n\n';
        }
    }
    // Extrair texto de tags específicas
    $('h3').each((i, el) => {
        addText(getTextFromElement(el));
    });
    $('div').each((i, el) => {
        addText(getTextFromElement(el));
    });
    $('p').each((i, el) => {
        addText(getTextFromElement(el));
    });
    $('ul li').each((i, el) => {
        result += getTextFromElement(el) + '\n';
    });
    // Extrair texto de tags de nível mais alto (body)
    const bodyText = $('body').contents().filter(function () {
        return this.nodeType === 3; // Node type 3 é um texto
    }).text().trim();
    addText(bodyText);
    return result.trim();
}
exports.extractTextFromHTML = extractTextFromHTML;
