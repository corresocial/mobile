import React from 'react'

import { SmasRecoveryNISData } from '@domain/entities/smas/types'

export interface SmasProviderProps {
	children: React.ReactNode
}

export type SmasContextType = {
	smasDataContext: SmasRecoveryNISData
	setSmasDataOnContext: (data: Partial<SmasRecoveryNISData>) => void
}
