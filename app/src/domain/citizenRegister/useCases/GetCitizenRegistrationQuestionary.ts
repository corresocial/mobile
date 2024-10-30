import { UseCase } from '@domain/shared/interfaces/UseCase'

import { CitizenRegisterQuestionResponse } from '../model/entities/types'

type Input = void
type Output = CitizenRegisterQuestionResponse[]

export class GetCitizenRegistrationQuestionary implements UseCase<Input, Output> {
	exec(): Output { // TEST
		const citizenRegistrationQuestionary: CitizenRegisterQuestionResponse[] = [
			{
				questionId: '3',
				slug: 'age',
				question: 'Qual é a sua idade?',
				questionType: 'numerical',
				response: ''
			},
			{
				questionId: '4',
				slug: 'skinColor',
				question: 'Qual é a sua cor?',
				questionType: 'select',
				options: [
					'Preta',
					'Parda',
					'Branca',
					'Amarela',
					'Indígena',
					'Não Sei Responder'
				],
				response: ''
			},
			{
				questionId: '5',
				slug: 'gender',
				question: 'Indique seu sexo',
				questionType: 'select',
				options: [
					'Mulher',
					'Homem'
				],
				response: ''
			},
			{
				questionId: '6',
				slug: 'pcd',
				question: 'Você é PcD (Pessoa com Deficiência)?',
				questionType: 'binary',
				response: ''
			},
			{
				questionId: '7',
				slug: 'healthIssues',
				question: 'Tem algum problema de saúde?',
				questionType: 'textual',
				optional: true,
				response: ''
			},
			{
				questionId: '8',
				slug: 'maritalStatus',
				question: 'Qual é o seu Estado Civil?',
				questionType: 'select',
				options: [
					'Casada(o)',
					'União estável',
					'Solteira(o)',
					'Viúva(o)'
				],
				response: ''
			},
			{
				questionId: '9',
				slug: 'timeInNeighborhood',
				question: 'Há quanto tempo você mora no bairro atual?',
				questionType: 'select',
				options: [
					'Menos de 1 ano',
					'Entre 1 a 3 anos',
					'De 4 a 7 anos',
					'Entre 7 e 10 anos',
					'Mais de 10 anos'
				],
				response: ''
			},
			{
				questionId: '10',
				slug: 'incomeRange',
				question: 'Qual faixa de renda mensal sua família se enquadra?',
				questionType: 'select',
				options: [
					'Até R$ 600,00',
					'Entre R$ 600,00 e R$ 1.100',
					'Entre R$ 1.200 e R$ 1.400',
					'Entre R$ 1.400 e R$ 2.100',
					'Entre R$ 2.200 e R$ 3.000',
					'Acima de R$ 3.000'
				],
				response: ''
			},
			{
				questionId: '11',
				slug: 'employmentStatus',
				question: 'Em relação ao emprego, qual é a sua situação atual?',
				questionType: 'select',
				options: [
					'Empregado(a) com carteira assinada',
					'Empregado(a) sem carteira assinada',
					'Desempregado(a)',
					'Aposentado(a)'
				],
				response: ''
			},
			{
				questionId: '12',
				slug: 'jobSearchArea',
				question: 'Está procurando emprego? Em qual área?',
				questionType: 'textual',
				optional: true,
				response: ''
			},
			{
				questionId: '13',
				slug: 'workAvailability',
				question: 'Que turnos tem disponível para trabalhar? (marque todas que se aplicam)',
				questionType: 'select',
				multiSelect: true,
				options: [
					'Manhã',
					'Tarde',
					'Noite',
					'Finais de semana'
				],
				optional: true,
				response: ''
			},
			{
				questionId: '14',
				slug: 'currentJob',
				question: 'Se está trabalhando atualmente, com que você trabalha? (marque todas que se aplicam)',
				questionType: 'select',
				multiSelect: true,
				allowOtherOptions: true,
				optional: true,
				options: [
					'Mecânica',
					'Manutenção elétrica',
					'Construção civil',
					'Serviços gerais (limpeza, manutenção)',
					'Vendas (ambulante, lojas)',
					'Serviços domésticos',
					'Motorista (uber, táxi, entregas)',
					'Segurança (vigilante, porteiro)',
					'Artesanato',
					'Outros, especifique'
				],
				response: ''
			},
			{
				questionId: '15',
				slug: 'workExperience',
				question: 'Em qual área você possui experiência? (marque todas que se aplicam)',
				questionType: 'select',
				multiSelect: true,
				allowOtherOptions: true,
				options: [
					'Serviços Gerais (limpeza, manutenção)',
					'Vendas (comércio varejista)',
					'Agricultura (trabalho rural)',
					'Alimentação (restaurantes, lanchonetes)',
					'Construção Civil',
					'Trabalhos manuais (Costura, artesanato)',
					'Transporte (motorista, entregador)',
					'Outra'
				],
				response: ''
			},
			{
				questionId: '16',
				slug: 'educationLevel',
				question: 'Indique a sua escolaridade:',
				questionType: 'select',
				options: [
					'Sem escolaridade',
					'Ensino fundamental incompleto',
					'Ensino fundamental completo',
					'Ensino médio incompleto',
					'Ensino médio completo',
					'Ensino superior incompleto',
					'Ensino superior completo'
				],
				response: ''
			},
			{
				questionId: '17',
				slug: 'coursesTaken',
				question: 'Que cursos você fez ou faz? (técnico, online, graduação, etc.)',
				questionType: 'textual',
				optional: true,
				response: ''
			},
			{
				questionId: '18',
				slug: 'coursesInterest',
				question: 'Está procurando ou quer fazer cursos?',
				questionType: 'textual',
				optional: true,
				response: ''
			},
			{
				questionId: '19',
				slug: 'coursesAvailability',
				question: 'Qual a sua disponibilidade para fazer cursos? (marque todas que se aplicam)',
				questionType: 'select',
				optional: true,
				multiSelect: true,
				options: [
					'Manhã',
					'Tarde',
					'Noite',
					'Finais de semana'
				],
				response: ''
			},
			{
				questionId: '20',
				slug: 'hobbies',
				question: 'O que você gosta ou gostaria de fazer para se divertir?',
				questionType: 'textual',
				optional: true,
				response: ''
			},
			{
				questionId: '21',
				slug: 'housingSituation',
				question: 'Qual é a situação da sua moradia?',
				questionType: 'select',
				options: [
					'Imóvel próprio',
					'Imóvel financiado',
					'Imóvel alugado',
					'Imóvel alugado por programa de moradia social',
					'Imóvel cedido',
					'Imóvel irregular/ocupação'
				],
				response: ''
			},
			{
				questionId: '22',
				slug: 'hasChildren',
				question: 'Você possui filhos?',
				questionType: 'select',
				options: [
					'Não tenho filhos',
					'Um(a) filho(a)',
					'Dois filhos',
					'Três filhos',
					'Mais de três filhos'
				],
				response: ''
			},
			{
				questionId: '23',
				slug: 'childrenNeeds',
				question: 'Você tem enfrentado dificuldades para atender às necessidades dos seus filhos? (marque todas que se aplicam)',
				questionType: 'select',
				multiSelect: true,
				allowOtherOptions: true,
				optional: true,
				options: [
					'Falta de recursos financeiros',
					'Falta de acesso a serviços de saúde',
					'Falta de acesso à educação de qualidade',
					'Falta de atividades de lazer adequadas',
					'Demandas de Pessoa com Deficiência',
					'Outros (especificar)'
				],
				response: ''
			},
			{
				questionId: '24',
				slug: 'householdSize',
				question: 'Quantas pessoas moram com você?',
				questionType: 'select',
				allowOtherOptions: true,
				options: [
					'Moro sozinho(a)',
					'Com mais 1 pessoa',
					'Com mais 2 pessoas',
					'Com mais 3 pessoas',
					'Com mais 4 pessoas',
					'Com mais de 4 pessoas, especificar'
				],
				response: ''
			},
			{
				questionId: '25',
				slug: 'socialBenefits',
				question: 'Você recebe algum benefício social? (marque todas que se aplicam)',
				questionType: 'select',
				multiSelect: true,
				allowOtherOptions: true,
				optional: true,
				options: [
					'Bolsa-família',
					'Tarifa Social de Energia Elétrica',
					'Benefício de Prestação Continuada (BPC)',
					'Programa Nacional de Acesso ao Ensino Técnico e Emprego (Pronatec)',
					'Cartão Reforma',
					'Benefício Eventual Emergencial Monetário',
					'Benefício Eventual Não Monetário',
					'Auxílio Natalidade',
					'Auxílio Moradia Emergencial',
					'Programa Estadual de Transferência de Renda',
					'Programa Municipal de Transferência de Renda – Londrina Cidadã',
					'Outro (especificar)'
				],
				response: ''
			},
			{
				questionId: '26',
				slug: 'receivedSocialProgramInfo',
				question: 'Você já recebeu informações sobre programas sociais disponíveis na sua região? (Exemplo: viu divulgação em algum local, ouviu de alguém e/ou foi orientado por algum funcionário público)',
				questionType: 'binary',
				response: ''
			},
			{
				questionId: '27',
				slug: 'needDonations',
				question: 'Você está precisando de doações? (marque todas que se aplicam)',
				questionType: 'select',
				optional: true,
				multiSelect: true,
				allowOtherOptions: true,
				options: [
					'Alimentos',
					'Vestuário',
					'Móvel',
					'Materiais de construção',
					'Eletrodomésticos',
					'Outros, qual?'
				],
				response: ''
			},
			{
				questionId: '28',
				slug: 'lifeImprovementOpportunities',
				question: 'Quais das seguintes oportunidades você considera importante buscar para melhorar sua condição de vida? (marque todas que se aplicam)',
				questionType: 'select',
				multiSelect: true,
				allowOtherOptions: true,
				options: [
					'Acesso à saúde',
					'Moradia',
					'Geração de renda',
					'Direito à educação',
					'Direito das crianças',
					'Esporte, cultura e lazer',
					'Cidadania e paz',
					'Autonomia da mulher',
					'Outros (especificar)'
				],
				response: ''
			}
		] as CitizenRegisterQuestionResponse[]
		return citizenRegistrationQuestionary
	}
}
