/* eslint-disable no-useless-escape */
import React, { useEffect, useState } from 'react'
import { Keyboard, StatusBar } from 'react-native'

import { ExtraIdentificationRequest } from '@domain/petition/entity/types'

import { usePetitionContext } from '@contexts/PetitionContext'

import { InsertPetitionRGScreenProps } from '@routes/Stack/PetitionStack/screenProps'
import { PetitionStackParamList } from '@routes/Stack/PetitionStack/types'

import { UiUtils } from '@utils-ui/common/UiUtils'

import { removeAllKeyboardEventListeners } from '@common/listenerFunctions'
import { theme } from '@common/theme'

import { PostInputText } from '@components/_onboarding/PostInputText'

const { validateRG } = UiUtils()

function InsertPetitionRG({ navigation }: InsertPetitionRGScreenProps) {
	const { setPetitionSignatureOnContext, petitionSignatureDataWithoutResponse } = usePetitionContext()

	const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			removeAllKeyboardEventListeners()
			Keyboard.addListener('keyboardDidShow', () => setKeyboardOpened(true))
			Keyboard.addListener('keyboardDidHide', () => setKeyboardOpened(false))
		})
		return unsubscribe
	}, [navigation])

	const validatePetitionRG = (text: string) => {
		const isValid = validateRG(text)
		return (isValid && !keyboardOpened)
	}

	const savePetitionRG = (inputText: string) => {
		setPetitionSignatureOnContext({ rg: inputText })
		navigateToNextScreen('rg')
	}

	const navigateToNextScreen = (currentInfo: ExtraIdentificationRequest) => {
		const nextQuestions = petitionSignatureDataWithoutResponse()
		if (!nextQuestions) return navigation.navigate('FinishPetitionSignature')
		switch (nextQuestions.filter((info) => info !== currentInfo)[0]) { 								// TODO Type
			case 'cpf': return navigation.navigate('PetitionStack' as any, { screen: 'InsertPetitionCPF' as keyof PetitionStackParamList })
			case 'rg': return navigation.navigate('PetitionStack' as any, { screen: 'InsertPetitionRG' as keyof PetitionStackParamList })
			case 'telefone': return navigation.navigate('PetitionStack' as any, { screen: 'InsertPetitionPhone' as keyof PetitionStackParamList })
		}
	}

	return (
		<>
			<StatusBar backgroundColor={theme.colors.purple[2]} barStyle={'dark-content'} />
			<PostInputText
				backgroundColor={theme.colors.purple[2]}
				validationColor={theme.colors.purple[1]}
				customTitle={'qual é o seu RG?'}
				customHighlight={['RG?']}
				inputPlaceholder={'escreva seu RG aqui...'}
				keyboardType={'numeric'}
				keyboardOpened={keyboardOpened}
				validateInputText={validatePetitionRG}
				navigateBackwards={() => navigation.goBack()}
				saveTextData={savePetitionRG}
			/>
		</>
	)
}

export { InsertPetitionRG }
