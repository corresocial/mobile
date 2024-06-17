import { CitizenRegisterEntity, CitizenRegisterQuestionResponse } from '@domain/citizenRegister/model/entities/types'

export const citizenRegisterData: CitizenRegisterEntity = {
	citizenRegisterId: '10',
	createdAt: new Date(),
	questions: [
		{
			questionId: '1',
			question: 'Quem veio primeiro, o ovo ou a galinha?',
			questionType: 'binary'
		},
		{
			questionId: '2',
			question: 'Escolha um número de 0 a 100?',
			questionType: 'satisfaction'
		},
		{
			questionId: '3',
			question: 'O que você achou da morte do homem de ferro?',
			questionType: 'numerical'
		},
		{
			questionId: '5',
			question: 'SELECT, você quer SELECT?',
			questionType: 'select',
			options: ['AAA', 'BBB', 'CCC', 'DDD']
		},
		{
			questionId: '8',
			question: 'Mulitsleect?',
			questionType: 'select',
			multiSelect: true,
			options: ['AAA', 'BBB', 'CCC', 'DDD']
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
		response: 5,
		question: 'Escolha um número de 0 a 100?',
		questionType: 'satisfaction'
	},
	{
		questionId: '3',
		response: '25',
		question: 'O que você achou da morte do homem de ferro?',
		questionType: 'numerical'
	},
	{
		questionId: '5',
		response: ['AAA', 'BBB'],
		question: 'SELECT, você quer SELECT?',
		questionType: 'select',
		options: ['AAA', 'BBB', 'CCC', 'DDD']
	},
	{
		questionId: '7',
		response: 'eu gosto de utilizar select no SQL, costumo fazer isso todos os dias em meu trabalho, costumo ter seleções regulares quando me pedem para tal, gosto de manipular os dados e garantir que estejam da forma certa e com qualidade',
		question: 'SELECT, você quer SELECT?',
		questionType: 'textual',
	},
	{
		questionId: '8',
		response: ['DDD'],
		question: 'Mulitsleect?',
		questionType: 'select',
		multiSelect: true,
		options: ['AAA', 'BBB', 'CCC', 'DDD']
	}
]
