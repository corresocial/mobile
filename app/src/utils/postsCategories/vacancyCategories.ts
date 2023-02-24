import { VacancyCategories } from '../../services/firebase/types'

export const updateVacancyTags = (category: VacancyCategories, tag: string) => {
	vacancyCategories[category].tags = [...vacancyCategories[category].tags, tag]
}

const vacancyCategories = {
	management: {
		label: 'administração',
		value: 'management',
		iconUri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/197e8200-eedc-46c6-897e-c05358211510/Administrao.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T164454Z&X-Amz-Expires=86400&X-Amz-Signature=ecbe52fed5470dcae2b5daa25e53a939875b41dc7ed8a22259a10065fd4b6760&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Administra%25C3%25A7%25C3%25A3o.svg%22&x-id=GetObject',
		tags: [
			'gestor',
			'logistica',
			'financeiro',
			'gerente',
			'consultor',
			'marketing',
			'estágio',
			'vendas'
		]
	},

	food: {
		label: 'alimentação',
		value: 'food',
		iconUri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/577d52df-33b9-4214-9632-23833b694370/Alimentao.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T164505Z&X-Amz-Expires=86400&X-Amz-Signature=481959009c2e0e9653fcda31b49b613de7b7a788c8b70c7b8a6c8a2f7792f9d4&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Alimenta%25C3%25A7%25C3%25A3o.svg%22&x-id=GetObject',
		tags: [
			'cozinheiro',
			'garçom',
			'atendente',
			'balconista',
			'caixa',
			'assistente',
			'gerente',
			'restaurante',
			'tecnico',
			'estagio',
			'vendedor',
		]
	},

	beaks: {
		label: 'bicos',
		value: 'beaks',
		iconUri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/69351a02-0316-487e-8c22-003d9ec86f3f/Pets.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T201620Z&X-Amz-Expires=86400&X-Amz-Signature=7c480f27581269cd9f614dd892f6c88c2bb763f61a5bb61ecee625c45a3c507e&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Pets.svg%22&x-id=GetObject',
		tags: [
			'limpeza',
			'design',
			'programacao',
			'eletricista',
			'encanador',
			'marceneiro',
			'jardinagem',
			'pedreiro',
			'pintor',
			'chaveiro',
			'garçom',
			'barman',
			'dj',
			'churrasqueiro',
		]
	},

	CLT: {
		label: 'CLT',
		value: 'CLT',
		iconUri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/07bc0969-48ee-4086-89dd-67741cac0898/Clt.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T170941Z&X-Amz-Expires=86400&X-Amz-Signature=d789054d638b86bb2ee57ac1e635a46e32d9205c8f1517b167f4f0d5c08091c9&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Clt.svg%22&x-id=GetObject',
		tags: [
			'administracao',
			'alimentação',
			'bicos',
			'saúde',
			'beleza',
			'cultura',
			'educacao',
			'governo',
			'audiovisual',
			'imobiliária',
			'jurídico',
			'marketing',
			'tecnologia',
			'segurança',
			'transporte',
			'comercial',
		]
	},

	studentAndInternship: {
		label: 'estudante/estágio',
		value: 'studentAndInternship',
		iconUri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/f37bfa76-17e1-4dbd-b3e4-dfefa38cdbb2/Estudante_e_Estgio.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T210548Z&X-Amz-Expires=86400&X-Amz-Signature=b06ac048e7350614473e5276557d7be69fcf36c239bf85e440265a1dcf8a564e&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Estudante%2520e%2520Est%25C3%25A1gio.svg%22&x-id=GetObject',
		tags: [
			'administracao',
			'alimentação',
			'bicos',
			'saúde',
			'beleza',
			'cultura',
			'educacao',
			'governo',
			'audiovisual',
			'imobiliária',
			'jurídico',
			'marketing',
			'tecnologia',
			'segurança',
			'transporte',
			'comercial',
		]
	},

	MEI: {
		label: 'MEI',
		value: 'MEI',
		iconUri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/b88c0bf8-6416-48e2-94e0-8a030ef26703/mei.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T210417Z&X-Amz-Expires=86400&X-Amz-Signature=d3bc5a035b687c537f86ee2f0816ad67ce4eb2f705f351604baceaa2e51b6c88&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22mei.svg%22&x-id=GetObject',
		tags: [
			'administracao',
			'alimentação',
			'bicos',
			'saúde',
			'beleza',
			'cultura',
			'educacao',
			'governo',
			'audiovisual',
			'imobiliária',
			'jurídico',
			'marketing',
			'tecnologia',
			'segurança',
			'transporte',
			'comercial',
		]
	},

	partTime: {
		label: 'meio período',
		value: 'partTime',
		iconUri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/6856e35f-6347-4603-baac-4abef4c88086/Meio_Perodo.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T210424Z&X-Amz-Expires=86400&X-Amz-Signature=e72aad6b58bcb9d5cc62218ce9d32c5821c5a8b64ea87668f7b0120780b43168&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Meio%2520Per%25C3%25ADodo.svg%22&x-id=GetObject',
		tags: [
			'administracao',
			'alimentação',
			'bicos',
			'saúde',
			'beleza',
			'cultura',
			'educacao',
			'governo',
			'audiovisual',
			'imobiliária',
			'jurídico',
			'marketing',
			'tecnologia',
			'segurança',
			'transporte',
			'comercial',
		]
	},

	health: {
		label: 'saúde',
		value: 'health',
		iconUri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/f1f9c46d-2384-48c7-8e1b-f8d03128ce02/Sade.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T201127Z&X-Amz-Expires=86400&X-Amz-Signature=23460bd53c499d425419d6fa5f70f668eff49c5d1544e7b01f2ea6b800ea6c3d&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Sa%25C3%25BAde.svg%22&x-id=GetObject',
		tags: [
			'enfermagem',
			'medico',
			'assistente',
			'farmaceutico',
			'secretario',
			'vendedor',
			'quimico',
			'corretor',
			'odontologista',
			'dentista',
			'fisioterapeuta',
			'radiologia',
			'estagio',
		]
	},

	beauty: {
		label: 'beleza',
		value: 'beauty',
		iconUri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/ed3873ff-cebe-41ca-987b-edac9fdbf4c6/Beleza.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T203455Z&X-Amz-Expires=86400&X-Amz-Signature=98e8528d70864fba505cf1e9e6c7da20418717892137330ad729f2733fec2371&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Beleza.svg%22&x-id=GetObject',
		tags: [
			'cabelereiro',
			'manicure',
			'barbeiro',
			'maquiadora',
			'esteticista',
			'massagem',
			'depilaçao',
			'estagio',
		]
	},

	culture: {
		label: 'cultura',
		value: 'culture',
		iconUri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/33bfa85c-40be-42a7-92ad-45c9cd11bbe4/Cinema_e_Cultura.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T165445Z&X-Amz-Expires=86400&X-Amz-Signature=b83ec9c5f0516e56516ba45a99166599285acdf00cbabd1d85ec2f253b7b7e4a&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Cinema%2520e%2520Cultura.svg%22&x-id=GetObject',
		tags: [
			'audiovisual',
			'eventos',
			'produçao',
			'fotografia',
			'musica',
			'dj',
			'organizador',
			'pintor',
			'arte',
			'parede',
			'professor',
			'instrutor',
			'estagio',
		]
	},

	education: {
		label: 'educação',
		value: 'education',
		iconUri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/0b0ce56f-0b55-4ec5-a0c8-57203699fe45/Educaot.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T171642Z&X-Amz-Expires=86400&X-Amz-Signature=6fc38f9d991993f353525a090b3ac2e8545669e40b0d21f32fa524866102ed02&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Educa%25C3%25A7%25C3%25A3ot.svg%22&x-id=GetObject',
		tags: [
			'químico',
			'físico',
			'biologia',
			'psicologia',
			'filosofia',
			'professor',
			'monitor',
			'assistente',
			'particular',
			'estagio',
		]
	},

	government: {
		label: 'governo',
		value: 'government',
		iconUri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/3f00caf9-f9cf-45f8-a298-fe5642bfca43/Governo.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T171944Z&X-Amz-Expires=86400&X-Amz-Signature=66cfe62433f9a3d0585df4807b36a56f6c28575d57f5c47332db83372437b0a8&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Governo.svg%22&x-id=GetObject',
		tags: [
			'segurança',
			'atendente',
			'secretária',
			'cultura',
			'educação',
			'contabilidade',
			'supervisor',
			'assistente',
			'planejamento',
			'lazer',
			'transporte',
			'turismo',
			'estagio',
			'concurso',
		]
	},

	audiovisual: {
		label: 'audiovisual',
		value: 'audiovisual',
		iconUri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/ed96eb9a-509f-4217-b24b-f6b3cba8b94d/Audiovisual.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T164741Z&X-Amz-Expires=86400&X-Amz-Signature=9f9c39d1f1462ad2b87c19a2acbcbfc3e1a8b9a70cb2a1ed69203b9fa14a3312&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Audiovisual.svg%22&x-id=GetObject',
		tags: [
			'fotografia',
			'produção',
			'edição',
			'captura',
			'mixagem',
			'figurino',
			'planejamento',
			'redes sociais',
			'estagio',
		]
	},

	realEstate: {
		label: 'outros',
		value: 'realEstate',
		tags: [
			'consultor',
			'corretor',
			'gerente',
			'secretaria',
			'atendimento',
			'documentalista',
			'financeiro',
			'juridico',
			'estagio',
		]
	},

	legal: {
		label: 'jurídico',
		value: 'legal',
		iconUri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/6135cf6f-508d-489c-811d-7f0cefb782ca/Juridico.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T210537Z&X-Amz-Expires=86400&X-Amz-Signature=2f24363ee201b22d6e7a1a7750b080f5e9c96e526f853764dd90d4f56e2ae5f4&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Juridico.svg%22&x-id=GetObject',
		tags: [
			'empresarial',
			'advogado',
			'estagio',
			'trabalhista',
			'tributario',
			'civil',
			'concurso',
			'ambiental'
		]
	},

	marketing: {
		label: 'marketing',
		value: 'marketing',
		iconUri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/15fdeeab-063f-47b2-84b4-0bbd4ed0558f/Marketing.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T210527Z&X-Amz-Expires=86400&X-Amz-Signature=f9eac6eac67cbadfa03db7492ab1a957c69a61d61dfc3df9722eb5bf8e68a91d&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Marketing.svg%22&x-id=GetObject',
		tags: [
			'gerente',
			'agente',
			'relações',
			'editor',
			'designer',
			'planejamento',
			'produtor',
			'influencer',
			'clientes',
			'vendas',
			'branding',
			'pesquisa',
			'eventos'
		]
	},

	tech: {
		label: 'tecnologia',
		value: 'tech',
		iconUri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/faa37f1a-ca82-4619-8b63-88a000586257/Tecnologia.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T194354Z&X-Amz-Expires=86400&X-Amz-Signature=71dfe456bab91ac84f462f401bbf1136fa40bd57da97a7beea52b7eeafa19652&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Tecnologia.svg%22&x-id=GetObject',
		tags: [
			'programador',
			'designer',
			'secretária',
			'atendente',
			'web',
			'mobile',
			'assistencia',
			'tecnico',
			'conserto',
			'gestor',
			'gerente',
		]
	},

	security: {
		label: 'segurança',
		value: 'security',
		iconUri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/52c587b1-fcdd-46b4-9e91-f3c9ec35db41/Seguranat.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T194430Z&X-Amz-Expires=86400&X-Amz-Signature=d5857ae4a9f03886a1a27eb9f863925dc3069593823400d29a528426fa00a223&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Seguran%25C3%25A7at.svg%22&x-id=GetObject',
		tags: [
			'eventos',
			'publico',
			'particular',
			'vigilante',
			'obras',
			'predio',
			'shopping',
			'porteiro',
			'controlador',
			'motorista',
		]
	},

	transport: {
		label: 'transporte',
		value: 'transport',
		iconUri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/5a195c20-c4db-4e47-8f6f-f9644ada012c/Transporte.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T193410Z&X-Amz-Expires=86400&X-Amz-Signature=f7b175c4ccf7bad59b323fc23ac7f969b6c9bb03714c9523afa9100ef5c295e0&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Transporte.svg%22&x-id=GetObject',
		tags: [
			'uber',
			'motoboy',
			'onibus',
			'van',
			'frete',
			'caminhao',
			'analista',
			'logistica',
			'rotas',
			'categoria D',
		]
	},

	commercial: {
		label: 'comercial',
		value: 'commercial',
		iconUri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/aef1bbda-bbd1-41a7-8b58-a6a3df7b173b/COmercios.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T171131Z&X-Amz-Expires=86400&X-Amz-Signature=4092bd911f1372f950f9ef573e24de23b0ad3fc9ca3ce9df186d36bcb5890476&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22COmercios.svg%22&x-id=GetObject',
		tags: [
			'representante',
			'vendedor',
			'secretario',
			'varejo',
			'loja',
			'gerente',
			'supervisor',
			'coordenadora',
			'executiva',
			'tecnico'
		]
	},

	others: {
		label: 'outros',
		value: 'others',
		tags: []
	},
}

export { vacancyCategories }
