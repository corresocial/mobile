import { ResizeMode, Video } from 'expo-av'
import React, { useEffect, useRef, useState } from 'react'

import { DeliveryMethod, PostEntity, PostRange } from '@domain/post/entity/types'
import { UserOwner } from '@domain/user/entity/types'

import { IconName } from '@assets/icons/iconMap/types'
import { MacroCategoriesType } from '@utils/postMacroCategories/types'

import { generateVideoThumbnails } from '@utils-ui/common/convertion/generateVideoThumbnail'

import { Container, DataContainer, InfoContainer, InfoDataContainer, InfoGroup, InfoTitle, InnerContainer, MediaContainer, MuteButtonContainer, PictureView, PlaceHolderThumbnailContainer, PlayButtonContainer, PostDescriptionText, PostStatusContainer, UserDataContainer, VideoIconContainer, VideoView } from './styles'
import { theme } from '@common/theme'

import { SaleExchangeValue } from '@components/SaleExchangeValue'
import { IconComponent } from '@newComponents/IconComponent'
import { MiniUserIndentifier } from '@newComponents/MiniUserIdentifier'

interface PostCardProps {
	post: PostEntity
	owner: UserOwner
	isOwner: boolean
	isVisible?: boolean
	videoMuted?: boolean
	hasAutoPlayFunction?: boolean
	navigateToProfile?: (userId: string) => void
	onAudioButtonPressed?: () => void
	onPress: () => void
}

