import React, { useEffect, useState, useRef } from 'react';
import { View, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import { Camera, CameraType, FlashMode, getCameraPermissionsAsync } from 'expo-camera'
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

import {
    CameraContainer,
    CameraControlsContainer,
    CameraTypeButton, Container,
    FlashButton,
    FlashButtonContainer,
    Footer, GaleryButton,
    TakePictureButton
} from './styles';
import { theme } from '../../common/theme';

import { CustomCameraScreenProps } from '../../routes/Stack/screenProps';

function CustomCamera({ navigation, route }: CustomCameraScreenProps) {
    const [cameraReady, setCameraReady] = useState(false)
    const [pictureUri, setPictureUri] = useState<string>('')
    const [cameraType, setCameraType] = useState(CameraType.back)
    const [flashMode, setFlashMode] = useState(FlashMode.off)
    const [hasPermission, setHasPermission] = useState(false)
    const cameraRef = useRef<Camera>(null)

    useEffect(() => {
        (async () => {
            await getCameraPermissions()
        })
    })

    const getCameraPermissions = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync()
        setHasPermission(status === 'granted')
    }

    const toggleFlashMode = () => {
        console.log(flashMode == FlashMode.torch ? FlashMode.off : FlashMode.torch)
        setFlashMode(flashMode == FlashMode.torch ? FlashMode.off : FlashMode.torch)
    }

    const toggleCameraType = () => {
        setCameraType(cameraType == CameraType.back ? CameraType.front : CameraType.back)
    }

    const openGalery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setPictureUri(result.uri);
        }
    }

    const takePicture = async () => {
        if (cameraRef.current !== null) {
            const data = await cameraRef.current.takePictureAsync()
            console.log(data)
            setPictureUri(data.uri)
        }
    }

    const navigateToProfilePicturePreview = () => {
        const userData = {
            ...route.params,
            profilePictureUri: pictureUri
        }

        navigation.navigate('ProfilePicturePreview', userData)
    }

    if (pictureUri) {
        setPictureUri('')
        navigateToProfilePicturePreview()
    }

    if (hasPermission) {
        return (<View><Text>You do not have permissions!</Text></View>)
    }

    return (
        <Container>
            <CameraContainer>
                <Camera
                    ref={cameraRef}
                    style={{ flex: 1 }}
                    type={cameraType}
                    flashMode={flashMode}
                    ratio={'1:1'}
                    onCameraReady={() => setCameraReady(true)}
                />
            </CameraContainer>
            {
                cameraReady
                    ? <>
                        <FlashButtonContainer>
                            <FlashButton onPress={toggleFlashMode}>
                                <Ionicons name='md-flash-sharp' size={25} color={flashMode == FlashMode.torch ? theme.orange3 : theme.black4} />
                            </FlashButton>
                        </FlashButtonContainer>
                        <Footer>
                            <CameraControlsContainer>
                                <GaleryButton onPress={openGalery} >
                                    <FontAwesome5 name='images' size={25} color={theme.black4} />
                                </GaleryButton>

                                <TakePictureButton onPress={takePicture}>
                                </TakePictureButton>

                                <CameraTypeButton onPress={toggleCameraType} >
                                    {/* <Entypo name='camera' size={27} color={theme.black4} /> */}
                                    <Ionicons name='camera-reverse' size={27} color={theme.black4} />
                                </CameraTypeButton>
                            </CameraControlsContainer>
                        </Footer>
                    </>
                    : <></>
            }
        </Container >
    );
}

export { CustomCamera }