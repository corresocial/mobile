import { useNavigation } from '@react-navigation/native'
import React, { JSXElementConstructor, ReactElement } from 'react'
import { SvgProps } from 'react-native-svg'
import { useTheme } from 'styled-components'

import { UserOwner } from '@domain/user/entity/types'

import { UiUtils } from '@utils-ui/common/UiUtils'
import { arrayIsEmpty } from '@utils-ui/common/validation/validateArray'

import { Header, OptionsArea, UserAndValueContainer } from './styles'
import ChatWhiteIcon from '@assets/icons/chat-white.svg'
import DeniedWhiteIcon from '@assets/icons/denied-white.svg'
import ShareWhiteIcon from '@assets/icons/share-white.svg'
import { relativeScreenWidth } from '@common/screenDimensions'

import { SmallButton } from '@components/_buttons/SmallButton'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { DefaultPostViewHeader } from '@components/DefaultPostViewHeader'
import { SmallUserIdentification } from '@components/SmallUserIdentification'

const { formatRelativeDate } = UiUtils()

interface PostHeaderProps {
	title: string
	createdAt: string | number | Date
	isAuthor: boolean
	isCompleted: boolean
	owner: UserOwner
	highlightedButtonText?: string
	highlightedButtonIcon?: React.FC<SvgProps>
	children?: React.ReactNode
	HeaderFooter?: ReactElement<any, string | JSXElementConstructor<any>> | undefined | false,
	navigateToProfile: () => void
	sharePost: () => void
	highlightedButtonAction?: () => void
}

function PostHeader({
	title,
	createdAt,
	isAuthor,
	isCompleted,
	owner,
	highlightedButtonText,
	highlightedButtonIcon,
	children,
	HeaderFooter,
	navigateToProfile,
	sharePost,
	highlightedButtonAction = () => { },
}: PostHeaderProps) {
	const navigation = useNavigation()
	const theme = useTheme()

	const getProfilePictureUrl = () => {
		if (!owner || !owner.profilePictureUrl) return null
		if (arrayIsEmpty(owner.profilePictureUrl)) return null
		return owner.profilePictureUrl[0]
	}

	const renderFormatedPostDateTime = () => {
		const formatedDate = formatRelativeDate(createdAt || '')
		return formatedDate
	}

	const hasCustomHighlightedButton = !!highlightedButtonAction && highlightedButtonText

	return (
		<Header>
			<DefaultPostViewHeader
				onBackPress={() => navigation.goBack()}
				text={title}
			/>
			<VerticalSpacing />
			<UserAndValueContainer>
				<SmallUserIdentification
					userName={owner.name || 'usuário do corre.'}
					postDate={renderFormatedPostDateTime()}
					userNameFontSize={14}
					profilePictureUrl={getProfilePictureUrl()}
					pictureDimensions={45}
					width={'60%'}
					navigateToProfile={() => navigateToProfile && navigateToProfile()}
				/>
			</UserAndValueContainer>
			<VerticalSpacing />
			<OptionsArea>
				{
					(!isAuthor || hasCustomHighlightedButton) && (
						<SmallButton
							color={theme.white3}
							SvgIcon={ShareWhiteIcon}
							relativeWidth={relativeScreenWidth(11)}
							height={relativeScreenWidth(11)}
							onPress={sharePost}
						/>
					)
				}
				{
					isCompleted
						? (
							<SmallButton
								label={'post foi concluído'}
								labelColor={theme.black4}
								SvgIcon={DeniedWhiteIcon}
								relativeWidth={hasCustomHighlightedButton ? '65%' : '80%'}
								height={relativeScreenWidth(12)}
								onPress={() => { }}
							/>
						)
						: (
							<SmallButton
								color={theme.green3}
								label={isAuthor ? highlightedButtonText || 'compartilhar' : 'conversar'}
								SvgIcon={isAuthor ? highlightedButtonIcon || ShareWhiteIcon : ChatWhiteIcon}
								relativeWidth={isAuthor ? hasCustomHighlightedButton ? '65%' : '80%' : '63%'}
								height={relativeScreenWidth(12)}
								onPress={highlightedButtonAction || (isAuthor ? sharePost : highlightedButtonAction)} // Substituir highlightedButtonAction por openChat para posts
							/>
						)
				}
				{children}
			</OptionsArea>
			{HeaderFooter && (
				<>
					<VerticalSpacing />
					{HeaderFooter}
				</>
			)}
		</Header>
	)
}

export { PostHeader }