function PostCard({ post: postData, owner, isOwner, hasAutoPlayFunction = true, videoMuted = true, isVisible = false, navigateToProfile, onAudioButtonPressed, onPress }: PostCardProps) {
	const [post, setPost] = useState<PostEntity | any>(postData)
	const [buttonPressed, setButtonPressed] = useState<boolean>(false)
	const [videoThumbnail, setVideoThumbnail] = useState<string>('')
	const [videoLoaded, setVideoLoaded] = useState<boolean>(false)

	const videoRef = useRef<Video | null>(null)

	const hasPictures = Array.isArray(post.picturesUrl) && post.picturesUrl.length > 0
	const hasVideos = Array.isArray(post.videosUrl) && post.videosUrl.length > 0

	const hasMedia = hasPictures || hasVideos

	const mediaSource = hasVideos ? post.videosUrl[0] : hasPictures ? post.picturesUrl[0] : ''

	useEffect(() => {
		if (hasVideos) {
			const generateThumbnail = async () => {
				const thumbnail = await generateVideoThumbnails(mediaSource)
				setVideoThumbnail(thumbnail as string)
			}
			generateThumbnail()
		}
	}, [])

	useEffect(() => {
		if (isVisible) {
			playVideo()
		} else {
			stopVideo()
		}
	}, [isVisible])

	useEffect(() => {
		if (isOwner) {
			setPost({ ...(postData || {}), ...(postData.unapprovedData || {}) } as PostEntity)
		}
	}, [postData, isOwner])

	const pressingButton = () => {
		setButtonPressed(true)
	}

	const notPressingButton = () => {
		setButtonPressed(false)
	}

	const releaseButton = () => {
		setButtonPressed(false)
		onPress?.()
	}

	const miniProfileHandler = () => {
		navigateToProfile?.(owner.userId)
	}

	const playVideo = async () => {
		const currentVideoRef = videoRef.current
		if (currentVideoRef) {
			currentVideoRef.playAsync()
		}
	}

	const stopVideo = async () => {
		const currentVideoRef = videoRef.current
		if (currentVideoRef) {
			currentVideoRef.pauseAsync()
		}
	}

	const getRangeIcon = (range: DeliveryMethod | PostRange): IconName => {
		switch (range) {
			case 'unavailable': return 'personWalking'
			case 'city': return 'city'
			case 'country': return 'countryBrazil'
			case 'near': return 'pin'
		}
	}

	const getFormattedPostRange = (range: PostRange) => {
		switch (range) {
			case 'city': return 'cidade'
			case 'near': return 'região'
			case 'country': return 'Brasil'
		}
	}

	const getRelativePostTypeIcon = (macroCategory: MacroCategoriesType): IconName => {
		switch (macroCategory) {
			case 'art': return 'colorPalet'
			case 'event': return 'calendarEveryday'
			case 'education': return 'books'
			case 'donation': return 'handOnHeart'
			case 'informative': return 'paperInfo'
			case 'iniciative': return 'heartAndPerson'
			case 'sale': return 'salesCart'
			case 'service': return 'toolbox'
			case 'vacancy': return 'briefcase'
			default: return 'x'
		}
	}

	const getRelativePostTypeLabel = (macroCategory: MacroCategoriesType) => {
		switch (macroCategory) {
			case 'art': return 'arte'
			case 'event': return 'evento'
			case 'education': return 'educação'
			case 'donation': return 'doação'
			case 'informative': return 'informativo'
			case 'iniciative': return 'iniciativa'
			case 'sale': return 'venda'
			case 'service': return 'serviço'
			case 'vacancy': return 'vagas'
			default: return 'indisponível'
		}
	}

	const getRelativeColor = (lightColor?: boolean) => {
		switch (post.postType) {
			case 'income': return lightColor ? theme.colors.green[1] : theme.colors.green[3]
			case 'socialImpact': return lightColor ? theme.colors.pink[1] : theme.colors.pink[3]
			case 'culture': return lightColor ? theme.colors.blue[1] : theme.colors.blue[3]
			default: return lightColor ? theme.colors.orange[1] : theme.colors.orange[3]
		}
	}

	return (
		<Container
			activeOpacity={1}
			onPressIn={pressingButton}
			onPressOut={notPressingButton}
			onPress={releaseButton}
			hasMedia={hasMedia}
		>
			<InnerContainer backgroundColor={getRelativeColor()} buttonPressed={buttonPressed}>
				<MediaContainer hasMedia={hasMedia}>
					{
						hasMedia && (
							hasVideos ? (
								// VideoView must be in the screen to properly run onLoad
								<>
									<VideoView
										source={{ uri: mediaSource }}
										resizeMode={ResizeMode.COVER}
										isLooping
										ref={videoRef}
										useNativeControls={false}
										isMuted={videoMuted}
										onLoad={() => {
											setVideoLoaded(true)
										}}
									/>
									{
										hasAutoPlayFunction && (
											<MuteButtonContainer>
												<IconComponent activeOpacity={1} relativeHeight={60} relativeWidth={60} iconName={videoMuted ? 'audioMuted' : 'audio'} onPress={onAudioButtonPressed} />
											</MuteButtonContainer>
										)
									}
									{!hasAutoPlayFunction && (
										<VideoIconContainer>
											<IconComponent iconName={'videoCamera'} relativeHeight={40} relativeWidth={40} />
										</VideoIconContainer>
									)}
									{
										(!videoLoaded || !isVisible) && (
											<PlaceHolderThumbnailContainer>
												{
													hasAutoPlayFunction && (
														<PlayButtonContainer>
															<IconComponent relativeHeight={40} relativeWidth={40} iconName={'playVideo'} />
														</PlayButtonContainer>
													)
												}
												{videoThumbnail && (
													<PictureView
														source={{ uri: videoThumbnail }}
														recyclingKey={videoThumbnail}
														cachePolicy={'memory-disk'}
													/>
												)}
											</PlaceHolderThumbnailContainer>
										)
									}
								</>
							) : (
								(
									<PictureView
										source={{ uri: mediaSource }}
										recyclingKey={mediaSource}
										cachePolicy={'memory-disk'}
									/>
								)
							)
						)
					}
				</MediaContainer>
				<DataContainer hasMedia={hasMedia}>
					<PostDescriptionText numberOfLines={3}>
						{post.description}
					</PostDescriptionText>
					<InfoDataContainer>
						<UserDataContainer>
							<MiniUserIndentifier userPictureShadow navigateToProfile={miniProfileHandler} owner={owner} postedAt={post.createdAt} />
							{
								<PostStatusContainer>
									{
										postData.unapprovedData && isOwner && (
											postData.unapprovedData.reject
												? <IconComponent relativeHeight={'90%'} relativeWidth={35} iconName={'denied'} />
												: <IconComponent relativeHeight={'90%'} relativeWidth={35} iconName={'coolDownClock'} />
										)
									}
								</PostStatusContainer>
							}
						</UserDataContainer>
						<InfoGroup>
							<InfoContainer>
								<IconComponent relativeWidth={22} iconName={getRangeIcon(post.range)} />
								<InfoTitle>{getFormattedPostRange(post.range)}</InfoTitle>
							</InfoContainer>
							<InfoContainer>
								<IconComponent relativeWidth={22} iconName={getRelativePostTypeIcon(post.macroCategory)} />
								<InfoTitle>{getRelativePostTypeLabel(post.macroCategory)}</InfoTitle>
							</InfoContainer>
							{
								(post.saleValue || post.exchangeValue) && (post.macroCategory === 'service' || post.macroCategory === 'sale') && (
									<>
										<InfoContainer>
											<SaleExchangeValue
												smallFontSize={12}
												largeFontSize={12}
												exchangeFontSize={12}
												saleValue={post.saleValue}
												exchangeValue={post.exchangeValue}
												breakRow
											/>
										</InfoContainer>
									</>
								)
							}
						</InfoGroup>
					</InfoDataContainer>
				</DataContainer>
			</InnerContainer>
		</Container>
	)
}

export { PostCard }
