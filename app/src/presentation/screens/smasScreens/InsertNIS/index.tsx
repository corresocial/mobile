import React, { useEffect } from 'react'

import { sendEvent } from '@newutils/methods/analyticsEvents'

import { QueryBeeResult, QueryCadunicoResult, QueryPbfResult } from '@domain/smas/entity/types'
import { useSmasDomain } from '@domain/smas/useSmasDomain'

import { useSmasRepository } from '@data/smas/useSmasRepository'

import { useAuthContext } from '@contexts/AuthContext'

import { InsertNISScreenProps } from '@routes/Stack/PublicServicesStack/screenProps'

import { useCloudFunctionService } from '@services/cloudFunctions/useCloudFunctionService'

import QuestionMarkWhiteIcon from '@assets/icons/questionMark-white.svg'
import { theme } from '@common/theme'

import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { PostInputText } from '@components/_onboarding/PostInputText'

const { getBenefitDataSmasByNis } = useCloudFunctionService()
const { getNisFromLocalRepository, treatSmasApiResponse, validateNIS } = useSmasDomain()

function InsertNIS({ route, navigation }: InsertNISScreenProps) {
	const { userDataContext } = useAuthContext()

	const [isLoading, setIsLoading] = React.useState(false)
	const [storagedNis, setStoragedNis] = React.useState<string>('')

	const { smasService } = route.params

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			loadStoragedNis()
		})
		return unsubscribe
	}, [navigation])

	const loadStoragedNis = async () => {
		const nis = await getNisFromLocalRepository(useSmasRepository)
		if (nis) {
			storagedNis !== nis && setStoragedNis('')
			setStoragedNis(nis)
		}
	}

	const searchByNIS = async (NISValue: string) => {
		try {
			setIsLoading(true)
			const response = await getBenefitDataSmasByNis(NISValue.trim(), smasService, userDataContext.userId)

			const queryResult = treatSmasApiResponse(response, smasService)

			setIsLoading(false)
			if (smasService === 'BEE') return navigation.navigate('QueryBeeByNISResult', { ...queryResult } as QueryBeeResult)
			if (smasService === 'PBF') return navigation.navigate('QueryPbfByNISResult', { ...queryResult, NIS: NISValue } as QueryPbfResult)
			if (smasService === 'CADUNICO') return navigation.navigate('QueryCadunicoByNISResult', { ...queryResult, NIS: NISValue } as QueryCadunicoResult)
		} catch (error) {
			setIsLoading(false)
			sendEvent('smas_search', { smasService: smasService as any, smasResponse: 'failed' })
			console.log(error)
		}
	}

	const getContextTitle = () => {
		switch (smasService) {
			case 'BEE': return 'consultar benefício emergencial'
			case 'PBF': return 'consultar bolsa família'
			case 'CADUNICO': return 'veja se seu cadastro único está atualizado'
		}
	}

	const getContextHighlightedWords = () => {
		switch (smasService) {
			case 'BEE': return ['benefício', 'emergencial']
			case 'PBF': return ['bolsa', 'família']
			case 'CADUNICO': return ['cadastro', 'único', 'atualizado']
		}
	}

	const navigateToQueryNIS = () => {
		navigation.navigate('InsertNameNIS')
	}

	return (
		<>
			<PostInputText
				customTitle={'nos informe seu NIS'}
				customHighlight={['NIS']}
				contextTitle={getContextTitle()}
				contextHighlightedWords={getContextHighlightedWords()}
				backgroundColor={theme.colors.pink[2]}
				height={'45%'}
				inputPlaceholder={'12345678910'}
				isLoading={isLoading}
				initialValue={storagedNis}
				keyboardType={'number-pad'}
				validationColor={theme.colors.pink[1]}
				validateInputText={validateNIS}
				navigateBackwards={() => navigation.goBack()}
				saveTextData={searchByNIS}
			>
				<PrimaryButton
					label={'não sei meu NIS'}
					highlightedWords={['NIS']}
					color={theme.colors.yellow[3]}
					SecondSvgIcon={QuestionMarkWhiteIcon}
					onPress={navigateToQueryNIS}
				/>
			</PostInputText>
		</>
	)
}

export { InsertNIS }
