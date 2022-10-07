import React, { useState } from 'react'
import { ScrollView } from 'react-native'

import {
    Container,
    FloatButtonContainer,
    Sigh,
    TagsSelectedArea
} from './styles'
import { theme } from '../../../common/theme'
import { screenHeight, screenWidth, statusBarHeight } from '../../../common/screenDimensions'
import Check from './../../../assets/icons/check.svg'

import { SelectDaysOfWeekScreenProps } from '../../../routes/Stack/_stackScreenProps'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { SelectButtonsContainer } from '../../../components/_containers/SelectButtonsContainer'
import { SelectButton } from '../../../components/_buttons/SelectButton'
import { BackButton } from '../../../components/_buttons/BackButton'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { InstructionCard } from '../../../components/InstructionCard'
import { ProgressBar } from '../../../components/ProgressBar'

function SelectDaysOfWeek({ route, navigation }: SelectDaysOfWeekScreenProps) {

    const [selectedDays, setSelectedDays] = useState<string[]>([])
    const daysOfWeek = ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom']

    const renderDaysOfWeek = () => {
        return daysOfWeek.map((dayOfWeek, index) => {
            return (
                <SelectButton
                    key={index}
                    width={screenWidth * 0.38}
                    height={screenHeight * 0.1}
                    margin={screenWidth * 0.025}
                    label={dayOfWeek}
                    fontSize={24}
                    backgroundSelected={theme.purple1}
                    selected={selectedDays.includes(dayOfWeek)}
                    onSelect={() => onSelectDay(dayOfWeek)}
                />
            )
        })
    }

    const onSelectDay = (dayOfWeek: string) => {
        const selectedDaysOfWeek = [...selectedDays]
        if (selectedDays.includes(dayOfWeek)) {
            const selectedDaysFiltred = selectedDaysOfWeek.filter((day) => day != dayOfWeek)
            setSelectedDays(selectedDaysFiltred)
        } else {
            selectedDaysOfWeek.push(dayOfWeek)
            setSelectedDays(selectedDaysOfWeek)
        }
        return
    }

    const saveDaysOfWeek = () => {
        //save
          navigation.navigate('InsertOpeningHour')
    }

    return (
        <Container>
            <DefaultHeaderContainer
                minHeight={(screenHeight + statusBarHeight) * 0.01}
                relativeHeight={'22%'}
                centralized
                backgroundColor={theme.white3}
            >
                <BackButton onPress={() => navigation.goBack()} />
                <InstructionCard
                    borderLeftWidth={3}
                    fontSize={18}
                    message={`que dias da semana?`}
                    highlightedWords={['que', 'dias']}
                >
                    <ProgressBar
                        range={4}
                        value={4}
                    />
                </InstructionCard>
            </DefaultHeaderContainer>
            <SelectButtonsContainer
                backgroundColor={theme.purple2}
            >
                <TagsSelectedArea>
                    {renderDaysOfWeek()}
                </TagsSelectedArea>
            </SelectButtonsContainer>
            {
                !!selectedDays.length &&
                <FloatButtonContainer>
                    <PrimaryButton
                        flexDirection={'row-reverse'}
                        color={theme.green3}
                        label={'continuar'}
                        labelColor={theme.white3}
                        SvgIcon={Check}
                        svgIconScale={['30%', '15%']}
                        onPress={saveDaysOfWeek}
                    />
                </FloatButtonContainer>
            }
        </Container >
    )
}

export { SelectDaysOfWeek }