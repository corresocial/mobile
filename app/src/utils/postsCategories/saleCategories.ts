import { SaleCategories } from '../../services/firebase/types'

export const updateSaleTags = (category: SaleCategories, tag: string) => {
	saleCategories[category].tags = [...saleCategories[category].tags, tag]
}

const saleCategories = {
	used: {
		label: 'usados',
		value: 'used',
		iconUri: '',
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
		iconUri: '',
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
		value: 'technologyAndCellPhone',
		iconUri: '',
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
		iconUri: '',
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
		iconUri: '',
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
		iconUri: '',
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
		iconUri: '',
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
		iconUri: '',
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
		iconUri: '',
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
		iconUri: '',
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
		iconUri: '',
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
		iconUri: '',
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
		iconUri: '',
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
		iconUri: '',
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
		tags: []
	},
}

export { saleCategories }
