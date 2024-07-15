import { UseCase } from '@domain/shared/interfaces/UseCase'

import { CitizenRegisterQuestionResponse } from '../model/entities/types'

type Input = void
type Output = CitizenRegisterQuestionResponse[]

export class GetCitizenRegistrationQuestionary implements UseCase<Input, Output> {
	exec(): Output { // TEST
		const citizenRegistrationQuestionary: CitizenRegisterQuestionResponse[] = [
			{
				questionId: '3',
				question: 'Qual é a sua idade?',
				response: '',
				questionType: 'numerical'
			},
			{
				questionId: '4',
				question: 'Qual é a sua cor?',
				response: '',
				questionType: 'select',
				options: [
					'Preta',
					'Parda',
					'Branca',
					'Amarela',
					'Indígena',
					'Não Sei Responder'
				]
			},
			{
				questionId: '5',
				question: 'Indique seu sexo',
				response: '',
				questionType: 'select',
				options: [
					'Mulher',
					'Homem'
				]
			},
			{
				questionId: '6',
				question: 'Você é PcD (Pessoa com Deficiência)?',
				response: '',
				questionType: 'binary'
			},
			{
				questionId: '7',
				question: 'Qual é o seu Estado civil?',
				response: '',
				questionType: 'select',
				options: [
					'Casada(o)',
					'União estável',
					'Solteira(o)',
					'Viúva(o)'
				]
			},
			{
				questionId: '8',
				question: 'Indique sua escolaridade:',
				response: '',
				questionType: 'select',
				options: [
					'Sem escolaridade',
					'Ensino fundamental incompleto',
					'Ensino fundamental completo',
					'Ensino médio incompleto',
					'Ensino médio completo',
					'Ensino superior incompleto',
					'Ensino superior completo'
				]
			},
			{
				questionId: '9',
				question: 'Você possui filhos?',
				response: '',
				questionType: 'select',
				options: [
					'Não tenho filhos',
					'Um(a) filho(a)',
					'Dois filhos',
					'Três filhos',
					'Mais de três filhos'
				]
			},
			{
				questionId: '10',
				question: 'Você tem enfrentado dificuldades para atender às necessidades dos seus filhos?',
				response: '',
				questionType: 'binary',
				optional: true,
			},
			{
				questionId: '11',
				question: 'Se sim, quais são as principais dificuldades que você enfrenta para atender às necessidades dos seus filhos? (Marque todas as opções que se aplicam)',
				response: '',
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
				]
			},
			{
				questionId: '12',
				question: 'Há quanto tempo você mora no bairro atual?',
				response: '',
				questionType: 'select',
				options: [
					'Menos de 1 ano',
					'Entre 1 a 3 anos',
					'De 4 a 7 anos',
					'Entre 7 e 10 anos',
					'Mais de 10 anos'
				]
			},
			{
				questionId: '13',
				question: 'Qual faixa de renda mensal sua família se enquadra?',
				response: '',
				questionType: 'select',
				options: [
					'Até R$ 600,00',
					'Entre R$ 600,00 e R$ 1.100',
					'Entre R$ 1.200 e R$ 1.400',
					'Entre R$ 1.400 e R$ 2.100',
					'Entre R$ 2.200 e R$ 3.000',
					'Acima de R$ 3.000'
				]
			},
			{
				questionId: '14',
				question: 'Em relação ao emprego, qual é a sua situação atual?',
				response: '',
				questionType: 'select',
				options: [
					'Empregado(a) com carteira assinada',
					'Empregado(a) sem carteira assinada',
					'Autônomo(a)',
					'Desempregado(a)',
					'Aposentado(a)'
				]
			},
			{
				questionId: '15',
				question: 'Se está trabalhando atualmente, com que você trabalha?',
				response: '',
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
				]
			},
			{
				questionId: '16',
				question: 'Em qual área você possui experiência? (Marque todas que se aplicam)',
				response: '',
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
				]
			},
			{
				questionId: '17',
				question: 'Qual é a situação da sua moradia?',
				response: '',
				questionType: 'select',
				options: [
					'Imóvel próprio',
					'Imóvel financiado',
					'Imóvel alugado',
					'Imóvel alugado por programa de moradia social',
					'Imóvel cedido',
					'Imóvel irregular/ocupação'
				]
			},
			{
				questionId: '18',
				question: 'Quantas pessoas moram com você?',
				response: '',
				questionType: 'select',
				allowOtherOptions: true,
				options: [
					'Moro sozinho(a)',
					'Com mais 1 pessoa',
					'Com mais 2 pessoas',
					'Com mais 3 pessoas',
					'Com mais 4 pessoas',
					'Com mais de 4 pessoas, especificar'
				]
			},
			{
				questionId: '19',
				question: 'Atualmente você está estudando ou fazendo algum curso?',
				response: '',
				questionType: 'binary'
			},
			{
				questionId: '20',
				question: 'Se sim, qual?',
				response: '',
				optional: true,
				questionType: 'textual'
			},
			{
				questionId: '21',
				question: 'Em qual área você gostaria de trabalhar?',
				response: '',
				questionType: 'select',
				allowOtherOptions: true,
				options: [
					'Tecnologia da Informação',
					'Saúde',
					'Educação',
					'Engenharia',
					'Administração',
					'Vendas e Marketing',
					'Serviços Sociais',
					'Artes e Design',
					'Agricultura e Meio Ambiente',
					'Turismo e Hotelaria',
					'Indústria e Manufatura',
					'Direito e Advocacia',
					'Finanças e Contabilidade',
					'Recursos Humanos',
					'Comunicação e Mídia',
					'Outros (especificar)'
				]
			},
			{
				questionId: '22',
				question: 'Você ou alguém da sua família já participou de programas de capacitação profissional ou de acesso ao mercado de trabalho nos últimos 2 anos?',
				response: '',
				questionType: 'binary'
			},
			{
				questionId: '23',
				question: 'Se sim, qual foi o principal aprendizado que teve com a participação nesses programas? (Marque todas as que se aplicam)',
				response: '',
				questionType: 'select',
				allowOtherOptions: true,
				optional: true,
				multiSelect: true,
				options: [
					'Adquiriu novas habilidades ou conhecimentos',
					'Melhorou suas chances de conseguir emprego',
					'Conseguiu um emprego ou trabalho remunerado',
					'Outros (especificar)'
				]
			},
			{
				questionId: '24',
				question: 'Quais das seguintes oportunidades você considera importante buscar para melhorar sua condição de vida? (Marque todas as opções que se aplicam)',
				response: '',
				questionType: 'select',
				multiSelect: true,
				allowOtherOptions: true,
				options: [
					'Trabalho com carteira assinada',
					'Curso profissionalizante',
					'Concluir os estudos básicos (ensino fundamental e médio)',
					'Acesso a programas de capacitação e qualificação profissional',
					'Acesso a programas de apoio ao empreendedorismo',
					'Acesso a programas de moradia popular',
					'Outros (especificar)'
				]
			},
			{
				questionId: '25',
				question: 'Você tem interesse em fazer cursos profissionalizantes?',
				response: '',
				questionType: 'binary'
			},
			{
				questionId: '26',
				question: 'Se sim, qual seria a sua disponibilidade para fazer cursos ou trabalhar? (Marque todas que se aplicam)',
				response: '',
				questionType: 'select',
				optional: true,
				multiSelect: true,
				options: [
					'Manhã',
					'Tarde',
					'Noite',
					'Finais de semana'
				]
			},
			{
				questionId: '27',
				question: 'Possui Cadastro Único?',
				response: '',
				questionType: 'binary'
			},
			{
				questionId: '28',
				question: 'Atualmente você e/ou as pessoas da sua casa recebem algum benefício social do Governo Federal, Estadual e/ou da prefeitura?',
				response: '',
				questionType: 'binary'
			},
			{
				questionId: '29',
				question: 'Se sim, qual/Quais?',
				response: '',
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
				]
			},
			{
				questionId: '30',
				question: 'Você já recebeu informações sobre programas sociais disponíveis na sua região? (Exemplo: viu divulgação em algum local, ouviu de alguém e/ou foi orientado por algum funcionário público)',
				response: '',
				questionType: 'binary'
			},
			{
				questionId: '31',
				question: 'Você já foi atrás de informações sobre benefícios sociais, seja para você ou para alguém do seu convívio?',
				response: '',
				questionType: 'binary'
			},
			{
				questionId: '32',
				question: 'Recebeu doações nos últimos 4 meses?',
				response: '',
				questionType: 'binary'
			},
			{
				questionId: '33',
				question: 'Se sim, qual tipo de doação? (marque todas que se aplicam)',
				response: '',
				questionType: 'select',
				multiSelect: true,
				optional: true,
				allowOtherOptions: true,
				options: [
					'Alimentos',
					'Vestuário',
					'Móvel',
					'Outros; Qual?'
				]
			},
			{
				questionId: '34',
				question: 'Qual é o seu principal meio de transporte para se locomover na cidade?',
				response: '',
				questionType: 'select',
				allowOtherOptions: true,
				multiSelect: false,
				options: [
					'Carro',
					'Moto',
					'Transporte público (ônibus)',
					'Bicicleta',
					'A pé',
					'Outros (especificar)'
				]
			},
			{
				questionId: '35',
				question: 'Qual é a sua principal dificuldade ao se locomover pela cidade?',
				response: '',
				questionType: 'select',
				allowOtherOptions: true,
				multiSelect: false,
				options: [
					'Comprometimento da renda',
					'Falta de infraestrutura para pedestres e ciclistas',
					'Falta de linhas no transporte público (trajeto ou horários)',
					'Falta de segurança',
					'Outros (especificar)'
				]
			},
			{
				questionId: '36',
				question: 'Qual destes tipos de eventos culturais você mais gosta de participar? (Marque todas que se aplicam)',
				response: '',
				questionType: 'select',
				multiSelect: true,
				allowOtherOptions: true,
				options: [
					'Shows de música ao vivo',
					'Peças de teatro',
					'Artes visuais (pintura, grafite, etc)',
					'Festivais de cinema',
					'Dança (bailes, espetáculos de dança, etc.)',
					'Feiras de literatura',
					'Eventos gastronômicos',
					'Festas tradicionais/culturais',
					'Palestras e workshops culturais',
					'Eventos de Hip Hop (batalhas, shows, etc)',
					'Feiras de artesanato',
					'Atividades religiosas',
					'Outros (especificar)'
				]
			}
		].slice(10, 11) as CitizenRegisterQuestionResponse[]
		return citizenRegistrationQuestionary
	}
}
