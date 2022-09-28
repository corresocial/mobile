import React, { ReactElement, useState } from 'react'

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
import { SelectButton } from '../../components/SelectButton'
import { SelectButtonsContainer } from '../../components/SelectButtonsContainer'

const categories = ['casa', 'saúde', 'lazer', 'transporte', 'esporte', 'arte', 'comida e bebida', 'educação', 'outros']

function SelectServiceCategory({ navigation }: SelectServiceCategoryScreenProps) {

    const renderSelectOptionsButtons = () => {
        return categories.map((category, index) => {
            if (category == 'outros') {
                return (
                    <SelectButton
                        key={99}
                        width={'96%'}
                        height={'18%'}
                        label={'outros'}
                        onSelectCategory={() => onSelectCategory(index)}
                    />
                )
            }

            return (
                <SelectButton
                    key={index}
                    width={'46%'}
                    height={'18%'}
                    label={category}
                    onSelectCategory={() => onSelectCategory(index)}
                />
            )
        })
    }

    const onSelectCategory = (categoryIndex: number) => {
        navigation.navigate('SelectServiceTags')
    }

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
            <SelectButtonsContainer
                backgroundColor={theme.purple2}
            >
                {renderSelectOptionsButtons()}
            </SelectButtonsContainer>
        </Container>
    )
}

export { SelectServiceCategory }