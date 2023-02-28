import { VacancyCategories } from '../../services/firebase/types'

export const updateVacancyTags = (category: VacancyCategories, tag: string) => {
	vacancyCategories[category].tags = [...vacancyCategories[category].tags, tag]
}

const vacancyCategories = {
	management: {
		label: 'administração',
		value: 'management',
		iconUri: '',
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
		iconUri: '',
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
		iconUri: '',
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
		iconUri: '',
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
		label: 'estudante e estágio',
		value: 'studentAndInternship',
		iconUri: '',
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
		iconUri: '',
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
		iconUri: '',
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
		iconUri: '',
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
		iconUri: '',
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
		iconUri: '',
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
		iconUri: '',
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
		iconUri: '',
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
		iconUri: '',
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
		iconUri: '',
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
		iconUri: '',
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
		iconUri: '',
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
		iconUri: '',
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
		iconUri: '',
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
		iconUri: '',
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
