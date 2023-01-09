import React, { createContext, useMemo, useState } from 'react'

import { VacancyData } from './types'

type VacancyContextType = {
	vacancyDataContext: VacancyData
	setVacancyDataOnContext: (data: VacancyData) => void
}

interface VacancyProviderProps {
	children: React.ReactNode
}

const initialValue = {
	vacancyDataContext: {
	},
	setVacancyDataOnContext: (data: VacancyData) => { }
}

const VacancyContext = createContext<VacancyContextType>(initialValue)

function VacancyProvider({ children }: VacancyProviderProps) {
	const [vacancyDataContext, setVacancyDataContext] = useState(initialValue.vacancyDataContext)

	const setVacancyDataOnContext = async (data: VacancyData) => {
		setVacancyDataContext({
			...vacancyDataContext, ...data
		})
	}

	const vacanyDataProvider = useMemo(() => ({
		vacancyDataContext,
		setVacancyDataOnContext
	}), [vacancyDataContext])

	return (
		<VacancyContext.Provider value={vacanyDataProvider}>
			{children}
		</VacancyContext.Provider>
	)
}

export { VacancyProvider, VacancyContext }
