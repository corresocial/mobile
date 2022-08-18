import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import { Camera, CameraType, FlashMode } from 'expo-camera'
import { Entypo, FontAwesome5, Ionicons } from '@expo/vector-icons';

import { CameraContainer, CameraControlsContainer, CameraTypeButton, Container, FlashButton, FlashButtonContainer, Footer, GaleryButton, TakePictureButton } from './styles';
import { theme } from '../../common/theme';

function CustomCamera() {
    const [pictureUri, setPictureUri] = useState<string>('')
    const [cameraType, setCameraType] = useState(CameraType.back)
    const [flashMode, setFlashMode] = useState(FlashMode.off)
    const [hasPermission, setHasPermission] = useState(false)
    const cameraRef = useRef<any>() // TODO Type

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync()
            setHasPermission(status === 'granted')
        })
    }, [])

    const toggleFlashMode = () => {
        console.log(flashMode == FlashMode.on ? FlashMode.off : FlashMode.on)
        setFlashMode(flashMode == FlashMode.on ? FlashMode.off : FlashMode.on)
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
        if (cameraRef) {
            const data = await cameraRef.current.takePictureAsync()
            console.log(data)
            setPictureUri(data)
        }
    }

    const toggleCameraType = () => {
        setCameraType(cameraType == CameraType.back ? CameraType.front : CameraType.back)
    }

    const goToImageImagePreview = () => {
        Alert.alert('Going To image Preview!')
    }

    if (pictureUri) {
        goToImageImagePreview()
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
                >
                </Camera>
            </CameraContainer>
            <FlashButtonContainer>
                <FlashButton onPress={toggleFlashMode}>
                    <Ionicons name='md-flash-sharp' size={25} color={flashMode == FlashMode.on ? theme.orange3 : theme.black4} />
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



        </Container >
    );
}

export { CustomCamera }