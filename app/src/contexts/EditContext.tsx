import React, { createContext, useMemo, useState } from 'react'

import { StateData } from './types'

type EditContextType = {
	editDataContext: { unsaved: any, saved: any }
	addNewUnsavedFieldToEditContext: (dataObject: any) => void
	clearEditContext: () => void
	clearUnsavedEditContext: () => void,
	clearUnsavedEditFieldContext: (field: any) => void
	setEditDataOnContext: (data: any) => void,
}

interface EditProviderProps {
	children: React.ReactNode
}

const initialValue = {
	editDataContext: {
		unsaved: {},
		saved: {}
	},
	addNewUnsavedFieldToEditContext: (dataObject: any) => { },
	clearUnsavedEditContext: () => { },
	clearEditContext: () => { },
	setEditDataOnContext: (data: any) => { },
	clearUnsavedEditFieldContext: (data: any) => { }
}

const EditContext = createContext<EditContextType>(initialValue)

function EditProvider({ children }: EditProviderProps) {
	const [editDataContext, setEditDataContext] = useState(initialValue.editDataContext)

	const setEditDataOnContext = async (data: StateData) => {
		setEditDataContext({
			...editDataContext, ...data
		})
	}

	const addNewUnsavedFieldToEditContext = (dataObject: any) => {
		setEditDataContext({
			unsaved: { ...editDataContext.unsaved, ...dataObject },
			saved: editDataContext.saved
		})
	}

	const clearUnsavedEditContext = () => {
		setEditDataContext({
			unsaved: {},
			saved: editDataContext.saved
		})
	}

	const clearUnsavedEditFieldContext = (field: any) => {
		const editContextUnsaved = { ...editDataContext.unsaved }
		delete editContextUnsaved[field]
		setEditDataContext({
			unsaved: editContextUnsaved,
			saved: editDataContext.saved
		})
	}

	const clearEditContext = () => {
		setEditDataContext({
			unsaved: {},
			saved: {}
		})
	}

	const editProviderData = useMemo(() => ({
		editDataContext,
		addNewUnsavedFieldToEditContext,
		setEditDataOnContext,
		clearUnsavedEditContext,
		clearEditContext,
		clearUnsavedEditFieldContext
	}), [editDataContext])

	return (
		<EditContext.Provider value={editProviderData}>
			{children}
		</EditContext.Provider>
	)
}

export { EditProvider, EditContext }
