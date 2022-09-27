import React from 'react'

import { Container } from './styles'

import { SelectServiceCategoryScreenProps } from '../../routes/Stack/stackScreenProps'

import { BackButton } from '../../components/BackButton'
import { DefaultHeaderContainer } from '../../components/DefaultHeaderContainer'
import { FormContainer } from '../../components/FormContainer'
import { InstructionCard } from '../../components/InstructionCard'
import { theme } from '../../common/theme'
import { screenHeight, statusBarHeight } from '../../common/screenDimensions'
import { ProgressBar } from '../../components/ProgressBar'
import { OptionButton } from '../../components/OptionButton'

function SelectServiceCategory({ navigation }: SelectServiceCategoryScreenProps) {

    return (
        <Container>
            <DefaultHeaderContainer
                minHeight={(screenHeight + statusBarHeight) * 0.26}
                relativeHeight={'22%'}
                centralized
                backgroundColor={theme.white3}
            >
                <BackButton onPress={() => navigation.goBack()} />
                <InstructionCard
                    borderLeftWidth={3}
                    fontSize={18}
                    message={'em qual categoria você se encaixa?'}
                    highlightedWords={['categoria']}
                >
                    <ProgressBar
                        range={4}
                        value={2}
                    />
                </InstructionCard>
            </DefaultHeaderContainer>
            <FormContainer
                backgroundColor={theme.purple2}
            >
               
            </FormContainer>
        </Container>
    )
}

export { SelectServiceCategory }