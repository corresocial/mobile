import React from 'react';
import { Image, SafeAreaView } from 'react-native';

import { Container, DeleteItemArea } from './styles';
import TrashIcon from './../../assets/icons/trash.svg'
import { RFValue } from 'react-native-responsive-fontsize';

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
    borderWidth = 5,
    borderRightWidth = 10,
    pictureUri,
    deleteCurrentPicture
}: PhotoPortraitProps) {

    return (
        <Container
            style={{
                height: height,
                width: width,
                borderWidth: RFValue(borderWidth),
                borderRightWidth: RFValue(borderRightWidth),
            }}
        >
            <Image source={{ uri: pictureUri ? pictureUri : 'https://triunfo.pe.gov.br/pm_tr430/wp-content/uploads/2018/03/sem-foto.jpg' }}
                width={0}
                height={0}
                style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'contain',
                    borderRadius: RFValue(7),
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