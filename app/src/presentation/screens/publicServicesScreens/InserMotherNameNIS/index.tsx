import React, { useContext, useEffect, useState } from 'react'
import { Keyboard, StatusBar } from 'react-native'

import { SmasContext } from '@contexts/SmasContext'

import { InsertMotherNameNISScreenProps } from '@routes/Stack/PublicServicesStack/stackScreenProps'

import { theme } from '@common/theme'

import { PublicServicesAdapter } from '@adapters/publicService/PublicServiceAdapter'

import { PostInputText } from '@components/_onboarding/PostInputText'

const { validateName } = PublicServicesAdapter()

function InsertMotherNameNIS({ navigation }: InsertMotherNameNISScreenProps) {
	const { setSmasDataOnContext, getNumberOfMissingInfo } = useContext(SmasContext)

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

	const saveNIS = async (motherName: string) => {
		setSmasDataOnContext({ motherName })
		navigation.push('SelectNISQueryData')
	}

	const getProgressBarState = () => {
		console.log(getNumberOfMissingInfo())
		if (!getNumberOfMissingInfo()) return 3
		return 5 - getNumberOfMissingInfo()
	}

	return (
		<>
			<StatusBar backgroundColor={theme.pink2} barStyle={'dark-content'} />
			<PostInputText
				contextTitle={'consultar seu NIS'}
				contextHighlightedWords={['NIS']}
				customTitle={'precisamos do nome completo da sua mãe'}
				customHighlight={['nome', 'completo', 'mãe']}
				backgroundColor={theme.pink2}
				height={'50%'}
				inputPlaceholder={'ex: Maria Candida'}
				keyboardOpened={keyboardOpened}
				progress={[getProgressBarState(), 3]}
				validationColor={keyboardOpened ? theme.white2 : theme.pink1}
				validateInputText={validateInputName}
				navigateBackwards={() => navigation.goBack()}
				saveTextData={saveNIS}
			/>
		</>
	)
}

export { InsertMotherNameNIS }
