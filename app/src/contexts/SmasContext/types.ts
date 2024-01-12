import React from 'react'

import { SmasRecoveryNISData } from '@domain/entities/smas/types'

export interface SmasProviderProps {
	children: React.ReactNode
}

export type SmasContextType = {
	smasDataContext: SmasRecoveryNISData
	clearSmasDataContext: () => void
	getNumberOfMissingInfo: () => number
	setSmasDataOnContext: (data: Partial<SmasRecoveryNISData>) => void
}
