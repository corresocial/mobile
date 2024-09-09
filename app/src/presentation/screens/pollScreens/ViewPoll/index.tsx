import React, { useContext, useEffect, useState } from 'react'
import uuid from 'react-uuid'
import { useTheme } from 'styled-components'

import { sendEvent } from '@newutils/methods/analyticsEvents'

import { PollEntity, PollQuestion } from '@domain/poll/entity/types'
import { usePollDomain } from '@domain/poll/usePollDomain'

import { usePollRepository } from '@data/poll/usePollRepository'

import { AuthContext } from '@contexts/AuthContext'
import { LoaderContext } from '@contexts/LoaderContext'
import { usePollRegisterContext } from '@contexts/PollRegisterContext'

import { navigateToProfileView } from '@routes/auxMethods'
import { ViewPollScreenProps } from '@routes/Stack/PollStack/screenProps'
import { PollStackParamList } from '@routes/Stack/PollStack/types'
import { DiscordContactUsType, ReportedTarget } from '@services/discord/types/contactUs'

import { Body } from './styles'
import DocumentWhiteIcon from '@assets/icons/document-white.svg'
import DownloadWhiteIcon from '@assets/icons/download-white.svg'
import QuestionWhiteIcon from '@assets/icons/questionMark-white.svg'
import ThreeDotsWhiteIcon from '@assets/icons/threeDots.svg'
import { relativeScreenWidth } from '@common/screenDimensions'
import { share, shareFile } from '@common/share'

import { SmallButton } from '@components/_buttons/SmallButton'
import { DescriptionCard } from '@components/_cards/DescriptionCard'
import { LocationViewCard } from '@components/_cards/LocationViewCard'
import { PostRangeCard } from '@components/_cards/PostRangeCard'
import { DefaultConfirmationModal } from '@components/_modals/DefaultConfirmationModal'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { Loader } from '@components/Loader'
import { PostHeader } from '@components/PostHeader'
import { PostPopOver } from '@components/PostPopOver'

const { generatePollResultsReport, generateIndividualPollResponsesReport, markPollAsCompleted, deletePollData } = usePollDomain()

const { getPollData } = usePollDomain()

