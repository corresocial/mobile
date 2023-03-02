import React, { createContext, useContext, useMemo, useState } from 'react'
import { Alert } from 'react-native'

import { updateUser } from '../services/firebase/user/updateUser'
import { share } from '../common/share'

import { Id } from '../services/firebase/types'
import { StateData } from './types'

import { AuthContext } from './AuthContext'

import { TourModal } from '../components/_modals/TourModal'
import { ShareModal } from '../components/_modals/ShareModal'

type StateContextType = {
	stateDataContext: StateData
	setStateDataOnContext: (data: StateData) => void,
	toggleTourModalVisibility: (visibility: boolean, navigation: any) => void // TODO type
	toggleShareModalVisibility: (visibility: boolean) => void
}

interface StateProviderProps {
	children: React.ReactNode
}

const initialValue = {
	stateDataContext: {
		showTourModal: false,
		showShareModal: false
	},
	setStateDataOnContext: (data: StateData) => { },
	toggleTourModalVisibility: (visibility: boolean) => { },
	toggleShareModalVisibility: (visibility: boolean) => { }
} as any

const StateContext = createContext<StateContextType>(initialValue)

type Handler = {
	navigation: any // TODO type
}

function StateProvider({ children }: StateProviderProps) {
	const { setUserDataOnContext, userDataContext } = useContext(AuthContext)

	const [stateDataContext, setStateDataContext] = useState(initialValue.stateDataContext)
	const [handlerTourModalButton, setHandlerTourModalButton] = useState<Handler>()

	const setStateDataOnContext = async (data: StateData) => {
		setStateDataContext({
			...stateDataContext, ...data
		})
	}

	const sharePost = () => {
		const { lastPostTitle } = stateDataContext
		share(`tô anunciando ${lastPostTitle} lá no corre.\n\nhttps://corre.social`)
	}

	const toggleTourModalVisibility = (visibility: boolean, tourHandler?: any) => {
		setStateDataOnContext({
			showTourModal: visibility
		})
		setHandlerTourModalButton(tourHandler)
	}

	const toggleShareModalVisibility = (visibility: boolean) => {
		setStateDataOnContext({
			showShareModal: visibility
		})
	}

	const navigateToTour = () => {
		if (handlerTourModalButton) {
			handlerTourModalButton.navigation.navigate('SelectPostType')
			setStateDataOnContext({
				showTourModal: false
			})
			setUserTourPerformed()
		} else {
			Alert.alert('Ops!', 'Deu bug na navegação, chama o suport!! haha!')
		}
	}

	const setUserTourPerformed = async () => {
		await updateUser(userDataContext.userId as Id, {
			tourPerformed: true
		})
		setUserDataOnContext({ tourPerformed: true })
	}

	const stateProviderData = useMemo(() => ({
		stateDataContext,
		setStateDataOnContext,
		toggleShareModalVisibility,
		toggleTourModalVisibility
	}), [stateDataContext])

	return (
		<StateContext.Provider value={stateProviderData}>
			<TourModal
				visibility={stateDataContext.showTourModal}
				closeModal={() => {
					setStateDataOnContext({
						showTourModal: false
					})
					setUserTourPerformed()
				}}
				onPressButton={navigateToTour}
			/>
			<ShareModal
				visibility={stateDataContext.showShareModal}
				closeModal={() => {
					setStateDataOnContext({
						showShareModal: false
					})
				}}
				onPressButton={sharePost}
			/>
			{children}
		</StateContext.Provider>
	)
}

export { StateProvider, StateContext }
