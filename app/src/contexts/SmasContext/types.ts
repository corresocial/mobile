import { ReactNode } from 'react'

import { SmasRecoveryNISData } from '@domain/entities/smas/types'

export interface SmasProviderProps {
	children: ReactNode
}

export type SmasContextType = {
	smasDataContext: SmasRecoveryNISData
	clearSmasDataContext: () => void
	getNumberOfMissingInfo: () => number
	setSmasDataOnContext: (data: Partial<SmasRecoveryNISData>) => void
}
