import AsyncStorage from '@react-native-async-storage/async-storage'

import { CitizenRegisterEntity } from '@domain/citizenRegister/model/entities/types'
import { CitizenRegisterLocalRepositoryInterface } from '@domain/citizenRegister/provider/CitizenRegisterLocalRepositoryInterface'

import { LOCAL_OFFLINE_CITIZEN_REGISTERS_KEY } from '@data/shared/storageKeys/localStorageKeys'
import { JSONMethods } from '@data/shared/utils/JSONMethods'

export class CitizenRegisterLocalRepository implements CitizenRegisterLocalRepositoryInterface {
	async updateOfflineCitizenRegisters(citizenRegisters: CitizenRegisterEntity[], overwrite?: boolean): Promise<void> {
		try {
			if (overwrite) {
				const JsonData = JSONMethods.convertToJson([...citizenRegisters])
				await AsyncStorage.setItem(LOCAL_OFFLINE_CITIZEN_REGISTERS_KEY, JsonData)
				return
			}

			const storagedData = await this.getOfflineCitizenRegisters()
			const allRegisters = [...storagedData, ...citizenRegisters]
			const allRegistersJson = JSONMethods.convertToJson(allRegisters)
			console.log(allRegistersJson)

			await AsyncStorage.setItem(LOCAL_OFFLINE_CITIZEN_REGISTERS_KEY, allRegistersJson)
		} catch (error: any) {
			console.log(error)
			throw new Error(error)
		}
	}

	async getOfflineCitizenRegisters(): Promise<CitizenRegisterEntity[]> {
		const storagedDataJSON = await AsyncStorage.getItem(LOCAL_OFFLINE_CITIZEN_REGISTERS_KEY)
		console.log('storagedDataJSON')
		console.log(storagedDataJSON)
		return storagedDataJSON && !!Number.isNaN(storagedDataJSON)
			? JSONMethods.convertFromJson(storagedDataJSON)
			: []
	}

	async removeCitizenRegister(citizenRegisterId: string) {
		const storedRegisters = await this.getOfflineCitizenRegisters()
		const citizenRegisters = storedRegisters.filter((register: CitizenRegisterEntity) => register.citizenRegisterId !== citizenRegisterId)
		await this.updateOfflineCitizenRegisters(citizenRegisters, true)
		return citizenRegisters
	}
}
