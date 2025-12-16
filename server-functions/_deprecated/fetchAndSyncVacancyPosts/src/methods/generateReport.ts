import { VacancyPost } from "../types/vacancyPost";

export function generateReportTable(addedEvents: VacancyPost[], removedEvents: VacancyPost[]): string {
    let tableHTML = `
        <!DOCTYPE html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Relatório de integração de vagas</title>
        </head>
        <h1>Relatório de integração de vagas</h1>
        <hr/>
        <head>
            <title>Relatório de Vagas</title>
            <style>
                table {
                    border-collapse: collapse;
                    width: 100%;
                }
                th, td {
                    border: 1px solid #dddddd;
                    text-align: left;
                    padding: 8px;
                }
                th {
                    background-color: #f2f2f2;
                }
                a {
                    text-decoration: none;
                    color: white;
                    background-color: #007bff;
                    padding: 5px 10px;
                    border-radius: 5px;
                }
            </style>
        </head>
        <body>
        <h2>Vagas Adicionadas</h2>
        <table>
            <thead>
                <tr>
                    <th>Vaga</th>
                    <th>Nº de vagas</th>
                    <th>Remuneração</th>
                    <th>Link</th>
                </tr>
            </thead>
            <tbody>
    `;

    tableHTML += addedEvents.map((vacancy) => {
        const vacanyName = vacancy.description.split('\n\n')[0]
        const numberOfVacancies = vacancy.description.match(/Número de vagas:\s*(\d+)/i) ? vacancy.description.match(/Número de vagas:\s*(\d+)/i)![1] : '---'
        const salary = vacancy.saleValue || '---'
        const vacancyLink = vacancy.links && vacancy.links.length > 0 ? vacancy.links[0] : null;
        const buttonHTML = vacancyLink ? `<a href="${vacancyLink}">Ver Vaga</a>` : 'Indisponível';
        return `
            <tr>
                <td>${vacanyName}</td>
                <td>${numberOfVacancies}</td>
                <td>${salary}</td>
                <td>${buttonHTML}</td>
            </tr>
        `;
    }).join('');

    tableHTML += `
            </tbody>
        </table>
    `;

    // Removed vacancies

    tableHTML += `
        <br/>
        <br/>
        <h2>Vagas Indisponíveis</h2>
        <table>
            <thead>
                 <tr>
                    <th>Vaga</th>
                    <th>Nº de vagas</th>
                    <th>Remuneração</th>
                    <th>Link</th>
                </tr>
            </thead>
            <tbody>
    `;

    tableHTML += removedEvents.map((vacancy) => {
        const vacanyName = vacancy.description.split('\n')[0]
        const numberOfVacancies = vacancy.description.match(/Número de vagas:\s*(\d+)/i) ? vacancy.description.match(/Número de vagas:\s*(\d+)/i)![1] : '---'
        const salary = vacancy.saleValue || '---'
        const vacancyLink = vacancy.links && vacancy.links.length > 0 ? vacancy.links[0] : null;
        const buttonHTML = vacancyLink ? `<a href="${vacancyLink}">Ver Vaga</a>` : 'Indisponível';
        return `
            <tr>
                <td>${vacanyName}</td>
                <td>${numberOfVacancies}</td>
                <td>${salary}</td>
                <td>${buttonHTML}</td>
            </tr>
        `;
    }).join('');

    tableHTML += `
            </tbody>
        </table>
        </body>
        </html>
    `;

    return tableHTML;
}


