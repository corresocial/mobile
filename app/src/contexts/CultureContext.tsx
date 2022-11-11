import React, { createContext, useState } from 'react'
import { CultureData } from './types'

type CultureContextType = {
    cultureDataContext: CultureData | any 
    setCultureDataOnContext: (data: CultureData) => void
}

interface CultureProviderProps {
    children: React.ReactNode
}

const initialValue = {
    cultureDataContext: {},
    setCultureDataOnContext: (data: CultureData) => { }
}

const CultureContext = createContext<CultureContextType>(initialValue)

function CultureProvider({children}:CultureProviderProps ) {

    const [cultureDataContext, setCultureDataContext] = useState(initialValue.cultureDataContext)

    const setCultureDataOnContext = async (data: CultureData) => {
        console.log({ ...cultureDataContext, ...data })
        setCultureDataContext({ ...cultureDataContext, ...data })
    }

    const value = {
        cultureDataContext,
        setCultureDataOnContext
    }

    return (
        <CultureContext.Provider value={value}>
            {children}
        </CultureContext.Provider>
    )
}

export { CultureProvider, CultureContext }