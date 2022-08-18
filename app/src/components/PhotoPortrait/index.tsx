import React from 'react';
import { Image, SafeAreaView } from 'react-native';
import { screenHeight } from '../../common/screenDimensions';
import { Container } from './styles';

interface PhotoPortraitProps {
    pictureUri: string
}

function PhotoPortrait({pictureUri}: PhotoPortraitProps) {

    return (
        <Container>
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