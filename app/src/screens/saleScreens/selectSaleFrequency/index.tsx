import React, { useContext } from 'react'

import { ButtonsContainer, Container } from './styles'
import { theme } from '../../../common/theme'
import CalendarToday from './../../../assets/icons/calendarToday.svg'
import CalendarEveryday from './../../../assets/icons/calendarEveryday.svg'
import CalendarSomeday from './../../../assets/icons/calendarSomeday.svg'
import CalendarBusinessDay from './../../../assets/icons/calendarBusinessDay.svg'

import { SelectSaleFrequencyScreenProps } from '../../../routes/Stack/saleStack/stackScreenProps'
import { DaysOfWeek, SaleFrequency } from '../types'
import { SaleContext } from '../../../contexts/SaleContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { BackButton } from '../../../components/_buttons/BackButton'
import { InstructionCard } from '../../../components/InstructionCard'
import { ProgressBar } from '../../../components/ProgressBar'
import { OptionButton } from '../../../components/_buttons/OptionButton'
import { StatusBar } from 'react-native'

function SelectSaleFrequency({ navigation }: SelectSaleFrequencyScreenProps) {

    const { setSaleDataOnContext } = useContext(SaleContext)

    const saveSaleFrequency = (saleFrequency: SaleFrequency) => {
        const daysOfWeek = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'] as DaysOfWeek[]

        switch (saleFrequency) {
            case 'today': {
                setSaleDataOnContext({
                    attendanceFrequency: saleFrequency,
                    attendanceWeekDays: [daysOfWeek[new Date().getDay()]]
                })
                /* navigation.navigate('InsertOpeningHour') */
                break
            }
            case 'everyday': {
                setSaleDataOnContext({
                    attendanceFrequency: saleFrequency,
                    attendanceWeekDays: [...daysOfWeek]
                })
                /* navigation.navigate('InsertOpeningHour') */
                break
            }
            case 'someday': {
                setSaleDataOnContext({ attendanceFrequency: saleFrequency })
                navigation.navigate('SelectDaysOfWeek')
                break
            }
            case 'businessDay': {
                setSaleDataOnContext({
                    attendanceFrequency: saleFrequency,
                    attendanceWeekDays: ['seg', 'ter', 'qua', 'qui', 'sex']
                })
                /* navigation.navigate('InsertOpeningHour') */
                break
            }

        }
    }

    return (
        <Container>
            <StatusBar backgroundColor={theme.white3} barStyle={'dark-content'} />
            <DefaultHeaderContainer
                relativeHeight={'27%'}
                centralized
                backgroundColor={theme.white3}
            >
                <BackButton onPress={() => navigation.goBack()} />
                <InstructionCard
                    borderLeftWidth={3}
                    fontSize={18}
                    message={'com que frequência você está aberto a vender seu item?'}
                    highlightedWords={['com', 'que', 'frequência', 'vender','seu', 'item?']}
                >
                    <ProgressBar
                        range={5}
                        value={5}
                    />
                </InstructionCard>
            </DefaultHeaderContainer>
            <FormContainer
                backgroundColor={theme.green2}
            >
                <ButtonsContainer>
                    <OptionButton
                        color={theme.white3}
                        label={'só hoje'}
                        highlightedWords={['hoje']}
                        labelColor={theme.black3}
                        labelSize={20}
                        labelAlign={'left'}
                        SvgIcon={CalendarToday}
                        svgIconScale={['50%', '50%']}
                        leftSideWidth={'20%'}
                        leftSideColor={theme.orange2}
                        onPress={() => saveSaleFrequency('today')}
                    />
                    <OptionButton
                        color={theme.white3}
                        label={'todos os dias'}
                        highlightedWords={['todos']}
                        labelColor={theme.black3}
                        labelSize={20}
                        labelAlign={'left'}
                        SvgIcon={CalendarEveryday}
                        svgIconScale={['50%', '50%']}
                        leftSideWidth={'20%'}
                        leftSideColor={theme.red2}
                        onPress={() => saveSaleFrequency('everyday')}
                    />
                    <OptionButton
                        color={theme.white3}
                        label={'alguns dias'}
                        highlightedWords={['alguns']}
                        labelColor={theme.black3}
                        labelSize={20}
                        labelAlign={'left'}
                        SvgIcon={CalendarSomeday}
                        svgIconScale={['50%', '50%']}
                        leftSideWidth={'20%'}
                        leftSideColor={theme.yellow2}
                        onPress={() => saveSaleFrequency('someday')}
                    />
                    <OptionButton
                        color={theme.white3}
                        label={'dias comerciais'}
                        highlightedWords={['dias', 'comerciais']}
                        labelColor={theme.black3}
                        labelSize={20}
                        labelAlign={'left'}
                        SvgIcon={CalendarBusinessDay}
                        svgIconScale={['50%', '50%']}
                        leftSideWidth={'20%'}
                        leftSideColor={theme.green2}
                        onPress={() => saveSaleFrequency('businessDay')}
                    />
                </ButtonsContainer>
            </FormContainer>
        </Container>
    )
}

export { SelectSaleFrequency }