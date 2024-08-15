import React, { useEffect, useState } from 'react'
import { Platform } from 'react-native'

import { PostEntity } from '@domain/post/entity/types'
import { UserOwner } from '@domain/user/entity/types'

import { generateVideoThumbnails } from '@utils-ui/common/convertion/generateVideoThumbnail'
import { UiUtils } from '@utils-ui/common/UiUtils'

import {
	Container,
	ContainerInner,
	LeftArea,
	LeftSideLabel,
	RightArea,
	RightAreaLimits,
	SaleValueContainer,
	SaleValueContainerInner,
	SideMedia,
	Title,
	TitleContainer,
	WaitingApproveIconContainer,
	VideoIconContainer
} from './styles'
import ClockArrowWhiteIcon from '@assets/icons/clockArrow-white.svg'
import DeniedWhiteIcon from '@assets/icons/denied-white.svg'
import VideoCameraIcon from '@assets/icons/video-camera-white.svg'
import { theme } from '@common/theme'

import { VerticalSpacing } from '@components/_space/VerticalSpacing'

import { SaleExchangeValue } from '../../SaleExchangeValue'
import { SmallUserIdentification } from '../../SmallUserIdentification'

const { formatRelativeDate, arrayIsEmpty, checkMediaType } = UiUtils()

interface PostCardProps {
	post: PostEntity
	owner: UserOwner
	isOwner: boolean
	navigateToProfile?: (userId: string) => void
	onPress: () => void
}

function PostCard({ post: postData, owner, isOwner, navigateToProfile, onPress }: PostCardProps) {
	const [post, setPost] = useState<PostEntity | any>(postData)
	const [postCover, setPostCover] = useState('')
	const [buttonPressed, setButtomPressed] = useState<boolean>(false)

	useEffect(() => {
		if (isOwner) {
			setPost({ ...(postData || {}), ...(postData.unapprovedData || {}) } as PostEntity)
		}
	}, [postData, isOwner])

	useEffect(() => {
		hasMedia() && loadThumbnails()
	}, [])

	const loadThumbnails = async () => {
		const coverAsset = getMediaSource()
		const assetIsVideo = checkMediaType(coverAsset) === 'video'
		if (assetIsVideo && Platform.OS === 'ios') {
			const thumb = await generateVideoThumbnails(coverAsset || '') as string
			setPostCover(thumb)
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

	const renderFormatedPostDateTime = () => {
		if (!post.createdAt) return '---'
		if (post.macroCategory === 'event' && post.startDate) {
			return formatRelativeDate(post.startDate)
		}
		return formatRelativeDate(post.createdAt)
	}

	const getProfilePictureUrl = () => {
		if (!owner || !owner.profilePictureUrl) return null
		if (arrayIsEmpty(owner.profilePictureUrl)) return null
		return owner.profilePictureUrl[0]
	}

	const enableLeftAreaSpacing = () => (!arrayIsEmpty(post.picturesUrl) || (post.saleValue && (arrayIsEmpty(post.picturesUrl) && post.postType === 'vancancy')) || post.exchangeValue || (postData.unapprovedData && isOwner))

	function hasPictures(): boolean {
		return !arrayIsEmpty(post.picturesUrl)
	}

	function hasVideos(): boolean {
		return !arrayIsEmpty(post.videosUrl)
	}

	function hasMedia(): boolean {
		return hasPictures() || hasVideos()
	}

	function pressingButton() {
		setButtomPressed(true)
	}

	function notPressingButton() {
		setButtomPressed(false)
	}

	function releaseButton() {
		setButtomPressed(false)
		onPress()
	}

	function getMediaSource(): string {
		if (postCover) return postCover
		return post && (
			(post.picturesUrl && post.picturesUrl[0])
			|| (post.videosUrl && post.videosUrl[0]))
	}

	const getRelativeBlurhash = () => {
		switch (post.postType) {
			case 'income': return 'U0Fui[%|fQ%|?^fjfQfjfQfQfQfQ?^fjfQfj'
			case 'socialImpact': return 'U1R]RW-WfQ-W}ujtfQjtfQfQfQfQ}ujtfQjt'
			case 'culture': return 'U1HW.vx^fQx^%%fRfQfRfQfQfQfQ%%fRfQfR'
			default: return 'U1T7N2={fQ={~AjtfQjtfQfQfQfQ~AjtfQjt'
		}
	}

	const blurhash = getRelativeBlurhash()

	return (
		<Container
			activeOpacity={1}
			onPressIn={pressingButton}
			onPressOut={notPressingButton}
			onPress={releaseButton}
		>
			<ContainerInner
				buttonPressed={buttonPressed}
			>
				<LeftArea
					hasMediaOrSaleValue={enableLeftAreaSpacing()}
					backgroundColor={getRelativeColor(true)}
				>
					{
						<SideMedia
							hasMedia={hasMedia()}
							source={hasMedia() ? { uri: getMediaSource() } : {}}
							recyclingKey={hasMedia() ? getMediaSource() : ''}
							placeholder={blurhash}
							placeholderContentFit={'contain'}
							cachePolicy={'memory-disk'}
							transition={200}
						>
							{
								(checkMediaType(getMediaSource()) === 'video' || postCover) && (
									<VideoIconContainer>
										<VideoCameraIcon />
									</VideoIconContainer>
								)
							}
							{
								postData.unapprovedData && isOwner && (
									<WaitingApproveIconContainer
										hasValues={post.saleValue || post.exchangeValue}
										hasPicture={!arrayIsEmpty(post.picturesUrl)}
									>
										{
											postData.unapprovedData.reject
												? <DeniedWhiteIcon />
												: <ClockArrowWhiteIcon />
										}
									</WaitingApproveIconContainer>
								)
							}
							{
								(post.saleValue || post.exchangeValue) && (
									<>
										<SaleValueContainer >
											<SaleValueContainerInner>
												<SaleExchangeValue
													smallFontSize={12}
													largeFontSize={12}
													exchangeFontSize={12}
													saleValue={post.saleValue}
													exchangeValue={post.exchangeValue}
													breakRow
												/>
											</SaleValueContainerInner>
										</SaleValueContainer>
										{(!arrayIsEmpty(post.picturesUrl) || post.saleValue || post.exchangeValue) && <VerticalSpacing />}
									</>
								)
							}
						</SideMedia >
					}
				</LeftArea >
				<LeftSideLabel style={{ backgroundColor: getRelativeColor() }} />
				<RightArea hasMediaOrSaleValue={enableLeftAreaSpacing()}>
					<RightAreaLimits>
						<TitleContainer>
							<Title numberOfLines={3}>
								{post.description}
							</Title>
						</TitleContainer>
						<VerticalSpacing />
						<SmallUserIdentification
							userName={owner.name}
							postDate={renderFormatedPostDateTime()}
							profilePictureUrl={getProfilePictureUrl()}
							navigateToProfile={() => navigateToProfile && navigateToProfile(owner.userId)}
						/>
					</RightAreaLimits>
				</RightArea>
			</ContainerInner>
		</Container >
	)
}

export { PostCard }
