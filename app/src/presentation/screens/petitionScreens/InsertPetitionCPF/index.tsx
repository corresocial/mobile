/* eslint-disable no-useless-escape */
import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { Keyboard, StatusBar } from 'react-native'

import { ExtraIdentificationRequest } from '@domain/petition/entity/types'

import { usePetitionContext } from '@contexts/PetitionContext'

import { InsertPetitionCPFScreenProps } from '@routes/Stack/PetitionStack/screenProps'
import { PetitionStackParamList } from '@routes/Stack/PetitionStack/types'

import { UiUtils } from '@utils-ui/common/UiUtils'

import { theme } from '@common/theme'

import { PostInputText } from '@components/_onboarding/PostInputText'

const { validateCPF } = UiUtils()

function InsertPetitionCPF({ navigation }: InsertPetitionCPFScreenProps) {
	const { setPetitionSignatureOnContext, petitionSignatureDataWithoutResponse } = usePetitionContext()

	const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)

	useFocusEffect(useCallback(() => {
		const keyboardDidShowSubscription = Keyboard.addListener('keyboardDidShow', () => setKeyboardOpened(true))
		const keyboardDidHideSubscription = Keyboard.addListener('keyboardDidHide', () => setKeyboardOpened(false))
		return () => {
			keyboardDidShowSubscription.remove()
			keyboardDidHideSubscription.remove()
		}
	}, []))

	const savePetitionCPF = (inputText: string) => {
		setPetitionSignatureOnContext({ cpf: inputText })
		navigateToNextScreen('cpf')
	}

	const navigateToNextScreen = (currentInfo: ExtraIdentificationRequest) => {
		const nextQuestions = petitionSignatureDataWithoutResponse()?.filter((info) => info !== currentInfo)
		if (!nextQuestions || !nextQuestions.length) return navigation.navigate('FinishPetitionSignature')
		switch (nextQuestions[0]) { 								// TODO Type
			case 'cpf': return navigation.navigate('PetitionStack' as any, { screen: 'InsertPetitionCPF' as keyof PetitionStackParamList })
			case 'rg': return navigation.navigate('PetitionStack' as any, { screen: 'InsertPetitionRG' as keyof PetitionStackParamList })
			case 'telefone': return navigation.navigate('PetitionStack' as any, { screen: 'InsertPetitionPhone' as keyof PetitionStackParamList })
		}
	}

	return (
		<>
			<StatusBar backgroundColor={theme.colors.purple[2]} barStyle={'dark-content'} />
			<PostInputText
				initialValue={''}
				backgroundColor={theme.colors.purple[2]}
				validationColor={theme.colors.purple[1]}
				customTitle={'qual é o seu CPF?'}
				customHighlight={['CPF?']}
				inputPlaceholder={'escreva seu CPF aqui...'}
				keyboardType={'numeric'}
				keyboardOpened={keyboardOpened}
				validateInputText={validateCPF}
				navigateBackwards={() => navigation.goBack()}
				saveTextData={savePetitionCPF}
			/>
		</>
	)
}

export { InsertPetitionCPF }
