import { ServiceCategories } from '../../services/firebase/types'

export const updateServiceTags = (category: ServiceCategories, tag: string) => {
	serviceCategories[category].tags = [...serviceCategories[category].tags, tag]
}

const serviceCategories = {
	house: {
		label: 'casa',
		value: 'house',
		iconUri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/25007d30-ce22-47a6-aeb9-2b2c10333ef2/Casa_1.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T165324Z&X-Amz-Expires=86400&X-Amz-Signature=630136784a0d4e46b01d14e1d0878355ddbaecde8c8daf5131eb4309a814a841&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Casa%25201.svg%22&x-id=GetObject',
		tags: [
			'casa',
			'arquitetura',
			'home',
			'brasil',
			'decoracao',
			'design',
			'apartamento',
			'decoração',
			'architecture',
			'homedecor',
			'designdeinteriores',
			'interiores',
			'love',
			'imoveis',
			'instagood',
			'imobiliaria',
			'house',
			'interiordesign',
			'arte',
			'arquiteturadeinteriores',
			'interior',
			'decoration',
			'projeto',
			'lar',
			'cozinha',
			'arquiteto',
			'reforma'
		]
	},

	health: {
		label: 'saúde',
		value: 'health',
		iconUri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/f1f9c46d-2384-48c7-8e1b-f8d03128ce02/Sade.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T201127Z&X-Amz-Expires=86400&X-Amz-Signature=23460bd53c499d425419d6fa5f70f668eff49c5d1544e7b01f2ea6b800ea6c3d&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Sa%25C3%25BAde.svg%22&x-id=GetObject',
		tags: [
			'medico',
			'enfermagem',
			'dermatologia',
			'hospital',
			'prontosocorre',
			'clinica',
			'fitness',
			'bemestar',
			'dieta',
			'foco',
			'academia',
			'treino',
			'emagreciment',
			'musculação',
			'personaltrainer',
			'crossfit',
			'musculacao',
			'bodybuilding',
			'modafitness',
			'nutrição'
		]
	},

	leisure: {
		label: 'lazer',
		value: 'leisure',
		iconUri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/3635d7a0-afd0-4726-939d-ab442e86763f/Icone_Lazer_Corre.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T203615Z&X-Amz-Expires=86400&X-Amz-Signature=418be50fdd4f0d0ccaaffd742af0d0009507034de90a7c412ecf5d3d0d50e22c&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Icone%2520Lazer%2520Corre.svg%22&x-id=GetObject',
		tags: [
			'turismo',
			'praia',
			'natureza',
			'familia',
			'viagem',
			'diversao',
			'cultura',
			'sol',
			'ferias',
			'esporte',
			'piscina',
			'mar',
			'hobby'
		]
	},

	transport: {
		label: 'transporte',
		value: 'transport',
		iconUri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/5a195c20-c4db-4e47-8f6f-f9644ada012c/Transporte.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T193410Z&X-Amz-Expires=86400&X-Amz-Signature=f7b175c4ccf7bad59b323fc23ac7f969b6c9bb03714c9523afa9100ef5c295e0&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Transporte.svg%22&x-id=GetObject',
		tags: [
			'onibus',
			'rodoviario',
			'amador',
			'coletivo',
			'urbano',
			'vans',
			'motoboy',
			'frete',
			'uber',
			'motoboy',
			'mototaxi',
			'taxi',
			'moto',
			'carro',
			'cargaspequenas',
			'cargasmedias',
			'cargasgrandes'
		]
	},

	sport: {
		label: 'esporte',
		value: 'sport',
		iconUri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/94d99b18-0a7f-4224-ab53-79512a9c2bb1/Esporte.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T203605Z&X-Amz-Expires=86400&X-Amz-Signature=410a9f2b104801ec23f2285b7f07c38834097db72d454bd7be35985712bc9c0e&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Esporte.svg%22&x-id=GetObject',
		tags: [
			'futebol',
			'fitness',
			'saude',
			'corrida',
			'treino',
			'academia',
			'corrida',
			'surf',
			'skate',
			'basquete',
			'bike',
			'corridaderua',
			'luta',
			'jiujitsu'
		]
	},

	foodAndDrink: {
		label: 'comida e bebida',
		value: 'foodAndDrink',
		iconUri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/6581860d-a3aa-464b-a8a1-3b54c099b8c1/Alimentao.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T171118Z&X-Amz-Expires=86400&X-Amz-Signature=6dba6f311bdfc8b923e9f0e0ef38659776cea47f14de43a704ee759790be8709&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Alimenta%25C3%25A7%25C3%25A3o.svg%22&x-id=GetObject',
		tags: [
			'cerveja',
			'vinho',
			'marmita',
			'pizza',
			'japonesa',
			'gastronomia',
			'drinks',
			'gin',
			'vodka',
			'chopp',
			'bar',
			'gourmet',
			'restaurante',
			'lúpulo',
			'vegetariano',
			'hamburguer',
			'gourmet',
			'vegano',
			'petisco',
			'porcoes',
			'padaria'
		]
	},

	education: {
		label: 'educação',
		value: 'education',
		iconUri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/0b0ce56f-0b55-4ec5-a0c8-57203699fe45/Educaot.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T171642Z&X-Amz-Expires=86400&X-Amz-Signature=6fc38f9d991993f353525a090b3ac2e8545669e40b0d21f32fa524866102ed02&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Educa%25C3%25A7%25C3%25A3ot.svg%22&x-id=GetObject',
		tags: [
			'educação',
			'matemática',
			'portugues',
			'escola',
			'psicologia',
			'filosofia',
			'portugues',
			'cursinho',
			'online',
			'cursinho',
			'particular',
			'aula',
			'saude',
			'faculdade',
			'quimica',
			'arte',
			'dança',
			'psicologia',
			'uberlândia',
			'education',
			'sucesso'
		]
	},

	technology: {
		label: 'tecnologia',
		value: 'technology',
		iconUri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/faa37f1a-ca82-4619-8b63-88a000586257/Tecnologia.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T194354Z&X-Amz-Expires=86400&X-Amz-Signature=71dfe456bab91ac84f462f401bbf1136fa40bd57da97a7beea52b7eeafa19652&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Tecnologia.svg%22&x-id=GetObject',
		tags: [
			'assistencia',
			'inovação',
			'design',
			'informatica',
			'computador',
			'celular',
			'impressoras',
			'internet',
			'notebook',
			'marketing',
			'manutenção',
			'business',
			'programcao',
			'site',
			'portal',
			'android',
			'iphone',
			'ios'
		]
	},

	beautyWellBeing: {
		label: 'beleza e bem-estar',
		value: 'beautyWellBeing',
		iconUri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/ed3873ff-cebe-41ca-987b-edac9fdbf4c6/Beleza.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T203455Z&X-Amz-Expires=86400&X-Amz-Signature=98e8528d70864fba505cf1e9e6c7da20418717892137330ad729f2733fec2371&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Beleza.svg%22&x-id=GetObject',
		tags: [
			'bem-estar',
			'moda',
			'makeup',
			'maquiagem',
			'cuidados',
			'unha',
			'salao',
			'cabeleleiro',
			'cabelo',
			'mulher',
			'homem',
			'barbeiro',
			'corte',
			'bemestar',
			'maquiagem',
			'maquiadora',
			'hairstyle',
			'sobrancelhas',
			'depilacao',
			'dermatologia'
		]
	},

	animals: {
		label: 'bichos',
		value: 'animals',
		iconUri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/69351a02-0316-487e-8c22-003d9ec86f3f/Pets.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T201620Z&X-Amz-Expires=86400&X-Amz-Signature=7c480f27581269cd9f614dd892f6c88c2bb763f61a5bb61ecee625c45a3c507e&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Pets.svg%22&x-id=GetObject',
		tags: [
			'cachorro',
			'dog',
			'gato',
			'veterinario',
			'cirurgia',
			'dogs',
			'imagem',
			'adestramento',
			'petshop',
			'agrupecuaria',
			'gado',
			'boi',
			'passaros',
			'racao',
			'farmacia',
			'petshop'
		]
	},

	finances: {
		label: 'financeiro',
		value: 'finances',
		iconUri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/152cf043-5329-4df4-8078-069a1312c5ff/Financeiro.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T171931Z&X-Amz-Expires=86400&X-Amz-Signature=3167b87acb8c2ee99c1dc6eefbe6e68a7f9c3776b8b5d3680ef95e32b87f97bd&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Financeiro.svg%22&x-id=GetObject',
		tags: [
			'financeiro',
			'empreendedorismo',
			'credito',
			'emprestimo',
			'contabilidade',
			'gestão',
			'coach',
			'coaching',
			'administracao',
			'economia',
			'contador'
		]
	},

	travel: {
		label: 'viajem',
		value: 'travel',
		iconUri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/075a7712-a339-470b-a2d8-8d67f3289185/Viagem.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T193348Z&X-Amz-Expires=86400&X-Amz-Signature=0850e097efc796af3076f20502df0c96d25caba4ddaeafb29776ac96699a8981&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Viagem.svg%22&x-id=GetObject',
		tags: [
			'viajem',
			'natureza',
			'praia',
			'acampar',
			'escalar',
			'turismo',
			'agencia',
			'ferias',
			'brasil',
			'exterior',
			'passagens',
			'cachueira',
			'camping',
			'montanhas',
			'trilha'
		]
	},

	events: {
		label: 'eventos',
		value: 'events',
		iconUri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/767cd1c7-2ca7-4e6d-bf76-72bbd940c121/Eventos.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T171702Z&X-Amz-Expires=86400&X-Amz-Signature=6d87371e3be869d891af818fcdfb51230af51a54843e9f2aab5b58e9082049ec&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Eventos.svg%22&x-id=GetObject',
		tags: [
			'casamento',
			'festas',
			'show',
			'cervejda',
			'aniversario',
			'15anos',
			'formatura',
			'personalizados',
			'brindes',
			'batizado',
			'casamentos',
			'brindespersonalizados',
			'copos',
			'buffet',
			'fotografia',
			'produçao'
		]
	},

	others: {
		label: 'outros',
		value: 'others',
		iconUri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/5205eb06-d118-4a81-98ab-1d5dd4d7c33c/Comida.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T164007Z&X-Amz-Expires=86400&X-Amz-Signature=4efb4b88b82743731ad9c4f6617bd5d97046cfc442c468dd4add3f7ab3ea572f&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Comida.svg%22&x-id=GetObject',
		tags: []
	},
}

export { serviceCategories }
