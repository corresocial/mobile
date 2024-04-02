import React, { createContext, useMemo, useState } from 'react'

import { PollEntity, PollEntityOptional } from '@domain/poll/entity/types'

import { PollRegisterContextType, PollRegisterProviderProps } from './types'

const initialValue: PollRegisterContextType = {
	pollDataContext: {} as PollEntity,
	setPollDataOnContext: (data: PollEntityOptional) => { },
}

const PollRegisterContext = createContext<PollRegisterContextType>(initialValue)

function PollRegisterProvider({ children }: PollRegisterProviderProps) {
	const [pollDataContext, setPollDataContext] = useState(initialValue.pollDataContext)

	const setPollDataOnContext = async (data: PollEntityOptional) => {
		setPollDataContext({ ...pollDataContext, ...data })
	}

	const pollProviderData = useMemo(() => ({
		pollDataContext,
		setPollDataOnContext
	}), [pollDataContext])

	return (
		<PollRegisterContext.Provider value={pollProviderData}>
			{children}
		</PollRegisterContext.Provider>
	)
}

export { PollRegisterProvider, PollRegisterContext }
