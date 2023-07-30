import { VacancyCategories } from '../../services/firebase/types'

import ManagementIcon from '../../assets/icons/categories/management.svg'
import FoodIcon from '../../assets/icons/categories/food.svg'
import BeaksIcon from '../../assets/icons/categories/beaks.svg'
import CltIcon from '../../assets/icons/categories/clt.svg'
import StudentAndInternshipIcon from '../../assets/icons/categories/studentAndInternship.svg'
import MeiIcon from '../../assets/icons/categories/mei.svg'
import PartTimeIcon from '../../assets/icons/categories/partTime.svg'
import HealthIcon from '../../assets/icons/categories/health.svg'
import BeautyWellBeingIcon from '../../assets/icons/categories/beautyWellBeing.svg'
import EducationIcon from '../../assets/icons/categories/education.svg'
import AudiovisualIcon from '../../assets/icons/categories/audiovisual.svg'
import CultureIcon from '../../assets/icons/categories/culture.svg'
import GovernmentIcon from '../../assets/icons/categories/government.svg'
import RealEstateIcon from '../../assets/icons/categories/realEstate.svg'
import MarketingIcon from '../../assets/icons/categories/marketing.svg'
import SecurityIcon from '../../assets/icons/categories/security.svg'
import CommercialIcon from '../../assets/icons/categories/commercial.svg'
import LegalIcon from '../../assets/icons/categories/legal.svg'
import TechIcon from '../../assets/icons/categories/tech.svg'
import TransportIcon from '../../assets/icons/categories/transport.svg'
import DiversityIcon from '../../assets/icons/categories/diversity.svg'
import OthersIcon from '../../assets/icons/categories/others.svg'

export const updateVacancyTags = (category: VacancyCategories, tag: string) => {
	vacancyCategories[category].tags = [...vacancyCategories[category].tags, tag]
}

const vacancyCategories = {
	management: {
		label: 'administração',
		value: 'management',
		SvgIcon: ManagementIcon,
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
		SvgIcon: FoodIcon,
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
		SvgIcon: BeaksIcon,
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
		SvgIcon: CltIcon,
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
		SvgIcon: StudentAndInternshipIcon,
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
		SvgIcon: MeiIcon,
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
		SvgIcon: PartTimeIcon,
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
		SvgIcon: HealthIcon,
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
		SvgIcon: BeautyWellBeingIcon,
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
		SvgIcon: CultureIcon,
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
		SvgIcon: EducationIcon,
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
		SvgIcon: GovernmentIcon,
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
		SvgIcon: AudiovisualIcon,
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
		SvgIcon: RealEstateIcon,
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

	marketing: {
		label: 'marketing',
		value: 'marketing',
		SvgIcon: MarketingIcon,
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
		SvgIcon: TechIcon,
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
		SvgIcon: SecurityIcon,
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
		SvgIcon: TransportIcon,
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
		SvgIcon: CommercialIcon,
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

export { vacancyCategories }
