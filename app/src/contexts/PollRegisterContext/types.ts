import { ReactNode } from 'react'

import { PollEntity, PollEntityOptional } from '@domain/poll/entity/types'

export interface PollRegisterProviderProps {
	children: ReactNode
}

export type PollRegisterContextType = {
	pollDataContext: PollEntity
	setPollDataOnContext: (data: PollEntityOptional) => void
}
