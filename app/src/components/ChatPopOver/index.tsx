import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import Popover from 'react-native-popover-view'

import { RFValue } from 'react-native-responsive-fontsize'
import { CloseIcon, Container, ContainerInner, Sigh, UserName } from './styles'
import { relativeScreenHeight } from '../../common/screenDimensions'
import { theme } from '../../common/theme'
import XIcon from '../../assets/icons/x.svg'
import BlockIcon from '../../assets/icons/block.svg'
import TrashIcon from '../../assets/icons/trashRounded.svg'

import { PrimaryButton } from '../_buttons/PrimaryButton'
import { FocusAwareStatusBar } from '../FocusAwareStatusBar'

interface ChatPopOverProps {
	userName?: string
	popoverVisibility: boolean
	children: React.ReactChild
	closePopover: () => void
	blockUser: () => void
	cleanConversation: () => void
}

function ChatPopOver({
	userName,
	popoverVisibility,
	children,
	closePopover,
	blockUser,
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
					<Sigh />
					<PrimaryButton
						color={theme.red3}
						onPress={blockUser}
						label={'bloquear usuário'}
						highlightedWords={['bloquear', 'usuário']}
						labelColor={theme.white3}
						fontSize={14}
						SvgIcon={BlockIcon}
						svgIconScale={['50%', '15%']}
						minHeight={20}
						relativeHeight={relativeScreenHeight(8)}
					/>
					<Sigh />
					<PrimaryButton
						color={theme.red3}
						onPress={cleanConversation}
						label={'apagar conversa'}
						highlightedWords={['apagar', 'conversa']}
						labelColor={theme.white3}
						fontSize={14}
						SvgIcon={TrashIcon}
						svgIconScale={['50%', '15%']}
						minHeight={20}
						relativeHeight={relativeScreenHeight(8)}
					/>
				</ContainerInner>
			</Container>
		</Popover >
	)
}

export { ChatPopOver }
