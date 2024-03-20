import { ReactNode } from 'react'

export interface EditProviderProps {
	children: ReactNode
}

export type EditContextType = {
	editDataContext: { unsaved: object, saved: object }
	addNewUnsavedFieldToEditContext: (data: object) => void
	clearEditContext: () => void
	clearUnsavedEditContext: () => void,
	clearUnsavedEditFieldContext: (field: string) => void
	setEditDataOnContext: (data: object) => void,
}
