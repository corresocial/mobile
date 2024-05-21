import React, { useContext, useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { useTheme } from 'styled-components'

import { PetitionEntity } from '@domain/petition/entity/types'
import { usePetitionDomain } from '@domain/petition/usePetitionDomain'

import { usePetitionRepository } from '@data/petition/usePetitionRepository'
import { useUserRepository } from '@data/user/useUserRepository'

import { AuthContext } from '@contexts/AuthContext'
import { LoaderContext } from '@contexts/LoaderContext'
import { usePetitionContext } from '@contexts/PetitionContext'

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
import { Loader } from '@components/Loader'
import { PostHeader } from '@components/PostHeader'
import { PostPopOver } from '@components/PostPopOver'

const { getPetitionData, generatePetitionResultsReport, markPetitionAsCompleted, deletePetitionData } = usePetitionDomain()

const { remoteStorage } = useUserRepository()

const { arrayIsEmpty } = UiUtils()

function ViewPetition({ route, navigation }: ViewPetitionScreenProps) {
	const { setLoaderIsVisible } = useContext(LoaderContext)
	const { userDataContext } = useContext(AuthContext)
	const { savePetitionToRespondOnContext, setPetitionSignatureOnContext } = usePetitionContext()

	const theme = useTheme()

	const [petitionData, setPetitionData] = useState<PetitionEntity>(route.params?.petitionData || {} as PetitionEntity)
	const [galeryIsVisible, setGaleryIsVisible] = useState(false)

	const [postOptionsIsOpen, setPetitionOptionsIsOpen] = useState(false)
	const [deleteConfirmationModalIsVisible, setDeleteConfirmationModalIsVisible] = useState(false)

	const isAuthor = () => userDataContext.userId === petitionData.owner.userId
	const isCompleted = false

	useEffect(() => {
		getData()

		const unsubscribe = navigation.addListener('focus', () => {
			setPetitionSignatureOnContext({})
		})
		return unsubscribe
	}, [])

	const getData = (async () => {
		if (route.params.petitionId && !route.params.petitionData) {
			const petition = await getPetitionData(usePetitionRepository, route.params.petitionId)
			petition && setPetitionData(petition)
		}
	})

	const navigateToProfile = () => {
		if (isAuthor()) return navigation.navigate('Profile' as any)
		navigation.navigate('ProfileHome' as any, { userId: petitionData.owner.userId })// TODO Type
	}

	const sharePost = () => {
		share(`Olha o que ${isAuthor() ? 'estou anunciando' : 'encontrei'} no corre. no corre.\n\nAbaixo Assinado: ${petitionData.title} \n\nBaixe o app e faça parte!\nhttps://corre.social`)
	}

	const respondPetition = async () => {
		navigation.navigate('InsertPetitionFullName')
		const userAuthIdentification = await checkRegisteredAuthInfo()

		setPetitionSignatureOnContext({ ...userAuthIdentification })
		savePetitionToRespondOnContext(petitionData)
	}

	const checkRegisteredAuthInfo = async () => {
		const privateUserContacts = await remoteStorage.getPrivateContacts(userDataContext.userId)
		const phoneIdentification = privateUserContacts?.cellNumber ? { cellNumber: privateUserContacts?.cellNumber } : {}
		const emailIdentification = privateUserContacts?.email ? { email: privateUserContacts?.email } : {}
		return { ...phoneIdentification, ...emailIdentification }
	}

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

	if (!petitionData || !Object.keys(petitionData).length) {
		return (
			<Loader flex />
		)
	}

	const alreadyResponded = petitionData.idUsersResponded?.includes(userDataContext.userId)

	return (
		<>
			<DefaultConfirmationModal
				visibility={deleteConfirmationModalIsVisible}
				title={'apagar abaixo assinado'}
				text={`você tem certeza que deseja apagar o abaixo assinado ${petitionData.title}`}
				highlightedWords={(petitionData.title || '').split(' ')}
				buttonKeyword={'apagar'}
				closeModal={toggleDefaultConfirmationModalVisibility}
				onPressButton={deletePetition}
			/>
			<PostHeader
				title={petitionData.title}
				isAuthor={isAuthor()}
				isCompleted={isCompleted}
				owner={petitionData.owner}
				createdAt={petitionData.createdAt}
				navigateToProfile={navigateToProfile}
				sharePost={sharePost}
				highlightedButtonText={isAuthor() ? 'baixar resultados' : alreadyResponded ? 'já assinado' : 'assinar'}
				highlightedButtonIcon={DocumentPencilWhiteIcon}
				highlightedButtonAction={isAuthor() ? downloadPetitionResults : alreadyResponded ? () => { } : respondPetition}
				inactiveHighlightedButton={alreadyResponded}
				HeaderFooter={isAuthor() && (
					<SmallButton
						label={'responder abaixo assinado'}
						labelColor={theme.black4}
						color={theme.yellow3}
						SvgIcon={DocumentPencilWhiteIcon}
						relativeWidth={'98%'}
						height={relativeScreenWidth(12)}
						onPress={respondPetition}
					/>
				)}
			>
				<PostPopOver
					postTitle={petitionData.title}
					popoverVisibility={postOptionsIsOpen}
					closePopover={() => setPetitionOptionsIsOpen(false)}
					isAuthor={isAuthor()}
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
					title={'alcance do abaixo assinado'}
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
