import React, { createContext, useContext, useMemo, useState } from 'react'
import { Alert } from 'react-native'

import { ApplicationStateData, StateContextType, StateProviderProps } from './types'
import { Id } from '@services/firebase/types'

import { updateUser } from '@services/firebase/user/updateUser'

import { ShareModal } from '@components/_modals/ShareModal'
import { TourModal } from '@components/_modals/TourModal'

import { share } from '../../presentation/common/share'
import { AuthContext } from '../AuthContext'

const initialValue = {
	stateDataContext: {
		showTourModal: false,
		showShareModal: false,
		lastPostTitle: '',
		lastPostId: ''
	},
	setStateDataOnContext: (data: ApplicationStateData) => { },
	toggleTourModalVisibility: (visibility: boolean) => { },
	toggleShareModalVisibility: (visibility: boolean) => { }
}

const StateContext = createContext<StateContextType>(initialValue)

type Handler = {
	navigation: any
}

function StateProvider({ children }: StateProviderProps) {
	const { setUserDataOnContext, userDataContext } = useContext(AuthContext)

	const [stateDataContext, setStateDataContext] = useState(initialValue.stateDataContext)
	const [handlerTourModalButton, setHandlerTourModalButton] = useState<Handler>()

	const setStateDataOnContext = async (data: ApplicationStateData) => {
		console.log(stateDataContext)
		console.log(data)
		if (!objectValuesAreEquals(stateDataContext, data)) { // REFACTOR Transformar em utils e aplicar à todos os updates de contextos para eviar atualizações de contexto desnecessárias
			setStateDataContext({ ...stateDataContext, ...data })
		}
	}

	const objectValuesAreEquals = (completeObject: any, abstractObject: any) => {
		const res = Object.entries(abstractObject).reduce((acc: boolean[], [key, value]) => {
			return [...acc, completeObject[key] === value]
		}, [])

		const areEquals = res.every((item) => item === true)
		return areEquals
	}

	const sharePost = () => {
		const { lastPostTitle, lastPostId } = stateDataContext
		share(`Olha o que estou anunciando no corre. \n\n${lastPostTitle}\n\nhttps://corre.social/p/${lastPostId}`)
	}

	const toggleTourModalVisibility = (visibility: boolean, tourHandler?: any) => {
		if (stateDataContext.showTourModal !== visibility) {
			setStateDataOnContext({ showTourModal: visibility })
			setHandlerTourModalButton(tourHandler)
		}
	}

	const toggleShareModalVisibility = (visibility: boolean) => {
		if (stateDataContext.showShareModal !== visibility) {
			setStateDataOnContext({ showShareModal: visibility })
		}
	}

	const navigateToTour = () => {
		if (handlerTourModalButton) {
			handlerTourModalButton.navigation.navigate('SelectPostType')
			setStateDataOnContext({ showTourModal: false })
			setUserTourPerformed()
		} else {
			Alert.alert('ops!', 'não foi possível iniciar o tour')
			setStateDataOnContext({ showTourModal: false })
		}
	}

	const closeTourModal = () => {
		setStateDataOnContext({ showTourModal: false })
		setUserTourPerformed()
	}

	const closeShareModal = () => setStateDataOnContext({ showShareModal: false })

	const setUserTourPerformed = async () => {
		await updateUser(userDataContext.userId as Id, { tourPerformed: true })
		setUserDataOnContext({ tourPerformed: true })
	}

	const stateProviderData = useMemo(() => {
		return ({
			stateDataContext,
			setStateDataOnContext,
			toggleShareModalVisibility,
			toggleTourModalVisibility
		})
	}, [stateDataContext])

	return (
		<StateContext.Provider value={stateProviderData}>
			<TourModal
				visibility={stateDataContext.showTourModal}
				closeModal={closeTourModal}
				onPressButton={navigateToTour}
			/>

			<ShareModal
				visibility={stateDataContext.showShareModal}
				closeModal={closeShareModal}
				onPressButton={sharePost}
			/>
			{children}
		</StateContext.Provider>
	)
}

export { StateProvider, StateContext }
