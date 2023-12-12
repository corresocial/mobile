import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import Popover from 'react-native-popover-view'
import { RFValue } from 'react-native-responsive-fontsize'

import { CloseIcon, Container, ContainerInner, UserName } from './styles'
import DeniedWhiteIcon from '@assets/icons/denied-white.svg'
import ImpactWhiteIcon from '@assets/icons/impactLabel.svg'
import TrashIcon from '@assets/icons/trash-white.svg'
import XIcon from '@assets/icons/x-white.svg'
import { relativeScreenHeight } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'

import { FocusAwareStatusBar } from '../FocusAwareStatusBar'

interface ChatPopOverProps {
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
			popoverStyle={{ backgroundColor: theme.black4, borderRadius: RFValue(15) }}
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
