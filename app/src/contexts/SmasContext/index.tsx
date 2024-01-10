import React, { createContext, useMemo, useState } from 'react'

import { SmasContextType, SmasProviderProps } from './types'

const initialValue = {
	smasDataContext: {
		name: '',
		motherName: '',
		dateOfBirth: '',
		anonymizedCpf: ''
	},
	setSmasDataOnContext: (data: Partial<SmasContextType['smasDataContext']>) => { },
}

const SmasContext = createContext<SmasContextType>(initialValue)

function SmasProvider({ children }: SmasProviderProps) {
	const [smasDataContext, setSmasDataContext] = useState(initialValue.smasDataContext)

	const setSmasDataOnContext = async (data: Partial<SmasContextType['smasDataContext']>) => {
		setSmasDataContext({ ...smasDataContext, ...data })
	}

	const smasProviderData = useMemo(() => ({
		smasDataContext,
		setSmasDataOnContext,
	}), [smasDataContext])

	return (
		<SmasContext.Provider value={smasProviderData} >
			{children}
		</SmasContext.Provider>
	)
}

export { SmasProvider, SmasContext }
