import React, { useContext, useEffect, useState } from 'react'
import { Keyboard, StatusBar } from 'react-native'

import { SmasRecoveryNISData } from '@domain/smas/entity/types'
import { useSmasDomain } from '@domain/smas/useSmasDomain'

import { SmasContext } from '@contexts/SmasContext'

import { InsertMotherNameNISScreenProps } from '@routes/Stack/PublicServicesStack/screenProps'

import { useCloudFunctionService } from '@services/cloudFunctions/useCloudFunctionService'

import { theme } from '@common/theme'

import { PostInputText } from '@components/_onboarding/PostInputText'

const { validateName } = useSmasDomain()

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
			<StatusBar backgroundColor={theme.colors.pink[2]} barStyle={'dark-content'} />
			<PostInputText
				contextTitle={'consultar seu NIS'}
				contextHighlightedWords={['NIS']}
				customTitle={'precisamos do nome completo da sua mãe, sem acentos'}
				customHighlight={['nome', 'completo', 'mãe,', 'sem', 'acentos']}
				backgroundColor={theme.colors.pink[2]}
				height={'55%'}
				isLoading={isLoading}
				inputPlaceholder={'ex: Maria Candida'}
				keyboardOpened={keyboardOpened}
				progress={[getProgressBarState(), 3]}
				validationColor={keyboardOpened ? theme.colors.white[2] : theme.colors.pink[1]}
				validateInputText={validateInputName}
				navigateBackwards={() => navigation.goBack()}
				saveTextData={saveMotherNameNIS}
			/>
		</>
	)
}

export { InsertMotherNameNIS }
