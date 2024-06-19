import React, { useEffect, useState } from 'react'
import { ListRenderItem } from 'react-native'
import { useTheme } from 'styled-components'

import { CitizenRegisterUseCases } from '@domain/citizenRegister/adapter/CitizenRegisterUseCases'
import { CitizenRegisterEntity, CitizenRegisterQuestionResponse } from '@domain/citizenRegister/model/entities/types'

import { useAuthContext } from '@contexts/AuthContext'
import { useCitizenRegistrationContext } from '@contexts/CitizenRegistrationContext'
import { mockCitizenRegisterResponses } from '@contexts/CitizenRegistrationContext/citizenRegisterData'
import { useLoaderContext } from '@contexts/LoaderContext'

import { CitizenQuestionsListScreenProps } from '@routes/Stack/CitizenRegistrationStack/screenProps'
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
import { DefaultPostViewHeader } from '@components/DefaultPostViewHeader'

const citizenUseCases = new CitizenRegisterUseCases()

// CURRENT Renomear para CitizenQuestionayPreview
function CitizenQuestionsList({ route, navigation }: CitizenQuestionsListScreenProps) {
	const { userDataContext } = useAuthContext()
	const { startNewCitizenRegistration } = useCitizenRegistrationContext()
	const { setLoaderIsVisible } = useLoaderContext()

	const [defaultConfirmationModalIsVisible, setDefaultConfirmationModalIsVisible] = useState(false)

	const theme = useTheme()

	const editMode = !!(route.params && route.params.registerData)
	const hasResponsesFromRoute = (route.params && route.params.registerData && route.params.registerData && route.params.registerData.responses && route.params.registerData.responses.length)
	const registerData = route.params?.registerData
	const citizenRegisterResponses = hasResponsesFromRoute
		? route.params.registerData.responses
		: mockCitizenRegisterResponses

	useEffect(() => {
		startNewCitizenRegistration()
	}, [])

	const startCitizenRegistration = () => {
		navigation.navigate('InsertCitizenCellNumber')
	}

	const saveCitizenRegister = async () => {
		try {
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
			if (!editMode) return
			!registerId && setLoaderIsVisible(true)
			const { citizenRegisterId } = route.params.registerData
			await citizenUseCases.deleteOfflineCitizenRegister(registerId || citizenRegisterId)
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

	const renderQuestion = ({ item }: FlatListItem<CitizenRegisterQuestionResponse>) => {
		return (
			<QuestionCard
				question={item.question}
				answer={editMode ? item.response : ''}
				questionType={item.questionType}
			/>
		)
	}

	return (
		<ScreenContainer topSafeAreaColor={theme.white3} infinityBottom >
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
					onBackPress={() => navigation.goBack()}
				/>
				<HeaderActionsContainer isEditMode={editMode}>
					<PrimaryButton
						label={editMode ? 'enviar' : 'responder'}
						highlightedWords={[editMode ? 'enviar' : 'responder']}
						color={theme.green3}
						fontSize={14}
						SecondSvgIcon={EditCitizenIcon}
						svgIconScale={['50%', '30%']}
						minHeight={40}
						relativeHeight={relativeScreenDensity(40)}
						labelColor={theme.white3}
						onPress={editMode ? saveCitizenRegister : startCitizenRegistration}
					/>
					{
						editMode && (
							<SmallButton
								relativeWidth={relativeScreenDensity(40)}
								height={relativeScreenDensity(40)}
								SvgIcon={trashIcon}
								onPress={toggleDefaultConfirmationModalVisibility}
								color={theme.red3}
							/>
						)
					}

				</HeaderActionsContainer>
			</HeaderContainer>
			<Body>

				<QuestionsList
					data={citizenRegisterResponses}
					renderItem={renderQuestion as ListRenderItem<unknown>}
					ListHeaderComponent={(
						<>
							<VerticalSpacing height={2} />
							{
								editMode && registerData?.name && (
									<>
										<QuestionCard
											question={'Qual o seu nome?'}
											answer={registerData?.name}
											questionType={'textual'}
										/>
										<VerticalSpacing />
									</>
								)
							}

							{
								editMode && registerData?.cellNumber && (
									<>
										<QuestionCard
											question={'gostaria de deixar o seu telefone para contato?'}
											answer={registerData?.cellNumber}
											questionType={'textual'}
										/>
										<VerticalSpacing />
									</>
								)
							}
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

export { CitizenQuestionsList }
