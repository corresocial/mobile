// Testes do database.rules.json (RTDB padrão = chat).
// Cada caso reproduz uma operação de app/src/data/chat/** ou um ataque.
import { after, before, beforeEach, describe, it } from 'node:test'

import { assertFails, assertSucceeds } from '@firebase/rules-unit-testing'

import { createTestEnv } from './helpers.mjs'

let testEnv

const as = (uid) => testEnv.authenticatedContext(uid).database()
const anon = () => testEnv.unauthenticatedContext().database()

const chat = (u1, u2, extra = {}) => ({
	chatId: `${u1}-${u2}`,
	user1: { userId: u1, name: u1, profilePictureUrl: '' },
	user2: { userId: u2, name: u2, profilePictureUrl: '' },
	...extra,
})

const message = (owner, text = 'oi', extra = {}) => ({ message: text, dateTime: 1695000000000, readed: false, owner, ...extra })

before(async () => {
	testEnv = await createTestEnv()
})

after(async () => {
	await testEnv.cleanup()
})

beforeEach(async () => {
	await testEnv.clearDatabase()
	await testEnv.withSecurityRulesDisabled(async (ctx) => {
		await ctx.database().ref().set({
			alice: { blockedUsers: [''], chatIds: ['', 'alice-bob'], tokenNotification: 'ExponentPushToken[alice]' },
			bob: { blockedUsers: [''], chatIds: ['', 'alice-bob'], tokenNotification: 'ExponentPushToken[bob]' },
			carol: { blockedUsers: [''], chatIds: ['carol-dave'] },
			'alice-bob': chat('alice', 'bob', { messages: { m1: message('alice'), m2: message('bob', 'olá') } }),
			'carol-dave': chat('carol', 'dave', { messages: { m1: message('carol', 'segredo') } }),
			// conversa legada com id fora do padrão (participantes só pelos dados)
			legacyChat1: { chatId: 'legacyChat1', user1: { userId: 'alice' }, user2: { userId: 'erin' }, messages: { m1: message('erin') } },
		})
	})
})

// ---------------------------------------------------------------------------
describe('acesso anônimo e raiz', () => {
	it('nega: leitura/escrita anônima em qualquer nó (hoje "true" em produção)', async () => {
		await assertFails(anon().ref('alice').once('value'))
		await assertFails(anon().ref('alice-bob').once('value'))
		await assertFails(anon().ref('alice-bob/messages').push(message('x')))
		await assertFails(anon().ref('mallory').set({ chatIds: [''] }))
	})

	it('nega: usuário logado lê ou escreve a raiz "/" (getRemoteUserData(\'\') no startup)', async () => {
		await assertFails(as('alice').ref().once('value'))
		// ref('') no SDK web é inválido; no @react-native-firebase antigo apontava para a raiz,
		// que é o que ref() representa aqui.
		await assertFails(as('alice').ref().set({ tokenNotification: '' }))
		await assertFails(as('alice').ref().update({ tokenNotification: '' }))
		await assertFails(as('alice').ref('tokenNotification').set(''))
		await assertFails(as('alice').ref('undefined').set({ tokenNotification: '' }))
	})
})

