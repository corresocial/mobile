import React from 'react'
import { SvgProps } from 'react-native-svg'
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
	profilePictureUrl?: string | null
	SvgIcon?: React.FC<SvgProps>
	onEdit?: () => void
}

function EditCard({
	title,
	highlightedWords = [],
	value = '',
	profilePictureUrl = '',
	SvgIcon,
	onEdit,
}: EditCardProps) {
	/* <TextGradient > // Gradient não estava permitindo a renderização
		{(styles: any) => (
			<Text numberOfLines={4} style={styles}>
				{value}
			</Text>
		)}
	</TextGradient> */

	return (
		<DefaultCardContainer withoutPadding={!!profilePictureUrl}>
			<CardHeader
				style={{
					paddingHorizontal: profilePictureUrl ? RFValue(15) : 0,
					paddingVertical: profilePictureUrl ? RFValue(10) : 0
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
										< Text numberOfLines={4}>{value}</Text>
									)
							}
						</ValueContainer>
					)
					: (
						<PictureArea >
							<ProfilePicture
								source={{
									uri: profilePictureUrl || 'https://www.softdownload.com.br/wp-content/uploads/2018/03/como_trocar_foto_perfil_facebook.jpg'
								}}
								width={0}
								height={0}
							/>
						</PictureArea>
					)
			}
		</DefaultCardContainer >
	)
}

export { EditCard }
