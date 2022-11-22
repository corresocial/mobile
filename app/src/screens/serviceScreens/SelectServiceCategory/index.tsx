import React from 'react'
import { ScrollView, StatusBar } from 'react-native'

import { Container } from './styles'
import { theme } from '../../../common/theme'
import { screenHeight } from '../../../common/screenDimensions'

import { serviceCategories } from '../serviceCategories'

import { SelectServiceCategoryScreenProps } from '../../../routes/Stack/ServiceStack/stackScreenProps'
import { ServiceCategories, MacroCategory } from '../../../services/Firebase/types'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { SelectButtonsContainer } from '../../../components/_containers/SelectButtonsContainer'
import { SelectButton } from '../../../components/_buttons/SelectButton'
import { BackButton } from '../../../components/_buttons/BackButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { ProgressBar } from '../../../components/ProgressBar'

function SelectServiceCategory({ navigation }: SelectServiceCategoryScreenProps) {

    const renderSelectOptionsButtons = () => {
        const ordenedServicesCategories = Object.values(serviceCategories).sort(sortServiceCategories)

        return ordenedServicesCategories.map((category, index) => {
            if (category.label === 'outros') return
            return (
                <SelectButton
                    key={index}
                    width={'45%'}
                    height={screenHeight * 0.11}
                    label={category.label}
                    boldLabel={true}
                    onSelect={() => onSelectCategory(category.value as ServiceCategories)}
                />
            )
        })
    }

    const sortServiceCategories = (a: MacroCategory, b: MacroCategory) => {
        if (a.label < b.label) return -1
        if (a.label > b.label) return 1
        return 0
    }

    const onSelectCategory = (categoryName: ServiceCategories) => {
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
                    message={'em qual categoria seu serviço se encaixa?'}
                    highlightedWords={['categoria', 'seu', 'serviço']}
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
                    {renderSelectOptionsButtons() as any}
                    <SelectButton
                        key={'others'}
                        width={'100%'}
                        height={screenHeight * 0.11}
                        label={'outros'}
                        boldLabel={true}
                        onSelect={() => onSelectCategory('others' as ServiceCategories)}
                    />
                </SelectButtonsContainer>
            </ScrollView>
        </Container>
    )
}

export { SelectServiceCategory }