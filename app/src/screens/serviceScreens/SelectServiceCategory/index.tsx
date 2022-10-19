import React from 'react'
import { ScrollView, StatusBar } from 'react-native'

import { Container } from './styles'
import { theme } from '../../../common/theme'

import { SelectServiceCategoryScreenProps } from '../../../routes/Stack/_stackScreenProps'
import { ServiceCategories } from '../types'
import { serviceCategories } from '../serviceCategories'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { SelectButtonsContainer } from '../../../components/_containers/SelectButtonsContainer'
import { SelectButton } from '../../../components/_buttons/SelectButton'
import { BackButton } from '../../../components/_buttons/BackButton'
import { InstructionCard } from '../../../components/InstructionCard'
import { ProgressBar } from '../../../components/ProgressBar'
import { screenHeight } from '../../../common/screenDimensions'

function SelectServiceCategory({ navigation }: SelectServiceCategoryScreenProps) {

    const renderSelectOptionsButtons = () => {
        return Object.entries(serviceCategories).map((category, index) => {
            return (
                <SelectButton
                    key={index}
                    width={'45%'}
                    height={screenHeight * 0.11}
                    label={category[1].label}
                    boldLabel={true}
                    onSelect={() => onSelectCategory(index)}
                />
            )
        })
    }

    const onSelectCategory = (categoryIndex: number) => {
        const categoryName = Object.keys(serviceCategories)[categoryIndex] as ServiceCategories
        navigation.navigate('SelectServiceTags', { categorySelected: categoryName })
    }

    return (
        <Container>
            <StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
            <DefaultHeaderContainer
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
                        range={5}
                        value={2}
                    />
                </InstructionCard>
            </DefaultHeaderContainer>
            <ScrollView>
                <SelectButtonsContainer
                    backgroundColor={theme.purple2}
                >
                    {renderSelectOptionsButtons()}
                </SelectButtonsContainer>
            </ScrollView>
        </Container>
    )
}

export { SelectServiceCategory }