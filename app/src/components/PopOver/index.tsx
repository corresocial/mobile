import React, { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import Popover from 'react-native-popover-view'

import { RFValue } from 'react-native-responsive-fontsize'
import { CloseIcon, Container, ContainerInner, Sigh, UserName } from './styles'
import { relativeScreenHeight } from '../../common/screenDimensions'
import { theme } from '../../common/theme'
import XIcon from '../../assets/icons/x-white.svg'
import VerifiedLabel from '../../assets/icons/verifiedLabel.svg'
import ImpactLabel from '../../assets/icons/impactLabel.svg'

import { PrimaryButton } from '../_buttons/PrimaryButton'
import { FocusAwareStatusBar } from '../FocusAwareStatusBar'
import { VerifyUserConfirmationModal } from '../_modals/VerifyUserConfirmationModal'
import { VerifiedLabelName } from '../../services/firebase/types'

interface PopOverProps {
	title?: string
	isVerifiable: boolean
	popoverVisibility: boolean
	buttonLabel: string
	buttonTwoLabel: string
	buttonThreeLabel: string
	children: React.ReactChild
	onPress?: () => void
	onPressVerify: (label:VerifiedLabelName) => void
	goToConfig?: () => void
	closePopover: () => void
}

function PopOver({
	title,
	isVerifiable,
	popoverVisibility,
	buttonLabel,
	buttonTwoLabel,
	buttonThreeLabel,
	children,
	onPress,
	onPressVerify,
	goToConfig,
	closePopover
}: PopOverProps) {
	const [verifyUserModal, setVerifyUserModal] = useState(false)
	const [verifyImpactUserModal, setVerifyImpactUserModal] = useState(false)

	const toggleVerifyUserModal = () => {
		setVerifyUserModal(!verifyUserModal)
	}
	const toggleVerifyImpactUserModal = () => {
		setVerifyImpactUserModal(!verifyImpactUserModal)
	}

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
			<VerifyUserConfirmationModal
				visibility={verifyUserModal}
				title={'verificar perfil'}
				onPressButton={() => onPressVerify('default')}
				closeModal={toggleVerifyUserModal}
			/>
			<VerifyUserConfirmationModal
				visibility={verifyImpactUserModal}
				title={'tornar de impacto'}
				onPressButton={() => onPressVerify('impact')}
				closeModal={toggleVerifyImpactUserModal}
			/>
			<Container>
				<FocusAwareStatusBar backgroundColor={theme.transparence.orange2} barStyle={'dark-content'} />
				<ContainerInner>
					<CloseIcon onPress={closePopover}>
						<XIcon width={RFValue(25)} height={RFValue(25)} />
					</CloseIcon>
					<UserName>{title}</UserName>
					{
						goToConfig && (
							<PrimaryButton
								color={theme.green3}
								onPress={!!goToConfig && goToConfig}
								label={'configurações'}
								highlightedWords={['configurações']}
								labelColor={theme.white3}
								fontSize={14}
								minHeight={20}
								relativeHeight={relativeScreenHeight(8)}
							/>
						)
					}
					<Sigh />
					<PrimaryButton
						color={theme.red3}
						onPress={onPress && onPress}
						label={buttonLabel}
						highlightedWords={[buttonLabel]}
						labelColor={theme.white3}
						fontSize={14}
						minHeight={20}
						relativeHeight={relativeScreenHeight(8)}
					/>
					{ isVerifiable && (
						<>
							<Sigh />
							<PrimaryButton
								color={theme.orange3}
								onPress={toggleVerifyUserModal}
								SvgIcon={VerifiedLabel}
								label={'verificar perfil'}
								highlightedWords={['verificar']}
								labelColor={theme.black3}
								fontSize={14}
								minHeight={20}
								relativeHeight={relativeScreenHeight(8)}
							/>
							<Sigh />
							<PrimaryButton
								color={theme.pink3}
								onPress={toggleVerifyImpactUserModal}
								SvgIcon={ImpactLabel}
								label={'tornar de impacto'}
								highlightedWords={['impacto']}
								labelColor={theme.white3}
								fontSize={14}
								minHeight={20}
								relativeHeight={relativeScreenHeight(8)}
							/>
						</>
					)}
				</ContainerInner>
			</Container>
		</Popover >
	)
}

export { PopOver }
