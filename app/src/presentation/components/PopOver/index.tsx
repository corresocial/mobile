import { useNavigation } from '@react-navigation/native'
import React, { LegacyRef, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import Popover from 'react-native-popover-view'

import { PostRange } from '@domain/post/entity/types'
import { VerifiedLabelName } from '@domain/user/entity/types'

import { CloseIcon, Container, ContainerInner, UserName } from './styles'
import CityWhiteIcon from '@assets/icons/city-white.svg'
import DeniedWhiteIcon from '@assets/icons/denied-white.svg'
import HanOnMoneyWhiteIcon from '@assets/icons/handOnMoney-white.svg'
import ImpactLabel from '@assets/icons/impactLabel.svg'
import LeaderWhiteIcon from '@assets/icons/leaderLabel.svg'
import QuestionaryWhiteIcon from '@assets/icons/questionary-white.svg'
import VerifiedLabel from '@assets/icons/verifiedLabel.svg'
import XIcon from '@assets/icons/x-white.svg'
import { relativeScreenDensity, relativeScreenHeight } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { SelectSubscriptionPlanModal } from '@components/_modals/SelectSubscriptionPlanModal'
import { VerifyUserConfirmationModal } from '@components/_modals/VerifyUserConfirmationModal'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'

import { FocusAwareStatusBar } from '../FocusAwareStatusBar'

interface PopOverProps {
	title?: string
	isAdmin?: boolean
	isLeader?: boolean
	popoverVisibility: boolean
	buttonLabel?: string
	profileId?: string
	children: React.ReactChild
	reportUser?: () => void
	onPressVerify?: (label: VerifiedLabelName) => void
	removeProfileVerification?: () => void
	setFreeTrialToProfile?: (subscriptionPlan: PostRange) => void
	goToConfig?: () => void
	closePopover: () => void
}

function PopOver({
	title,
	isAdmin,
	isLeader,
	profileId,
	popoverVisibility,
	buttonLabel,
	children,
	reportUser,
	onPressVerify,
	removeProfileVerification,
	goToConfig,
	setFreeTrialToProfile,
	closePopover
}: PopOverProps) {
	const navigation = useNavigation<any>()

	const [verifyUserModal, setVerifyUserModal] = useState(false)
	const [verifyImpactUserModal, setVerifyImpactUserModal] = useState(false)
	const [verifyGovernmentProfileModal, setVerifyGovernmentProfileModal] = useState(false)
	const [verifyLeaderProfileModal, setVerifyLeaderProfileModal] = useState(false)
	const [censusTakerProfileModal, setCensusTakerProfileModal] = useState(false)
	const [removeProfileBadgeModal, setRemoveProfileBadgeModal] = useState(false)
	const [questionnaireAdministratorProfileModal, setQuestionnaireAdministratorProfileModal] = useState(false)
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

	const toggleVerifyLeaderProfileModal = () => {
		setVerifyLeaderProfileModal(!verifyLeaderProfileModal)
	}

	const toggleCensusTakerProfileModal = () => {
		setCensusTakerProfileModal(!censusTakerProfileModal)
	}

	const toggleQuestionnaireAdministratorProfileModal = () => {
		setQuestionnaireAdministratorProfileModal(!questionnaireAdministratorProfileModal)
	}

	const toggleRemoveProfileBadgeModal = () => {
		setRemoveProfileBadgeModal(!removeProfileBadgeModal)
	}

	const toggleFreeTrialUserModal = () => {
		setFreeTrielUserModal(!freeTrielUserModal)
	}

	const selectPlan = async (plan: PostRange) => {
		toggleSelectSubscriptionPlanModal()
		closePopover()
		setFreeTrialToProfile && setFreeTrialToProfile(plan)
	}

	const toggleSelectSubscriptionPlanModal = () => {
		setSelectSubscriptionPlanModal(!selectedSubscriptionPlanModal)
	}

	const navigateToSearchProfile = () => {
		navigation.push('SearchProfile', { verifiedLabel: 'questionnaireAdministrator', profileId: profileId })
		closePopover()
	}

	return (
		<Popover
			isVisible={popoverVisibility}
			onRequestClose={closePopover}
			animationConfig={{ delay: 0, duration: 300 }}
			popoverStyle={{ backgroundColor: theme.colors.black[4], borderRadius: relativeScreenDensity(8) }}
			backgroundStyle={{ backgroundColor: theme.transparence.orange() }}
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
				onPressButton={() => onPressVerify && onPressVerify('default')}
				closeModal={toggleVerifyUserModal}
			/>
			<VerifyUserConfirmationModal
				visibility={verifyImpactUserModal}
				title={'tornar de impacto'}
				subject={'tornar de impacto'}
				onPressButton={() => onPressVerify && onPressVerify('impact')}
				closeModal={toggleVerifyImpactUserModal}
			/>
			<VerifyUserConfirmationModal
				visibility={censusTakerProfileModal}
				title={'tornar coordenador'}
				subject={'tornar coordenador'}
				onPressButton={() => onPressVerify && onPressVerify('coordinator')}
				closeModal={toggleCensusTakerProfileModal}
			/>
			<VerifyUserConfirmationModal
				visibility={questionnaireAdministratorProfileModal}
				title={'tornar aplicador de questionário'}
				subject={'tornar aplicador de questionário'}
				onPressButton={navigateToSearchProfile}
				closeModal={toggleQuestionnaireAdministratorProfileModal}
			/>
			<VerifyUserConfirmationModal
				visibility={verifyLeaderProfileModal}
				title={'tornar líder'}
				subject={'conceder perfil de líder para'}
				onPressButton={() => onPressVerify && onPressVerify('leader')}
				closeModal={toggleVerifyLeaderProfileModal}
			/>
			<VerifyUserConfirmationModal
				visibility={verifyGovernmentProfileModal}
				title={'tornar governamental'}
				subject={'conceder perfil governamental para'}
				onPressButton={() => onPressVerify && onPressVerify('government')}
				closeModal={toggleVerifyGovernmentProfileModal}
			/>
			<VerifyUserConfirmationModal
				visibility={removeProfileBadgeModal}
				title={'remover verificação'}
				subject={'remover o selo de verificação de'}
				onPressButton={() => removeProfileVerification && removeProfileVerification()}
				closeModal={toggleRemoveProfileBadgeModal}
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
				<FocusAwareStatusBar backgroundColor={theme.transparence.orange()} barStyle={'dark-content'} />
				<ContainerInner>
					<CloseIcon onPress={closePopover}>
						<XIcon width={relativeScreenDensity(25)} height={relativeScreenDensity(25)} />
					</CloseIcon>
					<UserName>{title}</UserName>
					{
						goToConfig && (
							<PrimaryButton
								color={theme.colors.green[3]}
								onPress={!!goToConfig && goToConfig}
								label={'configurações'}
								highlightedWords={['configurações']}
								labelColor={theme.colors.white[3]}
								fontSize={14}
								minHeight={20}
								relativeHeight={relativeScreenHeight(8)}
							/>
						)
					}
					<VerticalSpacing />
					{
						reportUser && (
							<>
								<PrimaryButton
									color={theme.colors.red[3]}
									SvgIcon={DeniedWhiteIcon}
									label={buttonLabel || 'botão'}
									highlightedWords={[buttonLabel ? buttonLabel.split(' ')[0] : 'botão']}
									labelColor={theme.colors.white[3]}
									fontSize={14}
									minHeight={20}
									relativeHeight={relativeScreenHeight(8)}
									onPress={reportUser}
								/>
								<VerticalSpacing />
							</>
						)
					}
					{
						(isLeader || isAdmin) && onPressVerify && (
							<>
								<PrimaryButton
									color={theme.colors.green[3]}
									SecondSvgIcon={VerifiedLabel}
									label={'verificar perfil'}
									highlightedWords={['verificar']}
									labelColor={theme.colors.white[3]}
									fontSize={14}
									minHeight={20}
									relativeHeight={relativeScreenHeight(8)}
									onPress={toggleVerifyUserModal}
								/>
								<VerticalSpacing />
								<PrimaryButton
									color={theme.colors.pink[3]}
									SecondSvgIcon={ImpactLabel}
									label={'tornar de impacto'}
									highlightedWords={['tornar', 'impacto']}
									labelColor={theme.colors.white[3]}
									fontSize={14}
									minHeight={20}
									relativeHeight={relativeScreenHeight(8)}
									onPress={toggleVerifyImpactUserModal}
								/>
								{
									isAdmin && (
										<>
											<VerticalSpacing />
											<PrimaryButton
												color={theme.colors.purple[3]}
												SecondSvgIcon={CityWhiteIcon}
												label={'tornar governamental'}
												highlightedWords={['governamental']}
												labelColor={theme.colors.white[3]}
												fontSize={14}
												minHeight={20}
												relativeHeight={relativeScreenHeight(8)}
												onPress={toggleVerifyGovernmentProfileModal}
											/>
											<VerticalSpacing />
											<PrimaryButton
												color={theme.colors.orange[3]}
												SecondSvgIcon={LeaderWhiteIcon}
												label={'tornar líder'}
												highlightedWords={['líder']}
												fontSize={14}
												minHeight={20}
												relativeHeight={relativeScreenHeight(8)}
												onPress={toggleVerifyLeaderProfileModal}
											/>

											<VerticalSpacing />
											<PrimaryButton
												color={theme.colors.orange[3]}
												SecondSvgIcon={QuestionaryWhiteIcon}
												label={'tornar coordenador'}
												highlightedWords={['coordenador']}
												fontSize={14}
												minHeight={20}
												relativeHeight={relativeScreenHeight(8)}
												onPress={toggleCensusTakerProfileModal}
											/>
											<VerticalSpacing />
											<PrimaryButton
												color={theme.colors.orange[3]}
												SecondSvgIcon={QuestionaryWhiteIcon}
												label={'tornar aplicator de questionário'}
												highlightedWords={['aplicator', 'questionário', 'de']}
												fontSize={14}
												minHeight={20}
												relativeHeight={relativeScreenHeight(8)}
												onPress={toggleQuestionnaireAdministratorProfileModal}
											/>
										</>
									)
								}
							</>
						)
					}
					{
						isAdmin && setFreeTrialToProfile && (
							<>
								<VerticalSpacing />
								<PrimaryButton
									color={theme.colors.blue[3]}
									SecondSvgIcon={HanOnMoneyWhiteIcon}
									label={'dar assinatura'}
									highlightedWords={['assinatura']}
									labelColor={theme.colors.white[3]}
									fontSize={14}
									minHeight={20}
									relativeHeight={relativeScreenHeight(8)}
									onPress={toggleSelectSubscriptionPlanModal}
								/>
							</>
						)
					}
					{
						(isLeader || isAdmin) && (
							<>
								<VerticalSpacing />
								<PrimaryButton
									color={theme.colors.red[3]}
									SecondSvgIcon={DeniedWhiteIcon}
									label={'remover verificação'}
									highlightedWords={['verificação']}
									labelColor={theme.colors.white[3]}
									fontSize={14}
									minHeight={20}
									relativeHeight={relativeScreenHeight(8)}
									onPress={toggleRemoveProfileBadgeModal}
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
