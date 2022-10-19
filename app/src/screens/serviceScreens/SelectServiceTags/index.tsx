import React, { useContext, useEffect, useRef, useState } from 'react'
import { Keyboard, ScrollView, StatusBar } from 'react-native'

import {
    Container,
    ContainerBottom,
    FloatButtonContainer,
    InputTagArea,
    Sigh,
    TagsSelectedArea,
    TagsUnselectedArea
} from './styles'
import { theme } from '../../../common/theme'
import { screenHeight, screenWidth, statusBarHeight } from '../../../common/screenDimensions'
import Check from './../../../assets/icons/check.svg'

import { SelectServiceTagsScreenProps } from '../../../routes/Stack/_stackScreenProps'
import { serviceCategories, updateServiceTags } from '../serviceCategories'
import { ServiceContext } from '../../../contexts/ServiceContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { SelectButtonsContainer } from '../../../components/_containers/SelectButtonsContainer'
import { SelectButton } from '../../../components/_buttons/SelectButton'
import { BackButton } from '../../../components/_buttons/BackButton'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { InstructionCard } from '../../../components/InstructionCard'
import { ProgressBar } from '../../../components/ProgressBar'
import { LineInput } from '../../../components/LineInput'

function SelectServiceTags({ route, navigation }: SelectServiceTagsScreenProps) {

    const { setServiceDataOnContext } = useContext(ServiceContext)

    const [textTag, setTextTag] = useState('')
    const [keyboardOpened, setKeyboardOpened] = useState(false)
    const [selectedTags, setSelectedTags] = useState<string[]>([])

    const tagsSelectedRef = useRef() as any // TODO Type

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', () => setKeyboardOpened(true))
        Keyboard.addListener('keyboardDidHide', () => setKeyboardOpened(false))
    }, [])

    const renderSelectedTags = () => {
        return selectedTags.map((tagName, index) => {
            return (
                <SelectButton
                    key={index}
                    width={screenWidth * 0.38}
                    height={screenHeight * 0.1}
                    label={tagName}
                    boldLabel={true}
                    marginHorizontal={10}
                    backgroundSelected={theme.purple1}
                    selected={true}
                    onSelect={() => onSelectTag(tagName)}
                />
            )
        })
    }

    const renderUnselectedTags = () => {
        const ordenedServiceTags = serviceCategories[getServiceCategorySelected()].tags.sort(sortServiceTags)

        return ordenedServiceTags.map((tagName, index) => {
            if (selectedTags.includes(tagName)) return
            if (tagName.indexOf(textTag.toLowerCase()) !== -1 && !selectedTags.includes(tagName)) {
                return (
                    <SelectButton
                        key={index}
                        width={screenWidth * 0.38}
                        height={screenHeight * 0.1}
                        label={tagName}
                        boldLabel={true}
                        backgroundSelected={theme.purple1}
                        fontSize={18}
                        onSelect={() => onSelectTag(tagName)}
                    />
                )
            }
        })
    }

    const sortServiceTags = (a: string, b: string) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    }

    const onSelectTag = (tagName: string) => {
        const selectedCategoriesCurrent = [...selectedTags]
        if (selectedTags.includes(tagName)) {
            const selectedTagsFiltred = selectedCategoriesCurrent.filter((tag) => tag != tagName)
            setSelectedTags(selectedTagsFiltred)
        } else {
            selectedCategoriesCurrent.push(tagName)
            setSelectedTags(selectedCategoriesCurrent)
        }
        return
    }

    const scrollToEnd = () => {
        tagsSelectedRef.current.scrollToEnd({ animated: true })
    }

    const getServiceCategorySelected = () => {
        const { categorySelected } = route.params
        return categorySelected
    }

    const getCurrentCategoryLabelHightlighted = () => {
        const highlightedWords = serviceCategories[getServiceCategorySelected()].label.split(' ')
        highlightedWords[highlightedWords.length - 1] = highlightedWords[highlightedWords.length - 1] + ','
        return highlightedWords
    }

    const getCurrentCategoryLabel = () => {
        return serviceCategories[getServiceCategorySelected()].label
    }

    const addNewTag = () => {
        const lowerCaseTag = textTag.toLowerCase()

        if (!lowerCaseTag.length) return
        if (!!serviceCategories[getServiceCategorySelected()].tags.includes(lowerCaseTag)) {
            return onSelectTag(lowerCaseTag)
        }
        const selectedCategoriesCurrent = [...selectedTags]
        selectedCategoriesCurrent.push(lowerCaseTag)

        setSelectedTags(selectedCategoriesCurrent)
        updateServiceTags(getServiceCategorySelected(), lowerCaseTag)
        setTextTag('')
    }

    const saveTags = () => {
        setServiceDataOnContext({ serviceTags: selectedTags })
        navigation.navigate('SelectSaleOrExchange')
    }

    return (
        <Container>
            <StatusBar backgroundColor={theme.purple2} barStyle={'dark-content'} />
            <DefaultHeaderContainer
                minHeight={screenHeight * 0.26}
                relativeHeight={'30%'}
                centralized
                backgroundColor={theme.purple2}
            >
                <BackButton onPress={() => navigation.goBack()} />
                <InstructionCard
                    borderLeftWidth={3}
                    fontSize={18}
                    message={`dentro de ${getCurrentCategoryLabel()}, quais palavras tem a ver com seu serviço?`}
                    highlightedWords={[...getCurrentCategoryLabelHightlighted(), 'tem', 'a', 'ver']}
                >
                    <ProgressBar
                        range={5}
                        value={2}
                    />
                </InstructionCard>
            </DefaultHeaderContainer>
            <ContainerBottom
                style={{
                    justifyContent: keyboardOpened ? 'center' : 'flex-start'
                }}
            >
                <InputTagArea >
                    <LineInput
                        value={textTag}
                        relativeWidth={'100%'}
                        defaultBackgroundColor={theme.white2}
                        defaultBorderBottomColor={theme.black4}
                        validBackgroundColor={theme.purple1}
                        validBorderBottomColor={theme.purple5}
                        invalidBackgroundColor={theme.red1}
                        invalidBorderBottomColor={theme.red5}
                        textAlign={'left'}
                        lastInput
                        fontSize={18}
                        invalidTextAfterSubmit={false}
                        placeholder={'pesquise ou adicione'}
                        keyboardType={'default'}
                        onPressKeyboardSubmit={addNewTag}
                        onChangeText={(text: string) => setTextTag(text)}
                    />
                </InputTagArea>
                <SelectButtonsContainer
                    backgroundColor={theme.white2}
                >
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{ height: '100%', flex: 1 }}
                        contentContainerStyle={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            overflow: 'scroll',
                        }}
                    >
                        {
                            !keyboardOpened &&
                            <TagsSelectedArea>
                                <ScrollView
                                    ref={tagsSelectedRef} onContentSizeChange={scrollToEnd}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    scrollsToTop={true}
                                >
                                    {renderSelectedTags()}
                                </ScrollView>
                            </TagsSelectedArea>
                        }
                        <TagsUnselectedArea>
                            {renderUnselectedTags()}
                        </TagsUnselectedArea>

                        <Sigh />
                    </ScrollView>
                </SelectButtonsContainer>
                {
                    !!selectedTags.length &&
                    <FloatButtonContainer>
                        <PrimaryButton
                            flexDirection={'row-reverse'}
                            color={theme.green3}
                            label={'continuar'}
                            labelColor={theme.white3}
                            SvgIcon={Check}
                            svgIconScale={['30%', '15%']}
                            onPress={saveTags}
                        />
                    </FloatButtonContainer>
                }
            </ContainerBottom>
        </Container >
    )
}

export { SelectServiceTags }