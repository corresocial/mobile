import { ServiceCategories } from '../../services/firebase/types'

export const updateServiceTags = (category: ServiceCategories, tag: string) => {
	serviceCategories[category].tags = [...serviceCategories[category].tags, tag]
}

const serviceCategories = {
	house: {
		label: 'casa',
		value: 'house',
		iconUri: '',
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
		iconUri: '',
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
		iconUri: '',
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
		iconUri: '',
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
		iconUri: '',
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
		iconUri: '',
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
		iconUri: '',
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
		iconUri: '',
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
		iconUri: '',
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
		iconUri: 'https://res.cloudinary.com/dphnexunq/image/upload/v1677504627/Pets_ho4mp6.svg',
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
		iconUri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/69351a02-0316-487e-8c22-003d9ec86f3f/Pets.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230227T132806Z&X-Amz-Expires=86400&X-Amz-Signature=3026cc18816341e218cbc7bf449ff7ba9ec792f0ac86171104d3bf6f645d746d&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D"Pets.svg"&x-id=GetObject',
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
		iconUri: '',
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
		iconUri: '',
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
		iconUri: '',
		tags: []
	},
}

export { serviceCategories }
