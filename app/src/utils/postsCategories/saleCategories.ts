import { SaleCategories } from '../../services/firebase/types'

export const updateSaleTags = (category: SaleCategories, tag: string) => {
	saleCategories[category].tags = [...saleCategories[category].tags, tag]
}

const saleCategories = {
	used: {
		label: 'usados',
		value: 'used',
		slug: 'used',
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
		slug: 'homeAppliances',
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

	technology: {
		label: 'tecnologia',
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

	house: {
		label: 'casa',
		value: 'house',
		slug: 'house',
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
		slug: 'furniture',
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
		slug: 'properties',
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
		slug: 'autoAndParts',
		tags: [
			'carro',
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

	toys: {
		label: 'brinquedos',
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

	books: {
		label: 'livros',
		value: 'books',
		slug: 'books',
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
		slug: 'schoolAndStationery',
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
		slug: 'sport',
		tags: [
			'tenis',
			'raquete',
			'bolas',
			'masculino',
			'feminino',
			'infantil',
			'ciclismo',
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
		slug: 'toolsAndConstruction',
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
		slug: 'art',
		tags: [
			'acessorios',
			'tinta',
			'ferramentas',
			'madeira',
			'pinceis',
			'quadro',
			'decoraçao',
			'derua',
			'popart',
			'musica',
			'instrumentos',
			'pintura',
			'caligrafia',
			'papeis',
			'gravuras',
			'modelagem',
			'desenho',
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

	others: {
		label: 'outros',
		value: 'others',
		slug: 'others',
		tags: [

		]
	},
}

export { saleCategories }
