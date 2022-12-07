import React, { useEffect, useState, useRef } from 'react'
import { Modal, PermissionsAndroid, StatusBar } from 'react-native'
import { Camera, CameraType, FlashMode } from 'expo-camera'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'

import {
	CameraContainer,
	CameraControlsContainer,
	CameraTypeButton, Container,
	FlashButton,
	FlashButtonContainer,
	Footer, GaleryButton,
	NotPermissionContainer,
	NotPermissionText,
	TakePictureButton
} from './styles'
import { theme } from '../../../common/theme'

interface CustomCameraModalProps {
	cameraOpened: boolean
	onClose: () => void
	setPictureUri: (uri: string) => void
}

function CustomCameraModal({ cameraOpened, onClose, setPictureUri }: CustomCameraModalProps) {
	const [cameraReady, setCameraReady] = useState(false)
	const [cameraType, setCameraType] = useState(CameraType.back)
	const [flashMode, setFlashMode] = useState(FlashMode.off)
	const [hasPermission, setHasPermission] = useState(true)
	const cameraRef = useRef<Camera>(null)

	useEffect(() => {
		setTimeout(() => {
			requestCameraPermission()
		}, 500)
	}, [])

	const requestCameraPermission = async () => {
		const granted = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.CAMERA
		)
		if (granted === PermissionsAndroid.RESULTS.GRANTED) {
			setHasPermission(true)
		} else {
			setHasPermission(false)
			console.log('Não foi possível conceder permissão para acessar a câmera')
		}
	}

	const toggleFlashMode = () => {
		console.log(flashMode === FlashMode.torch ? FlashMode.off : FlashMode.torch)
		setFlashMode(flashMode === FlashMode.torch ? FlashMode.off : FlashMode.torch)
	}

	const toggleCameraType = () => {
		setCameraType(cameraType === CameraType.back ? CameraType.front : CameraType.back)
	}

	const openGalery = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		})

		if (!result.cancelled) {
			setPictureUri(result.uri)
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
		<Modal
			visible={cameraOpened}
			onRequestClose={onClose}
		>
			<StatusBar backgroundColor={theme.black4} barStyle={'dark-content'} />
			{
				!hasPermission
					? (
						<NotPermissionContainer
							onPress={requestCameraPermission}
							activeOpacity={0.9}
						>
							<NotPermissionText>{'Você NÃO TEM PERMISSÃO!'}</NotPermissionText>
							<NotPermissionText>{'Deve conceder PERMISSÂO para utilizar a CÂMERA!'}</NotPermissionText>
						</NotPermissionContainer>
					)
					: (
						<Container>
							<CameraContainer>
								<Camera
									ref={cameraRef}
									style={{
										flex: 1
									}}
									type={cameraType}
									flashMode={flashMode}
									ratio={'1:1'}
									onCameraReady={() => setCameraReady(true)}
								/>
							</CameraContainer>
							{
								cameraReady
									? (
										<>
											<FlashButtonContainer>
												<FlashButton onPress={toggleFlashMode}>
													<Ionicons name={'md-flash-sharp'} size={25} color={flashMode === FlashMode.torch ? theme.orange3 : theme.black4} />
												</FlashButton>
											</FlashButtonContainer>
											<Footer>
												<CameraControlsContainer>
													<GaleryButton onPress={openGalery} >
														<FontAwesome5 name={'images'} size={25} color={theme.black4} />
													</GaleryButton>

													<TakePictureButton onPress={takePicture}>
													</TakePictureButton>

													<CameraTypeButton onPress={toggleCameraType} >
														{/* <Entypo name='camera' size={27} color={theme.black4} /> */}
														<Ionicons name={'camera-reverse'} size={27} color={theme.black4} />
													</CameraTypeButton>
												</CameraControlsContainer>
											</Footer>
										</>
									)
									: null
							}
						</Container >
					)
			}

		</Modal>
	)
}

export { CustomCameraModal }
