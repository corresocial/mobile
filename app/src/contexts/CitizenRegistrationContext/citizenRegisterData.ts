import { CitizenRegisterEntity, CitizenRegisterQuestionResponse } from '@domain/citizenRegister/model/entities/types'

export const citizenRegisterData: CitizenRegisterEntity = {
	citizenRegisterId: '10',
	createdAt: new Date(),
	questions: [
		{
			questionId: '8',
			question: 'Mulitsleect?',
			questionType: 'select',
			multiSelect: true,
			options: ['AAA', 'BBB', 'CCC', 'DDD']
		},
		{
			questionId: '1',
			question: 'Qual a sua idade?',
			questionType: 'textual',
			options: []
		},
		{
			questionId: '2',
			question: 'Cor/Raça/etnia:',
			questionType: 'select',
			multiSelect: false,
			options: ['Preta', 'Parda', 'Branca', 'Amarela', 'Indígena', 'Não Sei']
		},
		{
			questionId: '3',
			question: 'Sexo:',
			questionType: 'select',
			multiSelect: false,
			options: ['Mulher', 'Homem']
		},
		{
			questionId: '4',
			question: 'Você possui filhos?',
			questionType: 'select',
			multiSelect: false,
			options: ['Não tenho filhos', 'Um(a) filho(a)', 'Dois filhos', 'Três filhos', 'Mais de três filhos']
		}
	],
}

export const mockCitizenRegisterResponses: CitizenRegisterQuestionResponse[] = [
	{
		questionId: '1',
		response: 'response da questionId 1',
		question: 'Quem veio primeiro, o ovo ou a galinha?',
		questionType: 'binary'
	},
	{
		questionId: '2',
		response: 'response da questionId 1',
		question: 'Escolha um número de 0 a 100?',
		questionType: 'satisfaction'
	},
	{
		questionId: '3',
		response: 'response da questionId 1',
		question: 'O que você achou da morte do homem de ferro?',
		questionType: 'numerical'
	},
	{
		questionId: '5',
		response: 'response da questionId 1',
		question: 'SELECT, você quer SELECT?',
		questionType: 'select',
		options: ['AAA', 'BBB', 'CCC', 'DDD']
	},
	{
		questionId: '8',
		response: 'response da questionId 1',
		question: 'Mulitsleect?',
		questionType: 'select',
		multiSelect: true,
		options: ['AAA', 'BBB', 'CCC', 'DDD']
	}
]
