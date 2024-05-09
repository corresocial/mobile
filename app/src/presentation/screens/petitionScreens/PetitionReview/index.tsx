import React, { useContext, useState } from 'react'
import { StatusBar } from 'react-native'

import { PetitionEntity } from '@domain/petition/entity/types'
import { usePetitionDomain } from '@domain/petition/usePetitionDomain'
import { UserOwner } from '@domain/user/entity/types'

import { usePetitionRepository } from '@data/petition/usePetitionRepository'

import { AuthContext } from '@contexts/AuthContext'
import { useEditContext } from '@contexts/EditContext'

import { PetitionReviewScreenProps } from '@routes/Stack/PetitionStack/screenProps'
import { PetitionStackParamList } from '@routes/Stack/PetitionStack/types'

import { UiUtils } from '@utils-ui/common/UiUtils'

import { Body, BodyPadding, Container, Header, PostCardContainer, SaveButtonContainer } from './styles'
import PlusWhiteIcon from '@assets/icons/plus-white.svg'
import TrashWhiteIcon from '@assets/icons/trash-white.svg'
import { relativeScreenHeight } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { DescriptionCard } from '@components/_cards/DescriptionCard'
import { EditCard } from '@components/_cards/EditCard'
import { LocationViewCard } from '@components/_cards/LocationViewCard'
import { PetitionCard } from '@components/_cards/PetitionCard'
import { PostRangeCard } from '@components/_cards/PostRangeCard'
import { SubtitleCard } from '@components/_cards/SubtitleCard'
import { DefaultConfirmationModal } from '@components/_modals/DefaultConfirmationModal'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { DefaultPostViewHeader } from '@components/DefaultPostViewHeader'
import { Loader } from '@components/Loader'

const { createNewPetition } = usePetitionDomain()

const { arrayIsEmpty } = UiUtils()

