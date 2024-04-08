import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import Popover from 'react-native-popover-view'
import { RFValue } from 'react-native-responsive-fontsize'

import { CloseIcon, Container, ContainerInner, PostTitle } from './styles'
import CheckWhiteIcon from '@assets/icons/check-white.svg'
import DeniedWhiteIcon from '@assets/icons/denied-white.svg'
import EditWhiteIcon from '@assets/icons/edit-white.svg'
import TrashWhiteIcon from '@assets/icons/trash-white.svg'
import XWhiteIcon from '@assets/icons/x-white.svg'
import { relativeScreenHeight } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'

import { FocusAwareStatusBar } from '../FocusAwareStatusBar'

interface PostPopOverProps {
	postTitle?: string
	isAuthor?: boolean
	isCompleted?: boolean
	popoverVisibility: boolean
	children: React.ReactChild
	goToComplaint?: () => void
	editPost?: () => void
	deletePost?: () => void
	markAsCompleted?: any // TODO Type
	closePopover: () => void
}

function PostPopOver({
	postTitle,
	isAuthor = false,
	isCompleted = false,
	popoverVisibility,
	children,
	goToComplaint,
	editPost,
	deletePost,
	markAsCompleted,
	closePopover
}: PostPopOverProps) {
	return (
		<Popover
			isVisible={popoverVisibility}
			onRequestClose={closePopover}
			animationConfig={{ delay: 0, duration: 200 }}
			popoverStyle={{ backgroundColor: theme.black4, borderRadius: RFValue(8) }}
			backgroundStyle={{ backgroundColor: theme.transparence.orange2 }}
			from={(sourceRef: any, showPopover) => (
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
						<XWhiteIcon width={RFValue(25)} height={RFValue(25)} />
					</CloseIcon>
					<PostTitle>{postTitle}</PostTitle>
					{
						isAuthor ? (
							<>
								{
									editPost && (
										<>
											<PrimaryButton
												color={theme.green3}
												label={'editar post'}
												highlightedWords={['editar']}
												labelColor={theme.white3}
												SecondSvgIcon={EditWhiteIcon}
												fontSize={14}
												minHeight={20}
												relativeHeight={relativeScreenHeight(8)}
												onPress={editPost}
											/>
											<VerticalSpacing />
										</>
									)
								}
								<PrimaryButton
									color={theme.yellow3}
									label={isCompleted ? 'não concluído' : 'marcar concluído'}
									highlightedWords={['concluído']}
									SecondSvgIcon={isCompleted ? XWhiteIcon : CheckWhiteIcon}
									fontSize={14}
									minHeight={20}
									relativeHeight={relativeScreenHeight(8)}
									onPress={markAsCompleted && markAsCompleted}
								/>
								{
									deletePost && (
										<>
											<VerticalSpacing />
											<PrimaryButton
												color={theme.red3}
												onPress={deletePost}
												label={'apagar post'}
												highlightedWords={['apagar']}
												labelColor={theme.white3}
												SvgIcon={TrashWhiteIcon}
												fontSize={14}
												minHeight={20}
												relativeHeight={relativeScreenHeight(8)}
											/>
										</>
									)
								}
							</>
						)
							: (
								<PrimaryButton
									color={theme.red3}
									onPress={goToComplaint && goToComplaint}
									label={'denunciar post'}
									highlightedWords={['denunciar']}
									labelColor={theme.white3}
									SvgIcon={DeniedWhiteIcon}
									fontSize={14}
									minHeight={20}
									relativeHeight={relativeScreenHeight(8)}
								/>
							)
					}
				</ContainerInner>
			</Container>
		</Popover>
	)
}

export { PostPopOver }
