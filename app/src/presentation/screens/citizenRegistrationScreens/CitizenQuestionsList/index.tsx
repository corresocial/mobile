import React from 'react'
import { ListRenderItem } from 'react-native'
import { useTheme } from 'styled-components'

import { CitizenRegisterQuestionResponse } from '@domain/citizenRegister/model/entities/types'

import { mockCitizenRegisterResponses } from '@contexts/CitizenRegistrationContext/citizenRegisterData'

import { CitizenQuestionsListProps } from '@routes/Stack/CitizenRegistrationStack/screenProps'
import { FlatListItem } from 'src/presentation/types'

import { Body, HeaderActionsContainer, HeaderContainer, QuestionsList } from './styles'
import EditCitizenIcon from '@assets/icons/editCitizen-white.svg'

import { OptionButton } from '@components/_buttons/OptionButton'
import { QuestionCard } from '@components/_cards/QuestionCard'
import { ScreenContainer } from '@components/_containers/ScreenContainer'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { DefaultPostViewHeader } from '@components/DefaultPostViewHeader'

function CitizenQuestionsList({ navigation }: CitizenQuestionsListProps) { // CURRENT Mudar para final com ScreenProps
	const citizenRegisterResponses = mockCitizenRegisterResponses

	const theme = useTheme()

	const renderQuestion = ({ item }: FlatListItem<CitizenRegisterQuestionResponse>) => {
		return (
			<QuestionCard
				question={item.question}
				answer={item.response} // CURRENT Não renderizando
			>

			</QuestionCard>
		)
	}

	return (
		<ScreenContainer
			topSafeAreaColor={theme.white3}
			bottomSafeAreaColor={theme.orange1}
		>
			<HeaderContainer>
				<DefaultPostViewHeader
					text={'questionário cidadão'}
					highlightedWords={['cidadão']}
					ignorePlatform
					onBackPress={() => navigation.goBack()}
				/>
				<HeaderActionsContainer>
					<OptionButton
						label={'responder'}
						highlightedWords={['responder']}
						labelSize={15}
						SvgIcon={EditCitizenIcon}
						relativeHeight={'65%'}
						leftSideWidth={'25%'}
						leftSideColor={theme.green3}
						svgIconScale={['50%', '50%']}
						onPress={() => console.log('TEST')}
					/>
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
