import React, { createContext, useCallback, useMemo, useState } from 'react'

import { SmasContextType, SmasProviderProps } from './types'

const initialValue = {
	smasDataContext: {
		name: '',
		motherName: '',
		dateOfBirth: '',
		anonymizedCpf: ''
	},
	clearSmasDataContext: () => { },
	getNumberOfMissingInfo: () => 0,
	setSmasDataOnContext: (data: Partial<SmasContextType['smasDataContext']>) => { },
}

const SmasContext = createContext<SmasContextType>(initialValue)

function SmasProvider({ children }: SmasProviderProps) {
	const [smasDataContext, setSmasDataContext] = useState(initialValue.smasDataContext)

	const setSmasDataOnContext = async (data: Partial<SmasContextType['smasDataContext']>) => {
		setSmasDataContext({ ...smasDataContext, ...data })
	}

	const getNumberOfMissingInfo = useCallback(() => {
		const storagedInfo = [smasDataContext.motherName, smasDataContext.dateOfBirth, smasDataContext.anonymizedCpf]
		return 3 - storagedInfo.filter((data) => data).length
	}, [smasDataContext])

	const clearSmasDataContext = useCallback(() => {
		setSmasDataContext(initialValue.smasDataContext)
	}, [])

	const smasProviderData = useMemo(() => ({
		smasDataContext,
		clearSmasDataContext,
		getNumberOfMissingInfo,
		setSmasDataOnContext,
	}), [smasDataContext])

	return (
		<SmasContext.Provider value={smasProviderData} >
			{children}
		</SmasContext.Provider>
	)
}

export { SmasProvider, SmasContext }
