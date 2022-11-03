import React, { createContext, useState } from 'react'
import { VacancyData } from './types'

type VacancyContextType = {
    vacancyDataContext: VacancyData | {};
    setVacancyDataOnContext: (data: VacancyData) => void
}

interface VacancyProviderProps {
    children: React.ReactNode
}

const initialValue = {
    vacancyDataContext: {},
    setVacancyDataOnContext: (data: VacancyData) => { }
}

const VacancyContext = createContext<VacancyContextType>(initialValue)

function VacancyProvider({children}:VacancyProviderProps ) {

    const [vacancyDataContext, setVacancyData] = useState(initialValue.vacancyDataContext)

    const setVacancyDataOnContext = async (data: VacancyData) => {
        setVacancyData({ ...vacancyDataContext, ...data })
    }

    const value = {
        vacancyDataContext,
        setVacancyDataOnContext
    }

    return (
        <VacancyContext.Provider value={value}>
            {children}
        </VacancyContext.Provider>
    )
}

export { VacancyProvider, VacancyContext }