import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

import { CardHeader, PictureArea, Text, ValueContainer, ProfilePicture } from './styles'
import PencilIcon from '../../../assets/icons/pencil.svg'

import { DefaultHeaderTitle } from '../../DefaultHeaderTitle'
import { DefaultCardContainer } from '../DefaultCardContainer'
import { TextGradient } from '../../TextGradient'

interface EditCardProps {
	title: string
	highlightedWords?: string[]
	value?: string
	profilePictureUrl?: string
	onEdit?: () => void
}

function EditCard({
	title,
	highlightedWords = [],
	value = '',
	profilePictureUrl,
	onEdit,
}: EditCardProps) {
	return (
		<DefaultCardContainer withoutPadding={!!profilePictureUrl}>
			<CardHeader
				style={{
					paddingHorizontal: profilePictureUrl && RFValue(15),
					paddingVertical: profilePictureUrl && RFValue(10)
				}}
			>
				<DefaultHeaderTitle
					title={title}
					highlightedWords={highlightedWords}
					onPressIcon={onEdit}
					SvgIcon={PencilIcon}
					dimensions={20}
					invertTextAndIcon
					justifyContent={'space-between'}
				/>
			</CardHeader>
			{
				!profilePictureUrl
					? (
						<ValueContainer>
							{
								value.length < 150
									? (
										<Text>
											{value}
										</Text>
									)
									: (
										<TextGradient >
											{(styles: any) => (
												<Text numberOfLines={4} style={styles}>
													{value}
												</Text>
											)}
										</TextGradient>
									)
							}
						</ValueContainer>
					)
					: (
						<PictureArea >
							<ProfilePicture
								source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/corresocial-66840.appspot.com/o/imagens%2Fservices%2Ff7Y8KPRDeGQSudLlfCxg1.jpg?alt=media&token=ae9b1266-a2a0-442b-845a-fefda213bbba' }}
							/>
						</PictureArea>
					)
			}
		</DefaultCardContainer>
	)
}

export { EditCard }
