import React, { useContext, useEffect, useState } from 'react'
import { StatusBar } from 'react-native'

import { getDownloadURL } from 'firebase/storage'

import { Id, PostCollection } from '@domain/post/entity/types'
import { UserEntity, UserEntityOptional } from '@domain/user/entity/types'
import { useUserDomain } from '@domain/user/useUserDomain'

import { uploadImage } from '@data/imageStorage/uploadPicture'
import { usePostRepository } from '@data/post/usePostRepository'
import { useUserRepository } from '@data/user/useUserRepository'

import { AuthContext } from '@contexts/AuthContext'

import { ProfilePicturePreviewScreenProps } from '@routes/Stack/AuthRegisterStack/screenProps'

import { UiUtils } from '@utils-ui/common/UiUtils'

import { Container, InstructionCardContainer } from './styles'
import AddPictureWhiteIcon from '@assets/icons/addPicture-white.svg'
import CheckWhiteIcon from '@assets/icons/check-white.svg'
import { screenWidth } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { BackButton } from '@components/_buttons/BackButton'
import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { InstructionCard } from '@components/_cards/InstructionCard'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { FormContainer } from '@components/_containers/FormContainer'
import { CustomCameraModal } from '@components/_modals/CustomCameraModal'
import { Loader } from '@components/Loader'
import { PhotoPortrait } from '@components/PhotoPortrait'

const { getLocalUserData } = useUserDomain()

const { remoteStorage } = useUserRepository()
const { remoteStorage: remotePostStorage } = usePostRepository()

const { arrayIsEmpty } = UiUtils()

