import React from 'react'

import { Container } from './styles'

import AngleLeft from './../../assets/icons/angleLeft.svg'

interface BackButtonProps{
    onPress: () => void
}

function BackButton({onPress} : BackButtonProps){
    return (
        <Container onPress={onPress}>
            <AngleLeft height={'100%'} width={'100%'}/>
        </Container>
    )

}

export {BackButton}