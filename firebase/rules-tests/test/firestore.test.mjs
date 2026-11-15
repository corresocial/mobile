// Testes do firestore.rules. Cada caso cita o fluxo do app (app/src/...) que ele representa.
import { after, before, beforeEach, describe, it } from 'node:test'

import { assertFails, assertSucceeds } from '@firebase/rules-unit-testing'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

import { createTestEnv, mergeUnapproved, seedProfiles, truncatedDate } from './helpers.mjs'

const { arrayUnion } = firebase.firestore.FieldValue

let testEnv

const as = (uid) => testEnv.authenticatedContext(uid).firestore()
const anon = () => testEnv.unauthenticatedContext().firestore()

async function seed(fn) {
	await testEnv.withSecurityRulesDisabled(async (ctx) => fn(ctx.firestore()))
}

async function readAsAdminSdk(path) {
	let data
	await testEnv.withSecurityRulesDisabled(async (ctx) => {
		const snap = await ctx.firestore().doc(path).get()
		data = snap.data()
	})
	return data
}

before(async () => {
	testEnv = await createTestEnv()
})

after(async () => {
	await testEnv.cleanup()
})

beforeEach(async () => {
	await testEnv.clearFirestore()
	await seedProfiles(testEnv)
})

// ---------------------------------------------------------------------------
describe('users/{uid}', () => {
	it('permite: usuário logado lê o perfil de outro (Profile, getUserData)', async () => {
		await assertSucceeds(as('alice').collection('users').doc('bob').get())
	})

	it('nega: leitura anônima de perfil', async () => {
		await assertFails(anon().collection('users').doc('bob').get())
	})

	it('nega: usuário comum lista a coleção users (dump de PII)', async () => {
		await assertFails(as('alice').collection('users').get())
	})

	it('permite: líder lista perfis pendentes (getUnapprovedProfiles)', async () => {
		await assertSucceeds(as('leader').collection('users')
			.where('unapprovedData', '!=', false).orderBy('unapprovedData', 'desc').limit(1).get())
	})

	it('permite: criação do próprio perfil (saveUserData)', async () => {
		await assertSucceeds(as('newbie').collection('users').doc('newbie')
			.set({ name: 'Novo', profilePictureUrl: [''], createdAt: new Date() }))
	})

	it('nega: criação do próprio perfil já com verified/admin', async () => {
		await assertFails(as('newbie').collection('users').doc('newbie')
			.set({ name: 'Novo', verified: { type: 'leader', admin: true }, createdAt: new Date() }))
	})

	it('nega: criação com stripeCustomerId ou subscription', async () => {
		await assertFails(as('newbie').collection('users').doc('newbie').set({ name: 'Novo', stripeCustomerId: 'cus_x' }))
		await assertFails(as('newbie').collection('users').doc('newbie').set({ name: 'Novo', subscription: { subscriptionRange: 'country' } }))
	})

	it('nega: criar perfil com id de outra pessoa', async () => {
		await assertFails(as('mallory').collection('users').doc('victim').set({ name: 'x' }))
	})

	it('permite: dono propõe alteração em unapprovedData (EditProfile)', async () => {
		await assertSucceeds(as('alice').collection('users').doc('alice').set({
			unapprovedData: {
				name: 'Alice Nova',
				description: 'desc',
				owner: { userId: 'alice', name: 'Alice Nova', profilePictureUrl: [] },
				reject: false,
			},
			updatedAt: new Date(),
		}, { merge: true }))
	})

	it('permite: dono propõe rede social (InsertLinkValue)', async () => {
		await assertSucceeds(as('alice').collection('users').doc('alice').set({
			unapprovedData: { socialMedias: [{ title: 'instagram', link: 'https://instagram.com/a' }] },
			updatedAt: new Date(),
		}, { merge: true }))
	})

	it('nega: autopromoção a líder (verified.type)', async () => {
		await assertFails(as('alice').collection('users').doc('alice').set({
			verified: { type: 'leader', by: 'alice', name: 'Alice', at: new Date() },
			updatedAt: new Date(),
		}, { merge: true }))
	})

	it('nega: autopromoção a admin (verified.admin)', async () => {
		await assertFails(as('alice').collection('users').doc('alice').update({ 'verified.admin': true }))
	})

	it('nega: dono coloca verified dentro de unapprovedData (escalada via aprovação)', async () => {
		await assertFails(as('alice').collection('users').doc('alice').set({
			unapprovedData: { name: 'x', verified: { type: 'leader' } },
		}, { merge: true }))
	})

	it('nega: unapprovedData.owner apontando para outro usuário', async () => {
		await assertFails(as('alice').collection('users').doc('alice').set({
			unapprovedData: { owner: { userId: 'bob', name: 'Bob' } },
		}, { merge: true }))
	})

	it('nega: dono grava stripeCustomerId', async () => {
		await assertFails(as('alice').collection('users').doc('alice').set({ stripeCustomerId: 'cus_bob' }, { merge: true }))
	})

	it('permite (TODO segurança): dono grava a própria subscription após pagamento (Pix/cartão)', async () => {
		await assertSucceeds(as('alice').collection('users').doc('alice').set({
			subscription: { subscriptionRange: 'city', subscriptionPlan: 'monthly', subscriptionPaymentMethod: 'pix' },
			updatedAt: new Date(),
		}, { merge: true }))
	})

	it('nega: dono grava subscription.status (campo do webhook)', async () => {
		await assertFails(as('alice').collection('users').doc('alice').set({
			subscription: { subscriptionRange: 'city', status: 'active' },
		}, { merge: true }))
	})

	it('nega: subscriptionRange fora do domínio', async () => {
		await assertFails(as('alice').collection('users').doc('alice').set({
			subscription: { subscriptionRange: 'everywhere' },
		}, { merge: true }))
	})

	it('nega: usuário comum escreve no perfil de outro', async () => {
		await assertFails(as('mallory').collection('users').doc('alice').set({ name: 'hacked' }, { merge: true }))
	})

	it('permite: exclusão da própria conta (deleteUserData)', async () => {
		await assertSucceeds(as('alice').collection('users').doc('alice').delete())
	})

	it('nega: exclusão do perfil de outro', async () => {
		await assertFails(as('mallory').collection('users').doc('alice').delete())
	})

	describe('selos (SetVerificationBadge / RemoveVerificationBadge)', () => {
		const badge = (by, type, extra = {}) => ({
			verified: { type, by, at: new Date(), name: by, ...extra },
			updatedAt: new Date(),
		})

		it('permite: líder concede selo impact/default', async () => {
			await assertSucceeds(as('leader').collection('users').doc('bob').set(badge('leader', 'impact'), { merge: true }))
			await assertSucceeds(as('leader').collection('users').doc('carol').set(badge('leader', 'default'), { merge: true }))
		})

		it('permite: líder remove selo impact (verified vira {})', async () => {
			await assertSucceeds(as('leader').collection('users').doc('impactUser').set({ verified: {}, updatedAt: new Date() }, { merge: true }))
			const stored = await readAsAdminSdk('users/impactUser')
			if (Object.keys(stored.verified).length !== 0) throw new Error('merge com {} não limpou verified')
		})

		it('nega: líder concede selo de líder/governo/coordenador', async () => {
			await assertFails(as('leader').collection('users').doc('bob').set(badge('leader', 'leader'), { merge: true }))
			await assertFails(as('leader').collection('users').doc('bob').set(badge('leader', 'government'), { merge: true }))
			await assertFails(as('leader').collection('users').doc('bob').set(badge('leader', 'coordinator'), { merge: true }))
		})

		it('nega: líder remove selo de outro líder ou de admin', async () => {
			await assertFails(as('leader').collection('users').doc('leader2').set({ verified: {}, updatedAt: new Date() }, { merge: true }))
			await assertFails(as('leader').collection('users').doc('admin').set({ verified: {}, updatedAt: new Date() }, { merge: true }))
		})

		it('nega: líder concede selo assinando como outra pessoa', async () => {
			await assertFails(as('leader').collection('users').doc('bob').set(badge('admin', 'impact'), { merge: true }))
		})

		it('nega: líder altera campos arbitrários de outro usuário', async () => {
			await assertFails(as('leader').collection('users').doc('bob').set({ name: 'renomeado', updatedAt: new Date() }, { merge: true }))
			await assertFails(as('leader').collection('users').doc('bob').set({ subscription: { subscriptionRange: 'country' } }, { merge: true }))
			await assertFails(as('leader').collection('users').doc('bob').set({ ...badge('leader', 'impact'), description: 'x' }, { merge: true }))
		})

		it('permite: admin concede selo de líder e de aplicador com coordinatorId (SearchProfile)', async () => {
			await assertSucceeds(as('admin').collection('users').doc('bob').set(badge('admin', 'leader'), { merge: true }))
			await assertSucceeds(as('admin').collection('users').doc('carol').set(badge('admin', 'questionnaireAdministrator', { coordinatorId: 'coordinator' }), { merge: true }))
		})

		it('permite: admin remove selo de líder', async () => {
			await assertSucceeds(as('admin').collection('users').doc('leader2').set({ verified: {}, updatedAt: new Date() }, { merge: true }))
		})

		it('nega: admin promove outro usuário a admin pelo app', async () => {
			await assertFails(as('admin').collection('users').doc('bob').set({ verified: { admin: true }, updatedAt: new Date() }, { merge: true }))
		})

		it('permite: admin dá assinatura gratuita (setFreeTrialPlans)', async () => {
			await assertSucceeds(as('admin').collection('users').doc('bob').set({
				subscription: { customerId: 'cus_1', subscriptionId: 'sub_1', subscriptionRange: 'city', subscriptionPlan: 'monthly', subscriptionPaymentMethod: '' },
				updatedAt: new Date(),
			}, { merge: true }))
		})

		it('nega: admin grava stripeCustomerId', async () => {
			await assertFails(as('admin').collection('users').doc('bob').set({ stripeCustomerId: 'cus_x' }, { merge: true }))
		})
	})

	describe('moderação de perfil (approveProfileDM / rejectProfileDM)', () => {
		beforeEach(async () => {
			await seed((db) => db.collection('users').doc('bob').set({
				unapprovedData: {
					name: 'Bob Novo',
					profilePictureUrl: ['https://x/b2.jpg'],
					owner: { userId: 'bob', name: 'Bob Novo', profilePictureUrl: ['https://x/b2.jpg'] },
					reject: false,
				},
			}, { merge: true }))
		})

		async function approvedDocFor(actor, uid) {
			const snap = await as(actor).collection('users').doc(uid).get()
			return { ...mergeUnapproved({ ...snap.data(), userId: uid }, { dropOwner: true }), updatedAt: new Date() }
		}

		it('permite: líder aprova (sobrescreve o documento com o que estava pendente)', async () => {
			const newDoc = await approvedDocFor('leader', 'bob')
			await assertSucceeds(as('leader').collection('users').doc('bob').set(newDoc))
			const stored = await readAsAdminSdk('users/bob')
			if (stored.name !== 'Bob Novo' || stored.unapprovedData) throw new Error('aprovação não aplicada')
		})

		it('permite: líder rejeita', async () => {
			await assertSucceeds(as('leader').collection('users').doc('bob').set({ unapprovedData: { reject: true }, updatedAt: new Date() }, { merge: true }))
		})

		it('permite: admin aprova', async () => {
			const newDoc = await approvedDocFor('admin', 'bob')
			await assertSucceeds(as('admin').collection('users').doc('bob').set(newDoc))
		})

		it('nega: líder "aprova" gravando valor diferente do pendente', async () => {
			const newDoc = await approvedDocFor('leader', 'bob')
			await assertFails(as('leader').collection('users').doc('bob').set({ ...newDoc, name: 'Outro Nome' }))
		})

		it('nega: aprovação de unapprovedData legado com verified embutido (líder e admin)', async () => {
			await seed((db) => db.collection('users').doc('mallory').set({
				unapprovedData: { name: 'M', verified: { type: 'leader', by: 'x', name: 'x', at: new Date() } },
			}, { merge: true }))
			const byLeader = await approvedDocFor('leader', 'mallory')
			await assertFails(as('leader').collection('users').doc('mallory').set(byLeader))
			const byAdmin = await approvedDocFor('admin', 'mallory')
			await assertFails(as('admin').collection('users').doc('mallory').set(byAdmin))
		})

		it('nega: usuário comum aprova o próprio pedido sobrescrevendo verified', async () => {
			const newDoc = await approvedDocFor('bob', 'bob')
			await assertFails(as('bob').collection('users').doc('bob').set({ ...newDoc, verified: { type: 'leader' } }))
		})
	})

	describe('users/{uid}/private/{contacts|location}', () => {
		it('permite: dono cria/atualiza/lê/apaga contatos e endereço', async () => {
			const contacts = as('alice').collection('users').doc('alice').collection('private').doc('contacts')
			// updatePrivateContacts tenta updateDoc (falha com not-found se não existe) e cai no setDoc
			await assertSucceeds(contacts.set({ cellNumber: '+5511', email: 'a@a' }))
			await assertSucceeds(contacts.update({ email: 'b@b' }))
			await assertSucceeds(contacts.get())
			const location = as('alice').collection('users').doc('alice').collection('private').doc('location')
			await assertSucceeds(location.set({ city: 'SP', district: 'X', visibleToGovernment: false }))
			await assertSucceeds(location.get())
			await assertSucceeds(contacts.delete())
			await assertSucceeds(location.delete())
		})

		it('nega: outro usuário (inclusive líder/admin) lê ou escreve dados privados', async () => {
			await seed((db) => db.doc('users/alice/private/contacts').set({ cellNumber: '+5511' }))
			await assertFails(as('bob').doc('users/alice/private/contacts').get())
			await assertFails(as('leader').doc('users/alice/private/contacts').get())
			await assertFails(as('admin').doc('users/alice/private/location').get())
			await assertFails(as('mallory').doc('users/alice/private/contacts').set({ cellNumber: '0' }))
		})

		it('nega: outros documentos em private/', async () => {
			await assertFails(as('alice').doc('users/alice/private/billing').set({ x: 1 }))
		})
	})
})

