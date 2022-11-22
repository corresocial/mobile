import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { ButtonsContainer, Container } from './styles'
import { theme } from '../../../common/theme'

import { SelectWorkplaceScreenProps } from '../../../routes/Stack/vacancyStack/stackScreenProps'
import {  WorkplaceType } from './../../../services/Firebase/types'

import { VacancyContext } from '../../../contexts/VacancyContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { BackButton } from '../../../components/_buttons/BackButton'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { ProgressBar } from '../../../components/ProgressBar'

function SelectWorkplace({ navigation }: SelectWorkplaceScreenProps) {

    const {setVacancyDataOnContext} = useContext(VacancyContext)
    
    const saveWorkplaceType = (workplace: WorkplaceType) => {
        setVacancyDataOnContext({workplace})
        if(workplace === 'homeoffice'){
            navigation.navigate('SelectVacancyCategory')
        }else{
            navigation.navigate('InsertWorkplaceLocation', {workplace})
        }
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
                    message={'qual é o local de trabalho?'}
                    highlightedWords={['local,', 'de', 'trabalho?']}
                >
                    <ProgressBar
                        range={5}
                        value={3}
                    />
                </InstructionCard>
            </DefaultHeaderContainer>
            <FormContainer
                backgroundColor={theme.yellow2}
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
                        label={'vaga presencial'}
                        highlightedWords={[`presencial`]}
                        onPress={() => saveWorkplaceType('presential')}
                    />
                    <PrimaryButton
                        justifyContent={'flex-start'}
                        color={theme.white3}
                        relativeHeight={'18%'}
                        labelColor={theme.black4}
                        labelMarginLeft={'5%'}
                        fontSize={18 }
                        textAlign={'left'}
                        label={'vaga homeoffice'}
                        highlightedWords={[`homeoffice`]}
                        onPress={() => saveWorkplaceType('homeoffice')}
                    />
                    <PrimaryButton
                        justifyContent={'flex-start'}
                        color={theme.white3}
                        relativeHeight={'18%'}
                        labelColor={theme.black4}
                        labelMarginLeft={'5%'}
                        fontSize={18}
                        textAlign={'left'}
                        label={'vaga híbrida'}
                        highlightedWords={[`híbrida`]}
                        onPress={() => saveWorkplaceType('hybrid')}
                    />
                </ButtonsContainer>
            </FormContainer>
        </Container>
    )
}

export { SelectWorkplace }