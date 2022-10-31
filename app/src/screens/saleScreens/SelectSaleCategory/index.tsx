import React from 'react'
import { ScrollView, StatusBar } from 'react-native'

import { Container } from './styles'
import { theme } from '../../../common/theme'

import { SelectSaleCategoryScreenProps } from '../../../routes/Stack/_stackScreenProps'
import { SaleCategories, SaleCategory } from '../types'
import { saleCategories } from '../saleCategories'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { SelectButtonsContainer } from '../../../components/_containers/SelectButtonsContainer'
import { SelectButton } from '../../../components/_buttons/SelectButton'
import { BackButton } from '../../../components/_buttons/BackButton'
import { InstructionCard } from '../../../components/InstructionCard'
import { ProgressBar } from '../../../components/ProgressBar'
import { screenHeight } from '../../../common/screenDimensions'

function SelectSaleCategory({ navigation }: SelectSaleCategoryScreenProps) {

    const renderSelectOptionsButtons = () => {
        const ordenedSaleCategories = Object.values(saleCategories).sort(sortSaleCategories)

        return ordenedSaleCategories.map((category, index) => {
            if (category.label === 'outros') return
            return (
                <SelectButton
                    key={index}
                    width={'45%'}
                    height={screenHeight * 0.11}
                    label={category.label}
                    boldLabel={true}
                    onSelect={() => onSelectCategory(category.value as SaleCategories)}
                />
            )
        })
    }

    const sortSaleCategories = (a: SaleCategory, b: SaleCategory) => {
        if (a.label < b.label) return -1;
        if (a.label > b.label) return 1;
        return 0
    }

    const onSelectCategory = (categoryName: SaleCategories) => {
        navigation.navigate('SelectSaleTags', { categorySelected: categoryName })
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
                    message={'em qual categoria seu item se encaixa?'}
                    highlightedWords={['categoria', 'seu','item']}
                >
                    <ProgressBar
                        range={5}
                        value={1}
                    />
                </InstructionCard>
            </DefaultHeaderContainer>
            <ScrollView>
                <SelectButtonsContainer
                    backgroundColor={theme.green2}
                >
                    {renderSelectOptionsButtons() as any}
                    <SelectButton
                        key={'others'}
                        width={'100%'}
                        height={screenHeight * 0.11}
                        label={'outros'}
                        boldLabel={true}
                        onSelect={() => onSelectCategory('others' as SaleCategories)}
                    />
                </SelectButtonsContainer>
            </ScrollView>
        </Container>
    )
}

export { SelectSaleCategory }