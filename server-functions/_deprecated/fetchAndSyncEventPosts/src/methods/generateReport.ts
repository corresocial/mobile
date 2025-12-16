import { EventPost } from "../types/eventPost";

export function generateReportTable(addedEvents: EventPost[], removedEvents: EventPost[]): string {
    let tableHTML = `
        <!DOCTYPE html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Relatório de integração de eventos</title>
        </head>
        <h1>Relatório de integração de eventos</h1>
        <hr/>
        <head>
            <title>Relatório de Eventos</title>
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
        <h2>Eventos Adicionados</h2>
        <table>
            <thead>
                <tr>
                    <th>Nome do Evento</th>
                    <th>Data e Hora do Evento</th>
                    <th>Link</th>
                </tr>
            </thead>
            <tbody>
    `;

    tableHTML += addedEvents.map((event) => {
        const eventName = event.description.split('\n\n')[0]
        const eventDate = event.startDate ? new Date(event.startDate).toLocaleString() : 'N/A';
        const eventLink = event.links && event.links.length > 0 ? event.links[0] : null;
        const buttonHTML = eventLink ? `<a href="${eventLink}">Ver Evento</a>` : 'Indisponível';
        return `
            <tr>
                <td>${eventName}</td>
                <td>${eventDate}</td>
                <td>${buttonHTML}</td>
            </tr>
        `;
    }).join('');

    tableHTML += `
            </tbody>
        </table>
    `;

    // Removed events

    tableHTML += `
        <br/>
        <br/>
        <h2>Eventos Indisponíveis</h2>
        <table>
            <thead>
                <tr>
                    <th>Nome do Evento</th>
                    <th>Data e Hora do Evento</th>
                    <th>Status</th>
                    <th>Link</th>
                </tr>
            </thead>
            <tbody>
    `;

    tableHTML += removedEvents.map((event) => {
        const eventName = event.description.split('\n\n')[0]
        const eventDate = event.startDate ? new Date(event.startDate).toLocaleString() : 'N/A';
        const cancellationReason = event.isClosed ? 'Evento encerrado' : event.cancelled ? 'Evento cancelado' : 'N/A';
        const eventLink = event.links && event.links.length > 0 ? event.links[0] : null;
        const buttonHTML = eventLink ? `<a href="${eventLink}">Ver Evento</a>` : 'Indisponível';
        return `
            <tr>
                <td>${eventName}</td>
                <td>${eventDate}</td>
                <td>${cancellationReason}</td>
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


