import { ReactNode } from 'react'

export interface StateProviderProps {
	children: ReactNode
}

export type ApplicationStateData = {
	showTourModal?: boolean
	showShareModal?: boolean
	lastPostTitle?: string
	lastPostId?: string
}

export type StateContextType = {
	stateDataContext: ApplicationStateData
	setStateDataOnContext: (data: ApplicationStateData) => void,
	toggleTourModalVisibility: (visibility: boolean, navigation: any) => void
	toggleShareModalVisibility: (visibility: boolean) => void
}
