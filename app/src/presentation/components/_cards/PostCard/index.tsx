import React, { useState } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

import { PostEntityOptional } from '@domain/post/entity/types'
import { UserOwner } from '@domain/user/entity/types'

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
	VideoIconContainer
} from './styles'
import VideoCameraIcon from '@assets/icons/video-camera-white.svg'
import { relativeScreenWidth } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { VerticalSpacing } from '@components/_space/VerticalSpacing'

import { SaleExchangeValue } from '../../SaleExchangeValue'
import { SmallUserIdentification } from '../../SmallUserIdentification'

const { formatRelativeDate, arrayIsEmpty, checkMediaType } = UiUtils()

interface PostCardProps {
	post: PostEntityOptional | any
	owner: UserOwner
	navigateToProfile?: (userId: string) => void
	onPress: () => void
}

function PostCard({ post, owner, navigateToProfile, onPress }: PostCardProps) {
	const [buttonPressed, setButtomPressed] = useState<boolean>(false)
	const defineLabelColor = (lightColor?: boolean) => {
		switch (post.postType) {
			case 'income': return lightColor ? theme.green1 : theme.green3
			case 'socialImpact': return lightColor ? theme.pink1 : theme.pink3
			case 'culture': return lightColor ? theme.blue1 : theme.blue3
			default: return lightColor ? theme.orange1 : theme.orange3
		}
	}

	const renderShortName = () => {
		try {
			if (owner && owner.name && owner.name.split(' ').length <= 3) return owner.name
			const names = owner.name && (owner.name.split(' ') || [])
			if (!names) return 'usuário do corre.'
			return `${names[0]} ${names[1]}`
		} catch (err) {
			console.log(err)
			return owner.name || 'usuário do corre.'
		}
	}

	const renderFormatedPostDateTime = () => {
		if (!post.createdAt) return '---'
		const formatedDate = formatRelativeDate(post.createdAt)
		return formatedDate
	}

	const getProfilePictureUrl = () => {
		if (!owner || !owner.profilePictureUrl) return null
		if (arrayIsEmpty(owner.profilePictureUrl)) return null
		return owner.profilePictureUrl[0]
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

	function hasPictures(): boolean {
		return !arrayIsEmpty(post.picturesUrl)
	}
	
	function hasVideos(): boolean {
		return !arrayIsEmpty(post.videosUrl)
	}
	
	function hasMedia(): boolean {
		return hasPictures() || hasVideos() 
	}

	function getMediaSource(): string {
		return post.videosUrl[0] || post.picturesUrl[0]
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
				style={{ marginLeft: buttonPressed ? relativeScreenWidth(1.7) : 0 }}
			>
				<LeftArea
					hasMediaOrSaleValue={hasMedia() || post.saleValue || post.exchangeValue}
					backgroundColor={defineLabelColor(true)}
				>
					{
						<SideMedia
							hasMedia={hasMedia()}
							source={hasMedia() ? { uri: getMediaSource() } : {}}
							recyclingKey={hasMedia() ? getMediaSource() : ''}
							placeholder={blurhash}
							placeholderContentFit={'contain'}
							cachePolicy={'memory-disk'}
							transition={300}
						>
							{
								checkMediaType(getMediaSource()) === 'video' && (
									<VideoIconContainer>
										<VideoCameraIcon/>
									</VideoIconContainer>
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
										{(hasMedia()) && <VerticalSpacing height={RFValue(8)} />}
									</>
								)
							}
						</SideMedia>
					}
				</LeftArea>
				<LeftSideLabel style={{ backgroundColor: defineLabelColor() }} />
				<RightArea hasMediaOrSaleValue={hasMedia() || post.saleValue || post.exchangeValue}>
					<RightAreaLimits>
						<TitleContainer>
							<Title numberOfLines={post.description ? 3 : 2}>
								{post.description}
							</Title>
						</TitleContainer>
						<VerticalSpacing />
						<SmallUserIdentification
							userName={renderShortName()}
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
