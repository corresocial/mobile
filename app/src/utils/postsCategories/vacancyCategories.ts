import { VacancyCategories } from '../../services/firebase/types'

export const updateVacancyTags = (category: VacancyCategories, tag: string) => {
	vacancyCategories[category].tags = [...vacancyCategories[category].tags, tag]
}

const vacancyCategories = {
	management: {
		label: 'administração',
		value: 'management',
		slug: 'management',
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
		slug: 'food',
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
		slug: 'beaks',
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
		slug: 'clt',
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
		slug: 'studentAndInternship',
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
		slug: 'mei',
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
		slug: 'partTime',
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
		slug: 'health',
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
		slug: 'beauty',
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
		slug: 'culture',
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
		slug: 'education',
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
		slug: 'government',
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
		slug: 'audiovisual',
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
		label: 'imobiliária',
		value: 'realEstate',
		slug: 'realEstate',
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

	marketing: {
		label: 'marketing',
		value: 'marketing',
		slug: 'marketing',
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
		slug: 'tech',
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
		slug: 'security',
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
		slug: 'transport',
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
		slug: 'commercial',
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

export { vacancyCategories }
