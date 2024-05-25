import React, { useContext, useEffect, useState } from 'react'
import { StatusBar, ScrollView, TouchableOpacity } from 'react-native'

import { PostEntityKeys } from '@domain/post/entity/types'
import { usePostDomain } from '@domain/post/usePostDomain'

import { usePostRepository } from '@data/post/usePostRepository'

import { useAuthContext } from '@contexts/AuthContext'
import { EditContext } from '@contexts/EditContext'
import { useLeaderAreaContext } from '@contexts/LeaderAreaContext'
import { LoaderContext } from '@contexts/LoaderContext'

import { ViewUnapprovedPostScreenProps } from '@routes/Stack/LeaderAreaStack/screenProps'

import { UiUtils } from '@utils-ui/common/UiUtils'
import { socialImpactCategories } from '@utils/postsCategories/socialImpactCategories'

import { Body, Container, Header, OptionsArea, UserAndValueContainer } from './styles'
import CheckWhiteIcon from '@assets/icons/check-white.svg'
import DeniedWhiteIcon from '@assets/icons/denied-white.svg'
import ThreeDotsWhiteIcon from '@assets/icons/threeDots.svg'
import { getShortText } from '@common/auxiliaryFunctions'
import { relativeScreenWidth } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { SmallButton } from '@components/_buttons/SmallButton'
import { DescriptionCard } from '@components/_cards/DescriptionCard'
import { ImportantPointsCard } from '@components/_cards/ImportantPointsCard'
import { LinkCard } from '@components/_cards/LinkCard'
import { SaleOrExchangeCard } from '@components/_cards/SaleOrExchangeCard'
import { DefaultConfirmationModal } from '@components/_modals/DefaultConfirmationModal'
import { GalleryModal } from '@components/_modals/GalleryModal'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { DefaultPostViewHeader } from '@components/DefaultPostViewHeader'
import { HorizontalTagList } from '@components/HorizontalTagList'
import { ImageCarousel } from '@components/ImageCarousel'
import { PostPopOver } from '@components/PostPopOver'
import { SmallUserIdentification } from '@components/SmallUserIdentification'

const { approvePost, rejectPost } = usePostDomain()

const { formatRelativeDate, arrayIsEmpty } = UiUtils()