function ViewPoll({ route, navigation }: ViewPollScreenProps) {
	const { setLoaderIsVisible } = useContext(LoaderContext)
	const { savePollToRespondOnContext } = usePollRegisterContext()
	const { userDataContext } = useContext(AuthContext)

	const theme = useTheme()

	const [pollData, setPollData] = useState<PollEntity>(route.params?.pollData || {} as PollEntity)
	const [postOptionsIsOpen, setPollOptionsIsOpen] = useState(false)
	const [currentCompletedState, setCurrentCompletedState] = useState(false)
	const [deleteConfirmationModalIsVisible, setDeleteConfirmationModalIsVisible] = useState(false)

	const isAuthor = () => userDataContext.userId === pollData.owner.userId

	useEffect(() => {
		getData()
	}, [])

	const getData = (async () => {
		if (route.params.pollId && !route.params?.pollData) {
			const poll = await getPollData(usePollRepository, route.params.pollId)
			poll && setPollData(poll)
			poll && setCurrentCompletedState(!!poll.completed)
			sendEvent('visualized_poll', { pollId: poll?.pollId })
		}
	})

	const navigateToProfile = () => {
		if (isAuthor()) return navigateToProfileView(navigation, '', '', '')

		navigateToProfileView(navigation, pollData.owner.userId, 'Home', '')
	}

	const sharePost = () => {
		share(`Olha o que ${isAuthor() ? 'estou anunciando' : 'encontrei'} no corre.\n\nEnquete: ${pollData.title} \n\nBaixe o app e faça parte!\nhttps://corre.social`)
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
			case 'select': return navigation.navigate('PollStack' as any, {
				screen: 'AnswerSelectQuestion' as keyof PollStackParamList,
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
		setPollOptionsIsOpen(false)
		const params = {
			title: 'denunciar',
			contactUsType: 'denúncia' as DiscordContactUsType,
			reportedType: 'poll' as ReportedTarget,
			reportedId: pollData.pollId
		}

		navigation.push('ContactUsInsertMessageUserStack', params)
	}

	const markAsCompleted = async () => {
		setPollOptionsIsOpen(false)
		await markPollAsCompleted(usePollRepository, pollData.pollId, currentCompletedState)
		setCurrentCompletedState(!currentCompletedState)
	}

	const deletePoll = async () => {
		setPollOptionsIsOpen(false)
		setLoaderIsVisible(true)
		await deletePollData(usePollRepository, pollData.pollId)
		setLoaderIsVisible(false)
		navigation.goBack()
	}

	const toggleDefaultConfirmationModalVisibility = async () => {
		setPollOptionsIsOpen(false)
		setTimeout(() => setDeleteConfirmationModalIsVisible(!deleteConfirmationModalIsVisible), 400)
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

	if (!pollData || !Object.keys(pollData).length) {
		return (
			<Loader flex />
		)
	}

	const alreadyResponded = pollData.idUsersResponded?.includes(userDataContext.userId)

	return (
		<>
			<DefaultConfirmationModal
				visibility={deleteConfirmationModalIsVisible}
				title={'apagar enquete'}
				text={`você tem certeza que deseja apagar a enquete ${pollData.title}`}
				highlightedWords={(pollData.title || '').split(' ')}
				buttonKeyword={'apagar'}
				closeModal={toggleDefaultConfirmationModalVisibility}
				onPressButton={deletePoll}
			/>
			<PostHeader
				title={pollData.title}
				isAuthor={isAuthor()}
				isCompleted={false}
				owner={pollData.owner}
				createdAt={pollData.createdAt}
				navigateToProfile={navigateToProfile}
				sharePost={sharePost}
				highlightedButtonText={isAuthor() ? 'baixar resultados' : alreadyResponded ? 'enquete respondida' : 'responder'}
				highlightedButtonIcon={DocumentWhiteIcon}
				highlightedButtonAction={isAuthor() ? downloadPollResults : alreadyResponded ? () => { } : respondPoll}
				inactiveHighlightedButton={alreadyResponded}
				HeaderFooter={isAuthor() && (
					<>
						<SmallButton
							label={'baixar respostas individuais'}
							labelColor={theme.colors.white[3]}
							color={theme.colors.green[3]}
							SvgIcon={DownloadWhiteIcon}
							relativeWidth={'98%'}
							height={relativeScreenWidth(12)}
							onPress={downloadIndividualAnswers}
						/>
						<VerticalSpacing />
						<SmallButton
							label={'responder enquete'}
							labelColor={theme.colors.black[4]}
							color={theme.colors.yellow[3]}
							SvgIcon={DocumentWhiteIcon}
							relativeWidth={'98%'}
							height={relativeScreenWidth(12)}
							onPress={respondPoll}
						/>
					</>
				)}
			>
				<PostPopOver
					postTitle={pollData.title}
					popoverVisibility={postOptionsIsOpen}
					closePopover={() => setPollOptionsIsOpen(false)}
					isAuthor={isAuthor()}
					isCompleted={currentCompletedState}
					goToComplaint={reportPost}
					markAsCompleted={markAsCompleted}
					deletePost={toggleDefaultConfirmationModalVisibility}
				>
					<SmallButton
						SvgIcon={ThreeDotsWhiteIcon}
						relativeWidth={relativeScreenWidth(12)}
						height={relativeScreenWidth(12)}
						onPress={() => setPollOptionsIsOpen(true)}
					/>
				</PostPopOver>
			</PostHeader>
			<Body>
				<VerticalSpacing height={2} />
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
				<VerticalSpacing bottomNavigatorSpace />
			</Body>
		</>
	)
}

export { ViewPoll }
