import { ServiceCategories } from '../../services/firebase/types'

export const updateServiceTags = (category: ServiceCategories, tag: string) => {
	serviceCategories[category].tags = [...serviceCategories[category].tags, tag]
}

const serviceCategories = {
	house: {
		label: 'casa',
		value: 'house',
		slug: 'house',
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
	art: {
		label: 'arte',
		value: 'art',
		slug: 'art',
		tags: [
			'acessorios',
			'tinta',
			'ferramentas',
			'madeira',
			'quadro',
			'decoraçao',
			'derua',
			'dança',
			'audiovisual',
			'cenicas',
			'tattoo',
			'artesanato',
			'literatura',
			'popart',
			'musica',
			'instrumentos',
			'pintura',
			'caligrafia',
			'papeis',
			'gravuras',
			'modelagem',
			'desenho']
	},
	autoAndParts: {
		label: 'automóveis e peças',
		value: 'autoAndParts',
		slug: 'autoAndParts',
		tags: [
			'moto',
			'usado',
			'novo',
			'onibus',
			'van',
			'peças',
			'oficina',
			'mecanico',
			'financiamento',
			'consorcio',
			'van',
			'caminhao',
			'seguros',
			'carro',
			'computador',
			'celular',
			'pneu',
			'farol',
			'camera',
			'caminhao'
		]
	},
	clothesAndAccessories: {
		label: 'roupas e acessórios',
		value: 'clothesAndAccessories',
		slug: 'clothesAndAccessories',
		tags: [
			'camiseta',
			'calça',
			'intima',
			'masculino',
			'feminino',
			'blusa',
			'frio',
			'moletom',
			'praia',
			'calor',
			'festa',
			'vestido',
			'saia',
			'shorts',
			'chinelo',
			'tenis',
			'bota',
		]
	},
	toys: {
		label: 'infantil',
		value: 'toys',
		slug: 'toys',
		tags: [
			'alugar',
			'festa',
			'baby',
			'bebe',
			'crianças',
			'adolescentes',
			'bonecos',
			'carros',
			'colecionáveis',
			'jogos',
			'acessórios',
			'montar',
			'quebra-cabeças',
			'arte',
			'pelúcia',
		]
	},
	health: {
		label: 'saúde',
		value: 'health',
		slug: 'health',
		tags: [
			'medico',
			'enfermagem',
			'psicologia',
			'dermatologia',
			'psicologia',
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
		slug: 'leisure',
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
		slug: 'transport',
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
		slug: 'sport',
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

	food: {
		label: 'comida',
		value: 'food',
		slug: 'food',
		tags: [
			'marmita',
			'pizza',
			'japonesa',
			'gastronomia',
			'gourmet',
			'restaurante',
			'vegetariano',
			'hamburguer',
			'gourmet',
			'vegano',
			'pastel',
			'petisco',
			'porcoes',
			'padaria',
			'brasileira',
			'italiana',
			'chinesa',
			'churrasco',
			'cozinha',
			'fast food',
		]
	},
	techAndCellPhone: {
		label: 'eletrônicos e assistência',
		value: 'techAndCellPhone',
		slug: 'techAndCellPhone',
		tags: [
			'tv',
			'celular',
			'computador',
			'cabos',
			'carregadores',
			'software',
			'assistencia',
			'adaptador',
			'suportes',
			'gamer',
			'fones'
		]
	},
	drink: {
		label: 'bebida',
		value: 'drink',
		slug: 'drink',
		tags: ['cerveja', 'vinho', 'drinks', 'gin', 'vodka', 'chopp', 'bar', 'refrigerante', 'agua', 'suco',
		]
	},

	education: {
		label: 'educação',
		value: 'education',
		slug: 'education',
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
			'uberlândia',
			'education',
			'sucesso'
		]
	},

	tech: {
		label: 'tecnologia',
		value: 'tech',
		slug: 'tech',
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
		slug: 'beauty',
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
		slug: 'pets',
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
		slug: 'finances',
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
		label: 'viagem',
		value: 'travel',
		slug: 'travel',
		tags: [
			'viagem',
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
		slug: 'businessDayEvent',
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

	legal: {
		label: 'jurídico',
		value: 'legal',
		slug: 'legal',
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

	diversity: {
		label: 'diversidade',
		value: 'diversity',
		slug: 'diversity',
		tags: [
			'cognitiva',
			'física',
			'visual',
			'auditiva',
			'racial',
			'etária',
			'LGBTQIAP+',
			'religiosa'
		]
	},

	others: {
		label: 'outros',
		value: 'others',
		slug: 'others',
		tags: []
	},
}

export { serviceCategories }
