// Hot-fix database.rules.interim.json (já aplicado em produção): só fecha o acesso anônimo.
import { after, before, describe, it } from 'node:test'

import { assertFails, assertSucceeds, initializeTestEnvironment } from '@firebase/rules-unit-testing'

import { PROJECT_ID, readRules } from './helpers.mjs'

let testEnv

before(async () => {
	testEnv = await initializeTestEnvironment({
		projectId: PROJECT_ID,
		database: { rules: readRules('database.rules.interim.json') },
	})
	await testEnv.clearDatabase()
	await testEnv.withSecurityRulesDisabled((ctx) => ctx.database().ref('alice').set({ tokenNotification: 't' }))
})

after(async () => {
	await testEnv.cleanup()
})

describe('database.rules.interim.json', () => {
	it('nega: acesso anônimo', async () => {
		const db = testEnv.unauthenticatedContext().database()
		await assertFails(db.ref('alice').once('value'))
		await assertFails(db.ref('alice').set({ x: 1 }))
	})

	it('nega: raiz, mesmo logado', async () => {
		const db = testEnv.authenticatedContext('bob').database()
		await assertFails(db.ref().once('value'))
		await assertFails(db.ref().set({ x: 1 }))
	})

	it('permite (limitação do hot-fix): qualquer usuário logado lê/escreve nós de outros', async () => {
		const db = testEnv.authenticatedContext('bob').database()
		await assertSucceeds(db.ref('alice').once('value'))
		await assertSucceeds(db.ref('alice/tokenNotification').set('x'))
	})
})
