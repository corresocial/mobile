import { encode, neighbors } from 'ngeohash'
import { ExternalVacancyPost, TableData } from '../types/externalTypes'
import { VacancyPost } from '../types/vacancyPost'
import { getVacancies, getWhatsAppLink } from './extractDataFromSite'

function structureExternalVacanciesData(externalVacancies: TableData): VacancyPost[] {

    const remoteContact = getWhatsAppLink(externalVacancies) // CURRENT Remove limits
    const vacancies: ExternalVacancyPost[] = getVacancies(externalVacancies)
    const coordinates = {
        latitude: -23.309548,
        longitude: -51.162882
    }

    return vacancies.map((externalVacancy) => {

        return {
            postId: externalVacancy.id.toString(),
            externalPostId: externalVacancy.id.toString(),
            postType: 'income',
            category: externalVacancy.position,
            description: `Vaga para ${externalVacancy.position}\n
Número de vagas: ${externalVacancy.quantity}
${externalVacancy.details}
Requisitos:
 - Educação: ${externalVacancy.education}
 - Experiência: ${externalVacancy.experience}\n
Candidatura:
 - Presencial: Compareça na Secretaria do Trabalho, Emprego e Renda.
 - Online: Agende pelo link ${remoteContact}. A agenda para atendimento online via WHATSAPP é aberta todas as QUINTAS-FEIRAS, às 8h, com os horários da semana seguinte. A agenda fecha automaticamente quando todos os horários estiverem preenchidos
ATENÇÃO: Uma vez agendado o atendimento por whats, basta estar online no horário escolhido que a secretaria entrará em contato pelo número fornecido no momento do agendamento. não é necessário o comparecimento presencial.`,
            saleValue: externalVacancy.salary,
            lookingFor: false,
            completed: false,
            locationView: 'public',
            range: 'city',
            tags: ['vagas'],
            links: ['https://portal.londrina.pr.gov.br/sine-geral-smter/vagas'],
            createdAt: new Date(),
            updatedAt: new Date(),
            macroCategory: 'vacancy',
            location: {
                name: 'Secretaria Municipal do Trabalho, Emprego e Renda',
                country: 'Brasil',
                state: 'Paraná',
                city: 'Londrina',
                postalCode: '86020-120',
                district: 'Centro',
                street: 'R. Pernambuco',
                number: '162',
                coordinates: { ...coordinates },
                ...generateGeohashes(coordinates.latitude, coordinates.longitude)
            },
            owner: {
                userId: 'jobSecretaryId',
                redirect: 'https://portal.londrina.pr.gov.br/sine-geral-smter',
                name: 'Secretaria do Trabalho, Emprego e Renda',
                profilePictureUrl: ['https://firebasestorage.googleapis.com/v0/b/corresocial-66840.appspot.com/o/docs%2Flondrina-logo.png?alt=media&token=7f5a0733-2583-473c-80f0-792dae1d2941']
            }
        } as VacancyPost
    })
}

function generateGeohashes(latitude: number = 0, longitude: number = 0) {
    const geohash = encode(latitude, longitude, 6)
    const geohashNearby = [geohash.substring(0, 6)].concat(neighbors(encode(latitude, longitude, 6)))
    return { geohashNearby }
}


export { structureExternalVacanciesData }