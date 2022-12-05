import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import Popover from 'react-native-popover-view'

import { RFValue } from 'react-native-responsive-fontsize'
import { CloseIcon, Container, UserName } from './styles'
import { screenHeight } from '../../common/screenDimensions'
import { theme } from '../../common/theme'
import XIcon from '../../assets/icons/x.svg'

import { PrimaryButton } from '../_buttons/PrimaryButton'

interface ProfilePopOverProps {
	userName?: string
	userId?: string
	popoverVisibility: boolean
	children: React.ReactChild
	closePopover: () => void
}

function ProfilePopOver({ userName, userId, popoverVisibility, children, closePopover }: ProfilePopOverProps) {
	return (
		<Popover
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
				<CloseIcon onPress={closePopover}>
					<XIcon width={RFValue(25)} height={RFValue(25)} />
				</CloseIcon>
				<UserName>{userName}</UserName>
				<PrimaryButton
					color={theme.red3}
					onPress={() => { }}
					label={'denunciar'}
					highlightedWords={['denunciar']}
					labelColor={theme.white3}
					fontSize={14}
					minHeight={20}
					relativeHeight={screenHeight * 0.08}
				/>
			</Container>
		</Popover>
	)
}

export { ProfilePopOver }
