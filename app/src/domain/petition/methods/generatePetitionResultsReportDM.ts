import { PetitionRepositoryInterface } from '@data/petition/PetitionRepositoryInterface'

import { PetitionEntity } from '../entity/types'

import { createPetitionSubscriptionReportDM } from '../core/createPetitionSubscriptionReportDM'

const petitionDataMock: PetitionEntity = {
	petitionId: '123',
	title: 'title',
	description: 'Essa é uma descrição de abaixo assinado',
	createdAt: new Date(),
	range: 'city',
	location: {
		city: 'Londrina',
		country: 'Brasil',
		district: 'Palhano 2',
		geohashNearby: ['geo', 'hash'],
		number: '50',
		postalCode: '86055-650',
		state: 'Paraná',
		street: 'Rua Guilherme Farel',
		coordinates: {
			latitude: 0,
			longitude: 0,
		},
	},
	owner: {
		userId: '1',
		name: 'José Alencar',
		profilePictureUrl: []
	},
	idUsersResponded: ['userId1', 'userId2', 'userId3'],
	completed: false,
	picturesUrl: [''],
	extraIdentificationRequest: ['rg', 'cpf', 'telefone'],
	privateResponses: [
		{
			userId: 'userId1',
			userName: 'Rafael Betão Betão Betão Betão Betão Betão',
			email: 'gatinhofofo123@gmail.com',
			cellNumber: '69 992846588',
			rg: '155525',
			cpf: '04455488789',
			location: {
				city: 'Londrina',
				country: 'Brasil',
				district: 'Palhano 2',
				geohashNearby: ['geo', 'hash'],
				number: '50',
				postalCode: '86055-650',
				state: 'Paraná',
				street: 'Rua Rafa Farel',
				coordinates: {
					latitude: 0,
					longitude: 0,
				},
			},
		},
		{
			userId: 'userId2',
			userName: 'Luizera da Silva',
			email: 'miau@gmail.com',
			cellNumber: '22 992846588',
			rg: '225525',
			cpf: '22455488722',
			location: {
				city: 'Ibiporã',
				country: 'Brasil',
				district: 'Centro',
				geohashNearby: ['geo', 'hash'],
				number: '50',
				postalCode: '86055-650',
				state: 'Paraná',
				street: 'Rua Luis Farel',
				coordinates: {
					latitude: 0,
					longitude: 0,
				},
			},
		},
		{
			userId: 'userId2',
			userName: 'Luizera da Silva',
			email: 'miau@gmail.com',
			cellNumber: '22 992846588',
			rg: '225525',
			cpf: '22455488722',
			location: {
				city: 'Ibiporã',
				country: 'Brasil',
				district: 'Centro',
				geohashNearby: ['geo', 'hash'],
				number: '50',
				postalCode: '86055-650',
				state: 'Paraná',
				street: 'Rua Luis Farel',
				coordinates: {
					latitude: 0,
					longitude: 0,
				},
			},
		},
		{
			userId: 'userId2',
			userName: 'Luizera da Silva',
			email: 'miau@gmail.com',
			cellNumber: '22 992846588',
			rg: '225525',
			cpf: '22455488722',
			location: {
				city: 'Ibiporã',
				country: 'Brasil',
				district: 'Centro',
				geohashNearby: ['geo', 'hash'],
				number: '50',
				postalCode: '86055-650',
				state: 'Paraná',
				street: 'Rua Luis Farel',
				coordinates: {
					latitude: 0,
					longitude: 0,
				},
			},
		},
		{
			userId: 'userId2',
			userName: 'Luizera da Silva',
			email: 'miau@gmail.com',
			cellNumber: '22 992846588',
			rg: '225525',
			cpf: '22455488722',
			location: {
				city: 'Ibiporã',
				country: 'Brasil',
				district: 'Centro',
				geohashNearby: ['geo', 'hash'],
				number: '50',
				postalCode: '86055-650',
				state: 'Paraná',
				street: 'Rua Luis Farel',
				coordinates: {
					latitude: 0,
					longitude: 0,
				},
			},
		},
		{
			userId: 'userId2',
			userName: 'Luizera da Silva',
			email: 'miau@gmail.com',
			cellNumber: '22 992846588',
			rg: '225525',
			cpf: '22455488722',
			location: {
				city: 'Ibiporã',
				country: 'Brasil',
				district: 'Centro',
				geohashNearby: ['geo', 'hash'],
				number: '50',
				postalCode: '86055-650',
				state: 'Paraná',
				street: 'Rua Luis Farel',
				coordinates: {
					latitude: 0,
					longitude: 0,
				},
			},
		},
		{
			userId: 'userId2',
			userName: 'Judite da Silva',
			email: 'miau@gmail.com',
			cellNumber: '22 992846588',
			rg: '225525',
			cpf: '22455488722',
			location: {
				city: 'Ibiporã',
				country: 'Brasil',
				district: 'Centro',
				geohashNearby: ['geo', 'hash'],
				number: '50',
				postalCode: '86055-650',
				state: 'Paraná',
				street: 'Rua Luis Farel',
				coordinates: {
					latitude: 0,
					longitude: 0,
				},
			},
		},
		{
			userId: 'userId2',
			userName: 'Luizera da Silva',
			email: 'miau@gmail.com',
			cellNumber: '22 992846588',
			rg: '225525',
			cpf: '22455488722',
			location: {
				city: 'Ibiporã',
				country: 'Brasil',
				district: 'Centro',
				geohashNearby: ['geo', 'hash'],
				number: '50',
				postalCode: '86055-650',
				state: 'Paraná',
				street: 'Rua Luis Farel',
				coordinates: {
					latitude: 0,
					longitude: 0,
				},
			},
		},
		{
			userId: 'userId2',
			userName: 'Moura da Silva',
			email: 'miau@gmail.com',
			cellNumber: '22 992846588',
			rg: '225525',
			cpf: '22455488722',
			location: {
				city: 'Ibiporã',
				country: 'Brasil',
				district: 'Centro',
				geohashNearby: ['geo', 'hash'],
				number: '50',
				postalCode: '86055-650',
				state: 'Paraná',
				street: 'Rua Luis Farel',
				coordinates: {
					latitude: 0,
					longitude: 0,
				},
			},
		},
	]
}

async function generatePetitionResultsReportDM(usePetitionRepository: () => PetitionRepositoryInterface, petitionData: PetitionEntity) {
	try {
		/* const { getPrivateResponses } = usePetitionRepository()
		const privateResponses = await getPrivateResponses(petitionData.petitionId)

		const petitionWithResponses: PetitionEntity = {
			...petitionData,
			privateResponses
		} */

		return createPetitionSubscriptionReportDM(petitionDataMock/* petitionWithResponses */)
	} catch (error: any) {
		console.log(error)
		throw new Error(error)
	}
}

export { generatePetitionResultsReportDM }
