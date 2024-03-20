import React, { createContext, useMemo, useState } from 'react'

import { EditContextType, EditProviderProps } from './types'

const initialValue = {
	editDataContext: {
		unsaved: {},
		saved: {}
	},
	addNewUnsavedFieldToEditContext: (data: object) => { },
	clearUnsavedEditContext: () => { },
	clearEditContext: () => { },
	setEditDataOnContext: (data: object) => { },
	clearUnsavedEditFieldContext: (data: string) => { }
}

const EditContext = createContext<EditContextType>(initialValue)

function EditProvider({ children }: EditProviderProps) {
	const [editDataContext, setEditDataContext] = useState(initialValue.editDataContext)

	const setEditDataOnContext = async (data: object) => {
		setEditDataContext({ ...editDataContext, ...data })
	}

	const addNewUnsavedFieldToEditContext = (data: object) => {
		setEditDataContext({
			unsaved: { ...editDataContext.unsaved, ...data },
			saved: editDataContext.saved
		})
	}

	const clearUnsavedEditContext = () => {
		setEditDataContext({
			unsaved: {},
			saved: editDataContext.saved
		})
	}

	const clearUnsavedEditFieldContext = (field: string) => {
		const editContextUnsaved = { ...editDataContext.unsaved } as any // TODO Type
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
