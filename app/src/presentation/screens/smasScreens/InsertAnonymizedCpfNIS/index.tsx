import React, { useContext, useEffect, useRef, useState } from 'react'
import { Keyboard, Platform, StatusBar, TextInput } from 'react-native'

import { SmasContext } from '@contexts/SmasContext'

import { InsertAnonymizedCpfNISScreenProps } from '@routes/Stack/PublicServicesStack/stackScreenProps'

import { CloudFunctionService } from '@services/cloudFunctions/CloudFunctionService'

import { ButtonContainer, Container, InputsContainer, InstructionButtonContainer } from './styles'
import CheckWhiteIcon from '@assets/icons/check-white.svg'
import { filterLeavingOnlyNumbers } from '@common/auxiliaryFunctions'
import { relativeScreenHeight } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { BackButton } from '@components/_buttons/BackButton'
import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { InstructionCard } from '@components/_cards/InstructionCard'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { FormContainer } from '@components/_containers/FormContainer'
import { DefaultInput } from '@components/_inputs/DefaultInput'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { Loader } from '@components/Loader'
import { ProgressBar } from '@components/ProgressBar'

const { getNisByUserData } = CloudFunctionService()

function InsertAnonymizedCpfNIS({ navigation }: InsertAnonymizedCpfNISScreenProps) {
	const { smasDataContext, getNumberOfMissingInfo, setSmasDataOnContext } = useContext(SmasContext)

	const [firstCpfValues, setFirstCpfValues] = useState('')
	const [lastCpfValues, setLastCpfValues] = useState('')
	const [firstCpfValuesIsValid, setFirstCpfValuesIsValid] = useState<boolean>(false)
	const [lastCpfValuesIsValid, setLastCpfValuesIsValid] = useState<boolean>(false)

	const [isLoading, setIsLoading] = React.useState(false)
	const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)

	const inputRefs = {
		firstCpfValuesRef: useRef<TextInput>(null),
		lastCpfValuesRef: useRef<TextInput>(null)
	}

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			Keyboard.addListener('keyboardDidShow', () => setKeyboardOpened(true))
			Keyboard.addListener('keyboardDidHide', () => setKeyboardOpened(false))
		})
		return unsubscribe
	}, [navigation])

	useEffect(() => {
		setFirstCpfValuesIsValid(validateFirstCpfValues(firstCpfValues))
		setLastCpfValuesIsValid(validateLastCpfValues(lastCpfValues))
	}, [firstCpfValues, lastCpfValues, keyboardOpened])

	const validateFirstCpfValues = (text: string) => { // TODO Domain?
		const cleanText = filterLeavingOnlyNumbers(text)
		return cleanText.length === 3
	}

	const validateLastCpfValues = (text: string) => {
		const cleanText = filterLeavingOnlyNumbers(text)
		return cleanText.length === 2
	}

	const saveDateOfBirthNIS = async () => {
		try {
			const anonymizedCpf = `${firstCpfValues}${lastCpfValues}`
			if (anonymizedCpf.length !== 5) return

			setSmasDataOnContext({ anonymizedCpf })

			if (getNumberOfMissingInfo() === 2) {
				setIsLoading(true)
				const res = await getNisByUserData({ ...smasDataContext, anonymizedCpf }, 'ANONIMIZADO')
				setIsLoading(false)

				return navigation.push('QueryNISResult', res)
			}
			navigation.push('SelectNISQueryData')
		} catch (err) {
			console.log(err)
			setIsLoading(false)
		}
	}

	const navigateBackwards = () => navigation.goBack()

	const getProgressBarState = () => {
		if (!getNumberOfMissingInfo()) return 3
		return 5 - getNumberOfMissingInfo()
	}

	return (
		<Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<StatusBar backgroundColor={theme.pink2} barStyle={'dark-content'} />
			<DefaultHeaderContainer
				minHeight={relativeScreenHeight(35)}
				relativeHeight={'55%'}
				centralized
				flexDirection={'column'}
				backgroundColor={theme.pink2}
			>
				<InstructionButtonContainer >
					<BackButton onPress={navigateBackwards} />
					<InstructionCard
						borderLeftWidth={5}
						fontSize={16}
						message={'consultar seu NIS'}
						highlightedWords={['NIS']}
					/>
				</InstructionButtonContainer >
				<VerticalSpacing />
				<InstructionButtonContainer withPaddingLeft>
					<InstructionCard
						fontSize={16}
						message={'precisamos dos 3 primeiros e 2 últimos digitos do seu CPF'}
						highlightedWords={['3', 'primeiros', '2', 'últimos', 'seu', 'CPF']}
					>
						<ProgressBar value={getProgressBarState()} range={3} />
					</InstructionCard>
				</InstructionButtonContainer>
			</DefaultHeaderContainer>
			<FormContainer
				backgroundColor={theme.white3}
				justifyContent={'center'}
			>
				<InputsContainer>
					<DefaultInput
						value={firstCpfValues}
						relativeWidth={'45%'}
						textInputRef={inputRefs.firstCpfValuesRef}
						nextInputRef={inputRefs.lastCpfValuesRef}
						defaultBackgroundColor={theme.white2}
						validBackgroundColor={theme.pink1}
						maxLength={3}
						fontSize={22}
						placeholder={'123'}
						keyboardType={'decimal-pad'}
						filterText={filterLeavingOnlyNumbers}
						validateText={(text: string) => validateFirstCpfValues(text)}
						onChangeText={(text: string) => setFirstCpfValues(text)}
					/>
					<DefaultInput
						value={lastCpfValues}
						relativeWidth={'45%'}
						previousInputRef={inputRefs.firstCpfValuesRef}
						textInputRef={inputRefs.lastCpfValuesRef}
						defaultBackgroundColor={theme.white2}
						validBackgroundColor={theme.pink1}
						maxLength={2}
						fontSize={22}
						placeholder={'45'}
						keyboardType={'decimal-pad'}
						lastInput
						filterText={filterLeavingOnlyNumbers}
						validateText={(text: string) => validateLastCpfValues(text)}
						onChangeText={(text: string) => setLastCpfValues(text)}
					/>
				</InputsContainer>
				<ButtonContainer>
					{
						isLoading
							? <Loader />
							: firstCpfValuesIsValid && lastCpfValuesIsValid && !keyboardOpened && (
								<PrimaryButton
									startsHidden
									keyboardHideButton={false}
									color={theme.green3}
									label={'continuar'}
									labelColor={theme.white3}
									SecondSvgIcon={CheckWhiteIcon}
									onPress={saveDateOfBirthNIS}
								/>
							)
					}
				</ButtonContainer>
			</FormContainer>
		</Container>
	)
}

export { InsertAnonymizedCpfNIS }
