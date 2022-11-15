import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { ButtonsContainer, Container } from './styles'
import { theme } from '../../../common/theme'

import { SelectExhibitionPlaceScreenProps } from '../../../routes/Stack/cultureStack/stackScreenProps'
import { ExhibitionPlaceType } from './../../../services/Firebase/types'
import { CultureContext } from '../../../contexts/CultureContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { BackButton } from '../../../components/_buttons/BackButton'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { ProgressBar } from '../../../components/ProgressBar'

function SelectExhibitionPlace({ navigation }: SelectExhibitionPlaceScreenProps) {

    const { setCultureDataOnContext } = useContext(CultureContext)

    const saveExhibitionPlace = (exhibitionPlace: ExhibitionPlaceType) => {
        setCultureDataOnContext({ exhibitionPlace })
        // navigation.navigate('SelectWorkWeekdays')
    }

    return (
        <Container>
            <StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
            <DefaultHeaderContainer
                relativeHeight={'28%'}
                centralized
                backgroundColor={theme.white3}
            >
                <BackButton onPress={() => navigation.goBack()} />
                <InstructionCard
                    borderLeftWidth={3}
                    fontSize={18}
                    message={'Onde você expõe sua arte?'}
                    highlightedWords={['expõe']}
                >
                    <ProgressBar
                        range={3}
                        value={3}
                    />
                </InstructionCard>
            </DefaultHeaderContainer>
            <FormContainer
                backgroundColor={theme.blue2}
            >
                <ButtonsContainer>
                    <PrimaryButton
                        justifyContent={'flex-start'}
                        color={theme.white3}
                        relativeHeight={'18%'}
                        labelColor={theme.black4}
                        labelMarginLeft={'5%'}
                        fontSize={18}
                        textAlign={'left'}
                        label={'só perto de mim'}
                        highlightedWords={[`perto`]}
                        onPress={() => saveExhibitionPlace('near')}
                    />
                    <PrimaryButton
                        justifyContent={'flex-start'}
                        color={theme.white3}
                        relativeHeight={'18%'}
                        labelColor={theme.black4}
                        labelMarginLeft={'5%'}
                        fontSize={18}
                        textAlign={'left'}
                        label={'na minha cidade'}
                        highlightedWords={[`cidade`]}
                        onPress={() => saveExhibitionPlace('city')}
                    />
                    <PrimaryButton
                        justifyContent={'flex-start'}
                        color={theme.white3}
                        relativeHeight={'18%'}
                        labelColor={theme.black4}
                        labelMarginLeft={'5%'}
                        fontSize={18}
                        textAlign={'left'}
                        label={'no país inteiro'}
                        highlightedWords={[`país`]}
                        onPress={() => saveExhibitionPlace('country')}
                    />
                </ButtonsContainer>
            </FormContainer>
        </Container>
    )
}

export { SelectExhibitionPlace }