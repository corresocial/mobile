import React, { useContext } from 'react'
import { ScrollView, StatusBar } from 'react-native'

import { Container } from './styles'
import { theme } from '../../../common/theme'

import { SelectCultureCategoryScreenProps } from '../../../routes/Stack/CultureStack/stackScreenProps'
import { CultureCategories, MacroCategory } from './../../../services/Firebase/types'
import { cultureCategories } from '../cultureCategories'
import { CultureContext } from '../../../contexts/CultureContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { SelectButtonsContainer } from '../../../components/_containers/SelectButtonsContainer'
import { SelectButton } from '../../../components/_buttons/SelectButton'
import { BackButton } from '../../../components/_buttons/BackButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { ProgressBar } from '../../../components/ProgressBar'
import { screenHeight } from '../../../common/screenDimensions'

function SelectCultureCategory({ navigation }: SelectCultureCategoryScreenProps) {

    const { cultureDataContext } = useContext(CultureContext)

    const renderSelectOptionsButtons = () => {
        const ordenedCultureCategories = Object.values(cultureCategories).sort(sortCultureCategories)

        return ordenedCultureCategories.map((category, index) => {
            if (category.label === 'outros') return
            return (
                <SelectButton
                    key={index}
                    width={'45%'}
                    height={screenHeight * 0.11}
                    label={category.label}
                    boldLabel={true}
                    onSelect={() => onSelectCategory(category.value as CultureCategories)}
                />
            )
        })
    }

    const sortCultureCategories = (a: MacroCategory, b: MacroCategory) => {
        if (a.label < b.label) return -1;
        if (a.label > b.label) return 1;
        return 0
    }

    const onSelectCategory = (categoryName: CultureCategories) => {
        navigation.navigate('SelectCultureTags', { categorySelected: categoryName })
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
                    message={
                        cultureDataContext.cultureType === 'artistProfile'
                            ? 'em qual categoria sua arte se encaixa?'
                            : 'em qual categoria seu role se encaixa?'
                    }
                    highlightedWords={
                        cultureDataContext.cultureType === 'artistProfile'
                            ? ['categoria', 'sua', 'arte']
                            : ['categoria', 'set', 'role']
                    }
                >
                    <ProgressBar
                        range={3}
                        value={2}
                    />
                </InstructionCard>
            </DefaultHeaderContainer>
            <ScrollView style={{ backgroundColor: theme.blue2 }}>
                <SelectButtonsContainer
                    backgroundColor={theme.blue2}
                >
                    {renderSelectOptionsButtons() as any}
                    <SelectButton
                        key={'others'}
                        width={'100%'}
                        height={screenHeight * 0.11}
                        label={'outros'}
                        boldLabel={true}
                        onSelect={() => onSelectCategory('others' as CultureCategories)}
                    />
                </SelectButtonsContainer>
            </ScrollView>
        </Container>
    )
}

export { SelectCultureCategory }