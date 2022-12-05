import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import Popover from 'react-native-popover-view'

import { RFValue } from 'react-native-responsive-fontsize'
import { CloseIcon, Container, ContainerInner, PostTitle } from './styles'
import { screenHeight } from '../../common/screenDimensions'
import { theme } from '../../common/theme'
import XIcon from '../../assets/icons/x.svg'

import { PostType } from '../../services/firebase/types'

import { PrimaryButton } from '../_buttons/PrimaryButton'

interface PostPopOverProps {
	postTitle?: string
	postId?: string
	postType?: PostType
	popoverVisibility: boolean
	children: React.ReactChild
	onPress?: () => void
	closePopover: () => void
}

function PostPopOver({ postTitle,
	postId,
	postType,
	popoverVisibility,
	children,
	onPress,
	closePopover
}: PostPopOverProps) {
	return (
		<Popover
			popoverStyle={{ backgroundColor: 'transparent' }}
			isVisible={popoverVisibility}
			onRequestClose={closePopover}
			from={(sourceRef, showPopover) => (
				<TouchableOpacity onPress={showPopover} >
					<View ref={sourceRef} >
						{children}
					</View>
				</TouchableOpacity>
			)}
		>
			<Container>
				<ContainerInner>
					<CloseIcon onPress={closePopover}>
						<XIcon width={RFValue(25)} height={RFValue(25)} />
					</CloseIcon>
					<PostTitle>{postTitle}</PostTitle>
					<PrimaryButton
						color={theme.red3}
						onPress={!!onPress && onPress as any} // TODO Type
						label={'denunciar'}
						highlightedWords={['denunciar']}
						labelColor={theme.white3}
						fontSize={14}
						minHeight={20}
						relativeHeight={screenHeight * 0.08}
					/>
				</ContainerInner>
			</Container>
		</Popover>
	)
}

export { PostPopOver }
