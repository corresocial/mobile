import { Camera, CameraView, CameraType, FlashMode } from 'expo-camera'
import * as Device from 'expo-device'
import * as ImagePicker from 'expo-image-picker'
import React, { useEffect, useState, useRef } from 'react'
import { ActivityIndicator, Modal, StatusBar, View } from 'react-native'

import { UiUtils } from '@utils-ui/common/UiUtils'

import {
	CameraContainer,
	CameraControlsContainer,
	Container,
	Footer,
	NotPermissionContainer,
	NotPermissionText,
	Body,
	ContainerIcon,

} from './styles'
import CameraFlashOutlined from '@assets/icons/cameraFlash-outlined.svg'
import CameraFlashOnOutlined from '@assets/icons/cameraFlashOn-outlined.svg'
import CameraToggleOutlined from '@assets/icons/cameraToggle-outlined.svg'
import XButtonOutlined from '@assets/icons/xButton-outlined.svg'
import { theme } from '@common/theme'

import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { TakePictureCameraButton } from '@components/_buttons/TakePictureCameraButton'

const { compressImage } = UiUtils()

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
	const [isCameraReady, setIsCameraReady] = useState(false)
	const [cameraFacing, setCameraFacing] = useState<CameraType>('back')
	const [flashMode, setFlashMode] = useState<FlashMode>('off')
	const [cameraHasPermission, setCameraHasPermission] = useState(false)
	const [mediaLibrayHasPermission, setMediaLibraryHasPermission] = useState(false)
	const cameraRef = useRef<CameraView>(null)

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
		setFlashMode(flashMode === 'off' ? 'on' : 'off')
	}

	const toggleCameraType = () => {
		setCameraFacing(
			cameraFacing === 'back' ? 'front' : 'back'
		)
	}

	const takePicture = async () => {
		if (cameraRef && cameraRef.current !== null && (isCameraReady || !Device.isDevice)) {
			const asset = await cameraRef.current.takePictureAsync()

			if (!asset) return
			const compressedUri = await compressImage(asset?.uri)

			setPictureUri(compressedUri)
			onClose()
		}
	}

	return (
		<Modal visible={cameraOpened} onRequestClose={onClose}>
			<StatusBar
				backgroundColor={theme.colors.black[4]}
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
							? <ActivityIndicator size={'large'} color={theme.colors.white[3]} />
							: (
								<>
									<NotPermissionText>
										{'Você não permitiu o uso da câmera ou galeria, você precisa ir em configurações "corre." e permitir.'}
									</NotPermissionText>
									<PrimaryButton
										label={'voltar'}
										color={theme.colors.white[3]}
										labelColor={theme.colors.black[4]}
										onPress={onClose}
									/>
								</>
							)
					}
				</NotPermissionContainer>
			) : (
				<Container>
					<CameraContainer>
						<CameraView
							ref={cameraRef}
							style={{ flex: 1 }}
							facing={cameraFacing}
							flash={flashMode}
							ratio={'1:1'}
							onCameraReady={() => setIsCameraReady(true)}
							onMountError={(err) => console.log(err)}
						/>
					</CameraContainer>
					<View style={{ width: '100%' }}>
						<Body>
							<CameraControlsContainer>
								<ContainerIcon onPress={toggleFlashMode}>
									{
										flashMode === 'on'
											? <CameraFlashOnOutlined height={'100%'} width={'100%'} />
											: <CameraFlashOutlined height={'100%'} width={'100%'} />
									}

								</ContainerIcon>
								<TakePictureCameraButton onPress={takePicture} />

								<ContainerIcon onPress={toggleCameraType}>
									<CameraToggleOutlined height={'100%'} width={'100%'} />
								</ContainerIcon>
							</CameraControlsContainer>
						</Body>
						<Footer>
							<ContainerIcon onPress={onClose} >
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
