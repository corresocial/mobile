import React from 'react'

import {
	Container,
	ContainerInner,
	LeftArea,
	RightArea,
	SidePicture,
	Title,
	LeftAreaLimits
} from './styles'

import { formatRelativeDate } from '../../../common/auxiliaryFunctions'

import { PostCollection } from '../../../services/firebase/types'

import { LeftLineCard } from '../LeftLineCard'
import { LocalUserData } from '../../../contexts/types'
import { SmallUserIdentification } from '../../SmallUserIdentification'
import { SaleExchangeValue } from '../../SaleExchangeValue'

interface PostCardProps {
	post: PostCollection | any
	owner: LocalUserData
	onPress: () => void
}

function PostCard({ post, owner, onPress }: PostCardProps) {
	const renderShortName = () => {
		const names = owner?.name && (owner.name.split(' ') || [])
		if (!names) return 'usuário do corre.'
		return `${names[0]} ${names[1]}`
	}

	const renderFormatedPostDateTime = () => {
		console.log(post)
		if (!post.createdAt) return '---'
		const formatedDate = formatRelativeDate(post.createdAt)
		return formatedDate
	}

	return (
		<Container activeOpacity={0.7} onPress={onPress}>
			<ContainerInner>
				<LeftArea style={{ width: (post.picturesUrl && post.picturesUrl.length) ? '65%' : '100%' }}>
					<LeftAreaLimits>
						<Title
							numberOfLines={post.description || post.itemDescription ? 1 : 2}
						>
							{post.title}
						</Title>
						<SmallUserIdentification
							userName={renderShortName()}
							postDate={renderFormatedPostDateTime()}
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
				<RightArea style={{ width: !post.picturesUrl.lenght ? '35%' : 0 }}>
					<SidePicture
						source={{
							uri: !post.picturesUrl.lenght && post.picturesUrl[0],
						}}
					/>
				</RightArea>
			</ContainerInner>
		</Container>
	)
}

export { PostCard }
