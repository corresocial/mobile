import React, { useState } from 'react'
import { useTheme } from 'styled-components'

import { PetitionEntity } from '@domain/petition/entity/types'
import { UserOwner } from '@domain/user/entity/types'

import { UiUtils } from '@utils-ui/common/UiUtils'

import { ButtonContainer, Container, ContainerInner, Content, ImageArea, Title, TitleContainer } from './styles'
import DocumentPencilWhiteIcon from '@assets/icons/documentPencil-white.svg'
import PaperInfoWhiteIcon from '@assets/icons/paperInfo-white.svg'
import { relativeScreenWidth } from '@common/screenDimensions'

import { SmallButton } from '@components/_buttons/SmallButton'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'

import { SmallUserIdentification } from '../../SmallUserIdentification'

const { formatRelativeDate, arrayIsEmpty } = UiUtils()

interface PetitionCardProps {
	petitionData: PetitionEntity
	owner: UserOwner
	isOwner?: boolean
	navigateToProfile?: (userId: string) => void
	onPress: () => void
}

function PetitionCard({ petitionData, owner, isOwner, navigateToProfile, onPress }: PetitionCardProps) {
	const [buttonPressed, setButtomPressed] = useState<boolean>(false)

	const theme = useTheme()

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
		if (!petitionData.createdAt) return '---'
		const formatedDate = formatRelativeDate(petitionData.createdAt)
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
			hasPicture={!!(petitionData && petitionData.picturesUrl && petitionData.picturesUrl.length)}
			activeOpacity={1}
			onPressIn={pressingButton}
			onPressOut={notPressingButton}
			onPress={releaseButton}
		>
			<ContainerInner
				style={{ marginLeft: buttonPressed ? relativeScreenWidth(1.7) : 0 }}
			>
				<Content>
					<TitleContainer>
						<Title numberOfLines={2}>
							{petitionData.title}
						</Title>
					</TitleContainer>
					<VerticalSpacing />
					<SmallUserIdentification
						userName={renderShortName()}
						postDate={renderFormatedPostDateTime()}
						profilePictureUrl={getProfilePictureUrl()}
						showLeaderSeal
						navigateToProfile={() => navigateToProfile && navigateToProfile(owner.userId)}
					/>
					<VerticalSpacing />
				</Content>
				{
					(petitionData.picturesUrl && petitionData.picturesUrl.length)
						? (
							<ImageArea
								source={{ uri: petitionData.picturesUrl[0] }}
								contentFit={'cover'}
								recyclingKey={!arrayIsEmpty(petitionData.picturesUrl) ? petitionData.picturesUrl[0] : ''}
								placeholder={'L1Nb%B%4fQ%4?KfRfQfRfQfQfQfQ'}
								placeholderContentFit={'contain'}
								cachePolicy={'memory-disk'}
								transition={200}
							>
								<ButtonContainer>
									<SmallButton
										color={theme.colors.green[3]}
										label={isOwner ? 'visualizar assinaturas' : 'assinar'}
										height={relativeScreenWidth(12)}
										SvgIcon={isOwner ? PaperInfoWhiteIcon : DocumentPencilWhiteIcon}
										onPress={onPress}
									/>
								</ButtonContainer>
							</ImageArea>
						)
						: (
							<ButtonContainer>
								<SmallButton
									color={theme.colors.green[3]}
									label={isOwner ? 'visualizar assinaturas' : 'assinar'}
									height={relativeScreenWidth(12)}
									SvgIcon={isOwner ? PaperInfoWhiteIcon : DocumentPencilWhiteIcon}
									onPress={onPress}
								/>
							</ButtonContainer>
						)
				}
			</ContainerInner>
		</Container >
	)
}

export { PetitionCard }
