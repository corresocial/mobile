import React from 'react'
import { ListRenderItem } from 'react-native'
import { useTheme } from 'styled-components'

import { CitizenRegisterQuestion, CitizenRegisterQuestionResponse } from '@domain/citizenRegister/model/entities/types'

import { useCitizenRegistrationContext } from '@contexts/CitizenRegistrationContext'
import { mockCitizenRegisterResponses } from '@contexts/CitizenRegistrationContext/citizenRegisterData'

import { CitizenQuestionsListProps } from '@routes/Stack/CitizenRegistrationStack/screenProps'
import { FlatListItem } from 'src/presentation/types'

import { Body, HeaderActionsContainer, HeaderContainer, QuestionsList } from './styles'
import EditCitizenIcon from '@assets/icons/editCitizen-white.svg'
import trashIcon from '@assets/icons/trash-white.svg'
import { relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'

import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { SmallButton } from '@components/_buttons/SmallButton'
import { QuestionCard } from '@components/_cards/QuestionCard'
import { ScreenContainer } from '@components/_containers/ScreenContainer'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { DefaultPostViewHeader } from '@components/DefaultPostViewHeader'

function CitizenQuestionsList({ route, navigation }: CitizenQuestionsListProps) { // CURRENT Mudar para final com ScreenProps
	const { citizenRegistrationQuestionToRespond } = useCitizenRegistrationContext()

	const citizenRegisterResponses = mockCitizenRegisterResponses

	const theme = useTheme()

	const editMode = !!route.params

	const renderQuestion = ({ item }: FlatListItem<CitizenRegisterQuestionResponse>) => {
		return (
			<QuestionCard
				question={item.question}
				answer={item.response}
				questionType={item.questionType}
			>

			</QuestionCard>
		)
	}

	const startCitizenRegistration = () => {
		const firstQuestion = citizenRegistrationQuestionToRespond.questions[0]
		navigateToNextReponseScreen(firstQuestion)
	}

	const navigateToNextReponseScreen = (nextQuestion: CitizenRegisterQuestion | null) => {
		if (nextQuestion === null) return navigation.navigate('FinishCitizenRegistration')

		switch (nextQuestion.questionType) {
			case 'binary': return navigation.push('InsertBinaryResponse', { questionData: nextQuestion })
			case 'satisfaction': return navigation.push('InsertSatisfactionResponse', { questionData: nextQuestion })
			case 'textual': return navigation.push('InsertTextualResponse', { questionData: nextQuestion })
			case 'numerical': return navigation.push('InsertTextualResponse', { questionData: nextQuestion })
			case 'select': return navigation.push('InsertSelectResponse', { questionData: nextQuestion })
		}
	}

	const deleteButtonHandler = () => {
		console.log('deleted')
	}

	return (
		<ScreenContainer topSafeAreaColor={theme.white3} infinityBottom >
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
						minHeight={relativeScreenHeight(5)}
						relativeHeight={relativeScreenHeight(6)}
						labelColor={theme.white3}
						onPress={startCitizenRegistration}
					/>
					{
						editMode && (
							<SmallButton
								relativeWidth={relativeScreenWidth(10)}
								height={relativeScreenWidth(10)}
								SvgIcon={trashIcon}
								onPress={deleteButtonHandler}
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
					ListHeaderComponent={<VerticalSpacing height={2} />}
					ItemSeparatorComponent={() => <VerticalSpacing />}
					ListFooterComponent={<VerticalSpacing bottomNavigatorSpace />}
					showsVerticalScrollIndicator={false}
				/>
			</Body>
		</ScreenContainer>
	)
}

export { CitizenQuestionsList }
