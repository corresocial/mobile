import React, { useContext } from 'react'
import { ScrollView, StatusBar } from 'react-native'
import uuid from 'react-uuid'

import { Container } from './styles'
import { theme } from '../../../common/theme'
import { screenHeight } from '../../../common/screenDimensions'

import { socialImpactCategories } from '../../../utils/postsCategories/socialImpactCategories'

import { SelectSocialImpactCategoryScreenProps } from '../../../routes/Stack/SocialImpactStack/stackScreenProps'
import { SocialImpactCategories } from '../../../services/firebase/types'

import { SocialImpactContext } from '../../../contexts/SocialImpactContext'

import { DefaultHeaderContainer } from '../../../components/_containers/DefaultHeaderContainer'
import { SelectButtonsContainer } from '../../../components/_containers/SelectButtonsContainer'
import { SelectButton } from '../../../components/_buttons/SelectButton'
import { BackButton } from '../../../components/_buttons/BackButton'
import { InstructionCard } from '../../../components/_cards/InstructionCard'
import { ProgressBar } from '../../../components/ProgressBar'
import { sortPostCategories } from '../../../common/auxiliaryFunctions'

function SelectSocialImpactCategory({ route, navigation }: SelectSocialImpactCategoryScreenProps) {
	const { setSocialImpactDataOnContext } = useContext(SocialImpactContext)

	const renderSelectOptionsButtons = () => {
		const ordenedSocialImpactCategories = Object.values(socialImpactCategories).sort(sortPostCategories)

		return ordenedSocialImpactCategories.map((category) => {
			if (category.label === 'outros') return
			return (
				<SelectButton
					key={uuid()}
					width={'45%'}
					height={screenHeight * 0.11}
					label={category.label}
					boldLabel
					onSelect={() => onSelectCategory(category.value as SocialImpactCategories)}
				/>
			)
		})
	}

	const onSelectCategory = (categoryName: SocialImpactCategories) => {
		setSocialImpactDataOnContext({
			category: categoryName
		})
		navigation.navigate('SelectSocialImpactTags', {
			categorySelected: categoryName,
			...route.params
		})
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
					message={'em qual categoria se encaixa?'}
					highlightedWords={['categoria']}
				>
					<ProgressBar
						range={5}
						value={1}
					/>
				</InstructionCard>
			</DefaultHeaderContainer>
			<ScrollView style={{
				backgroundColor: theme.pink2
			}}
			>
				<SelectButtonsContainer
					backgroundColor={theme.pink2}
				>
					{renderSelectOptionsButtons() as any}
					<SelectButton
						key={'others'}
						width={'100%'}
						height={screenHeight * 0.11}
						label={'outros'}
						boldLabel
						onSelect={() => onSelectCategory('others' as SocialImpactCategories)}
					/>
				</SelectButtonsContainer>
			</ScrollView>
		</Container>
	)
}

export { SelectSocialImpactCategory }
