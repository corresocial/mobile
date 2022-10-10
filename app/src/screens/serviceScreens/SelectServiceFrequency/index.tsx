import React, { useContext } from 'react'

import { Container } from './styles'
import { screenHeight, statusBarHeight } from '../../../common/screenDimensions'
import { theme } from '../../../common/theme'
import CalendarToday from './../../../assets/icons/calendarToday.svg'
import CalendarEveryday from './../../../assets/icons/calendarEveryday.svg'
import CalendarSomeday from './../../../assets/icons/calendarSomeday.svg'
import CalendarBusinessDay from './../../../assets/icons/calendarBusinessDay.svg'

import { SelectServiceFrequencyScreenProps } from '../../../routes/Stack/_stackScreenProps'
import { ServiceFrequency } from '../types'
import { ServiceContext } from '../../../contexts/ServiceContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { BackButton } from '../../../components/_buttons/BackButton'
import { InstructionCard } from '../../../components/InstructionCard'
import { ProgressBar } from '../../../components/ProgressBar'
import { OptionButton } from '../../../components/_buttons/OptionButton'

function SelectServiceFrequency({ navigation }: SelectServiceFrequencyScreenProps) {

    const { setServiceDataOnContext } = useContext(ServiceContext)

    const saveServiceFrequency = (serviceFrequency: ServiceFrequency) => {
        if (serviceFrequency == 'someday') {
            setServiceDataOnContext({ serviceFrequency })
            navigation.navigate('SelectDaysOfWeek')
        } else {
            setServiceDataOnContext({ serviceFrequency })
            navigation.navigate('InsertOpeningHour')
        }
    }

    return (
        <Container>
            <DefaultHeaderContainer
                minHeight={(screenHeight + statusBarHeight) * 0.26}
                relativeHeight={'22%'}
                centralized
                backgroundColor={theme.white3}
            >
                <BackButton onPress={() => navigation.goBack()} />
                <InstructionCard
                    borderLeftWidth={3}
                    fontSize={18}
                    message={'com que frequência você vende/vai vender seu serviço?'}
                    highlightedWords={['com', 'que', 'frequência', 'seu', 'serviço?']}
                >
                    <ProgressBar
                        range={4}
                        value={4}
                    />
                </InstructionCard>
            </DefaultHeaderContainer>
            <FormContainer
                backgroundColor={theme.purple2}
            >
                <OptionButton
                    color={theme.white3}
                    label={'só hoje'}
                    highlightedWords={['hoje']}
                    labelColor={theme.black3}
                    labelSize={24}
                    labelAlign={'left'}
                    SvgIcon={CalendarToday}
                    svgIconScale={['50%', '50%']}
                    leftSideWidth={'20%'}
                    leftSideColor={theme.orange2}
                    onPress={() => saveServiceFrequency('today')}
                />
                <OptionButton
                    color={theme.white3}
                    label={'todos os dias'}
                    highlightedWords={['todos']}
                    labelColor={theme.black3}
                    labelSize={24}
                    labelAlign={'left'}
                    SvgIcon={CalendarEveryday}
                    svgIconScale={['50%', '50%']}
                    leftSideWidth={'20%'}
                    leftSideColor={theme.red2}
                    onPress={() => saveServiceFrequency('everyday')}
                />
                <OptionButton
                    color={theme.white3}
                    label={'alguns dias'}
                    highlightedWords={['alguns']}
                    labelColor={theme.black3}
                    labelSize={24}
                    labelAlign={'left'}
                    SvgIcon={CalendarSomeday}
                    svgIconScale={['50%', '50%']}
                    leftSideWidth={'20%'}
                    leftSideColor={theme.yellow2}
                    onPress={() => saveServiceFrequency('someday')}
                />
                <OptionButton
                    color={theme.white3}
                    label={'dias comerciais'}
                    highlightedWords={['dias', 'comerciais']}
                    labelColor={theme.black3}
                    labelSize={24}
                    labelAlign={'left'}
                    SvgIcon={CalendarBusinessDay}
                    svgIconScale={['50%', '50%']}
                    leftSideWidth={'20%'}
                    leftSideColor={theme.green2}
                    onPress={() => saveServiceFrequency('businessDay')}
                />

            </FormContainer>
        </Container>
    )
}

export { SelectServiceFrequency }