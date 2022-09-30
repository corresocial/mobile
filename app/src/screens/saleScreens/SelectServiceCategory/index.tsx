import React, { ReactElement, useState } from 'react'

import { Container } from './styles'
import { theme } from '../../../common/theme'
import { screenHeight, statusBarHeight } from '../../../common/screenDimensions'

import { SelectServiceCategoryScreenProps } from '../../../routes/Stack/_stackScreenProps'
import { serviceCategories } from '../serviceCategories'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { SelectButtonsContainer } from '../../../components/_containers/SelectButtonsContainer'
import { SelectButton } from '../../../components/_buttons/SelectButton'
import { BackButton } from '../../../components/_buttons/BackButton'
import { InstructionCard } from '../../../components/InstructionCard'
import { ProgressBar } from '../../../components/ProgressBar'
import { ServiceCategories } from '../types'

function SelectServiceCategory({ navigation }: SelectServiceCategoryScreenProps) {

    const renderSelectOptionsButtons = () => {
        return Object.entries(serviceCategories).map((category, index) => {
            if (category[0] == 'others') {
                return (
                    <SelectButton
                        key={index}
                        width={'96%'}
                        height={'17%'}
                        label={'outros'}
                        onSelect={() => onSelectCategory(index)}
                    />
                )
            }

            return (
                <SelectButton
                    key={index}
                    width={'46%'}
                    height={'17%'}
                    label={category[1].label}
                    onSelect={() => onSelectCategory(index)}
                />
            )
        })
    }

    const onSelectCategory = (categoryIndex: number) => {
        const categoryName = Object.keys(serviceCategories)[categoryIndex] as ServiceCategories
        navigation.navigate('SelectServiceTags', {categorySelected: categoryName})
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