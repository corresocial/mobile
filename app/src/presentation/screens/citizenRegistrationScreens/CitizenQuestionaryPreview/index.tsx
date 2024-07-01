import React, { useEffect, useState } from 'react'
import { ListRenderItem, StatusBar } from 'react-native'
import { useTheme } from 'styled-components'

import { CitizenRegisterUseCases } from '@domain/citizenRegister/adapter/CitizenRegisterUseCases'
import { CitizenRegisterEntity, CitizenRegisterQuestionResponse } from '@domain/citizenRegister/model/entities/types'

import { useAuthContext } from '@contexts/AuthContext'
import { useCitizenRegistrationContext } from '@contexts/CitizenRegistrationContext'
import { useLoaderContext } from '@contexts/LoaderContext'

import { CitizenQuestionaryPreviewScreenProps } from '@routes/Stack/CitizenRegistrationStack/screenProps'
import { FlatListItem } from 'src/presentation/types'

import { Body, HeaderActionsContainer, HeaderContainer, QuestionsList } from './styles'
import EditCitizenIcon from '@assets/icons/editCitizen-white.svg'
import trashIcon from '@assets/icons/trash-white.svg'
import { relativeScreenDensity } from '@common/screenDimensions'

import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { SmallButton } from '@components/_buttons/SmallButton'
import { QuestionCard } from '@components/_cards/QuestionCard'
import { ScreenContainer } from '@components/_containers/ScreenContainer'
import { DefaultConfirmationModal } from '@components/_modals/DefaultConfirmationModal'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { CitizenQuestionHeader } from '@components/CitizenQuestionHeader'
import { DefaultPostViewHeader } from '@components/DefaultPostViewHeader'

const citizenUseCases = new CitizenRegisterUseCases()

