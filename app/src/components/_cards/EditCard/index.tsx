import React, { ReactElement } from 'react'
import { SvgProps } from 'react-native-svg'
import { RFValue } from 'react-native-responsive-fontsize'

import { CardHeader, PictureArea, Text, ValueContainer, ProfilePicture } from './styles'

import { DefaultHeaderTitle } from '../../DefaultHeaderTitle'
import { DefaultCardContainer } from '../DefaultCardContainer'
import { ImageCarousel } from '../../ImageCarousel'
import { relativeScreenWidth } from '../../../common/screenDimensions'
import { EditHeaderContainer } from '../../_containers/EditHeaderContainer'

interface EditCardProps {
	title: string
	highlightedWords?: string[]
	value?: string | (string | ReactElement)[]
	profilePicturesUrl?: string[]
	valueBold?: boolean
	indicatorColor?: string
	carousel?: boolean
	SvgIcon?: React.FC<SvgProps>
	SecondSvgIcon?: React.FC<SvgProps>
	onEdit?: () => void
}

function EditCard({
	title,
	highlightedWords = [],
	value = '',
	valueBold,
	profilePicturesUrl = [],
	indicatorColor,
	carousel,
	SvgIcon,
	SecondSvgIcon,
	onEdit,
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
	return (
		<DefaultCardContainer withoutPadding={!!profilePicturesUrl.length}>
			<CardHeader
				style={{
					paddingHorizontal: profilePicturesUrl.length ? RFValue(15) : 0,
					paddingVertical: profilePicturesUrl.length ? RFValue(10) : 0
				}}
			>
				<EditHeaderContainer onPress={onEdit}>
					<DefaultHeaderTitle
						title={title}
						highlightedWords={highlightedWords}
						SecondSvgIcon={SecondSvgIcon}
						fontSize={20}
						dimensions={30}
						justifyContent={'space-between'}
					/>
				</EditHeaderContainer>
			</CardHeader>
			{
				!profilePicturesUrl.length
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
											indicatorColor={indicatorColor}
											relativeWidth={relativeScreenWidth(90)}
										/>
									) : (
										<ProfilePicture
											source={{
												uri: profilePicturesUrl[0] || 'https://www.softdownload.com.br/wp-content/uploads/2018/03/como_trocar_foto_perfil_facebook.jpg'
											}}
											width={0}
											height={0}
										/>
									)
							}

						</PictureArea>
					)
			}
		</DefaultCardContainer >
	)
}

export { EditCard }
