import React, { ReactElement } from 'react'
import { SvgProps } from 'react-native-svg'

import { UiUtils } from '@utils-ui/common/UiUtils'
import { defaultUserProfilePicture } from '@utils/defaultUserProfilePicture'

import { CardHeader, PictureArea, Text, ValueContainer, ProfilePicture } from './styles'
import PlusWhiteIcon from '@assets/icons/plus-white.svg'
import { relativeScreenDensity, relativeScreenWidth } from '@common/screenDimensions'

import { EditHeaderContainer } from '@components/_containers/EditHeaderContainer'

import { DefaultHeaderTitle } from '../../DefaultHeaderTitle'
import { ImageCarousel } from '../../ImageCarousel'
import { DefaultTouchableCardContainer } from '../DefaultTouchableCardContainer'

const { arrayIsEmpty } = UiUtils()

interface EditCardProps {
	title: string
	highlightedWords?: string[]
	value?: string | (string | ReactElement)[]
	profilePicturesUrl?: string[]
	videosUrl?: string[]
	valueBold?: boolean
	pressionable?: boolean
	indicatorColor?: string
	carousel?: boolean
	SecondSvgIcon?: React.FC<SvgProps>
	RightIcon?: React.FC<SvgProps>
	children?: ReactElement
	onEdit?: () => void
	onPress?: () => void
}

function EditCard({
	title,
	highlightedWords = [],
	value = '',
	valueBold,
	profilePicturesUrl = [],
	videosUrl = [],
	indicatorColor,
	carousel,
	pressionable = true,
	SecondSvgIcon,
	RightIcon,
	children,
	onEdit,
	onPress,
}: EditCardProps) {
	const isDateOrTimeOrObject = () => {
		if (value) {
			if (typeof value === 'string') {
				return value.includes('/') || value.includes(':') || value.includes('-')
			}
			if (typeof value === 'object') {
				return true
			}
		}
		return false
	}

	const getHeaderRightIcon = () => {
		return (!arrayIsEmpty(videosUrl) || !arrayIsEmpty(profilePicturesUrl) || value) ? RightIcon : PlusWhiteIcon
	}

	return (
		<DefaultTouchableCardContainer
			withoutPadding={!!profilePicturesUrl.length || !!videosUrl.length}
			pressionable={!!onEdit && pressionable}
			onPress={onPress || onEdit}
		>
			<CardHeader
				style={{
					paddingHorizontal: profilePicturesUrl.length || videosUrl.length ? relativeScreenDensity(15) : 0,
					paddingVertical: profilePicturesUrl.length || videosUrl.length ? relativeScreenDensity(10) : 0
				}}
			>
				<EditHeaderContainer onPress={onEdit} RightIcon={getHeaderRightIcon()}>
					<DefaultHeaderTitle
						title={title}
						highlightedWords={highlightedWords}
						SecondSvgIcon={SecondSvgIcon}
						dimensions={30}
						justifyContent={'space-between'}
					/>
				</EditHeaderContainer>
			</CardHeader>
			{
				!profilePicturesUrl.length && !videosUrl.length
					? (
						<>
							{
								value && (
									<ValueContainer>
										<Text bold={valueBold}>
											{isDateOrTimeOrObject() && '   '}
											{value}
										</Text>
									</ValueContainer>
								)
							}
						</>
					)
					: (
						<PictureArea
							style={{
								height: carousel ? 'auto' : relativeScreenWidth(88),
							}}
						>
							{
								carousel
									? (
										<ImageCarousel
											picturesUrl={profilePicturesUrl}
											videosThumbnails={videosUrl}
											indicatorColor={indicatorColor}
											relativeWidth={relativeScreenWidth(90)}
											withoutBorder
										/>
									) : (
										<ProfilePicture source={{ uri: profilePicturesUrl[0] || defaultUserProfilePicture }} />
									)
							}

						</PictureArea>
					)
			}
			{children && children}
		</DefaultTouchableCardContainer >
	)
}

export { EditCard }
