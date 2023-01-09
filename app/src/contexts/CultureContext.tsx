import React, { createContext, useMemo, useState } from 'react'

import { CultureData } from './types'

type CultureContextType = {
	cultureDataContext: CultureData
	setCultureDataOnContext: (data: CultureData) => void
}

interface CultureProviderProps {
	children: React.ReactNode
}

const initialValue = {
	cultureDataContext: {
	},
	setCultureDataOnContext: (data: CultureData) => { }
}

const CultureContext = createContext<CultureContextType>(initialValue)

function CultureProvider({ children }: CultureProviderProps) {
	const [cultureDataContext, setCultureDataContext] = useState(initialValue.cultureDataContext)

	const setCultureDataOnContext = async (data: CultureData) => {
		setCultureDataContext({
			...cultureDataContext, ...data
		})
	}

	const cultureProviderData = useMemo(() => ({
		cultureDataContext,
		setCultureDataOnContext
	}), [cultureDataContext])

	return (
		<CultureContext.Provider value={cultureProviderData}>
			{children}
		</CultureContext.Provider>
	)
}

export { CultureProvider, CultureContext }
