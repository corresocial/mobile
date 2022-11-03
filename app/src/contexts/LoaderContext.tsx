import React, { createContext, useState } from 'react'
import { LoaderModal } from '../components/_modals/LoaderModal'
import { VacancyData } from './types'


type LoaderContextType = {
    loaderIsVisible: boolean,
    setLoaderIsVisible: (visibility: boolean) => void
}


interface LoaderProviderProps {
    children: React.ReactNode
}

const initialValue = {
    loaderIsVisible: true,
    setLoaderIsVisible: (visibility: boolean) => { }
}

const LoaderContext = createContext<LoaderContextType>(initialValue)

function LoaderProvider({ children }: LoaderProviderProps) {

    const [loaderIsVisible, setLoaderIsVisible] = useState(initialValue.loaderIsVisible)

    const value = {
        loaderIsVisible,
        setLoaderIsVisible
    }

    return (
        <LoaderContext.Provider value={value}>
            {children}
            <LoaderModal visible={loaderIsVisible} />
        </LoaderContext.Provider>
    )
}

export { LoaderProvider, LoaderContext }