// ---------------------------------------------------------------------------
describe('posts/{postId}', () => {
	const basePost = (owner) => ({
		owner: { userId: owner, name: owner, profilePictureUrl: [] },
		postType: 'culture',
		macroCategory: 'event',
		completed: false,
		createdAt: new Date(1695000000123),
		unapprovedData: { description: 'rascunho', updatedAt: new Date(), reject: false },
	})

	beforeEach(async () => {
		await seed(async (db) => {
			await db.collection('posts').doc('p1').set({ ...basePost('alice'), description: 'aprovado', presenceList: ['carol'] })
		})
	})

	it('permite: criar post próprio (savePostDM/createPost)', async () => {
		await assertSucceeds(as('alice').collection('posts').add(basePost('alice')))
	})

	it('nega: criar post com owner.userId de outra pessoa', async () => {
		await assertFails(as('mallory').collection('posts').add(basePost('alice')))
	})

	it('nega: leitura anônima', async () => {
		await assertFails(anon().collection('posts').doc('p1').get())
	})

	it('permite: ler post e listar posts de um usuário (getPostsByUser)', async () => {
		await assertSucceeds(as('bob').collection('posts').doc('p1').get())
		await assertSucceeds(as('bob').collection('posts').where('completed', '==', false).where('owner.userId', '==', 'alice').orderBy('createdAt', 'desc').limit(10).get())
		await assertSucceeds(as('leader').collection('posts').where('unapprovedData.updatedAt', '!=', false).orderBy('unapprovedData.updatedAt', 'desc').limit(1).get())
	})

	it('permite: dono edita/marca como concluído/atualiza em lote (updatePostDM, markPostAsComplete, updatePostsList)', async () => {
		const snap = await as('alice').collection('posts').doc('p1').get()
		const data = snap.data()
		await assertSucceeds(as('alice').collection('posts').doc('p1').set({ ...data, unapprovedData: { description: 'novo' }, updatedAt: new Date(), createdAt: truncatedDate(data.createdAt) }, { merge: true }))
		await assertSucceeds(as('alice').collection('posts').doc('p1').set({ ...data, postId: 'p1', completed: true, updatedAt: new Date() }, { merge: true }))
		const aliceDb = as('alice')
		const batch = aliceDb.batch()
		batch.update(aliceDb.collection('posts').doc('p1'), { ...data, postId: 'p1', range: 'near', updatedAt: new Date() })
		await assertSucceeds(batch.commit())
	})

	it('nega: dono transfere a posse do post', async () => {
		await assertFails(as('alice').collection('posts').doc('p1').set({ owner: { userId: 'bob', name: 'Bob' } }, { merge: true }))
	})

	it('permite: outro usuário marca e desmarca presença (updatePostPresenceList)', async () => {
		const toggle = async (actor, list) => {
			const snap = await as(actor).collection('posts').doc('p1').get()
			const postData = { postId: 'p1', ...snap.data() }
			return as(actor).collection('posts').doc('p1').set({
				...postData, presenceList: list, updatedAt: new Date(), createdAt: truncatedDate(postData.createdAt),
			}, { merge: true })
		}
		await assertSucceeds(toggle('bob', ['carol', 'bob']))
		await assertSucceeds(toggle('bob', ['carol']))
	})

	it('nega: presença adicionando/removendo outra pessoa ou alterando outros campos', async () => {
		const post = as('mallory').collection('posts').doc('p1')
		await assertFails(post.set({ presenceList: ['carol', 'bob'] }, { merge: true }))
		await assertFails(post.set({ presenceList: [] }, { merge: true }))
		await assertFails(post.set({ presenceList: ['carol', 'mallory'], description: 'pichado' }, { merge: true }))
		await assertFails(post.set({ presenceList: ['carol', 'mallory'], createdAt: new Date(0) }, { merge: true }))
	})

	it('nega: outro usuário altera ou apaga post alheio', async () => {
		await assertFails(as('mallory').collection('posts').doc('p1').set({ description: 'x' }, { merge: true }))
		await assertFails(as('mallory').collection('posts').doc('p1').delete())
	})

	describe('moderação (approvePostDM / rejectPostDM / updateOwnerData)', () => {
		const approvedDoc = async (actor) => {
			const snap = await as(actor).collection('posts').doc('p1').get()
			const merged = mergeUnapproved({ postId: 'p1', ...snap.data() }, { dropOwner: false })
			return { ...merged, updatedAt: new Date(), createdAt: truncatedDate(merged.createdAt) }
		}

		it('permite: líder aprova post', async () => {
			await assertSucceeds(as('leader').collection('posts').doc('p1').set(await approvedDoc('leader')))
		})

		it('permite: líder rejeita post', async () => {
			await assertSucceeds(as('leader').collection('posts').doc('p1').set({ unapprovedData: { reject: true }, updatedAt: new Date() }, { merge: true }))
		})

		it('permite: líder sincroniza owner nos posts do usuário aprovado (batch)', async () => {
			const leaderDb = as('leader')
			const batch = leaderDb.batch()
			batch.update(leaderDb.collection('posts').doc('p1'), { owner: { userId: 'alice', name: 'Alice Nova' }, updatedAt: new Date() })
			await assertSucceeds(batch.commit())
		})

		it('nega: aprovação que troca o dono via unapprovedData.owner', async () => {
			await seed((db) => db.collection('posts').doc('p1').set({ unapprovedData: { owner: { userId: 'bob', name: 'Bob' } } }, { merge: true }))
			await assertFails(as('leader').collection('posts').doc('p1').set(await approvedDoc('leader')))
		})

		it('nega: líder grava conteúdo que não estava pendente', async () => {
			await assertFails(as('leader').collection('posts').doc('p1').set({ ...(await approvedDoc('leader')), title: 'inventado' }))
		})

		it('nega: usuário comum "aprova" post de outro', async () => {
			await assertFails(as('mallory').collection('posts').doc('p1').set(await approvedDoc('mallory')))
		})

		it('permite: dono e admin apagam; líder não', async () => {
			await assertFails(as('leader').collection('posts').doc('p1').delete())
			await assertSucceeds(as('admin').collection('posts').doc('p1').delete())
			await seed((db) => db.collection('posts').doc('p2').set(basePost('alice')))
			await assertSucceeds(as('alice').collection('posts').doc('p2').delete())
		})
	})
})

