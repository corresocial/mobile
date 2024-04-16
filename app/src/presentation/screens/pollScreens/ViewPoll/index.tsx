import React, { useContext, useState } from 'react'
import { Alert } from 'react-native'
import uuid from 'react-uuid'
import { useTheme } from 'styled-components'

import { PollEntity, PollQuestion } from '@domain/poll/entity/types'
import { usePollDomain } from '@domain/poll/usePollDomain'

import { usePollRepository } from '@data/poll/usePollRepository'

import { AuthContext } from '@contexts/AuthContext'
import { usePollRegisterContext } from '@contexts/PollRegisterContext'

import { ViewPollScreenProps } from '@routes/Stack/PollStack/screenProps'
import { PollStackParamList } from '@routes/Stack/PollStack/types'
import { DiscordContactUsType, ReportedTarget } from '@services/discord/types/contactUs'

import { Body } from './styles'
import DocumentWhiteIcon from '@assets/icons/document-white.svg'
import DownloadWhiteIcon from '@assets/icons/download-white.svg'
import QuestionWhiteIcon from '@assets/icons/questionMark-white.svg'
import ThreeDotsWhiteIcon from '@assets/icons/threeDots.svg'
import { relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'
import { shareFile } from '@common/share'

import { SmallButton } from '@components/_buttons/SmallButton'
import { DescriptionCard } from '@components/_cards/DescriptionCard'
import { LocationViewCard } from '@components/_cards/LocationViewCard'
import { PostRangeCard } from '@components/_cards/PostRangeCard'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { PostHeader } from '@components/PostHeader'
import { PostPopOver } from '@components/PostPopOver'

const { generatePollResultsReport, generateIndividualPollResponsesReport } = usePollDomain()

function ViewPoll({ navigation }: ViewPollScreenProps) {
	const { savePollToRespondOnContext } = usePollRegisterContext()
	const { userDataContext } = useContext(AuthContext)

	const theme = useTheme()

	const pollData: PollEntity = {
		pollId: 'idDeTeste',
		title: 'enquete sobre o bairro dalapa',
		description: 'lorem enquete sobre o bairro dalapa enquete sobre o bairro dalapa enquete sobre o bairro dalapa enquete sobre o bairro dalapa enquete sobre o bairro dalapa',
		questions: [
			{
				questionId: '1',
				question: 'pergunta 1?',
				questionType: 'binary',
			},
			{
				questionId: '2',
				question: 'pergunta 2?',
				questionType: 'satisfaction',
			},
			{
				questionId: '3',
				question: 'pergunta 3?',
				questionType: 'textual',
			},
			{
				questionId: '4',
				question: 'pergunta 4?',
				questionType: 'numerical',
			},
		],
		location: {
			city: 'Londrina',
			country: 'Brasil',
			district: 'Centro',
			number: '50',
			geohashNearby: [''],
			postalCode: '696969',
			state: 'Parana',
			street: 'Rua das flores',
			coordinates: {
				latitude: -34.923,
				longitude: -53.923
			},
		},
		range: 'near',
		owner: {
			userId: 'PusOCJGtL6cSrAhN8oePaUybLR42',
			name: 'dev que deve',
			profilePictureUrl: userDataContext.profilePictureUrl
		},
		createdAt: new Date(),
		privateResponses: []
	}

	const [postOptionsIsOpen, setPostOptionsIsOpen] = useState(false)

	const isAuthor = userDataContext.userId === pollData.owner.userId // TODO Remover comparação
	const isCompleted = false

	const navigateToProfile = () => {
		if (isAuthor) return navigation.navigate('Profile' as any)
		navigation.navigate('ProfileHome' as any, { userId: pollData.owner.userId })// TODO Type
	}

	const sharePost = () => {
		Alert.alert('Método de compartilhamento ainda não foi implementado!')
		// share(`Olha o que ${isAuthor ? 'estou anunciando' : 'encontrei'} no corre. no corre.\n\nhttps://corre.social/p/${pollData.pollId}`)
	}

	const respondPoll = () => {
		savePollToRespondOnContext(pollData)
		navigateToNextReponseScreen(pollData.questions[0])
	}

	const navigateToNextReponseScreen = (nextQuestion: PollQuestion) => {
		switch (nextQuestion.questionType) {
			case 'binary': return navigation.navigate('PollStack' as any, { // TODO Type
				screen: 'AnswerBinaryQuestion' as keyof PollStackParamList,
				params: { questionData: nextQuestion }
			})
			case 'satisfaction': return navigation.navigate('PollStack' as any, {
				screen: 'AnswerSatisfactionQuestion' as keyof PollStackParamList,
				params: { questionData: nextQuestion }
			})
			case 'textual': return navigation.navigate('PollStack' as any, {
				screen: 'AnswerTextualQuestion' as keyof PollStackParamList,
				params: { questionData: nextQuestion }
			})
			case 'numerical': return navigation.navigate('PollStack' as any, {
				screen: 'AnswerTextualQuestion' as keyof PollStackParamList,
				params: { questionData: nextQuestion }
			})
		}
	}

	const downloadPollResults = async () => {
		const reportHtmlContent = await generatePollResultsReport(usePollRepository, pollData)
		shareFile(reportHtmlContent)
	}

	const downloadIndividualAnswers = async () => {
		const reportHtmlContent = await generateIndividualPollResponsesReport(usePollRepository, pollData)
		shareFile(reportHtmlContent)
	}

	const reportPost = () => {
		setPostOptionsIsOpen(false)
		const params = {
			title: 'denunciar',
			contactUsType: 'denúncia' as DiscordContactUsType,
			reportedType: 'poll' as ReportedTarget,
			reportedId: pollData.pollId
		}

		navigation.push('ContactUsInsertMessageUserStack', params)
	}

	const markAsCompleted = () => {
		console.log('marca como completa')
	}

	const toggleDefaultConfirmationModalVisibility = () => {
		console.log('deletar enquete')
	}

	const renderQuestions = () => {
		return pollData.questions.map((question, index) => {
			return (
				<React.Fragment key={uuid()}>
					<VerticalSpacing />
					<DescriptionCard
						title={`pergunta ${index + 1}`}
						hightligtedWords={['pergunta']}
						text={question.question}
						CustomHeaderIcon={QuestionWhiteIcon}
					/>
				</ React.Fragment >
			)
		})
	}

	return (
		<>
			<PostHeader
				title={pollData.title}
				isAuthor={isAuthor}
				isCompleted={isCompleted}
				owner={pollData.owner}
				createdAt={pollData.createdAt}
				navigateToProfile={navigateToProfile}
				sharePost={sharePost}
				highlightedButtonText={isAuthor ? 'baixar resultados' : 'responder'}
				highlightedButtonIcon={DocumentWhiteIcon}
				highlightedButtonAction={isAuthor ? downloadPollResults : respondPoll}
				HeaderFooter={isAuthor && (
					<SmallButton
						label={'baixar respostas individuais'}
						labelColor={theme.white3}
						color={theme.green3}
						SvgIcon={DownloadWhiteIcon}
						relativeWidth={'98%'}
						height={relativeScreenWidth(12)}
						onPress={downloadIndividualAnswers}
					/>
				)}
			>
				<PostPopOver
					postTitle={pollData.title}
					popoverVisibility={postOptionsIsOpen}
					closePopover={() => setPostOptionsIsOpen(false)}
					isAuthor={isAuthor}
					isCompleted={isCompleted}
					goToComplaint={reportPost}
					markAsCompleted={markAsCompleted}
					deletePost={toggleDefaultConfirmationModalVisibility}
				>
					<SmallButton
						SvgIcon={ThreeDotsWhiteIcon}
						relativeWidth={relativeScreenWidth(12)}
						height={relativeScreenWidth(12)}
						onPress={() => setPostOptionsIsOpen(true)}
					/>
				</PostPopOver>
			</PostHeader>
			<Body>
				<VerticalSpacing height={relativeScreenHeight(2)} />
				<DescriptionCard
					text={pollData.description}
				/>
				<VerticalSpacing />
				<PostRangeCard
					title={'alcance da enquete'}
					postRange={pollData.range}
				/>
				<VerticalSpacing />
				<LocationViewCard
					title={'localização'}
					location={pollData.location}
					locationView={'public'}
				/>
				{renderQuestions()}
				<VerticalSpacing height={relativeScreenHeight(5)} />
			</Body>
		</>
	)
}

export { ViewPoll }