function ViewUnapprovedPost({ route, navigation }: ViewUnapprovedPostScreenProps) {
	const { userDataContext } = useAuthContext()
	const { clearEditContext } = useContext(EditContext)
	const { setLoaderIsVisible } = useContext(LoaderContext)
	const { removeFromUnapprovedPostList } = useLeaderAreaContext()

	const [postOptionsIsOpen, setPostOptionsIsOpen] = useState(false)

	const [approveConfirmationModalIsVisible, setApproveConfirmationModalIsVisible] = useState(false)
	const [rejectConfirmationModalIsVisible, setRejectConfirmationModalIsVisible] = useState(false)
	const [galeryIsVisible, setGaleryIsVisible] = useState(false)

	const { postData } = route.params

	useEffect(() => {
		console.log(postData.unapprovedData)
		return () => {
			clearEditContext()
		}
	}, [])

	const getProfilePictureUrl = () => {
		if (!postData || !postData.owner || !postData.owner.profilePictureUrl) return null
		if (arrayIsEmpty(postData.owner.profilePictureUrl)) return null
		return postData.owner.profilePictureUrl[0]
	}

	const renderFormatedPostDateTime = () => {
		const formatedDate = formatRelativeDate(postData.createdAt || '')
		return formatedDate
	}

	const reportPost = () => {
		setPostOptionsIsOpen(false)
		navigation.navigate('ContactUsInsertMessage' as any, { // TODO TYpe
			title: 'denunciar',
			contactUsType: 'denúncia',
			reportedType: postData.postType,
			reportedId: postData.postId
		})
	}

	const navigateToProfile = () => {
		const ownerId = postData.owner.userId
		if (userDataContext.userId === ownerId) {
			return navigation.navigate('Profile' as any)
		}
		navigation.navigate('ProfileLeaderArea', { userId: ownerId, stackLabel: 'LeaderArea' })
	}

	const getCategoryLabel = () => {
		try {
			const categoryField = getPostField('category')
			if (Object.keys(socialImpactCategories).includes(categoryField)) {
				return (socialImpactCategories as any)[categoryField].label
			}
			return ''
		} catch (err) {
			console.log(err)
			return ''
		}
	}

	const getPostField = (fieldName: PostEntityKeys, useApproedPostData?: boolean):any => { // TODO TYpe
		return useApproedPostData ? (postData.unapprovedData as any)[fieldName] || (postData as any)[fieldName] : (postData.unapprovedData as any)[fieldName]
	}

	const toggleApproveConfirmationModalVisibility = () => {
		setPostOptionsIsOpen(false)
		setTimeout(() => setApproveConfirmationModalIsVisible(!approveConfirmationModalIsVisible), 400)
	}

	const toggleRejectConfirmationModalVisibility = () => {
		setPostOptionsIsOpen(false)
		setTimeout(() => setRejectConfirmationModalIsVisible(!rejectConfirmationModalIsVisible), 400)
	}

	const openGallery = () => setGaleryIsVisible(true)

	const closeGalery = () => setGaleryIsVisible(false)

	const handleApprovePostButton = () => {
		toggleApproveConfirmationModalVisibility()
	}

	const handleRejectPostButton = () => {
		toggleRejectConfirmationModalVisibility()
	}
	const rejectUserPost = async () => {
		try {
			setLoaderIsVisible(true)
			console.log('Rejeitado!')
			const rejectedPost = await rejectPost(usePostRepository, postData)
			removeFromUnapprovedPostList(rejectedPost!) // Atualizar em um contexto
			setLoaderIsVisible(false)
		} catch (err) {
			console.log(err)
			setLoaderIsVisible(false)
		}
	}

	const approveUserPost = async () => {
		try {
			setLoaderIsVisible(true)
			console.log('Aprovado!')
			const approvedPost = await approvePost(usePostRepository, postData)
			removeFromUnapprovedPostList(approvedPost!)
			setLoaderIsVisible(false)
			navigationBackwards()
		} catch (err) {
			console.log(err)
			setLoaderIsVisible(false)
		}
	}

	const navigationBackwards = () => navigation.goBack()

	return (
		<Container>
			<DefaultConfirmationModal // APROVAR
				visibility={approveConfirmationModalIsVisible}
				title={'aprovar'}
				text={'você tem certeza que deseja aprovar esse post?'}
				highlightedWords={['aprovar']}
				buttonKeyword={'aprovar'}
				closeModal={toggleApproveConfirmationModalVisibility}
				onPressButton={approveUserPost}
			/>
			<DefaultConfirmationModal // REJEITAR
				visibility={rejectConfirmationModalIsVisible}
				title={'rejeitar'}
				text={'você tem certeza que deseja rejeitar esse post?'}
				highlightedWords={['rejeitar']}
				buttonKeyword={'rejeitar'}
				closeModal={toggleRejectConfirmationModalVisibility}
				onPressButton={rejectUserPost}
			/>
			<StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
			<Header>
				<DefaultPostViewHeader
					onBackPress={() => navigation.goBack()}
					text={getPostField('description')}
				/>
				<VerticalSpacing />
				<UserAndValueContainer>
					<SmallUserIdentification
						userName={postData.owner ? postData.owner.name : 'usuário do corre.'}
						postDate={renderFormatedPostDateTime()}
						userNameFontSize={14}
						profilePictureUrl={getProfilePictureUrl()}
						pictureDimensions={45}
						width={'60%'}
						navigateToProfile={navigateToProfile}
					/>
				</UserAndValueContainer>
				<VerticalSpacing />
				<OptionsArea>
					<SmallButton
						label={'rejeitar'}
						color={theme.red3}
						SvgIcon={DeniedWhiteIcon}
						relativeWidth={'40%'}
						height={relativeScreenWidth(12)}
						onPress={handleRejectPostButton}
					/>
					<SmallButton
						label={'aprovar'}
						color={theme.green3}
						SvgIcon={CheckWhiteIcon}
						relativeWidth={'40%'}
						height={relativeScreenWidth(12)}
						onPress={handleApprovePostButton}
					/>
					<PostPopOver
						postTitle={getShortText(getPostField('description'), 45) || 'publicação no corre.'}
						popoverVisibility={postOptionsIsOpen}
						closePopover={() => setPostOptionsIsOpen(false)}
						isAuthor={false}
						goToComplaint={reportPost}
					>
						<SmallButton
							SvgIcon={ThreeDotsWhiteIcon}
							relativeWidth={relativeScreenWidth(12)}
							height={relativeScreenWidth(12)}
							onPress={() => setPostOptionsIsOpen(true)}
						/>
					</PostPopOver>
				</OptionsArea>
			</Header>

			<ScrollView showsVerticalScrollIndicator={false} >
				<VerticalSpacing />
				{
					getPostField('tags') && (
						<HorizontalTagList
							tags={[getCategoryLabel(), ...getPostField('tags')]}
							selectedColor={theme.pink1}
						/>
					)
				}
				<Body>
					<VerticalSpacing />
					{
						getPostField('description') && (
							<>
								<DescriptionCard
									text={getPostField('description')}
								/>
								<VerticalSpacing />
							</>
						)
					}
					{
						!arrayIsEmpty(getPostField('links')) && (
							<>
								<VerticalSpacing />
								<LinkCard
									links={getPostField('links')}
								/>
							</>
						)
					}
					<VerticalSpacing />
					{
						!arrayIsEmpty(getPostField('picturesUrl')) && (
							<>
								<GalleryModal
									picturesUrl={getPostField('picturesUrl')}
									videosUrl={getPostField('videosUrl')}
									showGallery={galeryIsVisible}
									onClose={closeGalery}
								/>
								<TouchableOpacity
									activeOpacity={1}
									onPress={openGallery}
								>
									<ImageCarousel
										picturesUrl={getPostField('picturesUrl') || []}
										indicatorColor={theme.blue1}
										square
										showFullscreenIcon
									/>
								</TouchableOpacity>

							</>
						)
					}
					{
						getPostField('entryValue', true) && (
							<>
								<SaleOrExchangeCard
									title={'custo de entrada'}
									hightligtedWords={['custo', 'entrada']}
									saleValue={getPostField('entryValue', true)}
									isCulturePost
								/>
								<VerticalSpacing />
							</>
						)
					}
					{
						!!(getPostField('importantPoints') && getPostField('importantPoints').length) && (
							<ImportantPointsCard
								importantPoints={getPostField('importantPoints')}
							/>
						)
					}
				</Body>
			</ScrollView>
		</Container >
	)
}

