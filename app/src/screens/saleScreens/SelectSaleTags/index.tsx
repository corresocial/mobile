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
import { screenHeight, screenWidth } from '../../../common/screenDimensions'
import Check from './../../../assets/icons/check.svg'

import { SelectSaleTagsScreenProps } from '../../../routes/Stack/saleStack/stackScreenProps'
import { saleCategories, updateSaleTags } from '../saleCategories'
import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'
import { SaleContext } from '../../../contexts/SaleContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { SelectButtonsContainer } from '../../../components/_containers/SelectButtonsContainer'
import { SelectButton } from '../../../components/_buttons/SelectButton'
import { BackButton } from '../../../components/_buttons/BackButton'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { LineInput } from '../../../components/LineInput'
import { InfoCard } from '../../../components/_cards/InfoCard'

function SelectSaleTags({ route, navigation }: SelectSaleTagsScreenProps) {

    const { setSaleDataOnContext } = useContext(SaleContext)

    const [textTag, setTextTag] = useState('')
    const [keyboardOpened, setKeyboardOpened] = useState(false)
    const [selectedTags, setSelectedTags] = useState<string[]>([])

    const inputNewTagRef = useRef() as any
    const tagsSelectedRef = useRef() as any

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            removeAllKeyboardEventListeners()
            Keyboard.addListener('keyboardDidShow', () => setKeyboardOpened(true))
            Keyboard.addListener('keyboardDidHide', () => setKeyboardOpened(false))
        });
        return unsubscribe;
    }, [navigation])

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
                    backgroundSelected={theme.green1}
                    selected={true}
                    onSelect={() => onSelectTag(tagName)}
                />
            )
        })
    }

    const renderUnselectedTags = () => {
        const ordenedSaleTags = saleCategories[getSaleCategorySelected()].tags.sort(sortSaleTags)

        return ordenedSaleTags.map((tagName, index) => {
            if (selectedTags.includes(tagName)) return
            if (tagName.indexOf(textTag.toLowerCase()) !== -1 && !selectedTags.includes(tagName)) {
                return (
                    <SelectButton
                        key={index}
                        width={screenWidth * 0.38}
                        height={screenHeight * 0.1}
                        label={tagName}
                        fontSize={15}
                        boldLabel={true}
                        backgroundSelected={theme.green1}
                        onSelect={() => onSelectTag(tagName)}
                    />
                )
            }
        })
    }

    const sortSaleTags = (a: string, b: string) => {
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

    const getSaleCategorySelected = () => {
        const { categorySelected } = route.params
        return categorySelected
    }

    const getCurrentCategoryLabelHightlighted = () => {
        const highlightedWords = saleCategories[getSaleCategorySelected()].label.split(' ')
        return highlightedWords
    }

    const getCurrentCategoryLabel = () => {
        return saleCategories[getSaleCategorySelected()].label
    }

    const categoryLabelSelectedIsLarge = () => {
        return getCurrentCategoryLabelHightlighted().length > 1
    }

    const addNewTag = () => {
        const lowerCaseTag = textTag.toLowerCase()

        if (!lowerCaseTag.length) return
        if (!!saleCategories[getSaleCategorySelected()].tags.includes(lowerCaseTag as never)) {
            setTextTag('')
            return onSelectTag(lowerCaseTag)
        }
        const selectedCategoriesCurrent = [...selectedTags]
        selectedCategoriesCurrent.push(lowerCaseTag)

        setSelectedTags(selectedCategoriesCurrent)
        updateSaleTags(getSaleCategorySelected(), lowerCaseTag)
        setTextTag('')
    }

    const saveTags = () => {
        setSaleDataOnContext({ tags: selectedTags })
        navigation.navigate('InsertSaleTitle')
    }

    return (
        <Container>
            <StatusBar backgroundColor={theme.green2} barStyle={'dark-content'} />
            <DefaultHeaderContainer
                minHeight={categoryLabelSelectedIsLarge() ? screenHeight * 0.25 : screenHeight * 0.20}
                relativeHeight={categoryLabelSelectedIsLarge() ? '30%' : '24%'}
                centralized
                backgroundColor={theme.green2}
            >
                <BackButton onPress={() => navigation.goBack()} />
                <InfoCard
                    title={getCurrentCategoryLabel()}
                    titleFontSize={26}
                    description={`que tipo de ${getCurrentCategoryLabel()} você quer anunciar?`}
                    highlightedWords={[...getCurrentCategoryLabelHightlighted()]}
                    height={'100%'}
                    color={theme.white3}
                />
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
                        textInputRef={inputNewTagRef}
                        defaultBackgroundColor={theme.white2}
                        defaultBorderBottomColor={theme.black4}
                        validBackgroundColor={theme.green1}
                        validBorderBottomColor={theme.green5}
                        invalidBackgroundColor={theme.red1}
                        invalidBorderBottomColor={theme.red5}
                        textAlign={'left'}
                        lastInput
                        blurOnSubmit={false}
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
                    !!selectedTags.length && !keyboardOpened && 
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

export { SelectSaleTags }