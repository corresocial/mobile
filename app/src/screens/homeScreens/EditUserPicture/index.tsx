import React, { useContext, useState } from 'react'
import { StatusBar } from 'react-native'

import { Container, InstructionCardContainer } from './styles'
import { screenWidth } from '../../../common/screenDimensions'
import { theme } from '../../../common/theme'
import ImagePlusIcon from '../../../assets/icons/imagePlus.svg'
import AngleLeftThinIcon from '../../../assets/icons/angleLeftThin.svg'

import { EditUserPictureScreenProps } from '../../../routes/Stack/UserStack/stackScreenProps'

import { EditContext } from '../../../contexts/EditContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { PhotoPortrait } from '../../../components/PhotoPortrait'
import { CustomCameraModal } from '../../../components/_modals/CustomCameraModal'

function EditUserPicture({ route, navigation }: EditUserPictureScreenProps) {
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const [cameraModalVisibility, setCameraModalVisibility] = useState<boolean>(false)
	const [profilePictureUrl, setProfilePictureUrl] = useState<string>(route.params.profilePictureUrl)

	const openCamera = () => {
		setCameraModalVisibility(true)
	}

	const setPictureUri = (pictureUri: string) => {
		setProfilePictureUrl(pictureUri)
	}

	const saveUserPicture = async () => {
		addNewUnsavedFieldToEditContext({ profilePictureUrl })
		navigation.goBack()
	}

	return (
		<Container >
			<StatusBar backgroundColor={theme.orange2} barStyle={'dark-content'} />
			<CustomCameraModal
				cameraOpened={cameraModalVisibility}
				onClose={() => {
					setCameraModalVisibility(false)
				}}
				setPictureUri={setPictureUri}
			/>
			<DefaultHeaderContainer
				relativeHeight={'80%'}
				centralized
				withoutPadding
				flexDirection={'column'}
				justifyContent={'space-around'}
				backgroundColor={theme.orange2}
			>
				<PhotoPortrait
					pictureUri={profilePictureUrl}
					width={screenWidth}
					height={screenWidth}
					deleteCurrentPicture={() => setProfilePictureUrl('')}

				/>
				<InstructionCardContainer>
					<PrimaryButton
						color={theme.white3}
						label={'mudar foto'}
						fontSize={22}
						labelColor={theme.black4}
						highlightedWords={['mudar']}
						SecondSvgIcon={ImagePlusIcon}
						svgIconScale={['35%', '20%']}
						onPress={openCamera}
					/>
				</InstructionCardContainer>
			</DefaultHeaderContainer>
			<FormContainer backgroundColor={theme.white2}>
				<PrimaryButton
					color={theme.white3}
					label={'voltar'}
					fontSize={18}
					labelColor={theme.black4}
					highlightedWords={['escolher', 'outra']}
					SecondSvgIcon={AngleLeftThinIcon}
					svgIconScale={['32%', '20%']}
					onPress={saveUserPicture}
				/>
			</FormContainer>
		</Container>
	)
}

export { EditUserPicture }
