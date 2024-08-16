import { ResizeMode, Video } from 'expo-av'
import React, { useEffect, useRef, useState } from 'react'

import { DeliveryMethod, PostEntity, PostRange } from '@domain/post/entity/types'
import { UserOwner } from '@domain/user/entity/types'

import { IconName } from '@assets/icons/iconMap/types'
import { MacroCategoriesType } from '@utils/postMacroCategories/types'

import { textHasOnlyNumbers } from '@utils-ui/common/validation/validateText'

import { Container, DataContainer, InfoContainer, InfoDataContainer, InfoGroup, InfoTitle, InnerContainer, MediaContainer, PictureView, PostDescriptionText, PriceLabel, UserDataContainer, VideoView } from './styles'
import { theme } from '@common/theme'

import { IconComponent } from '@newComponents/IconComponent'
import { MiniUserIndentifier } from '@newComponents/MiniUserIdentifier'

type PriceValues = { saleValue?: string, exchangeValue?: string, isEvent?: boolean }

interface PostCardProps {
	post: PostEntity
	owner: UserOwner
	isOwner: boolean
	isVisible?: boolean
	navigateToProfile?: (userId: string) => void
	onPress: () => void
}

function PostCard({ post: postData, owner, isOwner, isVisible = false, navigateToProfile, onPress }: PostCardProps) {
	const [post, setPost] = useState<PostEntity | any>(postData)
	const [postCover, setPostCover] = useState('')
	const [buttonPressed, setButtonPressed] = useState<boolean>(false)
	const [videoMuted, setVideoMuted] = useState<boolean>(true)

	const videoRef = useRef<Video | null>(null)

	const hasPictures = Array.isArray(post.picturesUrl) && post.picturesUrl.length > 0
	const hasVideos = Array.isArray(post.videosUrl) && post.videosUrl.length > 0

	const hasMedia = hasPictures || hasVideos

	const mediaSource = hasVideos ? post.videosUrl[0] : hasPictures ? post.picturesUrl[0] : ''

	useEffect(() => {
		console.log('TESTE AAAAAAA')
		if (isVisible) {
			playVideo()
		} else {
			stopVideo()
		}
	}, [isVisible])

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

	const getRelativePriceValueLabel = (priceValue: PriceValues) => {
		const formattedValue = []

		if (priceValue.isEvent && (priceValue.saleValue === '')) {
			formattedValue.push(
				<PriceLabel bold>{'gratuito'}</PriceLabel>
			)
			return formattedValue
		}

		if (textHasOnlyNumbers(priceValue.saleValue)) {
			formattedValue.push(
				<>
					<PriceLabel>{'R$'}</PriceLabel>
					<PriceLabel bold>{`${priceValue.saleValue},00`}</PriceLabel>
				</>
			)
			return formattedValue
		}

		if (priceValue.saleValue === 'a combinar') {
			formattedValue.push('a combinar')
		}

		if (priceValue.exchangeValue) {
			formattedValue.push('troca')
		}

		formattedValue.push(
			<PriceLabel bold>{priceValue.saleValue || ''}</PriceLabel>
		)
		return formattedValue
	}

	const getRelativeValueIcon = (priceValue: PriceValues): IconName => {
		if (priceValue.saleValue === 'a combinar') { return 'chat' }
		if (priceValue.exchangeValue && priceValue.saleValue) { return 'trade' }
		if (priceValue.exchangeValue && !priceValue.saleValue) { return 'exchange' }
		if (!priceValue.exchangeValue && priceValue.saleValue) { return 'cash' }
		return 'cash'
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
								<VideoView
									source={{ uri: mediaSource }}
									resizeMode={ResizeMode.COVER}
									isLooping
									ref={videoRef}
									useNativeControls={false}
									isMuted={videoMuted}

								/>
							) : (
								<PictureView source={{ uri: mediaSource }} />
							)
						)
					}
				</MediaContainer>
				<DataContainer>
					<PostDescriptionText numberOfLines={3}>
						{post.description}
					</PostDescriptionText>
					<InfoDataContainer>
						<UserDataContainer>
							<MiniUserIndentifier navigateToProfile={miniProfileHandler} owner={owner} postedAt={post.createdAt} />
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
								post.priceValue && (
									<InfoContainer>
										<IconComponent relativeWidth={22} iconName={getRelativeValueIcon(post.priceValue)} />
										<InfoTitle>{getRelativePriceValueLabel(post.priceValue)}</InfoTitle>
									</InfoContainer>
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
