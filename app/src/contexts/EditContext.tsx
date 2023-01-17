import React, { createContext, useMemo, useState } from 'react'

import { StateData } from './types'

type EditContextType = {
	editDataContext: any // TODO Type
	clearEditContext: () => void
	setEditDataOnContext: (data: any) => void,
}

interface EditProviderProps {
	children: React.ReactNode
}

const initialValue = {
	editDataContext: {},
	clearEditContext: () => { },
	setEditDataOnContext: (data: any) => { } // TODO Type
}

const EditContext = createContext<EditContextType>(initialValue)

function EditProvider({ children }: EditProviderProps) {
	const [editDataContext, setStateDataContext] = useState(initialValue.editDataContext)

	const setEditDataOnContext = async (data: StateData) => {
		setStateDataContext({
			...editDataContext, ...data
		})
	}

	const clearEditContext = () => {
		setStateDataContext({})
	}

	const editProviderData = useMemo(() => ({
		editDataContext,
		setEditDataOnContext,
		clearEditContext
	}), [editDataContext])

	return (
		<EditContext.Provider value={editProviderData}>
			{children}
		</EditContext.Provider>
	)
}

export { EditProvider, EditContext }
