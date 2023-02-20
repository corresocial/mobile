import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import Popover from 'react-native-popover-view'

import { RFValue } from 'react-native-responsive-fontsize'
import { CloseIcon, Container, ContainerInner, PostTitle, Sigh } from './styles'
import { relativeScreenHeight } from '../../common/screenDimensions'
import { theme } from '../../common/theme'
import XIcon from '../../assets/icons/x.svg'

import { PostType } from '../../services/firebase/types'

import { PrimaryButton } from '../_buttons/PrimaryButton'
import { Loader } from '../Loader'

interface PostPopOverProps {
	postTitle?: string
	postId?: string
	postType?: PostType
	isAuthor?: boolean
	isLoading?: boolean
	popoverVisibility: boolean
	children: React.ReactChild
	goToComplaint?: () => void
	editPost?: () => void
	deletePost?: () => void
	closePopover: () => void
}

function PostPopOver({ postTitle,
	postId,
	postType,
	isAuthor = false,
	isLoading = false,
	popoverVisibility,
	children,
	goToComplaint,
	editPost,
	deletePost,
	closePopover
}: PostPopOverProps) {
	return (
		<Popover
			isVisible={popoverVisibility}
			onRequestClose={closePopover}
			animationConfig={{ delay: 0, duration: 300 }}
			popoverStyle={{ backgroundColor: theme.black4, borderRadius: RFValue(8) }}
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
					{
						isAuthor
							? isLoading
								? <Loader />
								: (
									<>
										<PrimaryButton
											color={theme.green3}
											onPress={editPost && editPost}
											label={'editar post'}
											highlightedWords={['editar', 'post']}
											labelColor={theme.white3}
											fontSize={14}
											minHeight={20}
											relativeHeight={relativeScreenHeight(8)}
										/>

										{
											deletePost && (
												<>
													<Sigh />
													<PrimaryButton
														color={theme.red3}
														onPress={deletePost}
														label={'apagar post'}
														highlightedWords={['apagar', 'post']}
														labelColor={theme.white3}
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
									label={'denunciar'}
									highlightedWords={['denunciar']}
									labelColor={theme.white3}
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
