import React, { useContext, useEffect, useState } from 'react'
import { Keyboard, StatusBar } from 'react-native'

import { SmasContext } from '@contexts/SmasContext'

import { InsertNameNISScreenProps } from '@routes/Stack/PublicServicesStack/stackScreenProps'

import { theme } from '@common/theme'

import { PublicServicesAdapter } from '@adapters/publicService/PublicServiceAdapter'

import { PostInputText } from '@components/_onboarding/PostInputText'

const { validateName } = PublicServicesAdapter()

function InsertNameNIS({ navigation }: InsertNameNISScreenProps) {
	const { setSmasDataOnContext } = useContext(SmasContext)

	const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			Keyboard.addListener('keyboardDidShow', () => setKeyboardOpened(true))
			Keyboard.addListener('keyboardDidHide', () => setKeyboardOpened(false))
		})
		return unsubscribe
	}, [navigation])

	const validateInputName = (name: string) => {
		const isValid = validateName(name)
		return isValid && !keyboardOpened
	}

	const saveNIS = async (name: string) => {
		setSmasDataOnContext({ name })
		navigation.navigate('SelectNISQueryData')
	}

	return (
		<>
			<StatusBar backgroundColor={theme.pink2} barStyle={'dark-content'} />
			<PostInputText
				customTitle={'nos informe seu nome completo sem acentos'}
				customHighlight={['nome', 'completo', 'sem', 'acentos']}
				contextTitle={'consultar NIS'}
				contextHighlightedWords={['NIS']}
				backgroundColor={theme.pink2}
				height={'50%'}
				inputPlaceholder={'ex: Maria Candida'}
				keyboardOpened={keyboardOpened}
				progress={[1, 3]}
				validationColor={keyboardOpened ? theme.white2 : theme.pink1}
				validateInputText={validateInputName}
				navigateBackwards={() => navigation.goBack()}
				saveTextData={saveNIS}
			/>
		</>
	)
}

export { InsertNameNIS }
