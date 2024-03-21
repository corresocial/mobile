import React, { createContext, useCallback, useMemo, useState } from 'react'

import { useUtils } from '@newutils/useUtils'

import { EditContextType, EditProviderProps } from './types'

const { objectValuesAreEquals } = useUtils()

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

	const setEditDataOnContext = useCallback((data: object) => {
		if (objectValuesAreEquals(editDataContext, data)) return
		setEditDataContext({ ...editDataContext, ...data })
	}, [editDataContext])

	const addNewUnsavedFieldToEditContext = useCallback((data: object) => {
		setEditDataContext({
			unsaved: { ...editDataContext.unsaved, ...data },
			saved: editDataContext.saved
		})
	}, [editDataContext])

	const clearUnsavedEditFieldContext = useCallback((field: string) => {
		const editContextUnsaved = { ...editDataContext.unsaved } as any // TODO Type
		delete editContextUnsaved[field]
		setEditDataContext({
			unsaved: editContextUnsaved,
			saved: editDataContext.saved
		})
	}, [editDataContext])

	const clearUnsavedEditContext = useCallback(() => {
		setEditDataContext({
			unsaved: {},
			saved: editDataContext.saved
		})
	}, [editDataContext])

	const clearEditContext = useCallback(() => {
		setEditDataContext({
			unsaved: {},
			saved: {}
		})
	}, [])

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
