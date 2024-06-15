import React from 'react'
import { useTheme } from 'styled-components'

import { CitizenQuestionsListProps } from '@routes/Stack/CitizenRegistrationStack/screenProps'

import { Body, HeaderActionsContainer, HeaderContainer, QuestionsList } from './styles'
import EditCitizenIcon from '@assets/icons/editCitizen-white.svg'

import { OptionButton } from '@components/_buttons/OptionButton'
import { QuestionCard } from '@components/_cards/QuestionCard'
import { ScreenContainer } from '@components/_containers/ScreenContainer'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { DefaultPostViewHeader } from '@components/DefaultPostViewHeader'

function CitizenQuestionsList({ navigation }: CitizenQuestionsListProps) {
	const data: any = {
		title: 'Praça da lapa',
		description: 'lorem ipsum',
		pollId: '10',
		createdAt: new Date(),
		range: 'city',
		owner: {
			userId: '1',
			name: 'José Alenca',
			profilePictureUrl: []
		},
		idUsersResponded: ['', ''],
		location: {
			city: 'Londrina',
			country: 'Brasil',
			district: 'Palhano 2',
			geohashNearby: ['', ''],
			number: '50',
			postalCode: '86055-650',
			coordinates: { latitude: 1, longitude: 2 },
			state: 'Paraná',
			street: 'Rua Guilherme Farel',
		},
		questions: [
			{
				questionId: '1',
				question: 'Quem veio primeiro, o ovo ou a galinha?',
				questionType: 'textual'
			},
			{
				questionId: '2',
				question: 'Escolha um número de 0 a 100?',
				questionType: 'numerical'
			},
			{
				questionId: '3',
				question: 'O que você achou da morte do homem de ferro?',
				questionType: 'satisfaction'
			},
			{
				questionId: '4',
				question: 'Está satisfeito com o substituto do capitão américa?',
				questionType: 'satisfaction'
			},
			{
				questionId: '5',
				question: 'Você tem animal de estimação?',
				questionType: 'binary'
			},
			{
				questionId: '6',
				question: 'Você tem pc com luizinhas?',
				questionType: 'binary'
			},
			{
				questionId: '7',
				question: 'SELECT, você quer SELECT?',
				questionType: 'select',
				options: ['AAA', 'BBB', 'CCC', 'DDD']
			}
		],
		privateResponses: [
			{
				userId: 'PusOCJGtL6cSrAhN8oePaUybLR42',
				location: {
					city: 'Londrina',
					country: 'Brasil',
					district: 'Palhano 2',
					geohashNearby: [''],
					number: '50',
					postalCode: '86055-650',
					state: 'Paraná',
					street: 'Rua Guilherme Farel',
					coordinates: { latitude: 1, longitude: 2 }
				},
				responses: [
					{
						questionId: '1',
						questionType: 'textual',
						response: 'Galinha',
					},
	
					{
						questionId: '2',
						questionType: 'numerical',
						response: 2,
					},
					{
						questionId: '2',
						questionType: 'numerical',
						response: 4,
					},
	
					{
						questionId: '3',
						questionType: 'satisfaction',
						response: 1,
					},
					{
						questionId: '3',
						questionType: 'satisfaction',
						response: 4,
					},
	
					{
						questionId: '4',
						questionType: 'satisfaction',
						response: 4,
					},
	
					{
						questionId: '5',
						questionType: 'binary',
						response: true,
					},
					{
						questionId: '6',
						questionType: 'binary',
						response: true,
					},
	
					{
						questionId: '7',
						questionType: 'select',
						response: ['BBB']
					},
					{
						questionId: '7',
						questionType: 'select',
						response: ['AAA', 'BBB']
					},
					{
						questionId: '7',
						questionType: 'select',
						response: ['CCC', 'DDD']
					},
					{
						questionId: '7',
						questionType: 'select',
						response: ['BBB']
					},
				],
			},
			{
				userId: 'PusOCJGtL6cSrAhN8oePaUybLR42',
				location: {
					city: 'Londrina',
					country: 'Brasil',
					district: 'Palhano 2',
					geohashNearby: [''],
					number: '50',
					postalCode: '86055-650',
					state: 'Paraná',
					street: 'Rua Guilherme Farel',
					coordinates: { latitude: 1, longitude: 2 }
				},
				responses: [
					{
						questionId: '1',
						questionType: 'textual',
						response: 'Pato',
					},
	
					{
						questionId: '2',
						questionType: 'numerical',
						response: 20,
					},
					{
						questionId: '2',
						questionType: 'numerical',
						response: 30,
					},
					{
						questionId: '2',
						questionType: 'numerical',
						response: 30,
					},
					{
						questionId: '2',
						questionType: 'numerical',
						response: 30,
					},
	
					{
						questionId: '3',
						questionType: 'satisfaction',
						response: 4,
					},
	
					{
						questionId: '4',
						questionType: 'satisfaction',
						response: 4,
					},
					{
						questionId: '4',
						questionType: 'satisfaction',
						response: 3,
					},
					{
						questionId: '4',
						questionType: 'satisfaction',
						response: 1,
					},
					{
						questionId: '4',
						questionType: 'satisfaction',
						response: 2,
					},
					{
						questionId: '4',
						questionType: 'satisfaction',
						response: 5,
					},
					{
						questionId: '4',
						questionType: 'satisfaction',
						response: 5,
					},
	
					{
						questionId: '5',
						questionType: 'binary',
						response: false,
					},
					{
						questionId: '6',
						questionType: 'binary',
						response: true,
					},
					{
						questionId: '7',
						questionType: 'select',
						response: ['DDD', 'CCC'],
					},
				],
			}
		]
	} 
	
	const theme = useTheme()

	const renderQuestion = (question: any) => {
		return (
			<QuestionCard question={question.item.question}>
					
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
					data={data.questions}
					renderItem={renderQuestion}
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