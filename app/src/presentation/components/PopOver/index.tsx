import React, { LegacyRef, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import Popover from 'react-native-popover-view'
import { RFValue } from 'react-native-responsive-fontsize'

import { PostRange } from '@domain/post/entity/types'
import { VerifiedLabelName } from '@domain/user/entity/types'

import { CloseIcon, Container, ContainerInner, UserName } from './styles'
import CityWhiteIcon from '@assets/icons/city-white.svg'
import DeniedWhiteIcon from '@assets/icons/denied-white.svg'
import HanOnMoneyWhiteIcon from '@assets/icons/handOnMoney-white.svg'
import ImpactLabel from '@assets/icons/impactLabel.svg'
import VerifiedLabel from '@assets/icons/verifiedLabel.svg'
import XIcon from '@assets/icons/x-white.svg'
import { relativeScreenHeight } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { SelectSubscriptionPlanModal } from '@components/_modals/SelectSubscriptionPlanModal'
import { VerifyUserConfirmationModal } from '@components/_modals/VerifyUserConfirmationModal'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'

import { FocusAwareStatusBar } from '../FocusAwareStatusBar'

interface PopOverProps {
	title?: string
	isAdmin?: boolean
	popoverVisibility: boolean
	buttonLabel: string
	children: React.ReactChild
	reportUser?: () => void
	onPressVerify: (label: VerifiedLabelName) => void
	setFreeTrialToProfile: (subscriptionPlan: PostRange) => void
	goToConfig?: () => void
	closePopover: () => void
}

function PopOver({
	title,
	isAdmin,
	popoverVisibility,
	buttonLabel,
	children,
	reportUser,
	onPressVerify,
	goToConfig,
	setFreeTrialToProfile,
	closePopover
}: PopOverProps) {
	const [verifyUserModal, setVerifyUserModal] = useState(false)
	const [verifyImpactUserModal, setVerifyImpactUserModal] = useState(false)
	const [verifyGovernmentProfileModal, setVerifyGovernmentProfileModal] = useState(false)
	const [freeTrielUserModal, setFreeTrielUserModal] = useState(false)
	const [selectedSubscriptionPlanModal, setSelectSubscriptionPlanModal] = useState(false)

	const toggleVerifyUserModal = () => {
		setVerifyUserModal(!verifyUserModal)
	}

	const toggleVerifyImpactUserModal = () => {
		setVerifyImpactUserModal(!verifyImpactUserModal)
	}

	const toggleVerifyGovernmentProfileModal = () => {
		setVerifyGovernmentProfileModal(!verifyGovernmentProfileModal)
	}

	const toggleFreeTrialUserModal = () => {
		setFreeTrielUserModal(!freeTrielUserModal)
	}

	const selectPlan = async (plan: PostRange) => {
		toggleSelectSubscriptionPlanModal()
		closePopover()
		setFreeTrialToProfile(plan)
	}

	const toggleSelectSubscriptionPlanModal = () => {
		setSelectSubscriptionPlanModal(!selectedSubscriptionPlanModal)
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
					<View ref={sourceRef as LegacyRef<View>} >
						{children}
					</View>
				</TouchableOpacity>
			)}
		>
			<VerifyUserConfirmationModal
				visibility={verifyUserModal}
				title={'verificar perfil'}
				subject={'verificar'}
				onPressButton={() => onPressVerify('default')}
				closeModal={toggleVerifyUserModal}
			/>
			<VerifyUserConfirmationModal
				visibility={verifyImpactUserModal}
				title={'tornar de impacto'}
				subject={'tornar de impacto'}
				onPressButton={() => onPressVerify('impact')}
				closeModal={toggleVerifyImpactUserModal}
			/>
			<VerifyUserConfirmationModal
				visibility={verifyGovernmentProfileModal}
				title={'tornar governamental'}
				subject={'conceder perfil governamental para'}
				onPressButton={() => onPressVerify('government')}
				closeModal={toggleVerifyGovernmentProfileModal}
			/>
			<VerifyUserConfirmationModal
				visibility={freeTrielUserModal}
				title={'dar assinatura'}
				subject={'dar assinatura gratuita para'}
				onPressButton={toggleSelectSubscriptionPlanModal}
				closeModal={toggleFreeTrialUserModal}
			/>
			<SelectSubscriptionPlanModal
				visibility={selectedSubscriptionPlanModal}
				onSelectPlan={(plan: PostRange) => selectPlan(plan)}
				closeModal={toggleSelectSubscriptionPlanModal}
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
					<VerticalSpacing height={RFValue(5)} />
					<PrimaryButton
						color={theme.red3}
						SvgIcon={DeniedWhiteIcon}
						label={buttonLabel}
						highlightedWords={[buttonLabel.split(' ')[0]]}
						labelColor={theme.white3}
						fontSize={14}
						minHeight={20}
						relativeHeight={relativeScreenHeight(8)}
						onPress={reportUser && reportUser}
					/>
					<VerticalSpacing height={RFValue(5)} />
					<PrimaryButton
						color={theme.green3}
						SecondSvgIcon={VerifiedLabel}
						label={'verificar perfil'}
						highlightedWords={['verificar']}
						labelColor={theme.white3}
						fontSize={14}
						minHeight={20}
						relativeHeight={relativeScreenHeight(8)}
						onPress={toggleVerifyUserModal}
					/>
					<VerticalSpacing height={RFValue(5)} />
					<PrimaryButton
						color={theme.pink3}
						SecondSvgIcon={ImpactLabel}
						label={'tornar de impacto'}
						highlightedWords={['tornar', 'impacto']}
						labelColor={theme.white3}
						fontSize={14}
						minHeight={20}
						relativeHeight={relativeScreenHeight(8)}
						onPress={toggleVerifyImpactUserModal}
					/>
					{
						isAdmin && (
							<>
								<VerticalSpacing height={RFValue(5)} />
								<PrimaryButton
									color={theme.purple3}
									SecondSvgIcon={CityWhiteIcon}
									label={'tornar governamental'}
									highlightedWords={['governamental']}
									labelColor={theme.white3}
									fontSize={14}
									minHeight={20}
									relativeHeight={relativeScreenHeight(8)}
									onPress={toggleVerifyGovernmentProfileModal}
								/>
							</>
						)
					}
					{
						isAdmin && (
							<>
								<VerticalSpacing height={RFValue(5)} />
								<PrimaryButton
									color={theme.blue3}
									SecondSvgIcon={HanOnMoneyWhiteIcon}
									label={'dar assinatura'}
									highlightedWords={['assinatura']}
									labelColor={theme.white3}
									fontSize={14}
									minHeight={20}
									relativeHeight={relativeScreenHeight(8)}
									onPress={toggleFreeTrialUserModal}
								/>
							</>
						)
					}
				</ContainerInner>
			</Container>
		</Popover >
	)
}

export { PopOver }
