import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { Container, ButtonsContainer } from './styles'
import { theme } from '../../../common/theme'

import { SelectEventRepeatScreenProps } from '../../../routes/Stack/cultureStack/stackScreenProps'
import { EventRepeatType } from './../../../services/Firebase/types'
import { CultureContext } from '../../../contexts/CultureContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { BackButton } from '../../../components/_buttons/BackButton'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { ProgressBar } from '../../../components/ProgressBar'

function SelectEventRepeat({ navigation }: SelectEventRepeatScreenProps) {

    const {setCultureDataOnContext} = useContext(CultureContext)
    
    const saveEventRepeat = (eventRepeat: EventRepeatType) => {
        setCultureDataOnContext({eventRepeat})
        navigation.navigate('HomeTab' as any, { tourCompleted: true, showShareModal: true })
    }

    return (
        <Container>
              <StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
            <DefaultHeaderContainer
                relativeHeight={'27%'}
                centralized
                backgroundColor={theme.white3}
            >
                <BackButton onPress={() => navigation.goBack()} />
                <InstructionCard
                    borderLeftWidth={3}
                    fontSize={18}
                    message={'esse role se repete?'}
                    highlightedWords={['repete?']}
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
                        fontSize={18}
                        textAlign={'left'}
                        label={'uma vez por semana'}
                        highlightedWords={['uma', 'vez', 'por', 'semana']}
                        onPress={() => saveEventRepeat('weekly')}
                    />
                    <PrimaryButton
                        justifyContent={'flex-start'}
                        color={theme.white3}
                        relativeHeight={'18%'}
                        labelColor={theme.black4}
                        fontSize={18}
                        textAlign={'left'}
                        label={'a cada 15 dias'}
                        highlightedWords={['a', 'cada', '15', 'dias']}
                        onPress={() => saveEventRepeat('biweekly')}
                    />
                    <PrimaryButton
                        justifyContent={'flex-start'}
                        color={theme.white3}
                        relativeHeight={'18%'}
                        labelColor={theme.black4}
                        fontSize={18}
                        textAlign={'left'}
                        label={'uma vez no mês'}
                        highlightedWords={['uma', 'vez', 'no', 'mês']}
                        onPress={() => saveEventRepeat('monthly')}
                    />
                    <PrimaryButton
                        justifyContent={'center'}
                        color={theme.yellow3}
                        relativeHeight={'18%'}
                        labelColor={theme.black4}
                        fontSize={18}
                        textAlign={'left'}
                        label={'não se repete'}
                        onPress={() => saveEventRepeat('unrepeatable')}
                    />
                </ButtonsContainer>
            </FormContainer>
        </Container>
    )
}

export { SelectEventRepeat }