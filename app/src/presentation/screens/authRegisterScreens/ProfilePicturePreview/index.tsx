import ImageEditor from 'expo-image-cropper'
import React, { useState } from 'react'
import { StatusBar } from 'react-native'

import { UserRegisterData } from '@domain/user/entity/types'
import { useUserDomain } from '@domain/user/useUserDomain'

import { useUserRepository } from '@data/user/useUserRepository'

import { useAuthContext } from '@contexts/AuthContext'

import { ProfilePicturePreviewScreenProps } from '@routes/Stack/AuthRegisterStack/screenProps'

import { UiUtils } from '@utils-ui/common/UiUtils'

import { ButtonsContainer, Container, InstructionCardContainer } from './styles'
import AddPictureWhiteIcon from '@assets/icons/addPicture-white.svg'
import NewPhotoWhiteIcon from '@assets/icons/camera-white.svg'
import CheckIcon from '@assets/icons/check-white.svg'
import { relativeScreenHeight, relativeScreenWidth, screenWidth } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { BackButton } from '@components/_buttons/BackButton'
import { SmallButton } from '@components/_buttons/SmallButton'
import { InstructionCard } from '@components/_cards/InstructionCard'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { CustomCameraModal } from '@components/_modals/CustomCameraModal'
import { MediaBrowserModal } from '@components/_modals/MediaBrowserModal'
import { Loader } from '@components/Loader'
import { PhotoPortrait } from '@components/PhotoPortrait'

const { uploadUserMedia, createNewUser } = useUserDomain()

const { compressImage } = UiUtils()

function ProfilePicturePreview({ navigation, route }: ProfilePicturePreviewScreenProps) {
	const { userRegistrationData, setRemoteUserOnLocal } = useAuthContext()

	const [profilePictureUrl, setProfilePictureUri] = useState<string>('')
	const [imageCropperOpened, setImageCropperOpened] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState(false)
	const [cameraModalVisibility, setCameraModalVisibility] = useState<boolean>(false)
	const [mediaBrowserModalVisibility, setMediaBrowserModalVisibility] = useState<boolean>(false)

	const saveCroppedImage = (image: any) => {
		setProfilePictureUri(image.uri)
		setImageCropperOpened(false)
	}
	const setPictureUri = (pictureUri: string) => {
		setProfilePictureUri(pictureUri)
	}

	const saveUserData = async () => {
		try {
			const userData = userRegistrationData

			setIsLoading(true)

			let pictureUrl = [''] // REFACTOR Migrar para dentro do método de salvar
			if (profilePictureUrl.length) {
				const compressedPictureUri = await compressImage(profilePictureUrl)
				pictureUrl = await uploadUserMedia(useUserRepository, [compressedPictureUri], 'pictures')
			}

			await createNewUser(useUserRepository, { ...userData, profilePictureUrl: pictureUrl } as UserRegisterData)
			await setRemoteUserOnLocal(userData.userId)

			setIsLoading(false)
			navigateToHome()
		} catch (err) {
			console.log(err)
		} finally {
			setIsLoading(false)
		}
	}

	const navigateToHome = async () => {
		return navigation.navigate('UserStack', { newUser: true })
	}

	const navigateBackwards = () => navigation.goBack()

	return (
		<Container >
			<StatusBar backgroundColor={theme.green2} barStyle={'dark-content'} />
			<MediaBrowserModal
				onSelectionConfirmed={(imgs) => setPictureUri(imgs[0].uri)}
				onClose={() => setMediaBrowserModalVisibility(false)}
				maxImages={1}
				showMediaBrowser={mediaBrowserModalVisibility}
			/>
			<CustomCameraModal
				cameraOpened={cameraModalVisibility}
				onClose={() => { setCameraModalVisibility(false) }}
				setPictureUri={setPictureUri}
			/>
			{
				imageCropperOpened && (
					<ImageEditor
						imageUri={profilePictureUrl}
						fixedAspectRatio={1 / 1}
						minimumCropDimensions={{ width: 50, height: 50 }}
						onEditingCancel={() => setImageCropperOpened(false)}
						onEditingComplete={saveCroppedImage}
					/>
				)
			}
			<DefaultHeaderContainer
				relativeHeight={relativeScreenHeight(80)}
				centralized
				withoutPadding
				flexDirection={'column'}
				justifyContent={'space-around'}
				backgroundColor={theme.orange2}
			>
				<InstructionCardContainer>
					<BackButton onPress={navigateBackwards} />
					<InstructionCard
						fontSize={16}
						message={profilePictureUrl.length ? 'está boa?' : 'adiciona a sua foto aí!'}
						highlightedWords={['boa', 'foto']}
					/>
				</InstructionCardContainer>
				<PhotoPortrait
					pictureUri={profilePictureUrl}
					width={screenWidth}
					height={screenWidth}
					editCurrentPicture={() => setImageCropperOpened(true)}
					deleteCurrentPicture={() => setPictureUri('')}
				/>
			</DefaultHeaderContainer>
			<ButtonsContainer>
				{
					isLoading
						? <Loader />
						: (
							<>
								<SmallButton
									relativeWidth={relativeScreenWidth(20)}
									height={relativeScreenWidth(20)}
									SvgIcon={AddPictureWhiteIcon}
									svgScale={['70%', '70%']}
									halfRounded
									onPress={() => { setMediaBrowserModalVisibility(true) }}
								/>
								<SmallButton
									relativeWidth={relativeScreenWidth(20)}
									height={relativeScreenWidth(20)}
									SvgIcon={NewPhotoWhiteIcon}
									svgScale={['100%', '100%']}
									halfRounded
									onPress={() => { setCameraModalVisibility(true) }}
								/>
								<SmallButton
									flexDirection={'row-reverse'}
									relativeWidth={relativeScreenWidth(35)}
									height={relativeScreenWidth(20)}
									color={theme.green3}
									labelColor={theme.white3}
									SvgIcon={CheckIcon}
									halfRounded
									onPress={saveUserData}
								/>
							</>
						)
				}
			</ButtonsContainer>
		</Container>
	)
}

export { ProfilePicturePreview }
