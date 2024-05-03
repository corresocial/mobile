import { useNavigation } from '@react-navigation/native'
import React, { createContext, useCallback, useMemo, useState } from 'react'

import { useUtils } from '@newutils/useUtils'

import { ApplicationStateData, StateContextType, StateProviderProps } from './types'

import { ShareModal } from '@components/_modals/ShareModal'
import { TourModal } from '@components/_modals/TourModal'

import { share } from '../../presentation/common/share'

const { objectValuesAreEquals } = useUtils()

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

function StateProvider({ children }: StateProviderProps) {
	const [stateDataContext, setStateDataContext] = useState(initialValue.stateDataContext)

	const navigation = useNavigation<any>() // UserStack

	const setStateDataOnContext = async (data: ApplicationStateData) => {
		if (objectValuesAreEquals(stateDataContext, data)) return // REFACTOR Transformar em utils e aplicar à todos os updates de contextos para eviar atualizações de contexto desnecessárias
		setStateDataContext({ ...stateDataContext, ...data })
	}

	const sharePost = useCallback(() => {
		const { lastPostTitle, lastPostId } = stateDataContext
		share(`Olha o que estou anunciando no corre. \n\n${lastPostTitle}\n\nhttps://corre.social/p/${lastPostId}`)
	}, [stateDataContext])

	const toggleTourModalVisibility = useCallback((visibility: boolean, tourHandler?: any) => {
		if (stateDataContext.showTourModal === visibility) return
		setStateDataOnContext({ showTourModal: visibility })
	}, [stateDataContext])

	const toggleShareModalVisibility = useCallback((visibility: boolean) => {
		if (stateDataContext.showShareModal === visibility) return
		setStateDataOnContext({ showShareModal: visibility })
	}, [stateDataContext])

	const navigateToTour = useCallback(() => {
		navigation.navigate('SelectPostType' as any)
		setStateDataOnContext({ showTourModal: false })
	}, [])

	const closeTourModal = () => {
		setStateDataOnContext({ showTourModal: false })
		// setUserTourPerformed()
	}

	const closeShareModal = () => setStateDataOnContext({ showShareModal: false })

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
