import { PetitionRepositoryInterface } from '@data/petition/PetitionRepositoryInterface'

import { PetitionEntity } from '../entity/types'

import { createPetitionSubscriptionReportDM } from '../core/createPetitionSubscriptionReportDM'

/* const petitionDataMock: PetitionEntity = {
	title: 'Praça da lapa',
	description: 'lorem ipsum',
	petitionId: '10',
	createdAt: new Date(),
	range: 'city',
	owner: {
		userId: '1',
		name: 'José Alenca',
		profilePictureUrl: []
	},
	idUsersResponded: ['', ''],
	location: {
		city: 'Londrina',
		country: 'Brasil',
		district: 'Palhano 2',
		geohashNearby: ['', ''],
		number: '50',
		postalCode: '86055-650',
		coordinates: { latitude: 1, longitude: 2 },
		state: 'Paraná',
		street: 'Rua Guilherme Farel',
	},
	questions: [
		{
			questionId: '1',
			question: 'Quem veio primeiro, o ovo ou a galinha?',
			questionType: 'textual'
		},
		{
			questionId: '2',
			question: 'Escolha um número de 0 a 100?',
			questionType: 'numerical'
		},
		{
			questionId: '3',
			question: 'O que você achou da morte do homem de ferro?',
			questionType: 'satisfaction'
		},
		{
			questionId: '4',
			question: 'Está satisfeito com o substituto do capitão américa?',
			questionType: 'satisfaction'
		},
		{
			questionId: '5',
			question: 'Você tem animal de estimação?',
			questionType: 'binary'
		},
		{
			questionId: '6',
			question: 'Você tem pc com luizinhas?',
			questionType: 'binary'
		}
	],
	privateResponses: [
		{
			userId: 'PusOCJGtL6cSrAhN8oePaUybLR42',
			location: {
				city: 'Londrina',
				country: 'Brasil',
				district: 'Palhano 2',
				geohashNearby: ['', ''],
				number: '50',
				postalCode: '86055-650',
				coordinates: { latitude: 1, longitude: 2 },
				state: 'Paraná',
				street: 'Rua Guilherme Farel',
			},
			responses: [
				{
					questionId: '1',
					questionType: 'textual',
					response: 'Galinha',
				},

				{
					questionId: '2',
					questionType: 'numerical',
					response: 55,
				},
				{
					questionId: '2',
					questionType: 'numerical',
					response: 55,
				},

				{
					questionId: '3',
					questionType: 'satisfaction',
					response: 1,
				},
				{
					questionId: '3',
					questionType: 'satisfaction',
					response: 4,
				},

				{
					questionId: '4',
					questionType: 'satisfaction',
					response: 4,
				},

				{
					questionId: '5',
					questionType: 'binary',
					response: true,
				},

				{
					questionId: '6',
					questionType: 'binary',
					response: true,
				},
			],
		},
		{
			userId: 'PusOCJGtL6cSrAhN8oePaUybLR42',
			location: {
				city: 'Londrina',
				country: 'Brasil',
				district: 'Palhano 2',
				geohashNearby: [''],
				number: '50',
				postalCode: '86055-650',
				coordinates: { latitude: 1, longitude: 2 },
				state: 'Paraná',
				street: 'Rua Guilherme Farel',
			},
			responses: [
				{
					questionId: '1',
					questionType: 'textual',
					response: 'Pato',
				},

				{
					questionId: '2',
					questionType: 'numerical',
					response: 20,
				},
				{
					questionId: '2',
					questionType: 'numerical',
					response: 30,
				},
				{
					questionId: '2',
					questionType: 'numerical',
					response: 30,
				},
				{
					questionId: '2',
					questionType: 'numerical',
					response: 30,
				},

				{
					questionId: '3',
					questionType: 'satisfaction',
					response: 4,
				},

				{
					questionId: '4',
					questionType: 'satisfaction',
					response: 4,
				},
				{
					questionId: '4',
					questionType: 'satisfaction',
					response: 3,
				},
				{
					questionId: '4',
					questionType: 'satisfaction',
					response: 1,
				},
				{
					questionId: '4',
					questionType: 'satisfaction',
					response: 2,
				},
				{
					questionId: '4',
					questionType: 'satisfaction',
					response: 5,
				},
				{
					questionId: '4',
					questionType: 'satisfaction',
					response: 5,
				},

				{
					questionId: '5',
					questionType: 'binary',
					response: false,
				},
				{
					questionId: '6',
					questionType: 'binary',
					response: true,
				},
			],
		}
	]
} */

async function generatePetitionResultsReportDM(usePetitionRepository: () => PetitionRepositoryInterface, petitionData: PetitionEntity) {
	try {
		const { getPrivateResponses } = usePetitionRepository()
		const privateResponses = await getPrivateResponses(petitionData.petitionId)

		const petitionWithResponses: PetitionEntity = {
			...petitionData,
			privateResponses
		}

		return createPetitionSubscriptionReportDM(petitionWithResponses)
	} catch (error: any) {
		console.log(error)
		throw new Error(error)
	}
}

export { generatePetitionResultsReportDM }
