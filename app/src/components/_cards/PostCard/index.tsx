import React, { useState } from 'react'

import {
	Container,
	ContainerInner,
	LeftArea,
	RightArea,
	SidePicture,
	Title,
	LeftAreaLimits
} from './styles'

import { arrayIsEmpty, formatRelativeDate } from '../../../common/auxiliaryFunctions'

import { PostCollection } from '../../../services/firebase/types'

import { LeftLineCard } from '../LeftLineCard'
import { LocalUserData } from '../../../contexts/types'
import { SmallUserIdentification } from '../../SmallUserIdentification'
import { SaleExchangeValue } from '../../SaleExchangeValue'
import { relativeScreenWidth } from '../../../common/screenDimensions'

interface PostCardProps {
	post: PostCollection | any
	owner: LocalUserData | any
	navigateToProfile?: (userId: string) => void
	onPress: () => void
}

function PostCard({ post, owner, navigateToProfile, onPress }: PostCardProps) {
	const [buttonPressed, setButtomPressed] = useState<boolean>(false)

	const renderShortName = () => {
		if (owner.name && owner.name.split(' ').length < 3) return owner.name
		const names = owner.name && (owner.name.split(' ') || [])
		if (!names) return 'usuário do corre.'
		return `${names[0]} ${names[1]}`
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

	return (
		<Container
			activeOpacity={1}
			onPressIn={pressingButton}
			onPressOut={notPressingButton}
			onPress={releaseButton}
		>
			<ContainerInner
				style={{
					marginLeft: buttonPressed ? relativeScreenWidth(1.7) : 0
				}}
			>
				<LeftArea style={{ width: !arrayIsEmpty(post.picturesUrl) ? '65%' : '100%' }}>
					<LeftAreaLimits>
						<Title
							numberOfLines={(post.description && post.saleValue) || post.itemDescription ? 1 : 2}
						>
							{post.title}
						</Title>
						<SmallUserIdentification
							userName={renderShortName()}
							postDate={renderFormatedPostDateTime()}
							profilePictureUrl={getProfilePictureUrl()}
							navigateToProfile={() => navigateToProfile && navigateToProfile(owner.userId)}
						/>
						{
							(post.description || post.itemDescription)
							&& (
								<LeftLineCard
									text={post.description || post.itemDescription}
									fontSize={12}
									height={'25%'}
									numberOfLines={2}
								/>
							)
						}
						<SaleExchangeValue
							saleValue={post.saleValue}
							exchangeValue={post.exchangeValue}
						/>
					</LeftAreaLimits>
				</LeftArea>
				<RightArea style={{ width: !arrayIsEmpty(post.picturesUrl) ? '35%' : 0 }}>
					<SidePicture
						source={{
							uri: !arrayIsEmpty(post.picturesUrl) && post.picturesUrl[0],
						}}
					/>
				</RightArea>
			</ContainerInner>
		</Container>
	)
}

export { PostCard }
