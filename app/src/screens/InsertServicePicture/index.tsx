import React from 'react'

import { ButtonsContainer, Container } from './styles'
import { screenHeight, statusBarHeight } from '../../common/screenDimensions'
import { theme } from '../../common/theme'
import Uncheck from './../../assets/icons/uncheck.svg'
import Check from './../../assets/icons/check.svg'

import { BackButton } from '../../components/BackButton'
import { DefaultHeaderContainer } from '../../components/DefaultHeaderContainer'
import { FormContainer } from '../../components/FormContainer'
import { InstructionCard } from '../../components/InstructionCard'
import { PrimaryButton } from '../../components/PrimaryButton'
import { ProgressBar } from '../../components/ProgressBar'

import { InsertServicePictureScreenProps } from '../../routes/Stack/stackScreenProps'


function InsertServicePicture({ navigation }: InsertServicePictureScreenProps) {
    
    return (
        <Container>
            <DefaultHeaderContainer
                minHeight={(screenHeight + statusBarHeight) * 0.26}
                relativeHeight={'22%'}
                centralized
                backgroundColor={theme.purple2}
            >
                <BackButton onPress={() => navigation.goBack()} />
                <InstructionCard
                    borderLeftWidth={3}
                    fontSize={18}
                    message={'que tal adicionar algumas fotos para atrair clientes?'}
                    highlightedWords={['adicionar', 'algumas', 'fotos']}
                >
                    <ProgressBar
                        range={4}
                        value={2}
                    />
                </InstructionCard>
            </DefaultHeaderContainer>
            <FormContainer
                backgroundColor={theme.white3}
            >
                <ButtonsContainer>
                    <PrimaryButton
                        flexDirection={'row-reverse'}
                        color={theme.red3}
                        relativeHeight={'30%'}
                        labelColor={theme.white3}
                        label={'não precisa, valew'}
                        highlightedWords={['não', 'precisa,']}
                        SvgIcon={Uncheck}
                        svgIconScale={['22%', '18%']}
                        onPress={() => navigation.navigate('SelectServiceCategory')}
                    />
                    <PrimaryButton
                        flexDirection={'row-reverse'}
                        color={theme.green3}
                        relativeHeight={'30%'}
                        labelColor={theme.white3}
                        label={'opa, vou adicionar'}
                        highlightedWords={['vou', 'adicionar']}
                        SvgIcon={Check}
                        svgIconScale={['22%', '18%']}
                        onPress={() => navigation.navigate('ServicePicturePreview')}
                    />
                </ButtonsContainer>
            </FormContainer>
        </Container>
    )
}

export { InsertServicePicture }