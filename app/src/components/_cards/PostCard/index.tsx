import React, { useState } from 'react'

import {
	Container,
	ContainerInner,
	LeftArea,
	LeftAreaLimits,
	LeftSideLabel,
	RightArea,
	SidePicture,
	Title
} from './styles'

import { arrayIsEmpty, formatRelativeDate } from '../../../common/auxiliaryFunctions'

import { PostCollection } from '../../../services/firebase/types'

import { relativeScreenWidth } from '../../../common/screenDimensions'
import { LocalUserData } from '../../../contexts/types'
import { SaleExchangeValue } from '../../SaleExchangeValue'
import { SmallUserIdentification } from '../../SmallUserIdentification'
import { LeftLineCard } from '../LeftLineCard'

import { theme } from '../../../common/theme'

interface PostCardProps {
	post: PostCollection | any
	owner: LocalUserData | any
	navigateToProfile?: (userId: string) => void
	onPress: () => void
}

function PostCard({ post, owner, navigateToProfile, onPress }: PostCardProps) {
	const [buttonPressed, setButtomPressed] = useState<boolean>(false)
	const defineLabelColor = () => {
		switch (post.postType) {
			case 'service': {
				return theme.purple3
			}
			case 'sale': {
				return theme.green3
			}
			case 'vacancy': {
				return theme.yellow3
			}
			case 'socialImpact': {
				return theme.pink3
			}
			case 'culture': {
				return theme.blue3
			}
			default:
				return theme.orange3
		}
	}

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
				<LeftSideLabel style={{ backgroundColor: defineLabelColor() }} />
				<LeftArea style={{ width: !arrayIsEmpty(post.picturesUrl) ? '61.5%' : '97.5%' }}>
					<LeftAreaLimits>
						<Title numberOfLines={(post.description && post.saleValue) || post.description ? 2 : 2}>
							{post.title}
						</Title>
						<SmallUserIdentification
							userName={renderShortName()}
							postDate={renderFormatedPostDateTime()}
							profilePictureUrl={getProfilePictureUrl()}
							navigateToProfile={() => navigateToProfile && navigateToProfile(owner.userId)}
						/>
						{
							(post.description || '')
							&& (
								<LeftLineCard
									text={post.description}
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
				<RightArea style={{ width: !arrayIsEmpty(post.picturesUrl) ? '36%' : 0 }}>
					{
						!arrayIsEmpty(post.picturesUrl) && (
							<SidePicture
								source={{
									uri: (!arrayIsEmpty(post.picturesUrl) && post.picturesUrl[0]),
								}}
							/>
						)
					}
				</RightArea>
			</ContainerInner>
		</Container>
	)
}

export { PostCard }