// ---------------------------------------------------------------------------
describe('nó do próprio usuário /{uid}', () => {
	it('permite: existsOnDatabase/createNewUser/listener de chatIds/token/bloqueio', async () => {
		await assertSucceeds(as('newbie').ref('newbie').once('value'))
		await assertSucceeds(as('newbie').ref('newbie').set({ blockedUsers: [''], chatIds: [''] }))
		await assertSucceeds(as('alice').ref('alice/chatIds').once('value'))
		await assertSucceeds(as('alice').ref('alice').set({ blockedUsers: [''], chatIds: ['', 'alice-bob'], tokenNotification: 'ExponentPushToken[novo]' }))
		await assertSucceeds(as('alice').ref('alice/blockedUsers').set(['', 'bob']))
		await assertSucceeds(as('alice').ref('alice/chatIds').push('alice-carol'))
	})

	it('nega: transformar o próprio nó em "conversa" (user1/user2)', async () => {
		await assertFails(as('alice').ref('alice/user1').set({ userId: 'bob' }))
	})

	it('nega: escrever no nó de outro usuário (bloqueio, token, chatIds)', async () => {
		await assertFails(as('mallory').ref('alice/blockedUsers').set(['']))
		await assertFails(as('mallory').ref('alice/tokenNotification').set('ExponentPushToken[mallory]'))
		await assertFails(as('mallory').ref('alice').set(null))
		await assertFails(as('mallory').ref('alice/chatIds/1').set('mallory-alice'))
		await assertFails(as('mallory').ref('alice/chatIds').set(['']))
	})

	it('nega: ler nó de usuário com quem não tem conversa (token de push)', async () => {
		await assertFails(as('mallory').ref('alice').once('value'))
		await assertFails(as('mallory').ref('alice/tokenNotification').once('value'))
	})

	it('permite: ler nó do outro participante (hasBlockedUserOnConversationDM, updateChatCompletedStateDM)', async () => {
		await assertSucceeds(as('bob').ref('alice').once('value'))
		await assertSucceeds(as('alice').ref('bob').once('value'))
	})
})

