import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import Popover from 'react-native-popover-view'

import { RFValue } from 'react-native-responsive-fontsize'
import { CloseIcon, Container, ContainerInner, UserName } from './styles'
import { relativeScreenHeight } from '@common/screenDimensions'
import { theme } from '@common/theme'
import XIcon from '@assets/icons/x-white.svg'
import DeniedWhiteIcon from '@assets/icons/denied-white.svg'
import TrashIcon from '@assets/icons/trash-white.svg'

import { PrimaryButton } from '../_buttons/PrimaryButton'
import { FocusAwareStatusBar } from '../FocusAwareStatusBar'
import { VerticalSpacing } from '../_space/VerticalSpacing'

interface ChatPopOverProps {
	userName?: string
	popoverVisibility: boolean
	userIsBlocked: boolean
	children: React.ReactChild
	closePopover: () => void
	blockUser: () => void
	unblockUser: () => void
	cleanConversation: () => void
}

function ChatPopOver({
	userName,
	popoverVisibility,
	userIsBlocked,
	children,
	closePopover,
	blockUser,
	unblockUser,
	cleanConversation
}: ChatPopOverProps) {
	return (
		<Popover
			isVisible={popoverVisibility}
			onRequestClose={closePopover}
			animationConfig={{ delay: 0, duration: 300 }}
			popoverStyle={{ backgroundColor: theme.black4, borderRadius: RFValue(8) }}
			backgroundStyle={{ backgroundColor: theme.transparence.orange2 }}
			from={(sourceRef, showPopover) => (
				<TouchableOpacity onPress={showPopover} >
					<View ref={sourceRef} >
						{children}
					</View>
				</TouchableOpacity>
			)}
		>
			<Container>
				<FocusAwareStatusBar backgroundColor={theme.transparence.orange2} barStyle={'dark-content'} />
				<ContainerInner>
					<CloseIcon onPress={closePopover}>
						<XIcon width={RFValue(25)} height={RFValue(25)} />
					</CloseIcon>
					<UserName>{userName}</UserName>
					<VerticalSpacing height={RFValue(5)} />
					<PrimaryButton
						color={theme.red3}
						onPress={!userIsBlocked ? blockUser : unblockUser}
						label={`${!userIsBlocked ? 'bloquear' : 'desbloquear'} usuário`}
						highlightedWords={[`${!userIsBlocked ? 'bloquear' : 'desbloquear'}`, 'usuário']}
						labelColor={theme.white3}
						fontSize={13}
						SvgIcon={DeniedWhiteIcon}
						minHeight={20}
						relativeHeight={relativeScreenHeight(8)}
					/>
					<VerticalSpacing height={RFValue(5)} />
					<PrimaryButton
						color={theme.red3}
						onPress={cleanConversation}
						label={'apagar conversa'}
						highlightedWords={['apagar', 'conversa']}
						labelColor={theme.white3}
						fontSize={13}
						SvgIcon={TrashIcon}
						minHeight={20}
						relativeHeight={relativeScreenHeight(8)}
					/>
				</ContainerInner>
			</Container>
		</Popover >
	)
}

export { ChatPopOver }
