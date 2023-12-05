import { ServiceCategories } from '@services/firebase/types'

import AnimalIcon from '@assets/icons/categories/animals.svg'
import ArtIcon from '@assets/icons/categories/art.svg'
import AutoAndPartsIcon from '@assets/icons/categories/autoAndParts.svg'
import BeautyWellBeingIcon from '@assets/icons/categories/beautyWellBeing.svg'
import ClothesAndAccessoriesIcon from '@assets/icons/categories/clothesAndAccessories.svg'
import DiversityIcon from '@assets/icons/categories/diversity.svg'
import DrinkIcon from '@assets/icons/categories/drink.svg'
import EducationIcon from '@assets/icons/categories/education.svg'
import EventsIcon from '@assets/icons/categories/events.svg'
import FinancesIcon from '@assets/icons/categories/finances.svg'
import FoodIcon from '@assets/icons/categories/food.svg'
import HealthIcon from '@assets/icons/categories/health.svg'
import HouseIcon from '@assets/icons/categories/house.svg'
import LegalIcon from '@assets/icons/categories/legal.svg'
import LeisureIcon from '@assets/icons/categories/leisure.svg'
import OthersIcon from '@assets/icons/categories/others.svg'
import SportIcon from '@assets/icons/categories/sport.svg'
import TechIcon from '@assets/icons/categories/tech.svg'
import TechAndCellPhoneIcon from '@assets/icons/categories/techAndCellPhone.svg'
import ToysIcon from '@assets/icons/categories/toys.svg'
import TransportIcon from '@assets/icons/categories/transport.svg'
import TravelIcon from '@assets/icons/categories/travel.svg'

export const updateServiceTags = (category: ServiceCategories, tag: string) => {
	serviceCategories[category].tags = [...serviceCategories[category].tags, tag]
}

const serviceCategories = {
	house: {
		label: 'casa',
		value: 'house',
		SvgIcon: HouseIcon,
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
		SvgIcon: ArtIcon,
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
		SvgIcon: AutoAndPartsIcon,
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
		SvgIcon: ClothesAndAccessoriesIcon,
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
		SvgIcon: ToysIcon,
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
		SvgIcon: HealthIcon,
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
		SvgIcon: LeisureIcon,
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
		SvgIcon: TransportIcon,
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
		SvgIcon: SportIcon,
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
		SvgIcon: FoodIcon,
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
		SvgIcon: TechAndCellPhoneIcon,
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
		SvgIcon: DrinkIcon,
		tags: ['cerveja', 'vinho', 'drinks', 'gin', 'vodka', 'chopp', 'bar', 'refrigerante', 'agua', 'suco',
		]
	},

	education: {
		label: 'educação',
		value: 'education',
		SvgIcon: EducationIcon,
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
		SvgIcon: TechIcon,
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
		SvgIcon: BeautyWellBeingIcon,
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
		SvgIcon: AnimalIcon,
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
		SvgIcon: FinancesIcon,
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
		SvgIcon: TravelIcon,
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
		SvgIcon: EventsIcon,
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
		SvgIcon: LegalIcon,
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
		SvgIcon: DiversityIcon,
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
		SvgIcon: OthersIcon,
		tags: []
	},
}

export { serviceCategories }
