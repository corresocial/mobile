import React, { createContext, useState } from "react";
import { SaleData } from "./types";

type SaleContextType = {
    saleDataContext: SaleData | {} | any; // TODO LocationView address warn
    setSaleDataOnContext: (data: SaleData) => void
}

interface SaleProviderProps {
    children: React.ReactNode
}

const initialValue = {
    saleDataContext: {},
    setSaleDataOnContext: (data: SaleData) => { }
}

const SaleContext = createContext<SaleContextType>(initialValue)

function SaleProvider({ children }: SaleProviderProps) {

    const [saleDataContext, setSaleDataContext] = useState(initialValue.saleDataContext)

    const setSaleDataOnContext = async (data: SaleData) => {
        setSaleDataContext({ ...saleDataContext, ...data })
        console.log({...saleDataContext, ...saleDataContext})
    }

    const value = {
        saleDataContext,
        setSaleDataOnContext
    }

    return (
        <SaleContext.Provider value={value} >
            {children}
        </SaleContext.Provider>
    )
}

export { SaleProvider, SaleContext }