import React from 'react'
import { ListRenderItem } from 'react-native'
import { useTheme } from 'styled-components'

import { CitizenRegisterQuestionResponse, CitizenRegisterResponse } from '@domain/citizenRegister/model/entities/types'

import { CitizenOfflineRegistrationListProps } from '@routes/Stack/CitizenRegistrationStack/screenProps'
import { FlatListItem } from 'src/presentation/types'

import { Body, Header, QuestionaryList, SaveButtonContainer } from './styles'
import AngleRightWhiteIcon from '@assets/icons/angleRight-white.svg'

import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { CitizenQuestionaryCard } from '@components/_cards/CitizenQuestionaryCard'
import { ScreenContainer } from '@components/_containers/ScreenContainer'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { DefaultPostViewHeader } from '@components/DefaultPostViewHeader'

function CitizenOfflineRegistrationList({ navigation }: CitizenOfflineRegistrationListProps) {
	const theme = useTheme()

	const data: CitizenRegisterResponse[] = [
		{
			cellNumber: '6999284',
			censusTakerId: 'idd',
			censusTakerName: 'José da pinga',
			citizenRegisterId: 'id de register',
			createdAt: new Date(),
			location: {} as any,
			name: 'Maiquinha da silva',
			userId: 'sem id',
			responses: [
				{
					questionId: '1',
					question: 'Quem foi Mariquina?',
					response: 'Wellington',
					questionType: 'textual'
				},
				{
					questionId: '2',
					question: 'Quem foi Luis?',
					response: 'Wellington',
					questionType: 'textual'
				},
				{
					questionId: '3',
					question: 'Quem foi Eduardo?',
					response: 'Wellington',
					questionType: 'textual'
				}
			]
		},
		{
			cellNumber: '6999284',
			censusTakerId: 'idd',
			censusTakerName: 'Recenseador boss',
			citizenRegisterId: 'id de register',
			createdAt: new Date(),
			location: {} as any,
			name: 'Pedrinho da quebrada',
			userId: 'sem id',
			responses: [
				{
					questionId: '1',
					question: 'Quem foi Mariquina?',
					response: 'Wellington',
					questionType: 'textual'
				},
				{
					questionId: '2',
					question: 'Quem foi Luis?',
					response: 'Wellington',
					questionType: 'textual'
				},
				{
					questionId: '3',
					question: 'Quem foi Eduardo?',
					response: 'Wellington',
					questionType: 'textual'
				}
			]
		},
	]

	const renderQuestionary = ({ item }: FlatListItem<CitizenRegisterQuestionResponse>) => {
		return (
			<CitizenQuestionaryCard
				questionaryData={item}
				onPress={() => console.log(item.questionId)}
			/>
		)
	}

	return (
		<ScreenContainer topSafeAreaColor={theme.orange1} infinityBottom>
			<Header>
				<DefaultPostViewHeader
					text={'seus cadastros não enviados'}
					highlightedWords={['cadastros', 'não', 'enviados']}
					ignorePlatform
					onBackPress={() => navigation.goBack()}
				/>
				<SaveButtonContainer>
					<PrimaryButton
						label={'enviar'}
						color={theme.green3}
						SecondSvgIcon={AngleRightWhiteIcon}
						labelColor={theme.white3}
						onPress={() => console.log('enviar')}
					/>
				</SaveButtonContainer>
			</Header>
			<Body>
				<QuestionaryList
					data={data}
					renderItem={renderQuestionary as ListRenderItem<unknown>}
					ListHeaderComponent={<VerticalSpacing height={2} />}
					ItemSeparatorComponent={() => <VerticalSpacing />}
					ListFooterComponent={<VerticalSpacing bottomNavigatorSpace />}
					showsVerticalScrollIndicator={false}
				/>
			</Body>
		</ScreenContainer>

	)
}

export { CitizenOfflineRegistrationList }
