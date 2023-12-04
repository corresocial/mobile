import { Camera, CameraType, FlashMode } from 'expo-camera'
import * as ImageManipulator from 'expo-image-manipulator'
import * as ImagePicker from 'expo-image-picker'
import React, { useEffect, useState, useRef } from 'react'
import { ActivityIndicator, Modal, StatusBar, View } from 'react-native'

import {
	CameraContainer,
	CameraControlsContainer,
	Container,
	FlashButtonContainer,
	Footer,
	NotPermissionContainer,
	NotPermissionText,
	Body,
	ContainerIcon,

} from './styles'
import AddPictureOutlined from '@assets/icons/addPicture-outlined.svg'
import CameraFlashOutlined from '@assets/icons/cameraFlash-outlined.svg'
import CameraFlashOnOutlined from '@assets/icons/cameraFlashOn-outlined.svg'
import CameraToggleOutlined from '@assets/icons/cameraToggle-outlined.svg'
import XButtonOutlined from '@assets/icons/xButton-outlined.svg'
import { theme } from '@common/theme'

import { PrimaryButton } from '../../_buttons/PrimaryButton'
import { TakePictureCameraButton } from '../../_buttons/TakePictureCameraButton'

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
	const [isLoading, setIsLoading] = useState(true)
	const [cameraType, setCameraType] = useState(CameraType.back)
	const [flashMode, setFlashMode] = useState(FlashMode.off)
	const [cameraHasPermission, setCameraHasPermission] = useState(false)
	const [mediaLibrayHasPermission, setMediaLibraryHasPermission] = useState(false)
	const cameraRef = useRef<Camera>(null)

	useEffect(() => {
		getMediaLibraryPermissions()
		Camera.requestCameraPermissionsAsync()
			.then(({ status }: any) => {
				setCameraHasPermission(status === 'granted')
				setIsLoading(false)
			})
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
		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
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
			await getMediaLibraryPermissions()
			return
		}

		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1]
		})

		if (!result.canceled) {
			const imageUri = result.assets[0].uri

			const { uri: compressedUri } = await ImageManipulator.manipulateAsync(
				imageUri,
				[{ resize: { height: 1080, width: 1080 } }],
				{ compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
			)

			setPictureUri(compressedUri)
			onClose()
		}
	}

	const takePicture = async () => {
		if (cameraRef.current !== null) {
			const { uri: imageUri } = await cameraRef.current.takePictureAsync()

			const { uri: compressedUri } = await ImageManipulator.manipulateAsync(
				imageUri,
				[{ resize: { height: 1080, width: 1080 } }],
				{ compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
			)

			setPictureUri(compressedUri)
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
					{
						isLoading
							? <ActivityIndicator size={'large'} color={theme.white3} />
							: (
								<>
									<NotPermissionText>
										{'Você não permitiu o uso da câmera ou galeria, você precisa ir em configurações "corre." e permitir.'}
									</NotPermissionText>
									<PrimaryButton
										label={'voltar'}
										color={theme.white3}
										labelColor={theme.black4}
										onPress={onClose}
									/>
								</>
							)
					}
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
							<ContainerIcon onPress={toggleFlashMode}>
								{
									flashMode === FlashMode.torch
										? <CameraFlashOnOutlined height={'100%'} width={'100%'} />
										: <CameraFlashOutlined height={'100%'} width={'100%'} />
								}

							</ContainerIcon>
						</FlashButtonContainer>
						<Body>
							<CameraControlsContainer>
								<ContainerIcon
									opacity={mediaLibrayHasPermission ? 1 : 0.4}
									onPress={openGalery}
								>
									<AddPictureOutlined height={'100%'} width={'100%'} />
								</ContainerIcon>

								<TakePictureCameraButton onPress={takePicture} />

								<ContainerIcon onPress={toggleCameraType}>
									<CameraToggleOutlined height={'100%'} width={'100%'} />
								</ContainerIcon>
							</CameraControlsContainer>
						</Body>
						<Footer>
							<ContainerIcon onPress={onClose}>
								<XButtonOutlined height={'100%'} width={'100%'} />
							</ContainerIcon>
						</Footer>
					</View>
				</Container >
			)}
		</Modal >
	)
}

export { CustomCameraModal }
