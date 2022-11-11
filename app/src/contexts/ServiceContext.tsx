import React, { createContext, useState } from "react";
import { ServiceData } from "./types";

type ServiceContextType = {
    serviceDataContext: ServiceData | any 
    setServiceDataOnContext: (data: ServiceData) => void
}

interface ServiceProviderProps {
    children: React.ReactNode
}

const initialValue = {
    serviceDataContext: {},
    setServiceDataOnContext: (data: ServiceData) => { }
}

const ServiceContext = createContext<ServiceContextType>(initialValue)

function ServiceProvider({ children }: ServiceProviderProps) {

    const [serviceDataContext, setServiceDataContext] = useState(initialValue.serviceDataContext)

    const setServiceDataOnContext = async (data: ServiceData) => {
        console.log({ ...serviceDataContext, ...data })
        setServiceDataContext({ ...serviceDataContext, ...data })
    }

    const value = {
        serviceDataContext,
        setServiceDataOnContext
    }

    return (
        <ServiceContext.Provider value={value} >
            {children}
        </ServiceContext.Provider>
    )
}

export { ServiceProvider, ServiceContext }