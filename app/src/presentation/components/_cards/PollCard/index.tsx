import React, { useState } from 'react'
import { useTheme } from 'styled-components'

import { PollEntity } from '@domain/poll/entity/types'
import { UserOwner } from '@domain/user/entity/types'

import { UiUtils } from '@utils-ui/common/UiUtils'

import { Container, ContainerInner, Content, Title, TitleContainer } from './styles'
import DocumentPencilWhiteIcon from '@assets/icons/documentPencil-white.svg'
import PaperInfoWhiteIcon from '@assets/icons/paperInfo-white.svg'
import { relativeScreenWidth } from '@common/screenDimensions'

import { SmallButton } from '@components/_buttons/SmallButton'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'

import { SmallUserIdentification } from '../../SmallUserIdentification'

const { formatRelativeDate, arrayIsEmpty } = UiUtils()

interface PollCardProps {
	pollData: PollEntity
	owner: UserOwner
	isOwner?: boolean
	navigateToProfile?: (userId: string) => void
	onPress: () => void
}

function PollCard({ pollData, owner, isOwner, navigateToProfile, onPress }: PollCardProps) {
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
		if (!pollData.createdAt) return '---'
		const formatedDate = formatRelativeDate(pollData.createdAt)
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
				<Content>
					<TitleContainer>
						<Title numberOfLines={2}>
							{pollData.title}
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
					<SmallButton
						color={theme.colors.green[3]}
						label={isOwner ? 'abrir enquete' : 'responder enquete'}
						height={relativeScreenWidth(12)}
						SvgIcon={isOwner ? PaperInfoWhiteIcon : DocumentPencilWhiteIcon}
						onPress={onPress}
					/>
				</Content>
			</ContainerInner>
		</Container >
	)
}

export { PollCard }
