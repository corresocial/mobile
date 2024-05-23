import React, { useEffect, useState } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

import { PostEntity } from '@domain/post/entity/types'
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
	SidePicture,
	Title,
	TitleContainer,
	WaitingApproveIconContainer
} from './styles'
import ClockArrowWhiteIcon from '@assets/icons/clockArrow-white.svg'
import { relativeScreenWidth } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { VerticalSpacing } from '@components/_space/VerticalSpacing'

import { SaleExchangeValue } from '../../SaleExchangeValue'
import { SmallUserIdentification } from '../../SmallUserIdentification'

const { formatRelativeDate, arrayIsEmpty } = UiUtils()

interface PostCardProps {
	post: PostEntity | any // TODO Type
	owner: UserOwner
	isOwner: boolean
	navigateToProfile?: (userId: string) => void
	onPress: () => void
}

function PostCard({ post: postData, owner, isOwner, navigateToProfile, onPress }: PostCardProps) {
	const [post, setPost] = useState<PostEntity | any>(postData)
	const [buttonPressed, setButtomPressed] = useState<boolean>(false)

	useEffect(() => {
		console.log('effect')
		console.log(postData.unapprovedData)
		if (isOwner && post && post.unapprovedData) {
			setPost({ ...(postData || {}), ...postData.unapprovedData } as PostEntity)
		}
	}, [postData, isOwner])

	const getRelativeColor = (lightColor?: boolean) => {
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

	const enableLeftAreaSpacing = () => !arrayIsEmpty(post.picturesUrl) || post.saleValue || post.exchangeValue || postData.unapprovedData

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
					hasPictureOrSaleValue={enableLeftAreaSpacing()}
					backgroundColor={getRelativeColor(true)}
				>
					{
						<SidePicture
							hasPicture={!arrayIsEmpty(post.picturesUrl)}
							source={!arrayIsEmpty(post.picturesUrl) ? { uri: post.picturesUrl[0] } : {}}
							recyclingKey={!arrayIsEmpty(post.picturesUrl) ? post.picturesUrl[0] : ''}
							placeholder={blurhash}
							placeholderContentFit={'contain'}
							cachePolicy={'memory-disk'}
							transition={300}
						>
							{
								postData.unapprovedData && (
									<WaitingApproveIconContainer
										hasValues={post.saleValue || post.exchangeValue}
										hasPicture={!arrayIsEmpty(post.picturesUrl)}
									>
										<ClockArrowWhiteIcon />
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
										{(!arrayIsEmpty(post.picturesUrl) || post.saleValue || post.exchangeValue) && <VerticalSpacing height={RFValue(8)} />}
									</>
								)
							}
						</SidePicture>
					}
				</LeftArea>
				<LeftSideLabel style={{ backgroundColor: getRelativeColor() }} />
				<RightArea hasPictureOrSaleValue={enableLeftAreaSpacing()}>
					<RightAreaLimits>
						<TitleContainer>
							<Title numberOfLines={3}>
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
