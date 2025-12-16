require('dotenv').config();

import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

import { structureExternalVacanciesData } from './src/methods/structureExternalVacanciesData'
import { filterInvalidVacancies, filterValidVacancies } from './src/methods/vacancyFilters'
import { getRegisteredExternalVacancies, saveVacancies, updateRegisteredVacancies } from './src/methods/postRepository'

import { generateReportTable } from './src/methods/generateReport'
import { sendEmail } from './src/methods/emailService'
import { getVacancies, getVancancyTableDate } from './src/methods/extractDataFromSite'

admin.initializeApp()

exports.fetchAndSyncVacancyPosts = async (req: functions.https.Request, res: functions.Response | any) => {
	try {
		// Extração dos dados //
		const vacancyTableUrl = 'https://www1.londrina.pr.gov.br/sistemas/vagas/vagas.php'

		const vacancyTableData = await getVancancyTableDate(vacancyTableUrl)
		console.log('Número de vagas encontradas:', getVacancies(vacancyTableData).length)

		if (!getVacancies(vacancyTableData).length) {
			console.log('Nenhuma vaga encontrada')
			return
		}

		// Tratamento dos dados //
		const structuredVacancyPosts = structureExternalVacanciesData(vacancyTableData)

		// Filtragem //
		const registeredExternalEvents = await getRegisteredExternalVacancies()
		const validVacancies = filterValidVacancies(structuredVacancyPosts, registeredExternalEvents)
		const invalidVacancies = filterInvalidVacancies(structuredVacancyPosts, registeredExternalEvents)

		// Persistência //
		const savedVacancies = await saveVacancies(validVacancies)
		const removedVacancies = await updateRegisteredVacancies(invalidVacancies, registeredExternalEvents)

		console.log('-----------------------------------')
		console.log(`Vagas adicionadas - ${savedVacancies.length}`)
		console.log(savedVacancies.map((e) => e.externalPostId))
		console.log(`Vagas indisponíveis - ${removedVacancies.length}`)
		console.log(removedVacancies.map((e) => e.externalPostId))
		console.log('-----------------------------------')

		const vacanciesReport = generateReportTable(savedVacancies, removedVacancies)

		if (!!(savedVacancies && savedVacancies.length) || !!(removedVacancies && removedVacancies.length)) {
			await sendEmail(process.env.REPORT_RECIPIENT_EMAIL!, vacanciesReport)
		}
		return res.status(200).send('Sucesso ao importar eventos')
	} catch (error) {
		console.log('Error:', error)
		return res.status(500).send(error)
	}
}