// ---------------------------------------------------------------------------
for (const [collection, creator] of [['polls', 'leader'], ['petitions', 'gov']]) {
	describe(`${collection}/{id} e responses`, () => {
		const campaign = (owner) => ({
			title: 't', description: 'd', range: 'city', completed: false, createdAt: new Date(1695000000123),
			owner: { userId: owner, name: owner },
		})

		beforeEach(async () => {
			await seed((db) => db.collection(collection).doc('c1').set({ ...campaign(creator), idUsersResponded: ['carol'] }))
		})

		it('permite: papel autorizado cria com owner = si mesmo (createPoll/createPetition)', async () => {
			for (const role of ['leader', 'gov', 'coordinator', 'qa', 'admin']) {
				await assertSucceeds(as(role).collection(collection).add(campaign(role)))
			}
		})

		it('nega: usuário comum cria; papel autorizado cria em nome de outro', async () => {
			await assertFails(as('alice').collection(collection).add(campaign('alice')))
			await assertFails(as('impactUser').collection(collection).add(campaign('impactUser')))
			await assertFails(as('leader').collection(collection).add(campaign('gov')))
		})

		it('permite: usuário responde e se adiciona em idUsersResponded (sendPollResponseDM)', async () => {
			await assertSucceeds(as('alice').collection(collection).doc('c1').collection('responses').add({ userId: 'alice', responses: [] }))
			await assertSucceeds(as('alice').collection(collection).doc('c1').set({ idUsersResponded: arrayUnion('alice'), updatedAt: new Date() }, { merge: true }))
		})

		it('nega: resposta em nome de outro, marcar outra pessoa ou remover alguém', async () => {
			await assertFails(as('alice').collection(collection).doc('c1').collection('responses').add({ userId: 'bob', responses: [] }))
			await assertFails(as('alice').collection(collection).doc('c1').set({ idUsersResponded: arrayUnion('bob'), updatedAt: new Date() }, { merge: true }))
			await assertFails(as('alice').collection(collection).doc('c1').set({ idUsersResponded: ['alice'] }, { merge: true }))
			await assertFails(as('alice').collection(collection).doc('c1').set({ title: 'pichado' }, { merge: true }))
		})

		it('nega: resposta em documento inexistente', async () => {
			await assertFails(as('alice').collection(collection).doc('nao-existe').collection('responses').add({ userId: 'alice' }))
		})

		it('permite: dono lê respostas (relatório) e apaga respostas + documento', async () => {
			await seed((db) => db.collection(collection).doc('c1').collection('responses').doc('r1').set({ userId: 'carol', cpf: '000' }))
			const responses = await assertSucceeds(as(creator).collection(collection).doc('c1').collection('responses').get())
			for (const doc of responses.docs) await assertSucceeds(as(creator).collection(collection).doc('c1').collection('responses').doc(doc.id).delete())
			await assertSucceeds(as(creator).collection(collection).doc('c1').delete())
		})

		it('nega: outros usuários (inclusive quem respondeu) leem respostas', async () => {
			await seed((db) => db.collection(collection).doc('c1').collection('responses').doc('r1').set({ userId: 'carol', cpf: '000' }))
			await assertFails(as('carol').collection(collection).doc('c1').collection('responses').get())
			await assertFails(as('mallory').collection(collection).doc('c1').collection('responses').doc('r1').get())
			await assertFails(as('mallory').collection(collection).doc('c1').collection('responses').doc('r1').delete())
		})

		it('permite: dono marca como concluído; outro não', async () => {
			await assertSucceeds(as(creator).collection(collection).doc('c1').set({ completed: true, updatedAt: new Date() }, { merge: true }))
			await assertFails(as('mallory').collection(collection).doc('c1').set({ completed: false }, { merge: true }))
		})

		it('permite: líder/admin sincronizam owner (approveProfileDM); não trocam o dono', async () => {
			const adminDb = as('admin')
			const batch = adminDb.batch()
			batch.update(adminDb.collection(collection).doc('c1'), { owner: { userId: creator, name: 'novo' }, updatedAt: new Date() })
			await assertSucceeds(batch.commit())
			await assertFails(as('admin').collection(collection).doc('c1').update({ owner: { userId: 'admin' }, updatedAt: new Date() }))
		})
	})
}

