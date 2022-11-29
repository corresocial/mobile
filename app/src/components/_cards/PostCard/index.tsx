import React from 'react'

import {
	Container,
	ContainerInner,
	Decimals,
	LargeFont,
	LeftArea,
	MiniaturePortrait,
	Ower,
	OwerInfo,
	OwerName,
	OwerPicture,
	PostDateTime,
	RightArea,
	SaleExchangeValue,
	SidePicture,
	SmallFont,
	Title,
	LeftAreaLimits
} from './styles'

import { PostCollection } from '../../../services/firebase/types'
import { LeftLineCard } from '../LeftLineCard'
import { LocalUserData } from '../../../contexts/types'

interface PostCardProps {
	post: PostCollection | any
	owner: LocalUserData
}

function PostCard({ post, owner }: PostCardProps) {
	const renderShortName = () => {
		const names = owner?.name && (owner.name.split(' ') || [])
		if (!names) return 'usuário do corre.'
		return `${names[0]} ${names[1]}`
	}

	const formatSaleExchangeValue = () => {
		const hasExchangeValue = !!post.exchangeValue
		const hasSaleValue = !!post.saleValue

		if (!hasSaleValue && !hasExchangeValue) return null

		return (
			<SaleExchangeValue>
				{
					hasSaleValue
					&& (
						<>
							<SmallFont>
								{'R$'}
							</SmallFont>
							<LargeFont>
								{post.saleValue}
							</LargeFont>
							<Decimals>
								{',00'}
							</Decimals>
						</>
					)
				}
				{
					hasSaleValue && hasExchangeValue
					&& (
						<SmallFont>
							{'ou'}
						</SmallFont>
					)
				}
				{
					hasExchangeValue
					&& (
						<LargeFont>
							{'troca'}
						</LargeFont>
					)
				}
			</SaleExchangeValue>
		)
	}

	return (
		<Container activeOpacity={0.7}>
			<ContainerInner>
				<LeftArea style={{ width: (post.picturesUrl && post.picturesUrl.length) ? '65%' : '100%' }}>
					<LeftAreaLimits>
						<Title
							numberOfLines={1}
						>
							{post.title}
						</Title>
						<Ower>
							<OwerPicture >
								<MiniaturePortrait
									source={{
										uri: owner?.profilePictureUrl && owner?.profilePictureUrl[0],
									}}
								/>
							</OwerPicture>
							<OwerInfo>
								<OwerName>
									{renderShortName()}
								</OwerName>
								<PostDateTime>
									{'ontem as 15:40'}
								</PostDateTime>
							</OwerInfo>
						</Ower>
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
						{formatSaleExchangeValue()}
					</LeftAreaLimits>
				</LeftArea>
				<RightArea style={{ width: post.picturesUrl ? '35%' : 0 }}>
					<SidePicture
						source={{
							uri: (post.picturesUrl && post.picturesUrl.length) && post.picturesUrl[0],
						}}
					/>
				</RightArea>
			</ContainerInner>
		</Container>
	)
}

export { PostCard }
