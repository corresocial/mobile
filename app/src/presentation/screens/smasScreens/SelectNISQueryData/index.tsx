import React, { useContext } from 'react'
import { Platform } from 'react-native'

import { SmasContext } from '@contexts/SmasContext'

import { SelectNISQueryDataScreenProps } from '@routes/Stack/PublicServicesStack/screenProps'
import { PublicServiceStackParamList } from '@routes/Stack/PublicServicesStack/types'

import { Container, InstructionButtonContainer } from './styles'
import CalendarTodayWhiteIcon from '@assets/icons/calendarToday-white.svg'
import DescriptionWhiteIcon from '@assets/icons/description-white.svg'
import EyeDashedWhiteIcon from '@assets/icons/eyeDashed-white.svg'
import { relativeScreenHeight } from '@common/screenDimensions'
import { theme } from '@common/theme'

import { BackButton } from '@components/_buttons/BackButton'
import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { InstructionCard } from '@components/_cards/InstructionCard'
import { DefaultHeaderContainer } from '@components/_containers/DefaultHeaderContainer'
import { FormContainer } from '@components/_containers/FormContainer'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'

function SelectNISQueryData({ navigation }: SelectNISQueryDataScreenProps) {
	const { smasDataContext, getNumberOfMissingInfo } = useContext(SmasContext)

	const navigateBackwards = () => navigation.goBack()

	const navigateToInputScreen = (inputScreenName: keyof PublicServiceStackParamList) => {
		navigation.push(inputScreenName)
	}

	const numberOfMissingInfoRequested = () => {
		return getNumberOfMissingInfo() === 2 ? 'uma informação adicional' : 'duas informações adicionais'
	}

	return (
		<Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
			<DefaultHeaderContainer
				minHeight={relativeScreenHeight(50)}
				relativeHeight={relativeScreenHeight(50)}
				centralized
				backgroundColor={theme.pink2}
				flexDirection={'column'}
			>
				<InstructionButtonContainer >
					<BackButton onPress={navigateBackwards} />
					<InstructionCard
						borderLeftWidth={5}
						fontSize={16}
						message={'consultar seu NIS'}
						highlightedWords={['NIS']}
					/>
				</InstructionButtonContainer>
				<VerticalSpacing />
				<InstructionButtonContainer withPaddingLeft >
					<InstructionCard
						fontSize={16}
						message={`precisamos de ${numberOfMissingInfoRequested()}`}
						highlightedWords={[...numberOfMissingInfoRequested().split(' ')]}
					/>
				</InstructionButtonContainer>
			</DefaultHeaderContainer>
			< FormContainer backgroundColor={theme.white3}>
				{
					!smasDataContext.motherName && (
						<PrimaryButton
							color={theme.green3}
							label={'nome da mãe'}
							labelColor={theme.white3}
							SecondSvgIcon={DescriptionWhiteIcon}
							onPress={() => navigateToInputScreen('InsertMotherNameNIS')}
						/>
					)
				}
				{
					!smasDataContext.dateOfBirth && (
						<PrimaryButton
							color={theme.green3}
							label={'data de nascimento'}
							labelColor={theme.white3}
							SecondSvgIcon={CalendarTodayWhiteIcon}
							onPress={() => navigateToInputScreen('InsertDateOfBirthNIS')}
						/>
					)
				}
				{
					!smasDataContext.anonymizedCpf && (
						<PrimaryButton
							color={theme.green3}
							label={'CPF anonimizado'}
							labelColor={theme.white3}
							SecondSvgIcon={EyeDashedWhiteIcon}
							svgIconScale={['35%', '30%']}
							onPress={() => navigateToInputScreen('InsertAnonymizedCpfNIS')}
						/>
					)
				}
			</FormContainer>
		</Container>
	)
}

export { SelectNISQueryData }
