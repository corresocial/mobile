import React, { useContext } from 'react'
import { ScrollView, StatusBar } from 'react-native'
import uuid from 'react-uuid'

import { Container } from './styles'
import { theme } from '../../../common/theme'
import { relativeScreenHeight } from '../../../common/screenDimensions'

import { serviceCategories } from '../../../utils/postsCategories/serviceCategories'

import { ServiceContext } from '../../../contexts/ServiceContext'

import { SelectServiceCategoryScreenProps } from '../../../routes/Stack/ServiceStack/stackScreenProps'
import { ServiceCategories } from '../../../services/firebase/types'
import { sortPostCategories } from '../../../common/auxiliaryFunctions'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { SelectButtonsContainer } from '../../../components/_containers/SelectButtonsContainer'
import { SelectButton } from '../../../components/_buttons/SelectButton'
import { BackButton } from '../../../components/_buttons/BackButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { ProgressBar } from '../../../components/ProgressBar'

function SelectServiceCategory({ route, navigation }: SelectServiceCategoryScreenProps) {
	const { setServiceDataOnContext } = useContext(ServiceContext)

	const renderSelectOptionsButtons = () => {
		const ordenedServicesCategories = Object.values(serviceCategories).sort(sortPostCategories)

		return ordenedServicesCategories.map((category) => {
			if (category.label === 'outros') return
			return (
				<SelectButton
					key={uuid()}
					width={'45%'}
					height={relativeScreenHeight(10.1)}
					label={category.label}
					boldLabel
					onSelect={() => onSelectCategory(category.value as ServiceCategories)}
				/>
			)
		})
	}

	const onSelectCategory = (categoryName: ServiceCategories) => {
		setServiceDataOnContext({ category: categoryName })
		navigation.navigate('SelectServiceTags', { categorySelected: categoryName, ...route.params })
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
					fontSize={17}
					message={'em qual categoria seu post se encaixa?'}
					highlightedWords={['categoria', 'seu', 'post']}
				>
					<ProgressBar
						range={5}
						value={1}
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
						height={relativeScreenHeight(11)}
						label={'outros'}
						boldLabel
						onSelect={() => onSelectCategory('others' as ServiceCategories)}
					/>
				</SelectButtonsContainer>
			</ScrollView>
		</Container>
	)
}

export { SelectServiceCategory }
