import { ReactNode } from 'react'

import { SmasRecoveryNISData } from '@domain/entities/smas/types'

export interface SmasProviderProps {
	children: ReactNode
}

export type SmasDataContext = Partial<SmasRecoveryNISData>

export type SmasContextType = {
	smasDataContext: SmasDataContext
	clearSmasDataContext: () => void
	getNumberOfMissingInfo: () => number
	setSmasDataOnContext: (data: SmasDataContext) => void
}
