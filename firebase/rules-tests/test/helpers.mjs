import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { initializeTestEnvironment } from '@firebase/rules-unit-testing'

const here = dirname(fileURLToPath(import.meta.url))
const rulesDir = resolve(here, '..', '..')

export const PROJECT_ID = 'demo-corre'

export function readRules(fileName) {
	return readFileSync(resolve(rulesDir, fileName), 'utf8')
}

// Hosts/portas vêm das variáveis definidas pelo `firebase emulators:exec`
// (FIRESTORE_EMULATOR_HOST, FIREBASE_DATABASE_EMULATOR_HOST, FIREBASE_STORAGE_EMULATOR_HOST).
export async function createTestEnv() {
	return initializeTestEnvironment({
		projectId: PROJECT_ID,
		firestore: { rules: readRules('firestore.rules') },
		database: { rules: readRules('database.rules.json') },
		storage: { rules: readRules('storage.rules') },
	})
}

// Perfis usados em todos os testes (verified como o app grava).
export const PROFILES = {
	alice: { name: 'Alice', profilePictureUrl: ['https://x/a.jpg'] },
	bob: { name: 'Bob', profilePictureUrl: ['https://x/b.jpg'] },
	carol: { name: 'Carol' },
	mallory: { name: 'Mallory' },
	leader: { name: 'Líder', verified: { type: 'leader', by: 'admin', name: 'Admin', at: new Date(0) } },
	leader2: { name: 'Líder 2', verified: { type: 'leader', by: 'admin', name: 'Admin', at: new Date(0) } },
	admin: { name: 'Admin', verified: { type: 'default', admin: true, by: 'console', name: 'console', at: new Date(0) } },
	gov: { name: 'Prefeitura', verified: { type: 'government', by: 'admin', name: 'Admin', at: new Date(0) } },
	coordinator: { name: 'Coord', verified: { type: 'coordinator', by: 'admin', name: 'Admin', at: new Date(0) } },
	qa: { name: 'Aplicador', verified: { type: 'questionnaireAdministrator', by: 'admin', name: 'Admin', at: new Date(0), coordinatorId: 'coordinator' } },
	impactUser: { name: 'Impacto', verified: { type: 'impact', by: 'leader', name: 'Líder', at: new Date(0) } },
}

export async function seedProfiles(testEnv) {
	await testEnv.withSecurityRulesDisabled(async (ctx) => {
		const db = ctx.firestore()
		await Promise.all(Object.entries(PROFILES).map(([uid, data]) => (
			db.collection('users').doc(uid).set({ ...data, createdAt: new Date(1695000000123) })
		)))
	})
}

// Replica mergeUnapprovedDataOnProfileDM / mergeUnapprovedDataOnPostDM.
export function mergeUnapproved(docData, { dropOwner }) {
	const { unapprovedData, ...rest } = docData
	const { reject, owner, ...pending } = unapprovedData || {}
	return dropOwner ? { ...rest, ...pending } : { ...rest, ...(owner ? { owner } : {}), ...pending }
}

// Replica getNewDate de updatePostData/updatePoll/updatePetition (trunca para segundos).
export function truncatedDate(timestamp) {
	return new Date(timestamp.seconds * 1000)
}
