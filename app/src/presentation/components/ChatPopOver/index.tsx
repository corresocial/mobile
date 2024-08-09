import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import Popover from 'react-native-popover-view'

import { CloseIcon, Container, ContainerInner, UserName } from './styles'
import DeniedWhiteIcon from '@assets/icons/denied-white.svg'
import ImpactWhiteIcon from '@assets/icons/impactLabel.svg'
import TrashIcon from '@assets/icons/trash-white.svg'
import XIcon from '@assets/icons/x-white.svg'
import { relativeScreenDensity, relativeScreenHeight } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'

import { FocusAwareStatusBar } from '../FocusAwareStatusBar'

interface ChatPopOverProps {
	hasMessages?: boolean
	userName?: string
	popoverVisibility: boolean
	impactReportButtonVisibility: boolean
	userIsBlocked: boolean
	children: React.ReactChild
	closePopover: () => void
	blockUser: () => void
	unblockUser: () => void
	cleanConversation: () => void
	markAsCompleted: () => void
}

function ChatPopOver({
	hasMessages,
	userName,
	popoverVisibility,
	impactReportButtonVisibility,
	userIsBlocked,
	children,
	closePopover,
	blockUser,
	unblockUser,
	cleanConversation,
	markAsCompleted
}: ChatPopOverProps) {
	return (
		<Popover
			isVisible={popoverVisibility}
			onRequestClose={closePopover}
			animationConfig={{ delay: 0, duration: 300 }}
			popoverStyle={{ backgroundColor: theme.black4, borderRadius: relativeScreenDensity(15) }}
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
						<XIcon width={relativeScreenDensity(25)} height={relativeScreenDensity(25)} />
					</CloseIcon>
					<UserName>{userName}</UserName>
					<VerticalSpacing />
					<PrimaryButton
						color={theme.red3}
						label={`${!userIsBlocked ? 'bloquear' : 'desbloquear'} usuário`}
						highlightedWords={[`${!userIsBlocked ? 'bloquear' : 'desbloquear'}`, 'usuário']}
						labelColor={theme.white3}
						fontSize={13}
						SvgIcon={DeniedWhiteIcon}
						justifyContent={'space-around'}
						minHeight={20}
						relativeHeight={relativeScreenHeight(8)}
						onPress={!userIsBlocked ? blockUser : unblockUser}
					/>
					{
						hasMessages && (
							<>
								<VerticalSpacing />
								<PrimaryButton
									color={theme.red3}
									label={'apagar conversa'}
									highlightedWords={['apagar', 'conversa']}
									labelColor={theme.white3}
									fontSize={13}
									SvgIcon={TrashIcon}
									justifyContent={'space-around'}
									minHeight={20}
									relativeHeight={relativeScreenHeight(8)}
									onPress={cleanConversation}
								/>
							</>
						)
					}
					{
						impactReportButtonVisibility && (
							<>
								<VerticalSpacing />
								<PrimaryButton
									color={theme.pink3}
									label={'marcar como \nfinalizado'}
									highlightedWords={['marcar', 'como', '\nfinalizado']}
									labelColor={theme.white3}
									justifyContent={'space-around'}
									textAlign={'left'}
									fontSize={13}
									SecondSvgIcon={ImpactWhiteIcon}
									minHeight={20}
									relativeHeight={relativeScreenHeight(8)}
									onPress={markAsCompleted}
								/>
							</>
						)
					}
				</ContainerInner>
			</Container>
		</Popover >
	)
}

export { ChatPopOver }
