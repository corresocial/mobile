import React, { createContext, useMemo, useState } from 'react'

import { SocialImpactData } from './types'

type SocialImpactContextType = {
	socialImpactDataContext: SocialImpactData
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
		setSocialImpactDataContext({
			...socialImpactDataContext, ...data
		})
	}

	const socialImpactProviderData = useMemo(() => ({
		socialImpactDataContext,
		setSocialImpactDataOnContext
	}), [socialImpactDataContext])

	return (
		<SocialImpactContext.Provider value={socialImpactProviderData} >
			{children}
		</SocialImpactContext.Provider>
	)
}

export { SocialImpactProvider, SocialImpactContext }
