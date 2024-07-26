import React, { useEffect, useState } from 'react'
import { ActivityIndicator, ListRenderItem, RefreshControl } from 'react-native'
import { useTheme } from 'styled-components'

import { useUtils } from '@newutils/useUtils'
import { useQueryClient } from '@tanstack/react-query'

import { CitizenRegisterUseCases } from '@domain/citizenRegister/adapter/CitizenRegisterUseCases'
import { CitizenRegisterEntity } from '@domain/citizenRegister/model/entities/types'
import { getNewDate } from '@domain/shared/utils/datetime'

import { useCacheRepository } from '@data/application/cache/useCacheRepository'

import { useAuthContext } from '@contexts/AuthContext'
import { useLoaderContext } from '@contexts/LoaderContext'

import { CitizenRegistrationMonitoringScreenProps } from '@routes/Stack/CitizenRegistrationStack/screenProps'
import { FlatListItem } from 'src/presentation/types'

import { Body, Header, QuestionaryList } from './styles'

import { CitizenQuestionaryCard } from '@components/_cards/CitizenQuestionaryCard'
import { ScreenContainer } from '@components/_containers/ScreenContainer'
import { VerticalSpacing } from '@components/_space/VerticalSpacing'
import { DefaultPostViewHeader } from '@components/DefaultPostViewHeader'

const { getLastItem } = useUtils()
const { executeCachedRequest } = useCacheRepository()

const citizenUseCases = new CitizenRegisterUseCases()

function CitizenRegistrationMonitoring({ navigation }: CitizenRegistrationMonitoringScreenProps) {
	const { setLoaderIsVisible } = useLoaderContext()
	const { userDataContext } = useAuthContext()

	const theme = useTheme()
	const queryClient = useQueryClient()

	const [citizenRecordsOfQuestionnaireAdministrators, setCitizenRecordsOfQuestionnaireAdministrators] = useState<CitizenRegisterEntity[]>([])
	const [isLoadingMore, setIsLoadingMore] = useState(false)
	const [isRefreshing, setIsRefreshing] = useState(false)
	const [listIsOver, setListIsOver] = useState(false)

	useEffect(() => {
		loadCitizenRegistrationByCoordinator(false, true)
	}, [])

	const loadCitizenRegistrationByCoordinator = async (refresh?: boolean, firstLoad?: boolean) => {
		try {
			if (listIsOver && !refresh) return

			firstLoad ? setLoaderIsVisible(true) : setIsLoadingMore(true)
			refresh && setIsRefreshing(true)

			const lastCitizenRegister = !refresh && (citizenRecordsOfQuestionnaireAdministrators && citizenRecordsOfQuestionnaireAdministrators.length) ? getLastItem(citizenRecordsOfQuestionnaireAdministrators) : undefined

			const queryKey = ['user.citizenRegisters', userDataContext.userId, lastCitizenRegister]
			let citizenRegisters: CitizenRegisterEntity[] = await executeCachedRequest(
				queryClient,
				queryKey,
				() => citizenUseCases.getCitizenRegistrationsByCoordinatorResponsability(userDataContext, 10, lastCitizenRegister),
				refresh
			)
			citizenRegisters = citizenRegisters.map((p: CitizenRegisterEntity) => ({ ...p, createdAt: getNewDate(p.createdAt) }))

			if (!citizenRegisters || (citizenRegisters && !citizenRegisters.length)
				|| (lastCitizenRegister && citizenRegisters && citizenRegisters.length && (lastCitizenRegister.citizenRegisterId === getLastItem(citizenRegisters)?.citizenRegisterId))) {
				return setListIsOver(true)
			}

			if (refresh) {
				queryClient.removeQueries({ queryKey: ['user.citizenRegisters', userDataContext.userId] })
				setCitizenRecordsOfQuestionnaireAdministrators([...citizenRegisters])
				setListIsOver(false)
			} else {
				setCitizenRecordsOfQuestionnaireAdministrators([...citizenRecordsOfQuestionnaireAdministrators, ...citizenRegisters])
			}
		} catch (error) {
			console.log(error)
		} finally {
			setLoaderIsVisible(false)
			setIsLoadingMore(false)
			setIsRefreshing(false)
		}
	}

	const loadMorePolls = async () => {
		return citizenRecordsOfQuestionnaireAdministrators.length ? loadCitizenRegistrationByCoordinator() : null
	}

	const viewCitizenRegister = async (citizenRegister: CitizenRegisterEntity) => {
		navigation.navigate('CitizenQuestionaryPreview', { registerData: citizenRegister })
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
					text={'Cadastro cidadãos realizados'}
					highlightedWords={['Cadastro', 'cidadãos', 'enviados']}
					ignorePlatform
					onBackPress={() => navigation.goBack()}
				/>
			</Header>
			<Body>
				<QuestionaryList
					data={citizenRecordsOfQuestionnaireAdministrators}
					renderItem={renderQuestionary as ListRenderItem<unknown>}
					onEndReached={loadMorePolls}
					refreshControl={(
						<RefreshControl
							tintColor={theme.black4}
							colors={[theme.orange3, theme.pink3, theme.green3, theme.blue3]}
							refreshing={isRefreshing}
							onRefresh={() => loadCitizenRegistrationByCoordinator(true)}
						/>
					)}
					ListHeaderComponent={<VerticalSpacing height={2} />}
					ItemSeparatorComponent={() => <VerticalSpacing />}
					ListFooterComponent={isLoadingMore ? <ActivityIndicator size={'large'} color={'black'} style={{ paddingVertical: 30 }} /> : <VerticalSpacing bottomNavigatorSpace />}
					showsVerticalScrollIndicator={false}
				/>
			</Body>
		</ScreenContainer>

	)
}

export { CitizenRegistrationMonitoring }
