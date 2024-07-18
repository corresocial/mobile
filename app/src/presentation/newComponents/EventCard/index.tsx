import React, { useState } from 'react'

import { CultureEntity } from '@domain/post/entity/types'

import { UiUtils } from '@utils-ui/common/UiUtils'
import { defaultUserProfilePicture } from '@utils/defaultUserProfilePicture'

import { Container, EventDataContainer, ImageContainer, InnerContainer, PostDescription, PostDescriptionContainer, OwnerDataContainer, OwnerProfilePicture, OwnerTextGroup, OwnerName, PostDate, PostImage, PriceLabel, PriceLabelContainer } from './styles'

const { formatRelativeDate } = UiUtils()

interface EventCardProps {
	post: CultureEntity
	colapsed?: boolean
	onPress?: () => void
}

function EventCard({ post, colapsed = false, onPress }: EventCardProps) {
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

	const getOwnerPicture = (): string => {
		return post.owner.profilePictureUrl?.[0] || defaultUserProfilePicture
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
						<PostDescription colapsed={colapsed} numberOfLines={colapsed && !post.picturesUrl?.[0] ? 5 : 2}>{post.description}</PostDescription>
					</PostDescriptionContainer>
					{
						!colapsed && (
							<OwnerDataContainer>
								<OwnerProfilePicture source={{ uri: getOwnerPicture() }} />
								<OwnerTextGroup>
									<OwnerName>{'eu'}</OwnerName>
									<PostDate>{`postado em ${formatRelativeDate(post.createdAt)}`}</PostDate>
								</OwnerTextGroup>
							</OwnerDataContainer>
						)
					}
				</EventDataContainer>
			</InnerContainer>
		</Container>
	)
}

export { EventCard }
