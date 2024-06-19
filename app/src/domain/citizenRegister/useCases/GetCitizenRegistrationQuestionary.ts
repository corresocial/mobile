import { UseCase } from '@domain/shared/interfaces/UseCase'

import { CitizenRegisterQuestionResponse } from '../model/entities/types'

type Input = void
type Output = CitizenRegisterQuestionResponse[]

export class GetCitizenRegistrationQuestionary implements UseCase<Input, Output> {
	exec(): Output { // CURRENT Teste
		const citizenRegistrationQuestionary: CitizenRegisterQuestionResponse[] = [
			{
				questionId: '1',
				question: 'Qual a sua idade?',
				questionType: 'numerical',
				response: ''
			},
			{
				questionId: '2',
				question: 'Qual a sua cor/etnia?:',
				questionType: 'select',
				multiSelect: false,
				options: ['Preta', 'Parda', 'Branca', 'Amarelo', 'Indígena', 'Não sei responder'],
				response: []
			},
			{
				questionId: '3',
				question: 'Indique seu sexo/gênero:',
				questionType: 'select',
				multiSelect: false,
				options: ['Mulher', 'Homem', 'Nenhuma das alternativas', 'Não sei responder'],
				response: []
			},
			{
				questionId: '4',
				question: 'Você possui filhos?',
				questionType: 'select',
				multiSelect: false,
				options: ['Não tenho filhos', 'Um(a) filho(a)', 'Dois filhos', 'Três filhos', 'Mais de três filhos'],
				response: []
			},
			{
				questionId: '5',
				question: 'Você tem enfrentado dificuldades para atender às necessidades dos seus filhos?',
				questionType: 'binary',
				response: ''
			},
			{
				questionId: '6',
				question: 'Se sim, quais são as principais dificuldades que você enfrenta para atender às necessidades dos seus filhos? (Marque todas as opções que se aplicam)',
				questionType: 'select',
				multiSelect: true,
				options: [
					'Falta de recursos financeiros',
					'Falta de acesso a serviços de saúde',
					'Falta de acesso à educação de qualidade',
					'Falta de atividades de lazer adequadas',
					'Outros (especificar)'
				],
				response: []
			},
			{
				questionId: '7',
				question: 'Há quanto tempo mora no bairro atual?',
				questionType: 'select',
				multiSelect: false,
				options: [
					'menos de 1 ano',
					'entre 1 a 3 anos',
					'de 4 a 7 anos',
					'entre 7 e 10 anos',
					'mais de 10 anos'
				],
				response: []
			},
			{
				questionId: '8',
				question: 'Qual o seu estado civil?',
				questionType: 'select',
				multiSelect: false,
				options: ['Casada(o)', 'União estável', 'Solteira(o)', 'Viúva(o)'],
				response: []
			},
			{
				questionId: '9',
				question: 'Indique a sua Escolaridade:',
				questionType: 'select',
				multiSelect: false,
				options: [
					'Ensino fundamental incompleto',
					'Ensino fundamental completo',
					'Ensino médio incompleto',
					'Ensino médio completo',
					'Ensino superior incompleto',
					'Ensino superior completo'
				],
				response: []
			},
			{
				questionId: '10',
				question: 'Atualmente você está estudando ou fazendo algum curso?',
				questionType: 'binary',
				response: ''
			},
			{
				questionId: '11',
				question: 'Se sim, qual?',
				questionType: 'textual',
				response: ''
			},
			{
				questionId: '12',
				question: 'Em relação ao emprego, qual a sua situação atual?',
				questionType: 'select',
				multiSelect: false,
				options: [
					'Empregado(a) com carteira assinada',
					'Empregado(a) sem carteira assinada',
					'Autônomo(a)',
					'Desempregado(a)',
					'Aposentado(a)'
				],
				response: []
			},
			{
				questionId: '13',
				question: 'Se está trabalhando atualmente, com que você trabalha?',
				questionType: 'textual',
				response: ''
			},
			{
				questionId: '14',
				question: 'Em qual área você possui experiência? (marque todas que se aplicam)',
				questionType: 'select',
				multiSelect: true,
				options: [
					'Serviços Gerais (limpeza, manutenção)',
					'Vendas (comércio varejista)',
					'Serviços Domésticos (diarista, cuidador de idosos)',
					'Agricultura (trabalho rural)',
					'Alimentação (restaurantes, lanchonetes)',
					'Construção Civil',
					'Trabalhos manuais (Costura, artesanato)',
					'Transporte (motorista, entregador)',
					'Outra: _______'
				],
				response: []
			},
			{
				questionId: '15',
				question: 'Em qual faixa de renda mensal sua família se enquadra?',
				questionType: 'select',
				multiSelect: false,
				options: [
					'Até R$ 600,00',
					'Entre R$ 600,00 e R$ 1.100',
					'Entre R$1.200 e R$ 1.400',
					'Entre R$ 1.400 e R$ 2.100',
					'Entre R$ 2.200 e R$ 3.000',
					'Acima de R$ 3.000'
				],
				response: []
			},
			{
				questionId: '16',
				question: 'Qual a situação da sua moradia?',
				questionType: 'select',
				multiSelect: false,
				options: [
					'Imóvel próprio',
					'Imóvel Financiado',
					'Imóvel Alugado',
					'Imóvel alugado por programa de moradia social',
					'Imóvel Cedido',
					'Imóvel Irregular/Ocupação'
				],
				response: []
			},
			{
				questionId: '17',
				question: 'Quantas pessoas moram com você?',
				questionType: 'select',
				multiSelect: false,
				options: [
					'Moro sozinho(a)',
					'Com mais 1 pessoa',
					'Com mais 2 pessoas',
					'Com mais 3 pessoas',
					'Com mais 4 pessoas',
					'Com mais de 4 pessoas, especificar _______'
				],
				response: []
			},
			{
				questionId: '18',
				question: 'Possui acesso à internet em casa?',
				questionType: 'binary',
				response: ''
			},
			{
				questionId: '19',
				question: 'Quais são os principais motivos para você acessar a internet? (Marque todas as opções que se aplicam)',
				questionType: 'select',
				multiSelect: true,
				options: [
					'Busca por informações',
					'Redes sociais',
					'Entretenimento (vídeos, músicas)',
					'Comunicação (e-mail, mensagens)',
					'Educação (cursos online, pesquisa escolar)',
					'Compras online',
					'Trabalho ou atividade profissional',
					'Outros (especificar)___________'
				],
				response: []
			},
			{
				questionId: '20',
				question: 'Quais aplicativos você costuma utilizar mais? (marque todos que se aplicam)',
				questionType: 'select',
				multiSelect: true,
				options: [
					'Tiktok',
					'Youtube',
					'WhatsApp',
					'Ifood',
					'Facebook',
					'Instagram',
					'Aplicativos de transporte (Uber, 99)',
					'Jogos',
					'Outros, especificar'
				],
				response: []
			},
			{
				questionId: '21',
				question: 'Atualmente você e/ou as pessoas da sua casa recebem algum benefício social do Governo?',
				questionType: 'binary',
				response: ''
			},
			{
				questionId: '22',
				question: 'Se sim, Qual/Quais?',
				questionType: 'textual',
				response: ''
			},
			{
				questionId: '23',
				question: 'Você já recebeu informações sobre programas sociais disponíveis na sua região? (Exemplo: viu divulgação em algum local, ouviu de alguém e/ou foi orientado por algum funcionário público)',
				questionType: 'binary',
				response: ''
			},
			{
				questionId: '24',
				question: 'Você já foi atrás de informações sobre benefícios sociais, seja para você ou para alguém do seu convívio?',
				questionType: 'binary',
				response: ''
			},
			{
				questionId: '25',
				question: 'Possui Cadastro Único(CadÚnico)?',
				questionType: 'binary',
				response: ''
			},
			{
				questionId: '26',
				question: 'Já ocorreu de perder o prazo para acesso a algum benefício?',
				questionType: 'binary',
				response: ''
			},
			{
				questionId: '27',
				question: 'Recebeu doações nos últimos 4 meses?',
				questionType: 'binary',
				response: ''
			},
			{
				questionId: '28',
				question: 'Se sim, qual tipo de doação? (marque todas que se aplicam)',
				questionType: 'select',
				multiSelect: true,
				options: [
					'Alimentos',
					'Vestuário',
					'Móvel',
					'Outros; Qual?_______________'
				],
				response: []
			},
			{
				questionId: '29',
				question: 'Qual é o seu principal meio de transporte para se locomover na cidade?',
				questionType: 'select',
				multiSelect: false,
				options: [
					'Carro',
					'Transporte público (ônibus)',
					'Bicicleta',
					'A pé',
					'Outros (especificar)'
				],
				response: []
			},
			{
				questionId: '30',
				question: 'Com que frequência você utiliza o transporte público?',
				questionType: 'select',
				multiSelect: false,
				options: [
					'Todos os dias',
					'Algumas vezes por semana',
					'Raramente',
					'Nunca'
				],
				response: []
			},
			{
				questionId: '31',
				question: 'Qual é a sua principal dificuldade ao se locomover pela cidade?',
				questionType: 'select',
				multiSelect: false,
				options: [
					'Comprometimento da renda',
					'Falta de infraestrutura para pedestres e ciclistas',
					'Falta de pontualidade e qualidade no transporte público',
					'Falta de segurança',
					'Outros (especificar)'
				],
				response: []
			},
			{
				questionId: '32',
				question: 'Você já deixou de realizar alguma atividade por dificuldades de locomoção na cidade? (Exemplo: falta de dinheiro para passagem)',
				questionType: 'binary',
				response: ''
			},
			{
				questionId: '33',
				question: 'Você ou alguém da sua família já participou de programas de capacitação profissional ou de acesso ao mercado de trabalho nos últimos 2 anos?',
				questionType: 'binary',
				response: ''
			},
			{
				questionId: '34',
				question: 'Se sim, qual foi o principal aprendizado que teve com a participação nesses programas? (Marque todas as que se aplicam)',
				questionType: 'select',
				multiSelect: true,
				options: [
					'Adquiriu novas habilidades ou conhecimentos',
					'Melhorou suas chances de conseguir emprego',
					'Conseguiu um emprego ou trabalho remunerado',
					'Outros; (especificar)'
				],
				response: []
			},
			{
				questionId: '35',
				question: 'Em qual área você gostaria de trabalhar? (Escolha apenas uma opção)',
				questionType: 'select',
				multiSelect: false,
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
					'Rec Recursos Humanos',
					'Comunicação e Mídia',
					'Outros (especificar)'
				],
				response: []
			},
			{
				questionId: '36',
				question: 'Quais das seguintes oportunidades você considera importante buscar para melhorar sua condição de vida? (Marque todas as opções que se aplicam)',
				questionType: 'select',
				multiSelect: true,
				options: [
					'Trabalho com carteira assinada',
					'Curso profissionalizante',
					'Concluir os estudos básicos (ensino fundamental e médio)',
					'Acesso a programas de capacitação e qualificação profissional',
					'Acesso a programas de apoio ao empreendedorismo',
					'Acesso a programas de moradia popular',
					'Outros (especificar)'
				],
				response: []
			},
			{
				questionId: '37',
				question: 'Caso tenha acesso a alguma dessas oportunidades, você tem condições de se locomover até o local ? (Por exemplo, até uma entrevista ou curso)',
				questionType: 'binary',
				response: ''
			},
			{
				questionId: '38',
				question: 'Você tem interesse em fazer cursos profissionalizantes?',
				questionType: 'binary',
				response: ''
			},
			{
				questionId: '39',
				question: 'Se sim, qual seria a sua disponibilidade para fazer os cursos?',
				questionType: 'select',
				multiSelect: false,
				options: ['Manhã', 'Tarde', 'Noite', 'Finais de semana'],
				response: []
			},
			{
				questionId: '40',
				question: 'Quais as principais necessidades do seu núcleo familiar ou pessoas com quem mora?',
				questionType: 'select',
				multiSelect: true,
				options: ['Emprego/renda', 'Educação', 'Saúde', 'Segurança', 'Cultura e Lazer'],
				response: []
			},
			{
				questionId: '41',
				question: 'Quais das seguintes atividades você costuma realizar regularmente em sua comunidade? (Marque todas as opções que se aplicam)',
				questionType: 'select',
				multiSelect: true,
				options: [
					'Futebol',
					'Dança',
					'Lutas como Boxe, Muay Thai, Capoeira e etc.',
					'Batalha de rima',
					'Grafite',
					'Leitura',
					'Caminhadas',
					'Assistir filmes ou séries',
					'Jogos online',
					'Jogos de tabuleiro',
					'Participo de coral e/ou banda',
					'Artesanato, costura, pintura, etc.',
					'Outros (especificar)____________'
				],
				response: []
			},
			{
				questionId: '42',
				question: 'Como você descreveria a qualidade de vida na sua comunidade?',
				questionType: 'satisfaction',
				response: ''
			},
			{
				questionId: '43',
				question: 'Como você avalia a sua Alimentação?',
				questionType: 'satisfaction',
				response: ''
			},
			{
				questionId: '44',
				question: 'Como avalia as condições da sua Moradia?',
				questionType: 'satisfaction',
				response: ''
			},
			{
				questionId: '45',
				question: 'Como avalia a situação de Emprego/renda?',
				questionType: 'satisfaction',
				response: ''
			},
			{
				questionId: '46',
				question: 'Em relação ao acesso a Educação?',
				questionType: 'satisfaction',
				response: ''
			},
			{
				questionId: '47',
				question: 'Como avalia o acesso a Saúde?',
				questionType: 'satisfaction',
				response: ''
			},
			{
				questionId: '48',
				question: 'Como sente que esta a Segurança?',
				questionType: 'satisfaction',
				response: ''
			},
			{
				questionId: '49',
				question: 'Como avalia o seu acesso a atividades culturais e de lazer?',
				questionType: 'satisfaction',
				response: ''
			},
			{
				questionId: '50',
				question: 'Como está a situação do Saneamento?',
				questionType: 'satisfaction',
				response: ''
			},
			{
				questionId: '51',
				question: 'Caso queira citar alguma outra questão (especificar):',
				questionType: 'textual',
				response: ''
			}
		].splice(0, 3) as CitizenRegisterQuestionResponse[]
		// CURRENT remover .splice em diante na linha
		return citizenRegistrationQuestionary
	}
}
