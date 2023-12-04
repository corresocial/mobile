import React, { useState } from 'react'

import { RFValue } from 'react-native-responsive-fontsize'
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
	TitleContainer
} from './styles'

import { PostCollection } from '../../../services/firebase/types'

import { relativeScreenWidth } from '../../../common/screenDimensions'
import { LocalUserData } from '../../../contexts/types'
import { SaleExchangeValue } from '../../SaleExchangeValue'
import { SmallUserIdentification } from '../../SmallUserIdentification'

import { theme } from '../../../common/theme'
import { VerticalSpacing } from '../../_space/VerticalSpacing'
import { UiUtils } from '../../../utils-ui/common/UiUtils'

const { formatRelativeDate, arrayIsEmpty } = UiUtils()

interface PostCardProps {
	post: PostCollection | any
	owner: LocalUserData | any
	navigateToProfile?: (userId: string) => void
	onPress: () => void
}

function PostCard({ post, owner, navigateToProfile, onPress }: PostCardProps) {
	const [buttonPressed, setButtomPressed] = useState<boolean>(false)
	const defineLabelColor = (lightColor?: boolean) => {
		switch (post.postType) {
			case 'income': {
				return lightColor ? theme.green1 : theme.green3
			}
			case 'socialImpact': {
				return lightColor ? theme.pink1 : theme.pink3
			}
			case 'culture': {
				return lightColor ? theme.blue1 : theme.blue3
			}
			default:
				return lightColor ? theme.orange1 : theme.orange3
		}
	}

	const renderShortName = () => {
		if (owner.name && owner.name.split(' ').length <= 3) return owner.name
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
				style={{ marginLeft: buttonPressed ? relativeScreenWidth(1.7) : 0 }}
			>
				<LeftArea
					hasPictureOrSaleValue={!arrayIsEmpty(post.picturesUrl) || post.saleValue || post.exchangeValue}
					backgroundColor={defineLabelColor(true)}
				>
					{
						<SidePicture
							hasPicture={!arrayIsEmpty(post.picturesUrl)}
							source={!arrayIsEmpty(post.picturesUrl) ? { uri: post.picturesUrl[0] } : {}}
						>
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
										{(!arrayIsEmpty(post.picturesUrl)) && <VerticalSpacing height={RFValue(8)} />}
									</>
								)
							}
						</SidePicture>
					}
				</LeftArea>
				<LeftSideLabel style={{ backgroundColor: defineLabelColor() }} />
				<RightArea hasPictureOrSaleValue={!arrayIsEmpty(post.picturesUrl) || post.saleValue || post.exchangeValue}>
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
