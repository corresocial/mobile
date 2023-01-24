import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { ButtonsContainer, Container } from './styles'
import { theme } from '../../../common/theme'
import CalendarToday from '../../../assets/icons/calendarToday.svg'
import CalendarEveryday from '../../../assets/icons/calendarEveryday.svg'
import CalendarSomeday from '../../../assets/icons/calendarSomeday.svg'
import CalendarBusinessDay from '../../../assets/icons/calendarBusinessDay.svg'

import { SelectServiceFrequencyScreenProps } from '../../../routes/Stack/ServiceStack/stackScreenProps'
import { DaysOfWeek, WeekdaysFrequency } from '../../../services/firebase/types'

import { ServiceContext } from '../../../contexts/ServiceContext'
import { EditContext } from '../../../contexts/EditContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { FormContainer } from '../../../components/_containers/FormContainer'
import { BackButton } from '../../../components/_buttons/BackButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { ProgressBar } from '../../../components/ProgressBar'
import { OptionButton } from '../../../components/_buttons/OptionButton'

function SelectServiceFrequency({ route, navigation }: SelectServiceFrequencyScreenProps) {
	const { setServiceDataOnContext } = useContext(ServiceContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const saveServiceFrequency = (serviceFrequency: WeekdaysFrequency) => {
		const daysOfWeek = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'] as DaysOfWeek[]

		switch (serviceFrequency) {
			case 'today': {
				if (editModeIsTrue()) {
					addNewUnsavedFieldToEditContext({
						attendanceFrequency: serviceFrequency,
						attendanceWeekDays: [daysOfWeek[new Date().getDay()]]
					})
					navigation.goBack()
					return
				}

				setServiceDataOnContext({
					attendanceFrequency: serviceFrequency,
					attendanceWeekDays: [daysOfWeek[new Date().getDay()]]
				})
				navigation.navigate('InsertOpeningHour')
				break
			}
			case 'everyday': {
				if (editModeIsTrue()) {
					addNewUnsavedFieldToEditContext({
						attendanceFrequency: serviceFrequency,
						attendanceWeekDays: [...daysOfWeek]
					})
					navigation.goBack()
					return
				}

				setServiceDataOnContext({
					attendanceFrequency: serviceFrequency,
					attendanceWeekDays: [...daysOfWeek]
				})
				navigation.navigate('InsertOpeningHour')
				break
			}
			case 'someday': {
				if (editModeIsTrue()) {
					addNewUnsavedFieldToEditContext({ attendanceFrequency: serviceFrequency })
				} else {
					setServiceDataOnContext({
						attendanceFrequency: serviceFrequency
					})
				}

				navigation.navigate('SelectDaysOfWeek', {
					editMode: !!route.params?.editMode,
					initialValue: route.params?.initialValue
				})
				break
			}
			case 'businessDay': {
				if (editModeIsTrue()) {
					addNewUnsavedFieldToEditContext({
						attendanceFrequency: serviceFrequency,
						attendanceWeekDays: ['seg', 'ter', 'qua', 'qui', 'sex']
					})
					navigation.goBack()
					return
				}

				setServiceDataOnContext({
					attendanceFrequency: serviceFrequency,
					attendanceWeekDays: ['seg', 'ter', 'qua', 'qui', 'sex']
				})
				navigation.navigate('InsertOpeningHour')
				break
			}
			default: return false
		}
	}

	const editModeIsTrue = () => route.params && route.params.editMode

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
					message={'com que frequência você vende/vai vender seu serviço?'}
					highlightedWords={['com', 'que', 'frequência', 'seu', 'serviço']}
				>
					<ProgressBar
						range={5}
						value={5}
					/>
				</InstructionCard>
			</DefaultHeaderContainer>
			<FormContainer
				backgroundColor={theme.purple2}
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
						onPress={() => saveServiceFrequency('today')}
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
						onPress={() => saveServiceFrequency('everyday')}
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
						onPress={() => saveServiceFrequency('someday')}
					/>
					<OptionButton
						color={theme.white3}
						label={'dias comerciais'}
						highlightedWords={['comerciais']}
						labelColor={theme.black3}
						labelSize={20}
						labelAlign={'left'}
						SvgIcon={CalendarBusinessDay}
						svgIconScale={['50%', '50%']}
						leftSideWidth={'20%'}
						leftSideColor={theme.green2}
						onPress={() => saveServiceFrequency('businessDay')}
					/>
				</ButtonsContainer>
			</FormContainer>
		</Container>
	)
}

export { SelectServiceFrequency }
