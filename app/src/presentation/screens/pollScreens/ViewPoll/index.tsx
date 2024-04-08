import React, { useContext, useState } from 'react'
import { useTheme } from 'styled-components'

import { PollEntity } from '@domain/poll/entity/types'

import { AuthContext } from '@contexts/AuthContext'

import { ViewPollScreenProps } from '@routes/Stack/PollStack/screenProps'

import { Body } from './styles'
import DocumentWhiteIcon from '@assets/icons/document-white.svg'
import DownloadWhiteIcon from '@assets/icons/download-white.svg'
import QuestionWhiteIcon from '@assets/icons/questionMark-white.svg'
import ThreeDotsWhiteIcon from '@assets/icons/threeDots.svg'
import { relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'
import { share } from '@common/share'

import { SmallButton } from '@components/_buttons/SmallButton'
import { DescriptionCard } from '@components/_cards/DescriptionCard'
import { LocationViewCard } from '@components/_cards/LocationViewCard'
import { PostRangeCard } from '@components/_cards/PostRangeCard'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { PostHeader } from '@components/PostHeader'
import { PostPopOver } from '@components/PostPopOver'

function ViewPoll({ route, navigation }: ViewPollScreenProps) {
	const { userDataContext } = useContext(AuthContext)

	const theme = useTheme()

	const pollData: PollEntity = {
		pollId: '',
		title: 'enquete sobre o bairro dalapa',
		description: 'lorem enquete sobre o bairro dalapa enquete sobre o bairro dalapa enquete sobre o bairro dalapa enquete sobre o bairro dalapa enquete sobre o bairro dalapa',
		questions: [
			{
				questionId: '1',
				question: 'pergunta  asd asd asd sad sad asd asd asd asdas sa das asd asd asd asd 1?',
				questionType: 'binary',
			},
			{
				questionId: '2',
				question: 'pergunta 2?',
				questionType: 'binary',
			},
			{
				questionId: '3',
				question: 'pergunta 3?',
				questionType: 'binary',
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
		createdAt: new Date()
	}

	const [postOptionsIsOpen, setPostOptionsIsOpen] = useState(false)

	const isAuthor = userDataContext.userId === pollData.owner.userId
	const isCompleted = false

	const navigateToProfile = () => {
		if (isAuthor) return navigation.navigate('Profile' as any)
		navigation.navigate('ProfileHome' as any, { userId: pollData.owner.userId })// TODO Type
	}

	const sharePost = () => {
		share(`Olha o que ${isAuthor ? 'estou anunciando' : 'encontrei'} no corre. no corre.\n\nhttps://corre.social/p/${pollData.pollId}`)
	}

	const answerPoll = () => {
		console.log('responder enquete')
	}

	const downloadPollResults = () => {
		console.log('baixar resultados')
	}

	const downloadIndividualAnswers = () => {
		console.log('baixar respostas individuais')
	}

	const reportPost = () => {
		setPostOptionsIsOpen(false)
		/* const params = {
			title: 'denunciar',
			contactUsType: 'denúncia',
			reportedType: 'poll',
			reportedId: pollData.pollId
		} */
		console.log('denúnciar enquete')
	}

	const markAsCompleted = () => {
		console.log('marca como completa')
	}

	const goToEditPost = () => {
		console.log('editar postagem')
	}

	const toggleDefaultConfirmationModalVisibility = () => {
		console.log('deletar enquete')
	}

	const renderQuestions = () => {
		return pollData.questions.map((question, index) => {
			return (
				<>
					<VerticalSpacing />
					<DescriptionCard
						title={`pergunta ${index + 1}`}
						hightligtedWords={['pergunta']}
						text={question.question}
						CustomHeaderIcon={QuestionWhiteIcon}
					/>
				</>
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
				highlightedButtonText={'baixar resultados'}
				highlightedButtonIcon={DocumentWhiteIcon}
				highlightedButtonAction={isAuthor ? downloadPollResults : answerPoll}
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
					postTitle={'publicação no corre.'} /* getShortText(getPostField('description'), 45) || */
					popoverVisibility={postOptionsIsOpen}
					closePopover={() => setPostOptionsIsOpen(false)}
					isAuthor={isAuthor}
					isCompleted={isCompleted}
					goToComplaint={reportPost}
					markAsCompleted={markAsCompleted}
					editPost={goToEditPost}
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
