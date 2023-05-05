import React from 'react'
import { SvgProps } from 'react-native-svg'
import { RFValue } from 'react-native-responsive-fontsize'

import { CardHeader, PictureArea, Text, ValueContainer, ProfilePicture } from './styles'
import EditWhiteIcon from '../../../assets/icons/edit-white.svg'

import { DefaultHeaderTitle } from '../../DefaultHeaderTitle'
import { DefaultCardContainer } from '../DefaultCardContainer'
import { ImageCarousel } from '../../ImageCarousel'
import { relativeScreenWidth } from '../../../common/screenDimensions'

interface EditCardProps {
	title: string
	highlightedWords?: string[]
	value?: string
	profilePicturesUrl?: string[]
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
	profilePicturesUrl = [],
	indicatorColor,
	carousel,
	SvgIcon,
	SecondSvgIcon,
	onEdit,
}: EditCardProps) {
	return (
		<DefaultCardContainer withoutPadding={!!profilePicturesUrl.length}>
			<CardHeader
				style={{
					paddingHorizontal: profilePicturesUrl.length ? RFValue(15) : 0,
					paddingVertical: profilePicturesUrl.length ? RFValue(10) : 0
				}}
			>
				<DefaultHeaderTitle
					title={title}
					fontSize={20}
					highlightedWords={highlightedWords}
					onPressIcon={onEdit}
					SvgIcon={SvgIcon || EditWhiteIcon}
					SecondSvgIcon={SecondSvgIcon}
					dimensions={30}
					invertTextAndIcon
					justifyContent={'space-between'}
				/>
			</CardHeader>
			{
				!profilePicturesUrl.length
					? (
						<>
							{
								value && (
									<ValueContainer>
										{
											value.length < 150
												? (
													<Text>
														{value}
													</Text>
												)
												: (
													< Text numberOfLines={4}>{value}</Text>
												)
										}
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
