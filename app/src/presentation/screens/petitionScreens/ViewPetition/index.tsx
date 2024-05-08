import React, { useContext, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { useTheme } from 'styled-components'

import { PetitionEntity } from '@domain/petition/entity/types'
import { usePetitionDomain } from '@domain/petition/usePetitionDomain'

import { usePetitionRepository } from '@data/petition/usePetitionRepository'

import { AuthContext } from '@contexts/AuthContext'
import { LoaderContext } from '@contexts/LoaderContext'

import { ViewPetitionScreenProps } from '@routes/Stack/PetitionStack/screenProps'
import { DiscordContactUsType, ReportedTarget } from '@services/discord/types/contactUs'

import { UiUtils } from '@utils-ui/common/UiUtils'

import { Body } from './styles'
import DocumentPencilWhiteIcon from '@assets/icons/documentPencil-white.svg'
import ThreeDotsWhiteIcon from '@assets/icons/threeDots.svg'
import { relativeScreenHeight, relativeScreenWidth } from '@common/screenDimensions'
import { share, shareFile } from '@common/share'

import { SmallButton } from '@components/_buttons/SmallButton'
import { DescriptionCard } from '@components/_cards/DescriptionCard'
import { EditCard } from '@components/_cards/EditCard'
import { LocationViewCard } from '@components/_cards/LocationViewCard'
import { PostRangeCard } from '@components/_cards/PostRangeCard'
import { DefaultConfirmationModal } from '@components/_modals/DefaultConfirmationModal'
import { GalleryModal } from '@components/_modals/GalleryModal'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { ImageCarousel } from '@components/ImageCarousel'
import { PostHeader } from '@components/PostHeader'
import { PostPopOver } from '@components/PostPopOver'

const { generatePetitionResultsReport, markPetitionAsCompleted, deletePetitionData } = usePetitionDomain()

const { arrayIsEmpty } = UiUtils()

function ViewPetition({ navigation }: ViewPetitionScreenProps) {
	const { setLoaderIsVisible } = useContext(LoaderContext)
	const { userDataContext } = useContext(AuthContext)

	const theme = useTheme()

	const data: PetitionEntity = {
		completed: true,
		petitionId: 'idDeTeste',
		title: 'abaixo assinado sobre a assinatura de abaixo assinados',
		description: 'petição sobre o bairro dalapa enquete sobre o bairro dalapa enquete sobre o bairro dalapa enquete sobre o bairro dalapa enquete sobre o bairro dalapa',
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
		picturesUrl: ['https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg'],
		createdAt: new Date(),
		privateResponses: [],
		extraIdentificationRequest: ['rg'],
		idUsersResponded: [],
	}

	const [petitionData, setPetitionData] = useState<PetitionEntity>(data)
	const [galeryIsVisible, setGaleryIsVisible] = useState(false)

	const [postOptionsIsOpen, setPetitionOptionsIsOpen] = useState(false)
	const [deleteConfirmationModalIsVisible, setDeleteConfirmationModalIsVisible] = useState(false)

	const isAuthor = userDataContext.userId !== petitionData.owner.userId // TODO Remover comparação
	const isCompleted = false

	const navigateToProfile = () => {
		if (isAuthor) return navigation.navigate('Profile' as any)
		navigation.navigate('ProfileHome' as any, { userId: petitionData.owner.userId })// TODO Type
	}

	const sharePost = () => {
		share(`Olha o que ${isAuthor ? 'estou anunciando' : 'encontrei'} no corre. no corre.\n\nAbaixo Assinado: ${petitionData.title} \n\nBaixe o app e faça parte!\nhttps://corre.social`)
	}

	const respondPetition = () => {
		navigation.navigate('InsertPetitionFullName')

		console.log('assinar')
		// savePetitionToRespondOnContext(petitionData)
		// navigateToNextReponseScreen(petitionData.questions[0])
	}

	/* const navigateToNextReponseScreen = (nextQuestion: PetitionQuestion) => {
		switch (nextQuestion.questionType) {
			case 'binary': return navigation.navigate('PetitionStack' as any, { // TODO Type
				screen: 'AnswerBinaryQuestion' as keyof PetitionStackParamList,
				params: { questionData: nextQuestion }
			})
			case 'satisfaction': return navigation.navigate('PetitionStack' as any, {
				screen: 'AnswerSatisfactionQuestion' as keyof PetitionStackParamList,
				params: { questionData: nextQuestion }
			})
			case 'textual': return navigation.navigate('PetitionStack' as any, {
				screen: 'AnswerTextualQuestion' as keyof PetitionStackParamList,
				params: { questionData: nextQuestion }
			})
			case 'numerical': return navigation.navigate('PetitionStack' as any, {
				screen: 'AnswerTextualQuestion' as keyof PetitionStackParamList,
				params: { questionData: nextQuestion }
			})
		}
	} */

	const downloadPetitionResults = async () => {
		const reportHtmlContent = await generatePetitionResultsReport(usePetitionRepository, petitionData)
		shareFile(reportHtmlContent)
	}

	const reportPost = () => {
		setPetitionOptionsIsOpen(false)
		const params = {
			title: 'denunciar',
			contactUsType: 'denúncia' as DiscordContactUsType,
			reportedType: 'petition' as ReportedTarget,
			reportedId: petitionData.petitionId
		}

		navigation.push('ContactUsInsertMessageUserStack', params)
	}

	const markAsCompleted = async () => {
		setPetitionOptionsIsOpen(false)
		await markPetitionAsCompleted(usePetitionRepository, petitionData.petitionId)
	}

	const deletePetition = async () => {
		setPetitionOptionsIsOpen(false)
		setLoaderIsVisible(true)
		await deletePetitionData(usePetitionRepository, petitionData.petitionId)
		setLoaderIsVisible(false)
		navigation.goBack()
	}

	const toggleDefaultConfirmationModalVisibility = async () => {
		setPetitionOptionsIsOpen(false)
		setTimeout(() => setDeleteConfirmationModalIsVisible(!deleteConfirmationModalIsVisible), 400)
	}

	const openGallery = () => setGaleryIsVisible(true)
	const closeGalery = () => setGaleryIsVisible(false)

	const getFormattedIdentificationItems = () => {
		const documentsRequired = petitionData.extraIdentificationRequest
		return documentsRequired.map((identification: string, i: number) => `${i === 0 ? '' : '\n   '}●   ${identification}`)
	}

	return (
		<>
			<DefaultConfirmationModal
				visibility={deleteConfirmationModalIsVisible}
				title={'apagar enquete'}
				text={`você tem certeza que deseja apagar a enquete ${petitionData.title}`}
				highlightedWords={(petitionData.title || '').split(' ')}
				buttonKeyword={'apagar'}
				closeModal={toggleDefaultConfirmationModalVisibility}
				onPressButton={deletePetition}
			/>
			<PostHeader
				title={petitionData.title}
				isAuthor={isAuthor}
				isCompleted={isCompleted}
				owner={petitionData.owner}
				createdAt={petitionData.createdAt}
				navigateToProfile={navigateToProfile}
				sharePost={sharePost}
				highlightedButtonText={isAuthor ? 'baixar resultados' : 'assinar'}
				highlightedButtonIcon={DocumentPencilWhiteIcon}
				highlightedButtonAction={isAuthor ? downloadPetitionResults : respondPetition}
			>
				<PostPopOver
					postTitle={petitionData.title}
					popoverVisibility={postOptionsIsOpen}
					closePopover={() => setPetitionOptionsIsOpen(false)}
					isAuthor={isAuthor}
					isCompleted={petitionData.completed}
					goToComplaint={reportPost}
					markAsCompleted={markAsCompleted}
					deletePost={toggleDefaultConfirmationModalVisibility}
				>
					<SmallButton
						SvgIcon={ThreeDotsWhiteIcon}
						relativeWidth={relativeScreenWidth(12)}
						height={relativeScreenWidth(12)}
						onPress={() => setPetitionOptionsIsOpen(true)}
					/>
				</PostPopOver>
			</PostHeader>
			<Body>
				<VerticalSpacing height={relativeScreenHeight(2)} />
				<DescriptionCard
					title={'descrição'}
					text={petitionData.description}
				/>
				<VerticalSpacing />
				{
					!arrayIsEmpty(petitionData.picturesUrl) && (
						<>
							<GalleryModal
								picturesUrl={petitionData.picturesUrl || []}
								videosUrl={[]}
								showGallery={galeryIsVisible}
								onClose={closeGalery}
							/>
							<TouchableOpacity
								activeOpacity={1}
								onPress={openGallery}
							>
								<ImageCarousel
									picturesUrl={petitionData.picturesUrl || []}
									indicatorColor={theme.purple1}
									square
									showFullscreenIcon
								/>
							</TouchableOpacity>
						</>
					)
				}
				<EditCard
					title={'identificações requeridas'}
					highlightedWords={['requeridas']}
					value={getFormattedIdentificationItems()}
				/>
				<VerticalSpacing />
				<PostRangeCard
					title={'alcance da enquete'}
					postRange={petitionData.range}
				/>
				<VerticalSpacing />
				<LocationViewCard
					title={'localização'}
					location={petitionData.location}
					locationView={'public'}
				/>
				<VerticalSpacing height={relativeScreenHeight(5)} />
			</Body>
		</>
	)
}

export { ViewPetition }