export { ViewUnapprovedPost }

// Outros cards de informações

// {/* {
// 						getPostField('macroCategory') && (
// 							<SocialImpactTypeCard
// 								title={'tipo de cultura'}
// 								macroCategory={getPostField('macroCategory')}
// 							/>
// 						)
// 					}
// 					{
// 						getPostField('macroCategory') && (
// 							<CultureTypeCard
// 								title={'tipo de cultura'}
// 								macroCategory={getPostField('macroCategory')}
// 							/>
// 						)
// 					}
// 					{
// 						getPostField('macroCategory') && (
// 							<SocialImpactTypeCard
// 								title={'tipo de impacto'}
// 								macroCategory={getPostField('macroCategory')}
// 							/>
// 						)
// 					}
// 					{
// 						getPostField('macroCategory') && (
// 							<IncomeTypeCard
// 								title={'tipo de cultura'}
// 								macroCategory={getPostField('macroCategory')}
// 							/>
// 						)
// 					} */}
// 					{/* {
// 						getPostField('eventPlaceModality') && (
// 							<>
// 								<PlaceModality
// 									title={'como participar'}
// 									hightligtedWords={['participar']}
// 									placeModality={getPostField('eventPlaceModality')}
// 								/>
// 								<VerticalSpacing />
// 							</>
// 						)
// 					} */}
// 					{/* <PlaceModality // Se for vacancy
// 						title={'local de trabalho'}
// 						hightligtedWords={['local', 'trabalho']}
// 						placeModality={getPostField('workplace')}
// 						isVacancy
// 					/> */}
// 					{/* {
// 						(getPostField('eventPlaceModality') || getPostField('locationView') || getPostField('location')) && (
// 							<LocationViewCard
// 								online={getPostField('workplace') === 'homeoffice'}
// 								locationView={getPostField('locationView')}
// 								withoutMapView={!(getPostField('location') && getPostField('location').coordinates)}
// 								location={getPostField('location')}
// 							/>
// 						)
// 					} */}
// 					{/* <DateTimeCard
// 						weekDaysfrequency={getPostField('exhibitionFrequency')}
// 						daysOfWeek={getPostField('daysOfWeek', true)}
// 						startDate={getPostField('startDate', true)}
// 						endDate={getPostField('endDate', true)}
// 						startTime={getPostField('startHour', true)}
// 						endTime={getPostField('endHour', true)}
// 						repetition={getPostField('repeat')}
// 					/> */}
// 					{/* <ExhibitionPlaceCard
// 						exhibitionPlace={getPostField('exhibitionPlace')}
// 					/> */}
// 					{/*
// 						getPostField('itemStatus') && (
// 							<>
// 								<ItemStatusCard
// 									itemStatus={getPostField('itemStatus')}
// 								/>
// 								<VerticalSpacing />
// 							</>
// 						)
// 					} */}
// 					{/*
// 					 {
// 						(getPostField('saleValue') || getPostField('exchangeValue')) && (
// 							<>
// 								<SaleOrExchangeCard
// 									saleValue={getPostField('saleValue', true)}
// 									exchangeValue={getPostField('exchangeValue', true)}
// 								/>
// 								<VerticalSpacing />
// 							</>
// 						)
// 					} */}
// 					{/*
// 					 {
// 						getPostField('deliveryMethod') && (
// 							<>
// 								<VerticalSpacing />
// 								<DeliveryMethodCard
// 									deliveryMethod={getPostField('deliveryMethod')}
// 								/>
// 							</>
// 						)
// 					} */}
// 					{/*
// 					 <VacancyPurposeCard
// 						vacancyPurpose={getPostField('vacancyPurpose' as any) || getPostField('lookingFor')} // TODO Vacancy purpose não existe mais
// 					/> */}
// 					{/* {
// 						(getPostField('saleValue', true) || getPostField('exchangeValue', true)) && (
// 							<>
// 								<SaleOrExchangeCard
// 									title={'tipo de remuneração'}
// 									hightligtedWords={['tipo', 'remuneração']}
// 									saleValue={getPostField('saleValue', true)}
// 									exchangeValue={getPostField('exchangeValue', true)}
// 									isPayment
// 								/>
// 								<VerticalSpacing />
// 							</>
// 						)
// 					} */}
