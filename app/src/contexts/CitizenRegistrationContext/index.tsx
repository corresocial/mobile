import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'

import { CitizenRegistrationContextType, CitizenRegistrationProviderProps } from './types'

const CitizenRegistrationContext = createContext<CitizenRegistrationContextType>({} as any)

function CitizenRegistrationProvider({ children }: CitizenRegistrationProviderProps) {
	const [citizenData, setCitizenData] = useState({} as any)

	const saveQuestionResponse = useCallback((data: object) => {
		setCitizenData({ ...citizenData, data })
	}, [citizenData])

	const CitizenProviderData = useMemo(() => ({ citizenData, saveQuestionResponse }), [citizenData])

	return (
		<CitizenRegistrationContext.Provider value={CitizenProviderData}>
			{children}
		</CitizenRegistrationContext.Provider>
	)
}

const useCitizenRegistrationContext = () => useContext(CitizenRegistrationContext)

export { CitizenRegistrationProvider, useCitizenRegistrationContext }