import React from 'react';
import { Image, SafeAreaView } from 'react-native';
import { screenHeight } from '../../common/screenDimensions';
import { Container } from './styles';

interface PhotoPortraitProps {
    width: number
    height: number
    borderWidth?: number
    borderRightWidth?: number
    pictureUri: string
}

function PhotoPortrait({
    width,
    height,
    borderWidth,
    borderRightWidth,
    pictureUri
}: PhotoPortraitProps) {

    return (
        <Container
            style={{
                height: height,
                width: width,
                borderWidth: borderWidth || 5,
                borderRightWidth: borderRightWidth || 10
            } }
        >
            <Image source={{ uri: pictureUri ? pictureUri : 'https://media.istockphoto.com/vectors/profile-placeholder-image-gray-silhouette-no-photo-vector-id1016744034?k=20&m=1016744034&s=170667a&w=0&h=JlerB4H3IeLolDMQOYiAF9uLuZeW0bs4jH6NdrNPDtE=' }}
                width={0}
                height={0}
                style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'contain',
                    borderRadius: 10,
                }}
            />
        </Container>
    );
}

export { PhotoPortrait }