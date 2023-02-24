import { CultureCategories } from '../../services/firebase/types'

export const updateCultureTags = (category: CultureCategories, tag: string) => {
	cultureCategories[category].tags = [...cultureCategories[category].tags, tag]
}

const cultureCategories = {
	music: {
		label: 'música',
		value: 'music',
		iconUri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/9dc8f3ce-b2a8-4a26-a9dc-24fab8d2c834/Msicas.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T205707Z&X-Amz-Expires=86400&X-Amz-Signature=f584ce6511b2495842e9cb3f7fea454f612a76a29d175333c713dc8d023bac12&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22M%25C3%25BAsicas.svg%22&x-id=GetObject',
		tags: [
			'rap',
			'banda',
			'solo',
			'acustico',
			'hiphop',
			'rock',
			'sertanejo',
			'eletronico',
			'reggae',
			'axé',
			'forró',
			'funk',
			'gospel',
			'cantor',
			'clássica',
			'samba',
			'folclore',
			'soul',
			'pop',
			'heavy metal',
			'MPB',
			'Jazz',
			'punk',
			'cover',
			'autoral'
		]
	},

	dance: {
		label: 'dança',
		value: 'dance',
		iconUri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/2c6ae7b3-0a49-4808-8ace-fb04ee360ace/Dana_de_Rua.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T171330Z&X-Amz-Expires=86400&X-Amz-Signature=b94ab831830686dc6e389b64d249920facaef98913f16ad206dfa72d258795ec&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Dan%25C3%25A7a%2520de%2520Rua.svg%22&x-id=GetObject',
		tags: [
			'balé',
			'axé',
			'forró',
			'rua',
			'break',
			'samba',
			'salão',
			'sertanejo',
			'tango',
			'funk',
			'indígena',
			'zumba'
		]
	},

	painting: {
		label: 'pintura',
		value: 'painting',
		iconUri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/8accaf83-bee5-4127-8935-11fdf9e2ada5/Pintura_e_cultura.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T201612Z&X-Amz-Expires=86400&X-Amz-Signature=15731a14d668ad955cf4bd31efdbf47943290514a6db0a8a943729b66bf41894&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Pintura%2520e%2520cultura.svg%22&x-id=GetObject',
		tags: [
			'óleo',
			'aquarela',
			'mural',
			'moderna',
			'digital',
			'abstrata'
		]
	},

	audiovisual: {
		label: 'audiovisual',
		value: 'audiovisual',
		iconUri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/ed96eb9a-509f-4217-b24b-f6b3cba8b94d/Audiovisual.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T164741Z&X-Amz-Expires=86400&X-Amz-Signature=9f9c39d1f1462ad2b87c19a2acbcbfc3e1a8b9a70cb2a1ed69203b9fa14a3312&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Audiovisual.svg%22&x-id=GetObject',
		tags: [
			'captacao',
			'animação',
			'cenografia',
			'direção',
			'iluminação',
			'montagem',
			'roteiro',
			'produção',
			'edição'
		]
	},

	scenic: {
		label: 'cênicas',
		value: 'scenic',
		iconUri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/336f60f5-5553-4310-aa61-fbea22ceea16/Cenicas_e_Teatro.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T171146Z&X-Amz-Expires=86400&X-Amz-Signature=f0419571a2a337e4efbd28e69797ac78c494bcc4c3a9c3d6a8d1bd914e3f008a&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Cenicas%2520e%2520Teatro.svg%22&x-id=GetObject',
		tags: [
			'ator',
			'teatro',
			'direção',
			'dança',
			'direção',
			'cenografia',
			'ator',
			'cinema',
			'tv',
			'escritor'
		]
	},

	tattooAndPiercing: {
		label: 'tattoo e piercing',
		value: 'tattooAndPiercing',
		iconUri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/82fea667-4b94-42b7-803d-e68fde351009/Tattoo__Piercing.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T194401Z&X-Amz-Expires=86400&X-Amz-Signature=34b738676b20a0c4fc90ca1e96823174ba05c811b0f304a14f275a16d139c2b0&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Tattoo%2520%2526%2520Piercing.svg%22&x-id=GetObject',
		tags: [
			'blackwork',
			'aquarela',
			'studio',
			'colorida',
			'bodypiercing',
			'oldschool',
			'pontilismo',
			'minimalista',
			'geométrico',
			'septo',
			'sobrancelha',
			'coverup'
		]
	},

	craftsmanship: {
		label: 'artesanato',
		value: 'craftsmanship',
		iconUri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/f1e6e72a-3e70-4de7-a232-f910e99eb6f0/artesanato.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T164731Z&X-Amz-Expires=86400&X-Amz-Signature=7723d66e6c65ac797c484d0932b5af871d297b1aa19c1f74b941a525bd7d339c&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22artesanato.svg%22&x-id=GetObject',
		tags: [
			'crochê',
			'tear',
			'bordado',
			'patchwork',
			'reciclado',
			'ceramica',
			'renda',
			'cestas',
			'madeira',
			'sustentavel'
		]
	},

	others: {
		label: 'outros',
		value: 'others',
		tags: [

		]
	}
}

export { cultureCategories }
