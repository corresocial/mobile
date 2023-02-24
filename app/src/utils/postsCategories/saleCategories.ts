import { SaleCategories } from '../../services/firebase/types'

export const updateSaleTags = (category: SaleCategories, tag: string) => {
	saleCategories[category].tags = [...saleCategories[category].tags, tag]
}

const saleCategories = {
	used: {
		label: 'usados',
		value: 'used',
		iconUri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/3fe36b6b-011e-4ba4-83ed-1f1c8d35df8e/Usados.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T193403Z&X-Amz-Expires=86400&X-Amz-Signature=42ed2d16b728469d0be97b414f8ed673280aca9c54fb8929c74fe652a5f078bc&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Usados.svg%22&x-id=GetObject',
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
		iconUri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/2f220c94-99c2-4f42-9319-c3368eecc4a0/Eletrodomsticos.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T171649Z&X-Amz-Expires=86400&X-Amz-Signature=e2b3a7b25dad0986510160207676dcabbd11657bb8089b7bbf6b9323ec97b828&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Eletrodom%25C3%25A9sticos.svg%22&x-id=GetObject',
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

	technologyAndCellPhone: {
		label: 'tecnologia e celular',
		value: 'technologyAndCellPhone',
		iconUri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/faa37f1a-ca82-4619-8b63-88a000586257/Tecnologia.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T194354Z&X-Amz-Expires=86400&X-Amz-Signature=71dfe456bab91ac84f462f401bbf1136fa40bd57da97a7beea52b7eeafa19652&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Tecnologia.svg%22&x-id=GetObject',
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
		iconUri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/25007d30-ce22-47a6-aeb9-2b2c10333ef2/Casa_1.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T165324Z&X-Amz-Expires=86400&X-Amz-Signature=630136784a0d4e46b01d14e1d0878355ddbaecde8c8daf5131eb4309a814a841&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Casa%25201.svg%22&x-id=GetObject',
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
		iconUri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/020c5e2c-c928-4c89-a3f7-67536f6004db/Moveis.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T211107Z&X-Amz-Expires=86400&X-Amz-Signature=5abb80bb0087560afd94917c2c2d7155fea44a1520f9915dd1a6c7acafd02bb1&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Moveis.svg%22&x-id=GetObject',
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
		iconUri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/9db15fe5-a8f2-45df-abb5-c9d85858c659/Imveis.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T204319Z&X-Amz-Expires=86400&X-Amz-Signature=c19421c7fae5e11be32fd6e904a1fc6d6c8e3b6e1f60b6c1cc5cf79bdafaa85f&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Im%25C3%25B3veis.svg%22&x-id=GetObject',
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
		iconUri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/f07d5858-ae80-4f97-9cd2-428ae4360c32/Automveis.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T204250Z&X-Amz-Expires=86400&X-Amz-Signature=f429eedab6b8e6489785ef270675094dea03167c2be14740644d8936258bac64&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Autom%25C3%25B3veis.svg%22&x-id=GetObject',
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
		iconUri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/fc70ed09-b045-4dc4-83cf-aaa2c591590e/Icone_Brinquedos_Corre.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T204307Z&X-Amz-Expires=86400&X-Amz-Signature=c7b3fe5d98cf87d8ce81cb3eb9de4b982df719926df48c1050c83b2d84d27a00&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Icone%2520Brinquedos%2520Corre.svg%22&x-id=GetObject',
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
		iconUri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/f63f2df6-5610-40bb-8747-773d497a77ce/Livros.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T204354Z&X-Amz-Expires=86400&X-Amz-Signature=ed2273938f6174c432ab681ed15baf49b950965334a38f6c32ef2283b3064118&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Livros.svg%22&x-id=GetObject',
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
		iconUri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/76c649ff-d725-4778-ba5c-1dd5991a98ef/Materiais_escolares.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T171655Z&X-Amz-Expires=86400&X-Amz-Signature=85175f4a5de7e9c4312441e21fd19ae36b69b99427ff9fd68506d3623d49bd74&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Materiais%2520escolares.svg%22&x-id=GetObject',
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
		iconUri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/94d99b18-0a7f-4224-ab53-79512a9c2bb1/Esporte.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T203605Z&X-Amz-Expires=86400&X-Amz-Signature=410a9f2b104801ec23f2285b7f07c38834097db72d454bd7be35985712bc9c0e&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Esporte.svg%22&x-id=GetObject',
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
		iconUri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/1004ae4b-d7d2-4760-8b1a-310973451b9e/Ferramentas_e_Construo.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T171923Z&X-Amz-Expires=86400&X-Amz-Signature=e48924d5dc9bd5f870da915cbfcbc21f09649dbe8596b2e552edad54b75ce7bf&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Ferramentas%2520e%2520Constru%25C3%25A7%25C3%25A3o.svg%22&x-id=GetObject',
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
		iconUri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/1711c0f8-bde1-4725-ba89-d42e2c2fe701/Arte.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T164512Z&X-Amz-Expires=86400&X-Amz-Signature=399a9fa5cf1e08a3dbbd20635483f7ba0f1d68a570d43a64c46dc6dada08d17c&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Arte.svg%22&x-id=GetObject',
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
		iconUri: 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/a95d75f6-7fa1-4a7d-ac40-c78f0c3afcd0/Roupas_e_Acessrios.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230224%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T201145Z&X-Amz-Expires=86400&X-Amz-Signature=3cc50085480831a2d6b7de77f3b26a4184b85b861d6706d51a54066437d93f8d&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Roupas%2520e%2520Acess%25C3%25B3rios.svg%22&x-id=GetObject',
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