// ---------------------------------------------------------------------------
describe('conversas /{uidA}-{uidB}', () => {
	it('permite: participante lê a conversa e as mensagens (listeners, getUserChats)', async () => {
		await assertSucceeds(as('alice').ref('alice-bob').once('value'))
		await assertSucceeds(as('bob').ref('alice-bob/messages').once('value'))
		await assertSucceeds(as('alice').ref('legacyChat1').once('value'))
	})

	it('permite: existsOnDatabase em conversa que ainda não existe (as duas ordens do id)', async () => {
		await assertSucceeds(as('alice').ref('alice-erin').once('value'))
		await assertSucceeds(as('alice').ref('erin-alice').once('value'))
	})

	it('nega: não participante lê a conversa ou as mensagens', async () => {
		await assertFails(as('mallory').ref('alice-bob').once('value'))
		await assertFails(as('mallory').ref('alice-bob/messages').once('value'))
		await assertFails(as('mallory').ref('carol-dave/messages/m1').once('value'))
		await assertFails(as('mallory').ref('legacyChat1').once('value'))
	})

	it('permite: iniciar conversa (registerNewChat + setChatIdForUsersDM em si e no outro)', async () => {
		await assertSucceeds(as('alice').ref('alice-erin').set(chat('alice', 'erin', { messages: {} })))
		await assertSucceeds(as('alice').ref('alice/chatIds').push('alice-erin'))
		await assertSucceeds(as('alice').ref('erin/chatIds').push('alice-erin')) // erin ainda não tem nó
		await assertSucceeds(as('alice').ref('bob/chatIds').push('alice-bob'))
	})

	it('permite: líder abre conversa de rejeição com o usuário (ViewUnapprovedProfile/Post)', async () => {
		await assertSucceeds(as('leader').ref('leader-carol').set(chat('leader', 'carol')))
		await assertSucceeds(as('leader').ref('carol/chatIds').push('leader-carol'))
		await assertSucceeds(as('leader').ref('leader-carol/messages').push(message('leader', 'rejeitado')))
	})

	it('nega: criar conversa sem participar, com id divergente ou com chatId falso', async () => {
		await assertFails(as('mallory').ref('alice-carol').set(chat('alice', 'carol')))
		await assertFails(as('mallory').ref('mallory-alice').set(chat('mallory', 'bob')))
		await assertFails(as('mallory').ref('mallory-alice').set({ ...chat('mallory', 'alice'), chatId: 'alice-bob' }))
		await assertFails(as('mallory').ref('mallory-alice').set({ user1: { userId: 'mallory' } }))
	})

	it('nega: push de chatId no nó de outro sem conversa existente entre os dois', async () => {
		await assertFails(as('mallory').ref('alice/chatIds').push('carol-dave'))
		await assertFails(as('mallory').ref('alice/chatIds').push('mallory-alice')) // conversa não existe
		await assertFails(as('mallory').ref('alice/chatIds').push({ evil: true }))
	})

	it('nega: sobrescrever/apagar entrada existente de chatIds de outro', async () => {
		await testEnv.withSecurityRulesDisabled((ctx) => ctx.database().ref('mallory-alice').set(chat('mallory', 'alice')))
		await assertFails(as('mallory').ref('alice/chatIds/1').set('mallory-alice'))
		await assertFails(as('mallory').ref('alice/chatIds/1').remove())
	})

	it('permite: enviar mensagem (sendMessage) inclusive com justOwner e metadata.title', async () => {
		await assertSucceeds(as('alice').ref('alice-bob/messages').push(message('alice', 'tudo bem?', { justOwner: false, metadata: { title: 'Alice' } })))
		await assertSucceeds(as('alice').ref('legacyChat1/messages').push(message('alice')))
	})

	it('nega: mensagem em nome de outra pessoa, com smasProject ou gigante', async () => {
		await assertFails(as('alice').ref('alice-bob/messages').push(message('bob')))
		await assertFails(as('alice').ref('alice-bob/messages').push(message('alice', 'oficial', { metadata: { smasProject: 'PBF' } })))
		await assertFails(as('alice').ref('alice-bob/messages').push(message('alice', 'x'.repeat(20001))))
	})

	it('nega: não participante envia mensagem', async () => {
		await assertFails(as('mallory').ref('alice-bob/messages').push(message('mallory')))
	})

	it('permite: marcar como lidas (makeAllUserMessagesAsReadDM)', async () => {
		await assertSucceeds(as('bob').ref('alice-bob/messages').update({
			m1: { ...message('alice'), readed: true, metadata: {} },
			m2: message('bob', 'olá'),
		}))
	})

	it('permite: limpar conversa para si (cleanChatMessagesDM: update e set)', async () => {
		await assertSucceeds(as('alice').ref('alice-bob/messages').update({
			m1: { ...message('alice'), userCanView: 'bob' },
			m2: { ...message('bob', 'olá'), userCanView: 'bob' },
		}))
		await assertSucceeds(as('bob').ref('alice-bob/messages').set({}))
	})

	it('nega: participante altera texto/autor de mensagem existente', async () => {
		await assertFails(as('bob').ref('alice-bob/messages/m1/message').set('eu disse outra coisa'))
		await assertFails(as('bob').ref('alice-bob/messages/m1').update({ owner: 'bob' }))
	})

	it('permite: finalizar/reabrir conversa (updateChatCompletedState)', async () => {
		await assertSucceeds(as('alice').ref('alice-bob').update({ completed: true }))
		await assertSucceeds(as('bob').ref('alice-bob').update({ completed: false }))
	})

	it('permite: participante atualiza foto/nome mantendo os ids (updateUserChatProfilePicture)', async () => {
		await assertSucceeds(as('alice').ref('alice-bob').update({
			user1: { userId: 'alice', name: 'Alice Nova', profilePictureUrl: 'https://x/a2.jpg' },
			user2: { userId: 'bob', name: 'bob', profilePictureUrl: '' },
		}))
	})

	it('nega: participante troca user1/user2.userId ou apaga a conversa inteira', async () => {
		await assertFails(as('alice').ref('alice-bob/user2/userId').set('mallory'))
		await assertFails(as('alice').ref('alice-bob/user2').remove())
		await assertFails(as('alice').ref('alice-bob').update({ user2: { userId: 'mallory', name: 'm', profilePictureUrl: '' } }))
		await assertFails(as('alice').ref('alice-bob').remove())
		await assertFails(as('alice').ref('legacyChat1/user2').set({ userId: 'mallory' }))
	})

	it('nega (fluxo que deixa de funcionar): líder atualiza foto em conversa alheia (approveProfileDM)', async () => {
		await assertFails(as('leader').ref('alice').once('value'))
		await assertFails(as('leader').ref('alice-bob').update({
			user1: { userId: 'alice', name: 'Alice Aprovada', profilePictureUrl: 'https://x/a3.jpg' },
			user2: { userId: 'bob', name: 'bob', profilePictureUrl: '' },
		}))
	})
})
