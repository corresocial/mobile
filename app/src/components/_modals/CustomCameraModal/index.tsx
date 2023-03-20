import React, { useEffect, useState, useRef } from 'react'
import { Modal, StatusBar, View } from 'react-native'
import { Camera, CameraType, FlashMode } from 'expo-camera'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'

import {
	CameraContainer,
	CameraControlsContainer,
	CameraTypeButton,
	Container,
	FlashButton,
	FlashButtonContainer,
	Footer,
	GaleryButton,
	NotPermissionContainer,
	NotPermissionText,
	TakePictureButton,
	Body,
} from './styles'
import { theme } from '../../../common/theme'
import XIcon from '../../../assets/icons/xWithoutShadow.svg'
import { PrimaryButton } from '../../_buttons/PrimaryButton'

interface CustomCameraModalProps {
	cameraOpened: boolean;
	onClose: () => void;
	setPictureUri: (uri: string) => void;
}

function CustomCameraModal({
	cameraOpened,
	onClose,
	setPictureUri,
}: CustomCameraModalProps) {
	const [cameraType, setCameraType] = useState(CameraType.back)
	const [flashMode, setFlashMode] = useState(FlashMode.off)
	const [cameraHasPermission, setCameraHasPermission] = useState(false)
	const [mediaLibrayHasPermission, setMediaLibraryHasPermission] = useState(false)
	const cameraRef = useRef<Camera>(null)

	useEffect(() => {
		getMediaLibraryPermissions()
		Camera.requestCameraPermissionsAsync()
			.then(({ status }: any) => setCameraHasPermission(status === 'granted'))
			.catch((err) => {
				setCameraHasPermission(false)
				console.log(err)
			})
	}, [])

	const getCameraPermissions = async () => {
		const { status } = await Camera.requestCameraPermissionsAsync()
		setCameraHasPermission(status === 'granted')
	}

	const getMediaLibraryPermissions = async () => {
		const { status } =			await ImagePicker.requestMediaLibraryPermissionsAsync()
		setMediaLibraryHasPermission(status === 'granted')
	}

	const toggleFlashMode = () => {
		setFlashMode(
			flashMode === FlashMode.torch ? FlashMode.off : FlashMode.torch
		)
	}

	const toggleCameraType = () => {
		setCameraType(
			cameraType === CameraType.back ? CameraType.front : CameraType.back
		)
	}

	const openGalery = async () => {
		if (!mediaLibrayHasPermission) {
			return
		}

		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 0,
		})

		if (!result.canceled) {
			setPictureUri(result.assets[0].uri)
			onClose()
		}
	}

	const takePicture = async () => {
		if (cameraRef.current !== null) {
			const data = await cameraRef.current.takePictureAsync()
			setPictureUri(data.uri)
			onClose()
		}
	}

	return (
		<Modal visible={cameraOpened} onRequestClose={onClose}>
			<StatusBar
				backgroundColor={theme.black4}
				barStyle={'dark-content'}
			/>
			{!cameraHasPermission && !mediaLibrayHasPermission ? (
				<NotPermissionContainer
					onPress={() => {
						getCameraPermissions()
						getMediaLibraryPermissions()
					}}
					activeOpacity={0.9}
				>
					<NotPermissionText>
						{'Você não permitiu o uso da câmera ou galeria, você precisa ir em configurações "corre." e permitir.'}
					</NotPermissionText>
					<PrimaryButton
						label={'voltar'}
						color={theme.white3}
						labelColor={theme.black4}
						onPress={onClose}
					/>
				</NotPermissionContainer>
			) : (
				<Container>
					<CameraContainer>
						<Camera
							ref={cameraRef}
							style={{ flex: 1 }}
							type={cameraType}
							flashMode={flashMode}
							ratio={'1:1'}
							onMountError={(err) => console.log(err)}
						/>
					</CameraContainer>
					<View style={{ width: '100%' }}>
						<FlashButtonContainer>
							<FlashButton onPress={toggleFlashMode}>
								<Ionicons
									name={'md-flash-sharp'}
									size={25}
									color={
										flashMode === FlashMode.torch
											? theme.orange3
											: theme.black4
									}
								/>
							</FlashButton>
						</FlashButtonContainer>
						<Body>
							<CameraControlsContainer>
								<GaleryButton
									onPress={openGalery}
									style={{
										opacity: mediaLibrayHasPermission
											? 1
											: 0.4,
									}}
								>
									<FontAwesome5
										name={'images'}
										size={25}
										color={theme.black4}
									/>
								</GaleryButton>

								<TakePictureButton
									onPress={takePicture}
								>
								</TakePictureButton>

								<CameraTypeButton onPress={toggleCameraType}>
									<Ionicons
										name={'camera-reverse'}
										size={27}
										color={theme.black4}
									/>
								</CameraTypeButton>
							</CameraControlsContainer>
						</Body>
						<Footer>
							<FlashButton onPress={onClose}>
								<XIcon width={'40%'} height={'40%'} />
							</FlashButton>
						</Footer>
					</View>
				</Container>
			)}
		</Modal>
	)
}

export { CustomCameraModal }
