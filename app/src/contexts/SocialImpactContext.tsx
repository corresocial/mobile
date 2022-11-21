import React, { createContext, useState } from "react";
import { SocialImpactData } from "./types";

type SocialImpactContextType = {
    socialImpactDataContext: SocialImpactData | any
    setSocialImpactDataOnContext: (data: SocialImpactData) => void
}

interface SocialImpactProviderProps {
    children: React.ReactNode
}

const initialValue = {
    socialImpactDataContext: {},
    setSocialImpactDataOnContext: (data: SocialImpactData) => { }
}

const SocialImpactContext = createContext<SocialImpactContextType>(initialValue)

function SocialImpactProvider({ children }: SocialImpactProviderProps) {

    const [socialImpactDataContext, setSocialImpactDataContext] = useState(initialValue.socialImpactDataContext)

    const setSocialImpactDataOnContext = async (data: SocialImpactData) => {
        console.log({ ...socialImpactDataContext, ...data })
        setSocialImpactDataContext({ ...socialImpactDataContext, ...data })
    }

    const value = {
        socialImpactDataContext,
        setSocialImpactDataOnContext
    }

    return (
        <SocialImpactContext.Provider value={value} >
            {children}
        </SocialImpactContext.Provider>
    )
}

export { SocialImpactProvider, SocialImpactContext }