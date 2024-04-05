import React, { useContext, useState } from 'react'
import { StatusBar } from 'react-native'

import { PollEntity } from '@domain/poll/entity/types'
import { usePollDomain } from '@domain/poll/usePollDomain'
import { UserOwner } from '@domain/user/entity/types'

import { usePollRepository } from '@data/poll/usePollRepository'

import { AuthContext } from '@contexts/AuthContext'
import { EditContext } from '@contexts/EditContext'

import { PollReviewScreenProps } from '@routes/Stack/PollStack/screenProps'
import { PollStackParamList } from '@routes/Stack/PollStack/types'

import { Body, BodyPadding, Container, Header, PostCardContainer, SaveButtonContainer } from './styles'
import PlusWhiteIcon from '@assets/icons/plus-white.svg'
import TrashWhiteIcon from '@assets/icons/trash-white.svg'
import { getShortText } from '@common/auxiliaryFunctions'
import { relativeScreenHeight } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { DescriptionCard } from '@components/_cards/DescriptionCard'
import { LocationViewCard } from '@components/_cards/LocationViewCard'
import { PollCard } from '@components/_cards/PollCard'
import { PostRangeCard } from '@components/_cards/PostRangeCard'
import { SubtitleCard } from '@components/_cards/SubtitleCard'
import { DefaultConfirmationModal } from '@components/_modals/DefaultConfirmationModal'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { DefaultPostViewHeader } from '@components/DefaultPostViewHeader'
import { Loader } from '@components/Loader'

const { createNewPoll } = usePollDomain()

function PollReview({ route, navigation }: PollReviewScreenProps) { // REFACTOR Mudar nome para postReview
	const { editDataContext, setEditDataOnContext } = useContext(EditContext)
	const { userDataContext } = useContext(AuthContext)

	const [defaultConfirmationModalIsVisible, setDefaultConfirmationModalIsVisible] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const pollOwner: UserOwner = {
		userId: userDataContext.userId,
		name: userDataContext.name,
		profilePictureUrl: userDataContext.profilePictureUrl
	}

	const { pollData, unsavedPoll } = route.params
	const newPollDataState = { ...pollData, ...editDataContext.unsaved }

	const getPollField = (fieldName: keyof PollEntity, allowNull?: boolean) => {
		const currentPostData: PollEntity = { ...pollData }

		if (allowNull && editDataContext.unsaved[fieldName] === '' && currentPostData[fieldName]) return ''
		return editDataContext.unsaved[fieldName] || currentPostData[fieldName]
	}

	const savePoll = async () => {
		try {
			setIsLoading(true)

			const ownerId = userDataContext.userId
			await createNewPoll(usePollRepository, { ...newPollDataState, ownerId })

			changeStateOfEditedFields()

			navigateToSelectPostTypeScreen()
			setIsLoading(false)
		} catch (error) {
			console.log(error)
			setIsLoading(false)
		}
	}

	const navigateToSelectPostTypeScreen = () => {
		navigation.goBack()
		navigation.goBack()
	}

	const changeStateOfEditedFields = () => {
		const newEditState = { saved: { ...editDataContext.saved, ...editDataContext.unsaved }, unsaved: {} }
		setEditDataOnContext(newEditState)
	}

	const cancelAllChangesAndGoBack = () => {
		if ((!Object.keys(editDataContext.unsaved).length) && !unsavedPoll) {
			navigateBackwards()
			return
		}

		toggleDefaultConfirmationModalVisibility()
	}

	const navigateToEditScreen = (screenName: keyof PollStackParamList, initialValue: keyof PollEntity, customStack?: string) => {
		const value = getPollField(initialValue, true)

		navigation.push('PollStack' as any, { // TODO Type
			screen: screenName,
			params: {
				editMode: true,
				initialValue: value
			}
		})
	}

	const toggleDefaultConfirmationModalVisibility = () => {
		setDefaultConfirmationModalIsVisible(!defaultConfirmationModalIsVisible)
	}

	const navigateBackwards = () => navigation.goBack()

	const backgroundColor = theme.purple2

	return (
		<Container>
			<DefaultConfirmationModal
				visibility={defaultConfirmationModalIsVisible}
				title={'descartar'}
				text={`você tem certeza que deseja descartar as alterações realizadas na enquete ${getShortText(getPollField('description'), 70)}?`}
				highlightedWords={[...getShortText(getPollField('description'), 70).split(' ')]}
				buttonKeyword={'descartar'}
				closeModal={toggleDefaultConfirmationModalVisibility}
				onPressButton={navigateBackwards}
			/>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<Header>
				<DefaultPostViewHeader
					text={unsavedPoll ? 'revisar sua enquete' : 'editar sua enquete'}
					highlightedWords={unsavedPoll ? ['revisar'] : ['editar']}
					destructiveButton={((!!Object.keys(editDataContext.unsaved).length || unsavedPoll))}
					onBackPress={cancelAllChangesAndGoBack}
					endButtonColor={theme.red3}
					endButtonSvgIcon={TrashWhiteIcon}
				/>
				{
					(Object.keys(editDataContext.unsaved).length > 0 || unsavedPoll) && (
						isLoading ? <Loader />
							: (
								<SaveButtonContainer>
									<PrimaryButton
										color={theme.green3}
										label={'publicar enquete'}
										highlightedWords={['publicar']}
										labelColor={theme.white3}
										fontSize={13}
										SecondSvgIcon={PlusWhiteIcon}
										svgIconScale={['50%', '30%']}
										minHeight={relativeScreenHeight(4)}
										relativeHeight={relativeScreenHeight(6)}
										onPress={savePoll}
									/>
								</SaveButtonContainer>
							)
					)
				}
			</Header>
			<Body backgroundColor={backgroundColor}>
				{
					unsavedPoll && (
						<>
							<SubtitleCard
								text={'sua enquete'}
								highlightedText={['enquete']}
							/>
							<PostCardContainer backgroundColor={backgroundColor}>
								<PollCard
									owner={pollOwner}
									pollData={newPollDataState}
									onPress={() => { }}
								/>
							</PostCardContainer>
							<SubtitleCard
								text={'detalhes da enquete'}
								highlightedText={['detalhes']}
							/>
						</>
					)
				}
				<BodyPadding backgroundColor={backgroundColor} >
					<DescriptionCard
						title={'título'}
						hightligtedWords={['título']}
						text={getPollField('title')}
						onEdit={() => navigateToEditScreen('InsertPollTitle', 'title')}
					/>
					<VerticalSpacing />
					<DescriptionCard
						title={'descrição'}
						hightligtedWords={['descrição']}
						text={getPollField('description')}
						onEdit={() => navigateToEditScreen('InsertPollDescription', 'description')}
					/>
					<VerticalSpacing />
					<PostRangeCard
						postRange={getPollField('range')}
						onEdit={() => navigateToEditScreen('SelectPollRange', 'range')}
					/>
					<VerticalSpacing />
					<LocationViewCard
						title={'localização'}
						locationView={'public'}
						textFontSize={16}
						location={getPollField('location')}
						onEdit={() => navigateToEditScreen('InsertPollLocation', 'location')}
					/>
					<VerticalSpacing height={relativeScreenHeight(1.5)} />
				</BodyPadding >
			</Body>
		</Container>
	)
}

export { PollReview }
