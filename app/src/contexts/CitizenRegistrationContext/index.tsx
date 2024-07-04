/* eslint-disable no-restricted-syntax */
import * as Battery from 'expo-battery'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

import { CitizenRegisterUseCases } from '@domain/citizenRegister/adapter/CitizenRegisterUseCases'
import { CitizenRegisterQuestionObservation, CitizenRegisterQuestionResponse } from '@domain/citizenRegister/model/entities/types'

import { CitizenRegistrationContextType, CitizenRegistrationIdentifier, CitizenRegistrationProviderProps } from './types'

import { LowBatteryModal } from '@components/_modals/LowBatteryModal'
import { ObservationsBottomSheet, ObservationsBottomSheetRef } from '@components/ObservationsBottomSheet'

const CitizenRegistrationContext = createContext<CitizenRegistrationContextType>({} as CitizenRegistrationContextType)

const citizenUseCases = new CitizenRegisterUseCases()

const initialCitizenRegisterIdentifier: CitizenRegistrationIdentifier = {
	cellNumber: '',
	name: '',
	citizenHasAccount: false
}

function CitizenRegistrationProvider({ children }: CitizenRegistrationProviderProps) {
	const [citizenRegistrationQuestionToRespond, setCitizenRegistrationQuestionToRespond] = useState<CitizenRegisterQuestionResponse[]>([])
	const [citizenRegistrationResponseData, setCitizenRegistrationResponseData] = useState<CitizenRegisterQuestionResponse[]>([])
	const [citizenRegistrationIdentifier, setCitizenRegistrationIdentifier] = useState<CitizenRegistrationIdentifier>(initialCitizenRegisterIdentifier)

	const [currentQuestionId, setCurrentQuestionId] = useState<string>('')

	const [showLowBatteryModal, setShowLowBatteryModal] = useState<boolean>(false)
	const [showedLowBatteryModal, setShowedLowBatteryModal] = useState<boolean>(false)

	const bottomSheetObservationsRef = useRef<ObservationsBottomSheetRef>(null)

	useEffect(() => {
		const subscription = Battery.addBatteryLevelListener(({ batteryLevel }) => {
			if (batteryLevel <= 0.2 && !showedLowBatteryModal) {
				setShowLowBatteryModal(true)
				setShowedLowBatteryModal(true)
			}

			if (batteryLevel > 0.2 && !showedLowBatteryModal) {
				setShowedLowBatteryModal(false)
			}
		})

		return () => subscription.remove()
	}, [])

	const startNewCitizenRegistration = async () => {
		console.log('Um novo cadastro foi iniciado!')

		const citizenRegistrationQuestionary = citizenUseCases.getCitizenRegistrationQuestionary()

		const citizenRegistrationInProgress = await citizenUseCases.getCitizenRegistrationInProgress()
		if (citizenRegistrationInProgress) {
			setCitizenRegistrationQuestionToRespond(citizenRegistrationQuestionary)
			setCitizenRegistrationIdentifier({ ...citizenRegistrationInProgress })
			citizenRegistrationInProgress
				&& citizenRegistrationInProgress.responses
				&& setCitizenRegistrationResponseData(citizenRegistrationInProgress.responses)
			return
		}

		setCitizenRegistrationQuestionToRespond(citizenRegistrationQuestionary)
		setCitizenRegistrationIdentifier(initialCitizenRegisterIdentifier)

		const citizenRegisterResponseMapper = citizenRegistrationQuestionary.map((question) => { // Mapeia todas as questões no contexto
			return { ...question, response: '' }
		}) as CitizenRegisterQuestionResponse[]

		setCitizenRegistrationResponseData(citizenRegisterResponseMapper)
	}

	const saveCitizenRegistrationIdentifier = useCallback((data: CitizenRegistrationIdentifier) => {
		setCitizenRegistrationIdentifier({ ...citizenRegistrationIdentifier, ...data })
	}, [citizenRegistrationIdentifier])

	const getNextQuestion = (lastQuestion: CitizenRegisterQuestionResponse) => {
		const lastQuestionId = lastQuestion ? lastQuestion.questionId : ''
		const currentQuestionIndex = citizenRegistrationResponseData.findIndex(({ questionId }) => questionId === lastQuestionId)
		const nextIndex = currentQuestionIndex + 1
		if (nextIndex >= citizenRegistrationResponseData.length) return null
		return citizenRegistrationQuestionToRespond[nextIndex]
	}

	const getNextUnansweredRequiredQuestion = (): CitizenRegisterQuestionResponse | null => {
		for (const response of citizenRegistrationResponseData) {
			if (!isAnswered(response)) return response
		}
		return null
	}

	const isAnswered = (response: CitizenRegisterQuestionResponse): boolean => {
		const { questionType, response: responseValue, multiSelect } = response

		if (responseValue === undefined || responseValue === null) return false

		switch (questionType) {
			case 'textual':
				return typeof responseValue === 'string' && responseValue.trim() !== ''
			case 'numerical':
				return typeof responseValue === 'string' && responseValue !== ''
			case 'binary':
				return typeof responseValue === 'boolean'
			case 'select':
				if (multiSelect) {
					return Array.isArray(responseValue) && responseValue.length > 0 && responseValue.every((option) => option.trim() !== '')
				}
				return Array.isArray(responseValue) && responseValue.length > 0 && responseValue.every((option) => option.trim() !== '')

			case 'satisfaction':
				return typeof responseValue === 'number' && responseValue >= 1 && responseValue <= 5
			default:
				return false
		}
	}

	const getResponseProgress = (questionId: string) => {
		setCurrentQuestionId(questionId)

		const numberOfResponses = citizenRegistrationResponseData.length
		const currentQuestionIndex = citizenRegistrationResponseData.findIndex(({ questionId: id }) => id === questionId)
		return [(numberOfResponses + 1) - (numberOfResponses - currentQuestionIndex), numberOfResponses]
	}

	const saveResponseData = async (question: CitizenRegisterQuestionResponse, response: CitizenRegisterQuestionResponse['response'], specificResponse?: string) => {
		const extraInfo = specificResponse ? { specificResponse: specificResponse } : { specificResponse: '' }
		const currentQuestion = citizenRegistrationResponseData.find((q) => q.questionId === question.questionId)

		if (!currentQuestion) return

		const registerData: CitizenRegisterQuestionResponse = {
			...currentQuestion,
			...extraInfo,
			response: response,
		}

		const isExisting = citizenRegistrationResponseData.some(
			(citizenRegister) => citizenRegister.questionId === question.questionId
		)

		const updatedResponses = isExisting
			? citizenRegistrationResponseData.map((citizenRegister) => (citizenRegister.questionId === question.questionId ? registerData : citizenRegister))
			: [...citizenRegistrationResponseData, registerData]

		await citizenUseCases.saveCitizenRegistrationProgress({
			...citizenRegistrationIdentifier,
			responses: updatedResponses,
		})
		setCitizenRegistrationResponseData(updatedResponses)
	}

	const getObservations = () => {
		if (!Array.isArray(citizenRegistrationResponseData)) return
		const observations: CitizenRegisterQuestionObservation[] = []
		citizenRegistrationResponseData.forEach((register) => {
			if (register.observations && Array.isArray(register.observations)) {
				observations.push(...register.observations)
			}
		})

		return observations
	}

	const showQuestionObservations = () => {
		bottomSheetObservationsRef && bottomSheetObservationsRef.current?.show()
	}

	const addNewObservation = (message: string) => {
		const newObservation = { questionId: currentQuestionId, message }
		const currentQuestion = citizenRegistrationResponseData.find((question) => question.questionId === currentQuestionId)
		const newRegistrationResponses = citizenRegistrationResponseData.map((questionResponse) => (
			currentQuestionId === questionResponse.questionId
				? { ...currentQuestion, observations: [...(questionResponse.observations || []), newObservation] }
				: questionResponse
		))

		setCitizenRegistrationResponseData(newRegistrationResponses as CitizenRegisterQuestionResponse[])
	}

	const removeObservation = (observation: CitizenRegisterQuestionObservation) => {
		const newRegistrationResponses = citizenRegistrationResponseData.map((questionResponse) => {
			if (questionResponse.questionId === observation.questionId) {
				const newObservations = questionResponse.observations?.filter((obs) => obs.message !== observation.message)
				return { ...questionResponse, observations: newObservations }
			}
			return questionResponse
		})

		setCitizenRegistrationResponseData(newRegistrationResponses as CitizenRegisterQuestionResponse[])
	}

	const CitizenProviderData = useMemo(() => ({
		citizenRegistrationQuestionToRespond,
		citizenRegistrationResponseData,
		citizenRegistrationIdentifier,
		startNewCitizenRegistration,
		saveCitizenRegistrationIdentifier,
		getNextQuestion,
		getNextUnansweredRequiredQuestion,
		getResponseProgress,
		saveResponseData,
		showQuestionObservations
	}

	), [citizenRegistrationResponseData, citizenRegistrationQuestionToRespond, citizenRegistrationIdentifier])

	return (
		<CitizenRegistrationContext.Provider value={CitizenProviderData}>
			<ObservationsBottomSheet
				ref={bottomSheetObservationsRef}
				observations={getObservations() || []}
				addNewObservation={addNewObservation}
				deleteObservation={removeObservation}
			/>
			{showLowBatteryModal && <LowBatteryModal isVisible={showLowBatteryModal} onConfirm={() => setShowLowBatteryModal(false)} />}
			{children}
		</CitizenRegistrationContext.Provider>
	)
}

const useCitizenRegistrationContext = () => useContext(CitizenRegistrationContext)

export { CitizenRegistrationProvider, useCitizenRegistrationContext }
