import React, { useContext, useState } from 'react'
import { StatusBar } from 'react-native'

import {
    Container,
    FloatButtonContainer,
    Row,
    WeekdaysSelectedArea
} from './styles'
import { theme } from '../../../common/theme'
import { screenHeight, screenWidth } from '../../../common/screenDimensions'
import Check from './../../../assets/icons/check.svg'

import { SelectDaysOfWeekScreenProps } from '../../../routes/Stack/_stackScreenProps'
import { ServiceContext } from '../../../contexts/ServiceContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { SelectButtonsContainer } from '../../../components/_containers/SelectButtonsContainer'
import { SelectButton } from '../../../components/_buttons/SelectButton'
import { BackButton } from '../../../components/_buttons/BackButton'
import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { InstructionCard } from '../../../components/InstructionCard'
import { ProgressBar } from '../../../components/ProgressBar'
import { DaysOfWeek } from '../types'

function SelectDaysOfWeek({ navigation }: SelectDaysOfWeekScreenProps) {

    const { setServiceDataOnContext } = useContext(ServiceContext)

    const [selectedDays, setSelectedDays] = useState<string[]>([])
    const daysOfWeek = ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'] as DaysOfWeek[]

    const renderDaysOfWeek = () => {
        return daysOfWeek.map((dayOfWeek, index) => {
            if (dayOfWeek == 'dom') {
                return <Row key={index}>
                    <SelectButton
                        width={screenWidth * 0.41}
                        height={screenHeight * 0.11}
                        marginVertical={10}
                        label={dayOfWeek}
                        fontSize={24}
                        backgroundSelected={theme.purple1}
                        selected={selectedDays.includes(dayOfWeek)}
                        onSelect={() => onSelectDay(dayOfWeek)}
                    />
                </Row>
            }

            return (
                <SelectButton
                    key={index}
                    width={screenWidth * 0.41}
                    height={screenHeight * 0.11}
                    marginVertical={10}
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
        setServiceDataOnContext({
            weekdaysService: selectedDays
        })
        navigation.navigate('InsertOpeningHour')
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
                    message={`que dias da semana?`}
                    highlightedWords={['que', 'dias']}
                >
                    <ProgressBar
                        range={5}
                        value={5}
                    />
                </InstructionCard>
            </DefaultHeaderContainer>
            <SelectButtonsContainer
                backgroundColor={theme.purple2}
            >
                <WeekdaysSelectedArea>
                    {renderDaysOfWeek()}
                </WeekdaysSelectedArea>
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