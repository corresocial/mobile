import React, { useState } from 'react'

import { CultureEntity } from '@domain/post/entity/types'

import { Container, EventDataContainer, ImageContainer, InnerContainer, PostDescription, PostDescriptionContainer, PostImage, PriceLabel, PriceLabelContainer } from './styles'

interface EventCardProps {
	post: CultureEntity
	colapsed?: boolean
	onPress?: () => void
	onProfilePress?: (userId: string) => void
}

function EventCard({ post, colapsed = false, onPress, onProfilePress }: EventCardProps) {
	const [buttonPressed, setButtonPressed] = useState(false)

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

	return (
		<Container
			activeOpacity={1}
			onPressIn={pressingButton}
			onPressOut={notPressingButton}
			onPress={releaseButton}
			colapsed={colapsed}
		>
			<InnerContainer colapsed={colapsed} buttonPressed={buttonPressed}>
				<ImageContainer hasImage={!!post.picturesUrl?.[0]} colapsed={colapsed}>
					{post.picturesUrl?.[0] && <PostImage resizeMode={'cover'} source={{ uri: post.picturesUrl?.[0] }} />}
					{!colapsed && (
						<PriceLabelContainer hasImage={!!post.picturesUrl?.[0]}>
							<PriceLabel>{post.entryValue ?? 'gratuito'}</PriceLabel>
						</PriceLabelContainer>
					)}
				</ImageContainer>
				<EventDataContainer colapsed={colapsed}>
					<PostDescriptionContainer colapsed={colapsed}>
						<PostDescription colapsed={colapsed} numberOfLines={colapsed && !post.picturesUrl?.[0] ? 5 : 5}>{post.description}</PostDescription>
					</PostDescriptionContainer>
					{/* { // CURRENT Descomentar
						!colapsed && (
							<MiniUserIndentifier
								owner={post.owner}
								postedAt={post.createdAt}
								navigateToProfile={() => onProfilePress?.(post.owner.userId)}
							/>
						)
					} */}
				</EventDataContainer>
			</InnerContainer>
		</Container>
	)
}

export { EventCard }
