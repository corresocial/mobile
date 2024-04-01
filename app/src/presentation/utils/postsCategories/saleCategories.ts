import { SaleCategories } from '@domain/post/entity/types'

import AnimalsIcon from '@assets/icons/categories/animals.svg'
import ArtIcon from '@assets/icons/categories/art.svg'
import AutoAndPartsIcon from '@assets/icons/categories/autoAndParts.svg'
import BeautyWellBeingIcon from '@assets/icons/categories/beautyWellBeing.svg'
import BooksIcon from '@assets/icons/categories/books.svg'
import ClothesAndAccessoriesIcon from '@assets/icons/categories/clothesAndAccessories.svg'
import DiversityIcon from '@assets/icons/categories/diversity.svg'
import DrinkIcon from '@assets/icons/categories/drink.svg'
import FoodIcon from '@assets/icons/categories/food.svg'
import FurnitureIcon from '@assets/icons/categories/furniture.svg'
import HealthIcon from '@assets/icons/categories/health.svg'
import HomeAppliancesIcon from '@assets/icons/categories/homeAppliances.svg'
import HouseIcon from '@assets/icons/categories/house.svg'
import OthersIcon from '@assets/icons/categories/others.svg'
import PropertiesIcon from '@assets/icons/categories/properties.svg'
import SchoolAndStationeryIcon from '@assets/icons/categories/schoolAndStationery.svg'
import SportIcon from '@assets/icons/categories/sport.svg'
import TechAndCellPhoneIcon from '@assets/icons/categories/techAndCellPhone.svg'
import ToolsAndConstructionIcon from '@assets/icons/categories/toolsAndConstruction.svg'
import ToysIcon from '@assets/icons/categories/toys.svg'
import UsedIcon from '@assets/icons/categories/used.svg'

export const updateSaleTags = (category: SaleCategories, tag: string) => {
	saleCategories[category].tags = [...saleCategories[category].tags, tag]
}

const saleCategories = {
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
	drink: {
		label: 'bebida',
		value: 'drink',
		SvgIcon: DrinkIcon,
		tags: ['cerveja', 'vinho', 'drinks', 'gin', 'vodka', 'chopp', 'bar', 'refrigerante', 'agua', 'suco',
		]
	},

	used: {
		label: 'usados',
		value: 'used',
		SvgIcon: UsedIcon,
		tags: [
			'eletrodomésticos',
			'tecnologia e celular',
			'casa',
			'móveis',
			'imóveis',
			'automóveis e peças',
			'brinquedos',
			'livros',
			'escolar e papelaria',
			'esporte',
			'ferramentas e construção',
			'arte',
			'roupas e acessórios',
		]
	},

	homeAppliances: {
		label: 'eletrodomésticos',
		value: 'homeAppliances',
		SvgIcon: HomeAppliancesIcon,
		tags: [
			'microondas',
			'máquina de lavar',
			'geladeira',
			'freezer',
			'ar-condicionado',
			'forno',
			'aspirador',
			'filtro',
			'cafeteira'
		]
	},

	techAndCellPhone: {
		label: 'tecnologia',
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

	house: {
		label: 'casa',
		value: 'house',
		SvgIcon: HouseIcon,
		tags: [
			'utensilios',
			'decoracao',
			'moveis',
			'banheiro',
			'sala',
			'trabalho',
			'reforma'
		]
	},

	furniture: {
		label: 'móveis',
		value: 'furniture',
		SvgIcon: FurnitureIcon,
		tags: [
			'sofa',
			'cama',
			'rack',
			'armario',
			'estante',
			'cadeira',
			'criado mudo',
			'mesa',
			'estofados'
		]
	},

	properties: {
		label: 'imóveis',
		value: 'properties',
		SvgIcon: PropertiesIcon,
		tags: [
			'sala',
			'casa',
			'apartamento',
			'terreno',
			'imobiliaria',
			'corretor',
			'arquitetura',
			'engenharia civil',
			'financiamento',
			'condominio',
			'contrucao',
			'consorcio'
		]
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
	animals: {
		label: 'bichos',
		value: 'animals',
		SvgIcon: AnimalsIcon,
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

	books: {
		label: 'livros',
		value: 'books',
		SvgIcon: BooksIcon,
		tags: [
			'infantis',
			'crianças',
			'literatura',
			'nacional',
			'exterior',
			'oriental',
			'filosofia',
			'matemática',
			'psicologia',
			'usados',
			'economia',
			'biologia',
			'direito',
			'esporte',
			'ficção',
			'medicina',
			'autoajuda',
			'arte',
			'administração'
		]
	},

	schoolAndStationery: {
		label: 'escola e papelaria',
		value: 'schoolAndStationery',
		SvgIcon: SchoolAndStationeryIcon,
		tags: [
			'papelaria',
			'livros',
			'cadernos',
			'folhas',
			'borracha',
			'cola',
			'carimbo',
			'calculadora',
			'estojo',
			'lapis',
			'tesoura'
		]
	},

	sport: {
		label: 'esporte',
		value: 'sport',
		SvgIcon: SportIcon,
		tags: [
			'tenis',
			'raquete',
			'bolas',
			'masculino',
			'feminino',
			'infantil',
			'ciclismo',
			'skate',
			'caminhada e corrida',
			'fitness',
			'camping',
			'futebol',
			'tenis',
			'academia',
			'luta',
			'natacao',
			'aquatico',
			'radical',
			'yoga',
			'atletismo',
			'dança'
		]
	},

	toolsAndConstruction: {
		label: 'ferramentas e construção',
		value: 'toolsAndConstruction',
		SvgIcon: ToolsAndConstructionIcon,
		tags: [
			'automecanica',
			'contruçao',
			'civil',
			'aquecedores',
			'manuais',
			'jardinagem',
			'casa',
			'agricolas',
			'solda',
			'parafusadeira',
			'kit',
			'usadas'
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
	health: {
		label: 'saúde',
		value: 'health',
		SvgIcon: HealthIcon,
		tags: [
			'medico',
			'enfermagem',
			'psicologia',
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
	others: {
		label: 'outros',
		value: 'others',
		SvgIcon: OthersIcon,
		tags: []
	},
}

export { saleCategories }
