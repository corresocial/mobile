import React, { useContext, useState } from 'react'
import { StatusBar } from 'react-native'

import { AuthContext } from '@contexts/AuthContext'
import { EditContext } from '@contexts/EditContext'

import { EditUserPictureScreenProps } from '@routes/Stack/ProfileStack/screenProps'

import { Container, InstructionCardContainer } from './styles'
import ImagePlusIcon from '@assets/icons/addPicture-white.svg'
import Check from '@assets/icons/check-white.svg'
import X from '@assets/icons/x-white.svg'
import { screenWidth } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { FormContainer } from '@components/_containers/FormContainer'
import { CustomCameraModal } from '@components/_modals/CustomCameraModal'
import { PhotoPortrait } from '@components/PhotoPortrait'

function EditUserPicture({ route, navigation }: EditUserPictureScreenProps) {
	const { userDataContext } = useContext(AuthContext)
	const { addNewUnsavedFieldToEditContext, clearUnsavedEditFieldContext } = useContext(EditContext)

	const [cameraModalVisibility, setCameraModalVisibility] = useState<boolean>(true)
	const [profilePictureUrl, setProfilePictureUrl] = useState<string>(route.params.profilePictureUrl)

	const openCamera = () => {
		setCameraModalVisibility(true)
	}

	const setPictureUri = (pictureUri: string) => {
		if (userDataContext.profilePictureUrl && pictureUri !== userDataContext.profilePictureUrl[0]) {
			addNewUnsavedFieldToEditContext({ profilePictureUrl: pictureUri })
		}
		setProfilePictureUrl(pictureUri)
	}

	const saveUserPicture = async () => {
		const areEquals = userDataContext.profilePictureUrl && (userDataContext.profilePictureUrl[0] === profilePictureUrl)
		if (!areEquals) {
			addNewUnsavedFieldToEditContext({ profilePictureUrl })
		}
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
				relativeHeight={'60%'}
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
					deleteCurrentPicture={() => {
						setPictureUri('')
						addNewUnsavedFieldToEditContext({ profilePictureUrl: '' })
					}}

				/>
				<InstructionCardContainer>
				</InstructionCardContainer>
			</DefaultHeaderContainer>
			<FormContainer >
				<PrimaryButton
					color={theme.white3}
					label={'tirar outra?'}
					fontSize={22}
					labelColor={theme.black4}
					highlightedWords={['tirar', 'outra']}
					SecondSvgIcon={ImagePlusIcon}
					svgIconScale={['35%', '20%']}
					onPress={openCamera}
				/>
				<PrimaryButton
					color={theme.yellow3}
					label={'cancelar'}
					fontSize={18}
					labelColor={theme.black4}
					SecondSvgIcon={X}
					svgIconScale={['32%', '20%']}
					onPress={() => {
						clearUnsavedEditFieldContext('profilePictureUrl')
						setPictureUri(userDataContext.profilePictureUrl ? userDataContext.profilePictureUrl[0] : '')
						navigation.goBack()
					}}
				/>
				<PrimaryButton
					color={theme.green3}
					label={'confirmar'}
					fontSize={18}
					labelColor={theme.white3}
					SecondSvgIcon={Check}
					svgIconScale={['32%', '20%']}
					onPress={saveUserPicture}
				/>
			</FormContainer>
		</Container>
	)
}

export { EditUserPicture }
