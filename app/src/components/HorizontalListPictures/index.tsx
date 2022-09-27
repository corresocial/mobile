import React from 'react'

import {
    AddNewPicturesButton,
    Container,
    PictureItemButtom,
    ScrollView,
    PicturePortrait,
    Picture,
} from './styles'
import AddPictureIcon from './../../assets/icons/addPicture.svg'
import { Image } from 'react-native'
import { screenWidth } from '../../common/screenDimensions'

interface HorizontalListPicturesProps {
    picturesUri: string[]
    pictureUriSelected: number
    onSelectPicture: (index: number) => void
    openCamera: () => void
}

function HorizontalListPictures({ picturesUri, pictureUriSelected, onSelectPicture, openCamera }: HorizontalListPicturesProps) {

    const renderPictures = () => {
        console.log(pictureUriSelected)

        return picturesUri.map((pictureUri, index) => {
            return (
                <PictureItemButtom
                    onPress={() => onSelectPicture(index)}
                >
                    <PicturePortrait
                        style={{
                            opacity: pictureUriSelected == index ? 1 : 0.5,
                            borderWidth: pictureUriSelected == index ? 3 : 2,
                            borderRightWidth: pictureUriSelected == index ? 4 : 3
                        }}>
                        <Picture
                            style={{
                                resizeMode: 'contain'
                            }}
                            source={{ uri: pictureUri }}
                            width={screenWidth * 0.16} height={screenWidth * 0.16}
                        />
                    </PicturePortrait>
                </PictureItemButtom>
            )
        })
    }

    return (
        <ScrollView horizontal>
            <Container >
                <AddNewPicturesButton onPress={openCamera}>
                    <AddPictureIcon width={'50%'} height={'50%'} />
                </AddNewPicturesButton>
                {renderPictures()}
            </Container>
        </ScrollView>
    )
}

export { HorizontalListPictures }