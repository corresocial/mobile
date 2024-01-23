export type SmasService = 'beneficioEmergencial' | 'bolsaFamilia' | 'cadUnico'

export interface SmasRecoveryNISData {
	NIS: string
	name: string
	motherName: string
	dateOfBirth: string
	anonymizedCpf: string
}
