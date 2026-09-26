// Testes do storage.rules (bucket corresocialapp.appspot.com).
// Caminhos iguais aos de app/src/data/shared/bucket/firebaseBucket.ts.
import { after, before, beforeEach, describe, it } from 'node:test'

import { assertFails, assertSucceeds } from '@firebase/rules-unit-testing'
import 'firebase/compat/storage'

import { createTestEnv, seedProfiles } from './helpers.mjs'

let testEnv

const as = (uid) => testEnv.authenticatedContext(uid).storage()
const anon = () => testEnv.unauthenticatedContext().storage()

const JPEG = new Uint8Array([0xff, 0xd8, 0xff, 0xe0, 0, 0x10, 0x4a, 0x46, 0x49, 0x46])
const MP4 = new Uint8Array([0, 0, 0, 0x18, 0x66, 0x74, 0x79, 0x70, 0x6d, 0x70, 0x34, 0x32])
const jpegMeta = (extra = {}) => ({ contentType: 'image/jpeg', ...extra })

let counter = 1695000000000
// Formato atual do app: <ms>-<uuid>.ext
const nextName = (ext) => `${counter++}-859c2737-956e-39d6-4874-3ae2e6177d46.${ext}`
// Formato dos builds antigos: <ms>.ext
const legacyName = (ext) => `${counter++}.${ext}`

async function seedFile(path, customMetadata) {
	await testEnv.withSecurityRulesDisabled(async (ctx) => {
		await ctx.storage().ref(path).put(JPEG, jpegMeta(customMetadata ? { customMetadata } : {}))
	})
}

before(async () => {
	testEnv = await createTestEnv()
	await testEnv.clearFirestore()
	await seedProfiles(testEnv) // papéis lidos via firestore.get() nas regras do Storage
})

after(async () => {
	await testEnv.cleanup()
})

beforeEach(async () => {
	await testEnv.clearStorage()
})

