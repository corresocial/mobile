/* eslint-disable no-useless-escape */
import React, { useEffect, useState } from 'react'
import { Keyboard, StatusBar } from 'react-native'

import { usePetitionContext } from '@contexts/PetitionContext'

import { InsertPetitionCPFScreenProps } from '@routes/Stack/PetitionStack/screenProps'

import { UiUtils } from '@utils-ui/common/UiUtils'

import { removeAllKeyboardEventListeners } from '@common/listenerFunctions'
import { theme } from '@common/theme'

import { PostInputText } from '@components/_onboarding/PostInputText'

const { validateCPF } = UiUtils()

function InsertPetitionCPF({ navigation }: InsertPetitionCPFScreenProps) {
	const { setPetitionSignatureOnContext } = usePetitionContext()

	const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			removeAllKeyboardEventListeners()
			Keyboard.addListener('keyboardDidShow', () => setKeyboardOpened(true))
			Keyboard.addListener('keyboardDidHide', () => setKeyboardOpened(false))
		})
		return unsubscribe
	}, [navigation])

	const savePetitionCPF = (inputText: string) => {
		setPetitionSignatureOnContext({ cpf: inputText })
		navigation.navigate('InsertPetitionCPF')
	}

	return (
		<>
			<StatusBar backgroundColor={theme.purple2} barStyle={'dark-content'} />
			<PostInputText
				multiline
				backgroundColor={theme.purple2}
				validationColor={theme.purple1}
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
