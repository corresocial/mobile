import React from 'react'
import { ListRenderItem } from 'react-native'
import { useTheme } from 'styled-components'

import { CitizenOfflineRegistrationListProps } from '@routes/Stack/CitizenRegistrationStack/screenProps'
import { FlatListItem } from 'src/presentation/types'

import { Body, Header, QuestionaryList, SaveButtonContainer } from './styles'
import AngleRightWhiteIcon from '@assets/icons/angleRight-white.svg'

import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { CitizenQuestionaryCard } from '@components/_cards/CitizenQuestionaryCard'
import { ScreenContainer } from '@components/_containers/ScreenContainer'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { DefaultPostViewHeader } from '@components/DefaultPostViewHeader'

export interface CitizenRegistrationQuestionary {
	registerId: string
	nome: string
	censusTakerName: string,
	createdAt: Date
	[key: string]: any // CURRENT Tipagem de enquetes
}

function CitizenOfflineRegistrationList({ navigation }: CitizenOfflineRegistrationListProps) {
	const theme = useTheme()

	const data = [
		{
			registerId: '1',
			name: 'Mariquina',
			censusTakerName: 'Wellington',
			createdAt: new Date()
		},
		{
			registerId: '2',
			name: 'Luis',
			censusTakerName: 'Wellington',
			createdAt: new Date()
		},
		{
			registerId: '3',
			name: 'Eduardo',
			censusTakerName: 'Wellington',
			createdAt: new Date()
		}
	]

	const renderQuestionary = ({ item }: FlatListItem<CitizenRegistrationQuestionary>) => {
		return (
			<CitizenQuestionaryCard
				questionaryData={item}
				onPress={() => console.log(item.registerId)}
			/>
		)
	}

	return (
		<ScreenContainer topSafeAreaColor={theme.orange1} infinityBottom>
			<Header>
				<DefaultPostViewHeader
					text={'seus cadastros não enviados'}
					highlightedWords={['cadastros', 'não', 'enviados']}
					ignorePlatform
					onBackPress={() => navigation.goBack()}
				/>
				<SaveButtonContainer>
					<PrimaryButton
						label={'enviar'}
						color={theme.green3}
						SecondSvgIcon={AngleRightWhiteIcon}
						labelColor={theme.white3}
						onPress={() => console.log('enviar')}
					/>
				</SaveButtonContainer>
			</Header>
			<Body>
				<QuestionaryList
					data={data}
					renderItem={renderQuestionary as ListRenderItem<unknown>}
					ListHeaderComponent={<VerticalSpacing height={2} />}
					ItemSeparatorComponent={() => <VerticalSpacing />}
					ListFooterComponent={<VerticalSpacing bottomNavigatorSpace />}
					showsVerticalScrollIndicator={false}
				/>
			</Body>
		</ScreenContainer>

	)
}

export { CitizenOfflineRegistrationList }