describe('upload (processUpload/configUploadObjects)', () => {
	it('permite: foto de perfil, foto de post, foto de abaixo-assinado e vídeo de post', async () => {
		await assertSucceeds(as('alice').ref(`pictures/users/${nextName('jpg')}`).put(JPEG, jpegMeta()))
		await assertSucceeds(as('alice').ref(`pictures/posts/${nextName('jpg')}`).put(JPEG, jpegMeta()))
		await assertSucceeds(as('leader').ref(`pictures/petitions/${nextName('jpg')}`).put(JPEG, jpegMeta()))
		await assertSucceeds(as('alice').ref(`videos/posts/${nextName('mp4')}`).put(MP4, { contentType: 'video/mp4' }))
	})

	it('permite: getDownloadURL/getMetadata logo após o upload', async () => {
		const ref = as('alice').ref(`pictures/users/${nextName('jpg')}`)
		await assertSucceeds(ref.put(JPEG, jpegMeta()))
		await assertSucceeds(ref.getDownloadURL())
		await assertSucceeds(ref.getMetadata())
	})

	it('permite: upload com ownerId = próprio uid (futuro)', async () => {
		await assertSucceeds(as('alice').ref(`pictures/posts/${nextName('jpg')}`).put(JPEG, jpegMeta({ customMetadata: { ownerId: 'alice' } })))
	})

	it('nega: upload anônimo', async () => {
		await assertFails(anon().ref(`pictures/users/${nextName('jpg')}`).put(JPEG, jpegMeta()))
	})

	it('nega: leitura anônima via SDK', async () => {
		const path = `pictures/users/${nextName('jpg')}`
		await seedFile(path)
		await assertFails(anon().ref(path).getMetadata())
	})

	it('nega: sobrescrever arquivo existente (de outra pessoa)', async () => {
		const path = `pictures/users/${nextName('jpg')}`
		await seedFile(path, { ownerId: 'alice' })
		await assertFails(as('mallory').ref(path).put(JPEG, jpegMeta()))
		await assertFails(as('alice').ref(path).put(JPEG, jpegMeta())) // nem o dono: nome é sempre novo
	})

	it('nega: alterar metadados de arquivo existente', async () => {
		const path = `pictures/posts/${nextName('jpg')}`
		await seedFile(path, { ownerId: 'alice' })
		await assertFails(as('mallory').ref(path).updateMetadata({ customMetadata: { ownerId: 'mallory' } }))
	})

	it('nega: tipo de conteúdo errado (html, svg, vídeo em pictures, imagem em videos)', async () => {
		await assertFails(as('alice').ref(`pictures/users/${nextName('jpg')}`).put(JPEG, { contentType: 'text/html' }))
		await assertFails(as('alice').ref(`pictures/users/${nextName('jpg')}`).put(JPEG, { contentType: 'image/svg+xml' }))
		await assertFails(as('alice').ref(`pictures/posts/${nextName('jpg')}`).put(MP4, { contentType: 'video/mp4' }))
		await assertFails(as('alice').ref(`videos/posts/${nextName('mp4')}`).put(JPEG, jpegMeta()))
	})

	it('nega: arquivo acima do limite (15 MB para fotos)', async () => {
		const big = new Uint8Array(15 * 1024 * 1024 + 1)
		await assertFails(as('alice').ref(`pictures/posts/${nextName('jpg')}`).put(big, jpegMeta()))
	})

	it('permite: nome no formato antigo (<ms>.ext), usado pelos builds nas lojas', async () => {
		await assertSucceeds(as('alice').ref(`pictures/posts/${legacyName('jpg')}`).put(JPEG, jpegMeta()))
		await assertSucceeds(as('alice').ref(`videos/posts/${legacyName('mp4')}`).put(MP4, { contentType: 'video/mp4' }))
	})

	it('nega: sufixo depois do timestamp fora do padrão de uuid', async () => {
		await assertFails(as('alice').ref(`pictures/posts/${counter++}-evil.jpg`).put(JPEG, jpegMeta()))
		await assertFails(as('alice').ref(`pictures/posts/${counter++}-859c2737-956e-39d6-4874-3ae2e6177d46.html.jpg`).put(JPEG, jpegMeta()))
	})

	it('nega: caminho ou nome fora do padrão do app', async () => {
		await assertFails(as('alice').ref(`pictures/admin/${nextName('jpg')}`).put(JPEG, jpegMeta()))
		await assertFails(as('alice').ref('pictures/users/evil.html').put(JPEG, jpegMeta()))
		await assertFails(as('alice').ref(`pictures/users/sub/${nextName('jpg')}`).put(JPEG, jpegMeta()))
		await assertFails(as('alice').ref(`public/${nextName('jpg')}`).put(JPEG, jpegMeta()))
		await assertFails(as('alice').ref(`videos/users/${nextName('mp4')}`).put(MP4, { contentType: 'video/mp4' }))
	})

	it('nega: ownerId de outra pessoa no upload', async () => {
		await assertFails(as('mallory').ref(`pictures/posts/${nextName('jpg')}`).put(JPEG, jpegMeta({ customMetadata: { ownerId: 'alice' } })))
	})

	it('nega: listar pastas', async () => {
		await assertFails(as('alice').ref('pictures/users').listAll())
	})
})

describe('exclusão (deletePostMedias, deleteUserProfilePicture, approve*DM)', () => {
	it('permite: dono apaga arquivo com ownerId próprio', async () => {
		const path = `pictures/posts/${nextName('jpg')}`
		await seedFile(path, { ownerId: 'alice' })
		await assertSucceeds(as('alice').ref(path).getMetadata())
		await assertSucceeds(as('alice').ref(path).delete())
	})

	it('permite: líder/admin apagam arquivo de outro usuário (aprovação)', async () => {
		const p1 = `pictures/users/${nextName('jpg')}`
		const p2 = `pictures/posts/${nextName('jpg')}`
		await seedFile(p1, { ownerId: 'bob' })
		await seedFile(p2, { ownerId: 'bob' })
		await assertSucceeds(as('leader').ref(p1).delete())
		await assertSucceeds(as('admin').ref(p2).delete())
	})

	it('nega: usuário comum apaga arquivo com ownerId de outro', async () => {
		const path = `pictures/posts/${nextName('jpg')}`
		await seedFile(path, { ownerId: 'alice' })
		await assertFails(as('mallory').ref(path).delete())
	})

	it('permite (TODO segurança): arquivo legado sem ownerId pode ser apagado por qualquer usuário logado', async () => {
		const path = `pictures/users/${nextName('jpg')}`
		await seedFile(path)
		await assertFails(anon().ref(path).delete())
		await assertSucceeds(as('mallory').ref(path).delete())
	})
})
