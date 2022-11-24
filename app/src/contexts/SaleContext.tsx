import React, { createContext, useMemo, useState } from 'react'

import { SaleData } from './types'

type SaleContextType = {
	saleDataContext: SaleData
	setSaleDataOnContext: (data: SaleData) => void
}

interface SaleProviderProps {
	children: React.ReactNode
}

const initialValue = {
	saleDataContext: {
	},
	setSaleDataOnContext: (data: SaleData) => { }
}

const SaleContext = createContext<SaleContextType>(initialValue)

function SaleProvider({ children }: SaleProviderProps) {
	const [saleDataContext, setSaleDataContext] = useState(initialValue.saleDataContext)

	const setSaleDataOnContext = async (data: SaleData) => {
		console.log({
			...saleDataContext, ...saleDataContext
		})
		setSaleDataContext({
			...saleDataContext, ...data
		})
	}

	const saleProviderData = useMemo(() => ({
		saleDataContext,
		setSaleDataOnContext
	}), [saleDataContext])

	return (
		<SaleContext.Provider value={saleProviderData} >
			{children}
		</SaleContext.Provider>
	)
}

export { SaleProvider, SaleContext }
