import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import Popover from 'react-native-popover-view'

import { RFValue } from 'react-native-responsive-fontsize'
import { CloseIcon, Container, ContainerInner, Sigh, UserName } from './styles'
import { screenHeight } from '../../common/screenDimensions'
import { theme } from '../../common/theme'
import XIcon from '../../assets/icons/x.svg'

import { PrimaryButton } from '../_buttons/PrimaryButton'

interface ProfilePopOverProps {
	userName?: string
	userId?: string
	popoverVisibility: boolean
	buttonLabel: string
	children: React.ReactChild
	onPress?: () => void
	goToConfig?: () => void
	closePopover: () => void
}

function ProfilePopOver({
	userName,
	userId,
	popoverVisibility,
	buttonLabel,
	children,
	onPress,
	goToConfig,
	closePopover
}: ProfilePopOverProps) {
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
					<UserName>{userName}</UserName>
					{
						goToConfig && (
							<PrimaryButton
								color={theme.green3}
								onPress={!!goToConfig && goToConfig as any} // TODO Type
								label={'configurações'}
								highlightedWords={['configurações']}
								labelColor={theme.white3}
								fontSize={14}
								minHeight={20}
								relativeHeight={screenHeight * 0.08}
							/>
						)
					}
					<Sigh />
					<PrimaryButton
						color={theme.red3}
						onPress={!!onPress && onPress as any} // TODO Type
						label={buttonLabel}
						highlightedWords={[buttonLabel]}
						labelColor={theme.white3}
						fontSize={14}
						minHeight={20}
						relativeHeight={screenHeight * 0.08}
					/>

				</ContainerInner>
			</Container>
		</Popover >
	)
}

export { ProfilePopOver }
