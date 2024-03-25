import React, { useContext, useEffect, useState } from 'react'
import { Keyboard, StatusBar } from 'react-native'

import { SmasRecoveryNISData } from '@domain/entities/smas/types'

import { SmasContext } from '@contexts/SmasContext'

import { InsertMotherNameNISScreenProps } from '@routes/Stack/PublicServicesStack/screenProps'

import { useCloudFunctionService } from '@services/cloudFunctions/useCloudFunctionService'

import { theme } from '@common/theme'

import { SmasAdapter } from '@adapters/smas/SmasAdapter'

import { PostInputText } from '@components/_onboarding/PostInputText'

const { validateName } = SmasAdapter()

const { getNisByUserData } = useCloudFunctionService()

function InsertMotherNameNIS({ navigation }: InsertMotherNameNISScreenProps) {
	const { smasDataContext, setSmasDataOnContext, getNumberOfMissingInfo } = useContext(SmasContext)

	const [isLoading, setIsLoading] = React.useState(false)
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

	const saveMotherNameNIS = async (motherName: string) => {
		try {
			setSmasDataOnContext({ motherName })

			if (getNumberOfMissingInfo() === 2) {
				setIsLoading(true)
				const res = await getNisByUserData({ ...smasDataContext, motherName } as SmasRecoveryNISData, 'ANONIMIZADO')
				setIsLoading(false)

				return navigation.push('QueryNISResult', res)
			}

			navigation.push('SelectNISQueryData')
		} catch (err) {
			console.log(err)
			setIsLoading(false)
		}
	}

	const getProgressBarState = () => {
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
				isLoading={isLoading}
				inputPlaceholder={'ex: Maria Candida'}
				keyboardOpened={keyboardOpened}
				progress={[getProgressBarState(), 3]}
				validationColor={keyboardOpened ? theme.white2 : theme.pink1}
				validateInputText={validateInputName}
				navigateBackwards={() => navigation.goBack()}
				saveTextData={saveMotherNameNIS}
			/>
		</>
	)
}

export { InsertMotherNameNIS }