function CitizenQuestionaryPreview({ route, navigation }: CitizenQuestionaryPreviewScreenProps) {
	const { userDataContext } = useAuthContext()
	const { citizenRegistrationResponseData, citizenRegistrationIdentifier, startNewCitizenRegistration } = useCitizenRegistrationContext()
	const { setLoaderIsVisible } = useLoaderContext()

	const [defaultConfirmationModalIsVisible, setDefaultConfirmationModalIsVisible] = useState(false)

	const theme = useTheme()

	const registerIsStored = !!(route.params && route.params.registerData)
	const hasResponsesFromRoute = (route.params && route.params.registerData && route.params.registerData && route.params.registerData.responses && route.params.registerData.responses.length)
	const registerData = route.params?.registerData || citizenRegistrationIdentifier
	const citizenRegisterResponses = hasResponsesFromRoute
		? route.params.registerData.responses
		: citizenRegistrationResponseData // citizenUseCases.getCitizenRegistrationQuestionary()

	useEffect(() => {
		startNewCitizenRegistration()
	}, [])

	const startCitizenRegistration = () => {
		navigation.navigate('InsertCitizenCellNumber')
	}

	const saveCitizenRegister = async () => {
		try {
			if (!registerIsStored) return

			setLoaderIsVisible(true)
			await citizenUseCases.createCitizenRegister(userDataContext, registerData as CitizenRegisterEntity)
			await deleteCitizenRegister(registerData?.citizenRegisterId)
			setLoaderIsVisible(false)
			navigation.goBack()
		} catch (error) {
			console.log(error)
			setLoaderIsVisible(false)
		}
	}

	const deleteCitizenRegister = async (registerId?: string) => {
		try {
			if (!registerIsStored) {
				console.log('Remover do contexto em progresso')
				return
			}

			!registerId && setLoaderIsVisible(true)
			const citizenRegisterId = route.params && route.params.registerData && route.params.registerData.citizenRegisterId
			await citizenUseCases.deleteOfflineCitizenRegister(registerId || citizenRegisterId as string)
			!registerId && setLoaderIsVisible(false)
			navigation.goBack()
		} catch (error) {
			console.log(error)
			setLoaderIsVisible(false)
		}
	}

	const toggleDefaultConfirmationModalVisibility = () => {
		setDefaultConfirmationModalIsVisible(!defaultConfirmationModalIsVisible)
	}

	const navigateToNextReponseScreen = (nextQuestion: CitizenRegisterQuestionResponse | null) => {
		if (nextQuestion === null) return navigation.navigate('FinishCitizenRegistration')

		switch (nextQuestion.questionType) {
			case 'binary': return navigation.push('InsertBinaryResponse', { questionData: nextQuestion })
			case 'satisfaction': return navigation.push('InsertSatisfactionResponse', { questionData: nextQuestion })
			case 'textual': return navigation.push('InsertTextualResponse', { questionData: nextQuestion })
			case 'numerical': return navigation.push('InsertTextualResponse', { questionData: nextQuestion })
			case 'select': {
				navigation.push('InsertSelectResponse', { questionData: nextQuestion })
				break
			}
		}
	}

	const renderQuestion = ({ item }: FlatListItem<CitizenRegisterQuestionResponse>) => {
		return (
			<QuestionCard
				question={item.question}
				answer={item.response || ''}
				questionType={item.questionType}
				onPress={() => navigateToNextReponseScreen(item)}
			/>
		)
	}

	return (
		<ScreenContainer topSafeAreaColor={theme.white3} infinityBottom >
			<StatusBar barStyle={'dark-content'} />
			<DefaultConfirmationModal
				visibility={defaultConfirmationModalIsVisible}
				title={'apagar'}
				text={`você tem certeza que deseja apagar o Cadastro Cidadão ${registerData?.name ? `de ${registerData?.name}` : ''}?`}
				highlightedWords={[`${registerData?.name || 'cidadão'}?`]}
				buttonKeyword={'apagar'}
				closeModal={toggleDefaultConfirmationModalVisibility}
				onPressButton={deleteCitizenRegister}
			/>
			<HeaderContainer>
				<DefaultPostViewHeader
					text={'questionário cidadão'}
					highlightedWords={['cidadão']}
					ignorePlatform
					onBackPress={() => console.log('Voltando para home')}
				/>
				<HeaderActionsContainer isEditMode={!registerIsStored}>
					<PrimaryButton
						label={registerIsStored ? 'enviar' : 'responder'}
						highlightedWords={[registerIsStored ? 'enviar' : 'responder']}
						color={theme.green3}
						fontSize={14}
						SecondSvgIcon={EditCitizenIcon}
						svgIconScale={['50%', '30%']}
						minHeight={45}
						relativeHeight={relativeScreenDensity(45)}
						labelColor={theme.white3}
						onPress={registerIsStored ? saveCitizenRegister : startCitizenRegistration}
					/>
					<SmallButton
						relativeWidth={relativeScreenDensity(45)}
						height={relativeScreenDensity(45)}
						SvgIcon={trashIcon}
						onPress={toggleDefaultConfirmationModalVisibility}
						color={theme.red3}
					/>
				</HeaderActionsContainer>
			</HeaderContainer>
			<Body>

				<QuestionsList
					data={citizenRegisterResponses}
					renderItem={renderQuestion as ListRenderItem<unknown>}
					ListHeaderComponent={(
						<>
							<VerticalSpacing height={2} />
							<QuestionCard
								question={'gostaria de deixar o seu telefone para contato?'}
								answer={registerData?.cellNumber}
								questionType={'textual'}
								onPress={() => navigation.navigate('InsertCitizenCellNumber')}
							/>
							<VerticalSpacing />
							<QuestionCard
								question={'Como você se chama?'}
								answer={registerData?.name}
								questionType={'textual'}
								onPress={() => navigation.navigate('InsertCitizenName')}
							/>
							<VerticalSpacing />

						</>
					)}
					ItemSeparatorComponent={() => <VerticalSpacing />}
					ListFooterComponent={<VerticalSpacing bottomNavigatorSpace />}
					showsVerticalScrollIndicator={false}
				/>
			</Body>
		</ScreenContainer>
	)
}

export { CitizenQuestionaryPreview }
