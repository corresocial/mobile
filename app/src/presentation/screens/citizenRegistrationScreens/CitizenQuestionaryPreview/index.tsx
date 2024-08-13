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

import { UiUtils } from '@utils-ui/common/UiUtils'

import { Body, CreatedAtText, CreatorContainer, CreatorDataContainer, CreatorNameText, HeaderActionsContainer, HeaderContainer, QuestionsList, ToggleButtonContainer } from './styles'
import EditCitizenIcon from '@assets/icons/editCitizen-white.svg'
import QuestionaryIcon from '@assets/icons/questionary-white.svg'
import TrashIcon from '@assets/icons/trash-white.svg'
import { relativeScreenDensity } from '@common/screenDimensions'

import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { SmallButton } from '@components/_buttons/SmallButton'
import { InstructionCard } from '@components/_cards/InstructionCard'
import { LocationViewCard } from '@components/_cards/LocationViewCard'
import { QuestionCard } from '@components/_cards/QuestionCard'
import { ScreenContainer } from '@components/_containers/ScreenContainer'
import { DefaultConfirmationModal } from '@components/_modals/DefaultConfirmationModal'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { DefaultPostViewHeader } from '@components/DefaultPostViewHeader'

const citizenUseCases = new CitizenRegisterUseCases()

const { formatRelativeDate } = UiUtils()

function CitizenQuestionaryPreview({ route, navigation }: CitizenQuestionaryPreviewScreenProps) {
	const { userDataContext } = useAuthContext()
	const { citizenRegistrationResponseData, citizenRegistrationIdentifier, startNewCitizenRegistration, getNextUnansweredRequiredQuestion } = useCitizenRegistrationContext()
	const { setLoaderIsVisible } = useLoaderContext()

	const [defaultConfirmationModalIsVisible, setDefaultConfirmationModalIsVisible] = useState(false)
	const [presentationIsVisible, setPresentationIsVisible] = useState(false)

	const theme = useTheme()

	const coordinatorView = route.params?.coordinatorView
	const registerIsStored = !!(route.params && route.params.registerData)
	const hasResponsesFromRoute = (route.params && route.params.registerData && route.params.registerData && route.params.registerData.responses && route.params.registerData.responses.length)
	const registerData = route.params?.registerData || citizenRegistrationIdentifier as CitizenRegisterEntity
	const citizenRegisterResponses = hasResponsesFromRoute
		? route.params.registerData.responses
		: citizenRegistrationResponseData

	useEffect(() => {
		!coordinatorView && startNewCitizenRegistration()
	}, [])

	const startCitizenRegistration = () => {
		const nextQuestion = getNextUnansweredRequiredQuestion()

		if (nextQuestion?.questionId === '3') { // Primeira questão que pertence ao fluxo
			return navigation.navigate('InsertCitizenCellNumber')
		}
		navigateToNextReponseScreen(nextQuestion as CitizenRegisterQuestionResponse)
	}

	const saveCitizenRegister = async () => {
		try {
			if (!registerIsStored) return

			setLoaderIsVisible(true)
			setTimeout(() => {
				return setLoaderIsVisible(false)
			}, 10000)

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
				await citizenUseCases.removeCitizenRegistrationInProgress()
				startNewCitizenRegistration()
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
				questionId={item.questionId}
				question={item.question}
				answer={item.response || ''}
				questionType={item.questionType}
				optional={item.optional}
				onPress={!registerIsStored ? () => navigateToNextReponseScreen(item) : undefined}
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
					text={coordinatorView ? registerData.name : 'questionário cidadão'}
					highlightedWords={coordinatorView ? registerData.name ? registerData.name.split(' ') : [''] : ['cidadão']}
					ignorePlatform
					onBackPress={() => navigation.goBack()}
				/>

				{
					coordinatorView
						? (
							<HeaderActionsContainer>
								<CreatorContainer>
									<QuestionaryIcon width={relativeScreenDensity(30)} height={relativeScreenDensity(30)} />
									<CreatorDataContainer>
										<CreatorNameText>
											{registerData.censusTakerName}
										</CreatorNameText>
										<CreatedAtText>
											{formatRelativeDate(registerData.createdAt)}
										</CreatedAtText>
									</CreatorDataContainer>
								</CreatorContainer>
							</HeaderActionsContainer>
						)
						: (
							<HeaderActionsContainer>
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
									SvgIcon={TrashIcon}
									onPress={toggleDefaultConfirmationModalVisibility}
									color={theme.red3}
								/>
							</HeaderActionsContainer>
						)
				}
			</HeaderContainer>
			<Body>
				<QuestionsList
					data={citizenRegisterResponses}
					renderItem={renderQuestion as ListRenderItem<unknown>}
					ListHeaderComponent={(
						<>
							{
								!coordinatorView ? (
									<>
										<VerticalSpacing height={2} />
										<ToggleButtonContainer>
											<SmallButton
												relativeWidth={'65%'}
												label={`${presentationIsVisible ? 'Esconder' : 'Exibir'} apresentação`}
												labelColor={theme.black4}
												onPress={() => setPresentationIsVisible(!presentationIsVisible)}
											/>
										</ToggleButtonContainer>
										{
											presentationIsVisible && (
												<>
													<VerticalSpacing height={2} />
													<InstructionCard
														message={'Olá! Sou [seu nome] e estou representando o CORRE., nossa missão é conectar a periferia a um futuro melhor e para isso estamos fazendo uma pesquisa com apoio [nome da liderança/instituição local] para entender melhor as necessidades locais. Sua participação é essencial e todas as informações serão confidenciais. Você pode nos ajudar?'}
														highlightedWords={['CORRE.,', 'missão', 'é', 'conectar', 'a', 'periferia', 'um', 'futuro', 'melhor', 'entender', 'necessidades', 'locais', 'todas', 'as', 'informações', 'serão', 'confidenciais']}
														borderLeftWidth={5}
														fontSize={15}
													/>
												</>
											)
										}
									</>
								) : <></>
							}
							<VerticalSpacing height={2} />
							<QuestionCard
								questionId={'1'}
								question={'Gostaria de deixar o seu telefone para contato?'}
								answer={registerData?.cellNumber}
								questionType={'textual'}
								optional
								onPress={!registerIsStored ? () => navigation.navigate('InsertCitizenCellNumber') : undefined}
							/>
							<VerticalSpacing />
							<QuestionCard
								questionId={'2'}
								question={'Qual é o seu nome?'}
								answer={registerData?.name}
								questionType={'textual'}
								onPress={!registerIsStored ? () => navigation.navigate('InsertCitizenName') : undefined}
							/>
							<VerticalSpacing />
						</>
					)}
					ItemSeparatorComponent={() => <VerticalSpacing />}
					ListFooterComponent={(
						<>
							{coordinatorView && (
								<>
									<VerticalSpacing />
									{
										registerData.location && (
											<LocationViewCard
												title={'localização do cadastro'}
												locationView={'public'}
												location={registerData.location}
											/>
										)
									}
								</>
							)}
							<VerticalSpacing bottomNavigatorSpace />
						</>
					)}
					showsVerticalScrollIndicator={false}
				/>
			</Body>
		</ScreenContainer >
	)
}

export { CitizenQuestionaryPreview }