// ---------------------------------------------------------------------------
describe('citizenRegister (Cadastro Cidadão)', () => {
	const register = (censusTakerId, extra = {}) => ({
		name: 'cidadão', cellNumber: '+5511', censusTakerId, censusTakerName: censusTakerId,
		createdAt: new Date(), location: {}, responses: [], employmentStatus: { status: 'uncontacted', suggestedOpportunityIds: [] }, ...extra,
	})

	beforeEach(async () => {
		await seed(async (db) => {
			await db.collection('citizenRegister').doc('r1').set(register('qa', { coordinatorId: 'coordinator' }))
			await db.collection('citizenRegister').doc('r2').set(register('other', { coordinatorId: 'otherCoordinator' }))
			await db.collection('citizenRegisters').doc('legacy').set({ name: 'x' })
			await db.collection('citizens').doc('c').set({ name: 'x' })
		})
	})

	it('permite: aplicador, coordenador, líder e admin criam (CreateCitizenRegister)', async () => {
		for (const role of ['qa', 'coordinator', 'leader', 'admin']) {
			await assertSucceeds(as(role).collection('citizenRegister').add(register(role, { coordiantorId: 'coordinator' })))
		}
	})

	it('nega: usuário comum/governo/impacto criam', async () => {
		for (const role of ['alice', 'gov', 'impactUser']) {
			await assertFails(as(role).collection('citizenRegister').add(register(role)))
		}
	})

	it('permite: líder e admin listam tudo (getAllCitizenRegisters)', async () => {
		await assertSucceeds(as('leader').collection('citizenRegister').orderBy('createdAt', 'desc').limit(10).get())
		await assertSucceeds(as('admin').collection('citizenRegister').orderBy('createdAt', 'desc').limit(10).get())
	})

	it('permite: coordenador lista só os seus (getCitizenRegistrationsByCoordinator)', async () => {
		await assertSucceeds(as('coordinator').collection('citizenRegister').where('coordinatorId', '==', 'coordinator').orderBy('createdAt', 'desc').limit(10).get())
		await assertSucceeds(as('coordinator').collection('citizenRegister').doc('r1').get())
	})

	it('nega: coordenador lista tudo ou lê de outro coordenador', async () => {
		await assertFails(as('coordinator').collection('citizenRegister').orderBy('createdAt', 'desc').limit(10).get())
		await assertFails(as('coordinator').collection('citizenRegister').doc('r2').get())
	})

	it('nega: usuário comum e aplicador leem; ninguém altera/apaga pelo app', async () => {
		await assertFails(as('alice').collection('citizenRegister').doc('r1').get())
		await assertFails(as('alice').collection('citizenRegister').limit(1).get())
		await assertFails(as('qa').collection('citizenRegister').doc('r1').get())
		await assertFails(as('qa').collection('citizenRegister').doc('r1').set({ name: 'x' }, { merge: true }))
		await assertFails(as('admin').collection('citizenRegister').doc('r1').delete())
	})

	it('nega: coleções legadas citizenRegisters/citizens para qualquer cliente', async () => {
		await assertFails(as('alice').collection('citizenRegisters').doc('legacy').get())
		await assertFails(as('admin').collection('citizenRegisters').doc('legacy').get())
		await assertFails(as('alice').collection('citizenRegisters').doc('new').collection('registers').add({ x: 1 }))
		await assertFails(as('leader').collection('citizens').doc('c').get())
	})
})

