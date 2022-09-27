import React from 'react';
import { Image, SafeAreaView } from 'react-native';

import { Container, DeleteItemArea } from './styles';
import TrashIcon from './../../assets/icons/trash.svg'

interface PhotoPortraitProps {
    width: number
    height: number
    borderWidth?: number
    borderRightWidth?: number
    pictureUri: string
    deleteCurrentPicture?: () => void
}

function PhotoPortrait({
    width,
    height,
    borderWidth,
    borderRightWidth,
    pictureUri,
    deleteCurrentPicture
}: PhotoPortraitProps) {

    return (
        <Container
            style={{
                height: height,
                width: width,
                borderWidth: borderWidth || 5,
                borderRightWidth: borderRightWidth || 10
            }}
        >
            <Image source={{ uri: pictureUri ? pictureUri : 'https://triunfo.pe.gov.br/pm_tr430/wp-content/uploads/2018/03/sem-foto.jpg' }}
                width={0}
                height={0}
                style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'contain',
                    borderRadius: 10,
                }}
            />
            {
                deleteCurrentPicture && pictureUri
                    ? <DeleteItemArea onPress={deleteCurrentPicture}>
                        <TrashIcon width={'100%'} height={'100%'} />
                    </DeleteItemArea>
                    : <></>
            }
        </Container>
    );
}

export { PhotoPortrait }