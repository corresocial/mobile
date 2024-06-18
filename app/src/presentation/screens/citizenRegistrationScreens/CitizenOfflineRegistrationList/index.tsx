import React, { useEffect, useState } from 'react'
import { ListRenderItem } from 'react-native'
import { useTheme } from 'styled-components'

import { CitizenRegisterUseCases } from '@domain/citizenRegister/adapter/CitizenRegisterUseCases'
import { CitizenRegisterEntity } from '@domain/citizenRegister/model/entities/types'

import { CitizenRegisterLocalRepository } from '@data/citizenRegister/CitizenRegisterLocalRepository'
import { CitizenRegisterRemoteRepository } from '@data/citizenRegister/CitizenRegisterRemoteRepository'

import { useLoaderContext } from '@contexts/LoaderContext'

import { CitizenOfflineRegistrationListProps } from '@routes/Stack/CitizenRegistrationStack/screenProps'
import { FlatListItem } from 'src/presentation/types'

import { Body, Header, QuestionaryList, SaveButtonContainer } from './styles'
import AngleRightWhiteIcon from '@assets/icons/angleRight-white.svg'
import { relativeScreenHeight } from '@common/screenDimensions'

import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { CitizenQuestionaryCard } from '@components/_cards/CitizenQuestionaryCard'
import { ScreenContainer } from '@components/_containers/ScreenContainer'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { DefaultPostViewHeader } from '@components/DefaultPostViewHeader'

function CitizenOfflineRegistrationList({ navigation }: CitizenOfflineRegistrationListProps) {
	const { setLoaderIsVisible } = useLoaderContext()

	const [offlineRegisters, setOfflineRegisters] = useState<CitizenRegisterEntity[]>([])

	const theme = useTheme()

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			loadOfflineRegisters()
		})
		return unsubscribe
	}, [])

	const loadOfflineRegisters = async () => {
		try {
			const registers = await CitizenRegisterUseCases.getOfflineCitizenRegisters(CitizenRegisterLocalRepository)
			setOfflineRegisters(registers.reverse())
		} catch (error) {
			console.log(error)
		}
	}

	const saveOfflineRegistersOnRemoteStorage = async () => {
		try {
			setLoaderIsVisible(true)
			await CitizenRegisterUseCases.sendOfflineRegisters(CitizenRegisterLocalRepository, CitizenRegisterRemoteRepository)
			await loadOfflineRegisters()
			setLoaderIsVisible(false)
		} catch (error) {
			console.log(error)
			setLoaderIsVisible(false)
		}
	}

	const viewCitizenRegister = async (citizenRegister: CitizenRegisterEntity) => {
		navigation.navigate('CitizenQuestionsList', { registerData: citizenRegister })
	}

	const renderQuestionary = ({ item }: FlatListItem<CitizenRegisterEntity>) => {
		return (
			<CitizenQuestionaryCard
				questionaryData={item}
				onPress={() => viewCitizenRegister(item)}
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
						minHeight={relativeScreenHeight(5)}
						relativeHeight={relativeScreenHeight(6)}
						labelColor={theme.white3}
						onPress={saveOfflineRegistersOnRemoteStorage}
					/>
				</SaveButtonContainer>
			</Header>
			<Body>
				<QuestionaryList
					data={offlineRegisters}
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
