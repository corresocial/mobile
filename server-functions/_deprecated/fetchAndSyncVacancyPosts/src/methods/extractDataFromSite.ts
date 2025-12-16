import axios from "axios"
import { load } from "cheerio"
import { ExternalVacancyPost, TableData } from "../types/externalTypes"

async function getVancancyTableDate(url: string) {
    const response = await axios.get(url, {
        httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false })
    })
    const vacanciesPage = load(response.data)

    const table = vacanciesPage('table')
    const tableData: any = []

    table.find('tr').each((index, element) => {
        const row: any = []
        vacanciesPage(element).find('td').each((index, element) => {
            row.push(vacanciesPage(element).text().trim()) // Use .trim() para remover espaços em branco desnecessários
        })
        tableData.push(row)
    })

    return tableData
}

function getVacancies(data: TableData): ExternalVacancyPost[] {
    const vacancyList: ExternalVacancyPost[] = [];

    data.forEach((entry) => {
        // Verifica se a entrada tem exatamente 7 elementos e o primeiro é um ID de 7 dígitos
        if (entry.length === 7 && /^\d{7}$/.test(entry[0])) {
            const vacancyEntry: ExternalVacancyPost = {
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

    return vacancyList
}

function getWhatsAppLink(data: TableData): string | null {
    const whatsappLinkEntry = data.find(
        (entry) => entry.length >= 3 && entry[1] === "Via WhatsApp:"
    );

    return whatsappLinkEntry ? whatsappLinkEntry[2] : null;
}

function getPresentialLink(data: TableData): string | null {
    const presentialLinkEntry = data.find(
        (entry) => entry.length >= 3 && entry[1] === "Presencial:"
    );

    return presentialLinkEntry ? presentialLinkEntry[2] : null;
}


export { getVancancyTableDate, getVacancies, getWhatsAppLink, getPresentialLink }