// ---------------------------------------------------------------------------
describe('impactReports', () => {
	const report = (users) => ({ dateTime: new Date(), reportContext: 'chat', hadImpact: true, impactValue: 10, usersIdInvolved: users })

	it('permite: participante registra impacto (sendImpactReportDM)', async () => {
		await assertSucceeds(as('alice').collection('impactReports').add(report(['alice', 'bob'])))
		await assertSucceeds(as('alice').collection('impactReports').add(report(['alice'])))
	})

	it('nega: relatório em nome de terceiros, campos extras ou leitura', async () => {
		await assertFails(as('mallory').collection('impactReports').add(report(['alice', 'bob'])))
		await assertFails(as('alice').collection('impactReports').add({ ...report(['alice']), extra: true }))
		await assertFails(as('alice').collection('impactReports').limit(1).get())
	})
})

// ---------------------------------------------------------------------------
describe('usuário logado sem documento em users (get() de perfil inexistente)', () => {
	it('nega: operações que dependem de papel', async () => {
		await assertFails(as('ghost').collection('users').limit(1).get())
		await assertFails(as('ghost').collection('polls').add({ owner: { userId: 'ghost' } }))
		await assertFails(as('ghost').collection('citizenRegister').add({ censusTakerId: 'ghost' }))
	})

	it('permite: operações que não dependem de papel (post próprio, presença)', async () => {
		await seed((db) => db.collection('posts').doc('p9').set({ owner: { userId: 'alice' }, createdAt: new Date(1695000000000) }))
		await assertSucceeds(as('ghost').collection('posts').add({ owner: { userId: 'ghost' }, createdAt: new Date() }))
		await assertSucceeds(as('ghost').collection('posts').doc('p9').set({ presenceList: ['ghost'], updatedAt: new Date() }, { merge: true }))
	})
})

// ---------------------------------------------------------------------------
describe('padrão negado', () => {
	it('nega: coleções não mapeadas e subcoleções antigas', async () => {
		await assertFails(as('alice').collection('qualquer').doc('x').set({ a: 1 }))
		await assertFails(as('alice').doc('posts/p1/privateLocation/x').get())
		await assertFails(as('alice').doc('polls/c1/privateResponses/x').set({ userId: 'alice' }))
	})
})