function ProfilePicturePreview({ navigation, route }: ProfilePicturePreviewScreenProps) {
	const { setRemoteUserOnLocal, userDataContext } = useContext(AuthContext)

	const [cameraModalVisibility, setCameraModalVisibility] = useState<boolean>(true)
	const [profilePicture, setProfilePicture] = useState<string[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const [hasServerSideError, setHasServerSideError] = useState(false)

	const headerMessages = {
		instruction: {
			text: 'está boa?',
			highlightedWords: ['boa']
		},
		serverSideError: {
			text: 'Opa! parece que algo deu algo errado do nosso lado, tente novamente em alguns instantantes',
			highlightedWords: ['do', 'nosso', 'lado']
		}
	}

	useEffect(() => {
		const user = getRouteParams()
		setProfilePicture(user.profilePictureUrl as string[] || [])
	}, [])

	const throwServerSideError = (err: any) => {
		console.log(err)
		setHasServerSideError(true)
	}

	const navigateToNextScreen = async (tourPerformed?: boolean) => {
		setHasServerSideError(false)
		return navigation.navigate('UserStack', { tourPerformed })
	}

	const backToCustomCamera = () => {
		setCameraModalVisibility(true)
		setProfilePicture([])
	}

	const getHeaderMessage = () => {
		if (hasServerSideError) return headerMessages.serverSideError.text
		return headerMessages.instruction.text
	}

	const getHeaderHighlightedWords = () => {
		if (hasServerSideError) return headerMessages.serverSideError.highlightedWords
		return headerMessages.instruction.highlightedWords
	}

	const setPictureUri = (pictureUri: string) => {
		setProfilePicture([pictureUri])
	}

	const getRouteParams = () => ({
		...route.params
	})

	const saveUserData = async () => {
		try {
			const userData = getRouteParams()
			const localUser = await getLocalUserData(useUserRepository)

			if (!localUser || !profilePicture.length) return

			setIsLoading(true)

			if (localUser && localUser.profilePictureUrl && localUser.profilePictureUrl.length && localUser.profilePictureUrl[0] === profilePicture[0]) {
				const currentUser: Partial<UserEntity> = {
					name: userData.userName,
					profilePictureUrl: profilePicture,
					tourPerformed: !!localUser.tourPerformed,
				}

				if (!localUser.createdAt) {
					currentUser.createdAt = new Date()
				}

				await remoteStorage.updateUserData(userData.userIdentification.uid, currentUser)
				await remoteStorage.updatePrivateContacts(
					userData.userIdentification.uid,
					{ cellNumber: userData.cellNumber || '', email: userData.email || '' }
				)

				await setRemoteUserOnLocal(userData.userIdentification.uid)

				setIsLoading(false)
				navigateToNextScreen(localUser.tourPerformed)
				return
			}

			await uploadImage(profilePicture[0], 'users')
				.then(
					({ uploadTask, blob }: any) => {
						uploadTask.on(
							'state_change',
							() => { },
							(err: any) => { throwServerSideError(err) },
							async () => {
								blob.close()
								getDownloadURL(uploadTask.snapshot.ref)
									.then(async (profilePictureUrl) => {
										const currentUser: UserEntityOptional = {
											name: userData.userName,
											profilePictureUrl: [profilePictureUrl as string],
											tourPerformed: !!localUser.tourPerformed,
										}

										if (!localUser.createdAt) {
											currentUser.createdAt = new Date()
										}

										await remoteStorage.updateUserData(userData.userIdentification.uid, currentUser)
										await remoteStorage.updatePrivateContacts(
											userData.userIdentification.uid,
											{ cellNumber: userData.cellNumber || '', email: userData.email || '' }
										)

										if (!arrayIsEmpty(userDataContext.profilePictureUrl)) {
											await remoteStorage.deleteUserProfilePicture(userDataContext.profilePictureUrl || [])
											await remotePostStorage.updateOwnerDataOnPosts(
												{ ...currentUser },
												userDataContext.posts?.map((post: PostCollection) => post.postId) as Id[]
											)
										}

										await setRemoteUserOnLocal(userData.userIdentification.uid)

										setIsLoading(false)
										navigateToNextScreen(localUser.tourPerformed)
									})
							},
						)
					},
				)
		} catch (err) {
			throwServerSideError(err)
		} finally {
			setIsLoading(false)
		}
	}

	const navigateBackwards = () => navigation.goBack()

	if (!profilePicture.length && !cameraModalVisibility) {
		navigateBackwards()
	}

	return (
		<Container >
			<StatusBar backgroundColor={hasServerSideError ? theme.red2 : theme.green2} barStyle={'dark-content'} />
			<CustomCameraModal
				cameraOpened={cameraModalVisibility && !profilePicture.length}
				onClose={() => { setCameraModalVisibility(false) }}
				setPictureUri={setPictureUri}
			/>
			<DefaultHeaderContainer
				relativeHeight={!hasServerSideError ? '70%' : '68%'}
				centralized
				withoutPadding
				flexDirection={'column'}
				justifyContent={'space-around'}
				backgroundColor={hasServerSideError ? theme.red2 : theme.green2}
			>
				<InstructionCardContainer>
					<BackButton onPress={navigateBackwards} />
					<InstructionCard
						flex={1}
						message={getHeaderMessage()}
						highlightedWords={getHeaderHighlightedWords()}
					/>
				</InstructionCardContainer>
				<PhotoPortrait pictureUri={profilePicture[0]} width={screenWidth} height={screenWidth} />
			</DefaultHeaderContainer>
			<FormContainer >
				{
					isLoading
						? <Loader />
						: (
							<>
								<PrimaryButton
									color={theme.green3}
									flexDirection={'row-reverse'}
									SvgIcon={CheckWhiteIcon}
									label={'tá ótima, bora'}
									labelColor={theme.white3}
									highlightedWords={['bora']}
									onPress={saveUserData}
								/>
								<PrimaryButton
									color={theme.yellow3}
									SvgIcon={AddPictureWhiteIcon}
									label={'nem, escolher outra'}
									labelColor={theme.black4}
									highlightedWords={['escolher', 'outra']}
									onPress={backToCustomCamera}
								/>
							</>
						)
				}
			</FormContainer>
		</Container>
	)
}

export { ProfilePicturePreview }
