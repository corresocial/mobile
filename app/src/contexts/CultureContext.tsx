import React, { createContext, useContext, useMemo, useState } from 'react'

import { CultureData } from './types'
import { CultureCollectionRemote } from '../services/firebase/types'

import { AuthContext } from './AuthContext'

type CultureContextType = {
	isSecondPost: boolean
	cultureDataContext: CultureData
	setCultureDataOnContext: (data: CultureData) => void
	getAditionalDataFromLastPost: () => void
}

interface CultureProviderProps {
	children: React.ReactNode
}

const initialValue = {
	isSecondPost: false,
	cultureDataContext: {},
	setCultureDataOnContext: (data: CultureData) => { },
	getAditionalDataFromLastPost: () => { }
}

const CultureContext = createContext<CultureContextType>(initialValue)

function CultureProvider({ children }: CultureProviderProps) {
	const { userDataContext } = useContext(AuthContext)

	const [isSecondPost, setIsSecondPost] = useState(false)
	const [cultureDataContext, setCultureDataContext] = useState(initialValue.cultureDataContext)

	const setCultureDataOnContext = async (data: CultureData) => {
		setCultureDataContext({ ...cultureDataContext, ...data })
	}

	const getAditionalDataFromLastPost = () => {
		const userPosts = userDataContext.posts || []
		if (!userPosts || (userPosts && userPosts.length < 1)) return

		const lastUserPost: CultureCollectionRemote | any = userPosts[userPosts.length - 1] || {} // TODO Type
		if (Object.keys(lastUserPost).length < 1) return

		console.log(`Dados extraidos do post: ${lastUserPost.title}`)

		setCultureDataContext({
			range: lastUserPost.range, // EDIT
			locationView: lastUserPost.locationView,
			location: lastUserPost.location,
			deliveryMethod: lastUserPost.deliveryMethod,
			attendanceFrequency: lastUserPost.attendanceFrequency,
			daysOfWeek: lastUserPost.daysOfWeek,
			startHour: lastUserPost.startHour,
			endHour: lastUserPost.endHour,
		})
		setIsSecondPost(true)
	}

	const cultureProviderData = useMemo(() => ({
		isSecondPost,
		cultureDataContext,
		setCultureDataOnContext,
		getAditionalDataFromLastPost
	}), [cultureDataContext])

	return (
		<CultureContext.Provider value={cultureProviderData}>
			{children}
		</CultureContext.Provider>
	)
}

export { CultureProvider, CultureContext }
