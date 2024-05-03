import ImageEditor from 'expo-image-cropper'
import React, { useContext, useState } from 'react'
import { StatusBar } from 'react-native'

import { AuthContext } from '@contexts/AuthContext'
import { EditContext } from '@contexts/EditContext'

import { EditUserPictureScreenProps } from '@routes/Stack/ProfileStack/screenProps'

import { compressImage } from '@utils-ui/common/convertion/compressImage'

import { ButtonsContainer, Container, InstructionCardContainer, TopArea } from './styles'
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
import { PhotoPortrait } from '@components/PhotoPortrait'

function EditUserPicture({ route, navigation }: EditUserPictureScreenProps) {
	const { userDataContext } = useContext(AuthContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const [cameraModalVisibility, setCameraModalVisibility] = useState<boolean>(false)
	const [mediaBrowserModalVisibility, setMediaBrowserModalVisibility] = useState<boolean>(false)
	const [imageCropperOpened, setImageCropperOpened] = useState<boolean>(false)
	const [profilePictureUrl, setProfilePictureUrl] = useState<string>(route.params.profilePictureUrl)

	const [hasSelectedNewPhoto, setHasSelectedNewPhoto] = useState(false)

	const setPictureUri = (pictureUri: string) => {
		setProfilePictureUrl(pictureUri)
		setHasSelectedNewPhoto(true)
	}

	const saveUserPicture = async () => {
		const areEquals = userDataContext.profilePictureUrl && (userDataContext.profilePictureUrl[0] === profilePictureUrl)
		if (!areEquals) {
			const compressedUrl = await compressImage(profilePictureUrl)
			addNewUnsavedFieldToEditContext({ profilePictureUrl: compressedUrl })
		}
		navigation.goBack()
	}

	const saveCroppedImage = (image: any) => {
		setProfilePictureUrl(image.uri)
		setImageCropperOpened(false)
	}

	return (
		<Container >
			<StatusBar backgroundColor={theme.orange2} barStyle={'dark-content'} />
			<MediaBrowserModal
				onSelectionConfirmed={(imgs) => setPictureUri(imgs[0].uri)}
				onClose={
					() => setMediaBrowserModalVisibility(false)
				}
				maxImages={1}
				showMediaBrowser={mediaBrowserModalVisibility}
			/>
			<CustomCameraModal
				cameraOpened={cameraModalVisibility}
				onClose={() => {
					setCameraModalVisibility(false)
				}}
				setPictureUri={setPictureUri}
			/>
			{
				imageCropperOpened && (
					<ImageEditor
						imageUri={profilePictureUrl}
						fixedAspectRatio={1 / 1}
						minimumCropDimensions={{
							width: 50,
							height: 50,
						}}
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
				<TopArea>
					<BackButton onPress={navigation.goBack} />
					<InstructionCard
						fontSize={16}
						message={(hasSelectedNewPhoto ? 'eaí, gostou?' : 'adiciona a sua foto aí!')}
						highlightedWords={['gostou?', 'foto', 'perfil']}
					/>
				</TopArea>
				<PhotoPortrait
					pictureUri={profilePictureUrl}
					width={screenWidth}
					height={screenWidth}
					editCurrentPicture={() => {
						setImageCropperOpened(true)
					}}
					deleteCurrentPicture={() => {
						setPictureUri('')
						addNewUnsavedFieldToEditContext({ profilePictureUrl: '' })
					}}

				/>
				<InstructionCardContainer>
				</InstructionCardContainer>
			</DefaultHeaderContainer>
			<ButtonsContainer>
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
					onPress={async () => saveUserPicture()}
				/>
			</ButtonsContainer>
		</Container>
	)
}

export { EditUserPicture }
