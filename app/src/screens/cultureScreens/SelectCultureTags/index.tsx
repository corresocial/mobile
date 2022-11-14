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

import { SelectCultureTagsScreenProps } from '../../../routes/Stack/cultureStack/stackScreenProps'
import { cultureCategories, updateCultureTags } from '../cultureCategories'
import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'
import { CultureContext } from '../../../contexts/CultureContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { SelectButtonsContainer } from '../../../components/_containers/SelectButtonsContainer'
import { SelectButton } from '../../../components/_buttons/SelectButton'
import { BackButton } from '../../../components/_buttons/BackButton'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { LineInput } from '../../../components/LineInput'
import { InfoCard } from '../../../components/_cards/InfoCard'

function SelectCultureTags({ route, navigation }: SelectCultureTagsScreenProps) {

    const { cultureDataContext,setCultureDataOnContext } = useContext(CultureContext)

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
                    backgroundSelected={theme.blue1}
                    selected={true}
                    onSelect={() => onSelectTag(tagName)}
                />
            )
        })
    }

    const renderUnselectedTags = () => {
        const ordenedCultureTags = cultureCategories[getCultureCategorySelected()].tags.sort(sortCultureTags)

        return ordenedCultureTags.map((tagName, index) => {
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
                        backgroundSelected={theme.blue1}
                        onSelect={() => onSelectTag(tagName)}
                    />
                )
            }
        })
    }

    const sortCultureTags = (a: string, b: string) => {
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

    const getCultureCategorySelected = () => {
        const { categorySelected } = route.params
        return categorySelected
    }

    const getCurrentCategoryLabelHightlighted = () => {
        const highlightedWords = cultureCategories[getCultureCategorySelected()].label.split(' ')
        return highlightedWords
    }

    const getCurrentCategoryLabel = () => {
        return cultureCategories[getCultureCategorySelected()].label
    }

    const categoryLabelSelectedIsLarge = () => {
        return getCurrentCategoryLabelHightlighted().length > 3
    }

    const addNewTag = () => {
        const lowerCaseTag = textTag.toLowerCase()

        if (!lowerCaseTag.length) return
        if (!!cultureCategories[getCultureCategorySelected()].tags.includes(lowerCaseTag as never)) {
            setTextTag('')
            return onSelectTag(lowerCaseTag)
        }
        const selectedCategoriesCurrent = [...selectedTags]
        selectedCategoriesCurrent.push(lowerCaseTag)

        setSelectedTags(selectedCategoriesCurrent)
        updateCultureTags(getCultureCategorySelected(), lowerCaseTag)
        setTextTag('')
    }

    const saveTags = () => {
        setCultureDataOnContext({ tags: selectedTags })
         if(cultureDataContext.cultureType === 'eventPost'){
            navigation.navigate('InsertEntryValue')
         }else{
            // navigation.navigate('')
         }
    }

    return (
        <Container>
            <StatusBar backgroundColor={theme.blue2} barStyle={'dark-content'} />
            <DefaultHeaderContainer
                minHeight={categoryLabelSelectedIsLarge() ? screenHeight * 0.25 : screenHeight * 0.20}
                relativeHeight={categoryLabelSelectedIsLarge() ? '30%' : '24%'}
                centralized
                backgroundColor={theme.blue2}
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
                        validBackgroundColor={theme.blue1}
                        validBorderBottomColor={theme.blue5}
                        invalidBackgroundColor={theme.red1}
                        invalidBorderBottomColor={theme.red5}
                        textAlign={'left'}
                        lastInput
                        blurOnSubmit={false}
                        fontSize={18}
                        invalidTextAfterSubmit={false}
                        placeholder={'pesquise ou adicione'}
                        keyboardType={'default'}
                        textIsValid={cultureCategories[getCultureCategorySelected()].tags.includes(textTag as never)}
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

export { SelectCultureTags }