function PetitionReview({ route, navigation }: PetitionReviewScreenProps) { // REFACTOR Mudar nome para postReview
	const { editDataContext, setEditDataOnContext } = useEditContext()
	const { userDataContext } = useContext(AuthContext)

	const [defaultConfirmationModalIsVisible, setDefaultConfirmationModalIsVisible] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const petitionOwner: UserOwner = {
		userId: userDataContext.userId,
		name: userDataContext.name,
		profilePictureUrl: userDataContext.profilePictureUrl
	}

	const { petitionData, unsavedPetition } = route.params
	const newPetitionDataState: PetitionEntity = { ...petitionData, ...editDataContext.unsaved }

	const getPetitionField = (fieldName: keyof PetitionEntity, allowNull?: boolean) => {
		const currentPostData: PetitionEntity = { ...petitionData }

		if (allowNull && editDataContext.unsaved[fieldName] === '' && currentPostData[fieldName]) return ''
		return editDataContext.unsaved[fieldName] || currentPostData[fieldName]
	}

	const getPicturesUrl = () => {
		const picturesUrl = getPetitionField('picturesUrl')
		if (arrayIsEmpty(picturesUrl)) return []
		return picturesUrl
	}

	const savePetition = async () => {
		console.log(newPetitionDataState)
		try {
			setIsLoading(true)

			await createNewPetition(usePetitionRepository, { ...newPetitionDataState, owner: petitionOwner })

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

	const changeStateOfEditedFields = () => { // REFACTOR Centralizar no contexto
		const newEditState = { saved: { ...editDataContext.saved, ...editDataContext.unsaved }, unsaved: {} }
		setEditDataOnContext(newEditState)
	}

	const cancelAllChangesAndGoBack = () => {
		if ((!Object.keys(editDataContext.unsaved).length) && !unsavedPetition) {
			navigateBackwards()
			return
		}

		toggleDefaultConfirmationModalVisibility()
	}

	const navigateToEditScreen = (screenName: keyof PetitionStackParamList, initialValue: keyof PetitionEntity) => {
		const value = getPetitionField(initialValue, true)
		navigation.push(screenName, { editMode: true, initialValue: value })
	}

	const toggleDefaultConfirmationModalVisibility = () => {
		setDefaultConfirmationModalIsVisible(!defaultConfirmationModalIsVisible)
	}

	const getFormattedIdentificationItems = () => {
		const documentsRequired = getPetitionField('extraIdentificationRequest')
		return documentsRequired.map((identification: string, i: number) => `${i === 0 ? '' : '\n   '}●   ${identification}`)
	}

	const navigateBackwards = () => navigation.goBack()

	const backgroundColor = theme.purple2

	return (
		<Container>
			<DefaultConfirmationModal
				visibility={defaultConfirmationModalIsVisible}
				title={'descartar'}
				text={`você tem certeza que deseja descartar as alterações realizadas no abaixo assinado ${getPetitionField('title')}?`}
				highlightedWords={[...getPetitionField('title').split(' ')]}
				buttonKeyword={'descartar'}
				closeModal={toggleDefaultConfirmationModalVisibility}
				onPressButton={navigateBackwards}
			/>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<Header>
				<DefaultPostViewHeader
					text={unsavedPetition ? 'revisar abaixo assinado' : 'editar abaixo assinado'}
					highlightedWords={unsavedPetition ? ['revisar'] : ['editar']}
					destructiveButton={((!!Object.keys(editDataContext.unsaved).length || unsavedPetition))}
					onBackPress={cancelAllChangesAndGoBack}
					endButtonColor={theme.red3}
					endButtonSvgIcon={TrashWhiteIcon}
				/>
				{
					(Object.keys(editDataContext.unsaved).length > 0 || unsavedPetition) && (
						isLoading ? <Loader />
							: (
								<SaveButtonContainer>
									<PrimaryButton
										color={theme.green3}
										label={'publicar abaixo assinado'}
										highlightedWords={['publicar']}
										labelColor={theme.white3}
										fontSize={13}
										SecondSvgIcon={PlusWhiteIcon}
										svgIconScale={['50%', '30%']}
										minHeight={relativeScreenHeight(4)}
										relativeHeight={relativeScreenHeight(6)}
										onPress={savePetition}
									/>
								</SaveButtonContainer>
							)
					)
				}
			</Header>
			<Body backgroundColor={backgroundColor}>
				{
					unsavedPetition && (
						<>
							<SubtitleCard
								text={'seu abaixo assinado'}
								highlightedText={['abaixo', 'assinado']}
							/>
							<PostCardContainer backgroundColor={backgroundColor}>
								<PetitionCard
									owner={petitionOwner}
									petitionData={{
										...newPetitionDataState,
										createdAt: new Date(),
										title: 'Abaixo assinado para decidir os investimetos da praça da sé',
										picturesUrl: ['https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg']
									}}
									onPress={() => { }}
								/>
							</PostCardContainer>
							<SubtitleCard
								text={'detalhes do abaixo assinado'}
								highlightedText={['detalhes']}
							/>
						</>
					)
				}
				<BodyPadding backgroundColor={backgroundColor} >
					<DescriptionCard
						title={'título'}
						hightligtedWords={['título']}
						text={getPetitionField('title')}
						onEdit={() => navigateToEditScreen('InsertPetitionTitle', 'title')}
					/>
					<VerticalSpacing />
					<DescriptionCard
						title={'descrição'}
						hightligtedWords={['descrição']}
						text={getPetitionField('description')}
						onEdit={() => navigateToEditScreen('InsertPetitionDescription', 'description')}
					/>
					<VerticalSpacing />
					<EditCard
						title={'identificações requeridas'}
						highlightedWords={['requeridas']}
						value={getFormattedIdentificationItems()}
						onEdit={() => navigateToEditScreen('SelectIdentificationRequest', 'extraIdentificationRequest')}
					/>
					<VerticalSpacing />
					<EditCard
						title={'fotos do post'}
						highlightedWords={['fotos']}
						profilePicturesUrl={getPicturesUrl()}
						carousel
						pressionable={arrayIsEmpty(getPicturesUrl())}
						onEdit={() => navigateToEditScreen('SelectPetitionMedia', 'picturesUrl')}
					/>
					<VerticalSpacing />
					<PostRangeCard
						postRange={getPetitionField('range')}
						onEdit={() => navigateToEditScreen('SelectPetitionRange', 'range')}
					/>
					<VerticalSpacing />
					<LocationViewCard
						title={'localização'}
						locationView={'public'}
						textFontSize={16}
						location={getPetitionField('location')}
						onEdit={() => navigateToEditScreen('InsertPetitionLocation', 'location')}
					/>
					<VerticalSpacing />
					<VerticalSpacing height={relativeScreenHeight(1.5)} />
				</BodyPadding >
			</Body>
		</Container>
	)
}

export { PetitionReview }
