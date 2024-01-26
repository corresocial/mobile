import React from 'react'

import { QueryBeeResult, QueryCadunicoResult, QueryPbfResult } from '@domain/entities/smas/types'

import { InsertNISScreenProps } from '@routes/Stack/PublicServicesStack/stackScreenProps'

import { getUserSmasData } from '@services/cloudFunctions/getUserSmasData'

import QuestionMarkWhiteIcon from '@assets/icons/questionMark-white.svg'
import { theme } from '@common/theme'

import { PublicServicesAdapter } from '@adapters/publicService/PublicServiceAdapter'

import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { PostInputText } from '@components/_onboarding/PostInputText'

const { validateNIS } = PublicServicesAdapter()

const { treatSmasApiResponse } = PublicServicesAdapter()

function InsertNIS({ route, navigation }: InsertNISScreenProps) {
	const [isLoading, setIsLoading] = React.useState(false)

	const { smasService } = route.params

	const saveNIS = async (NISValue: string) => {
		try {
			setIsLoading(true)
			const response = await getUserSmasData(NISValue.trim(), smasService)

			const queryResult = treatSmasApiResponse(response, smasService)

			setIsLoading(false)
			if (smasService === 'BEE') return navigation.navigate('QueryBeeByNISResult', { ...queryResult } as QueryBeeResult)
			if (smasService === 'PBF') return navigation.navigate('QueryPbfByNISResult', { ...queryResult, NIS: NISValue } as QueryPbfResult)
			if (smasService === 'CADUNICO') return navigation.navigate('QueryCadunicoByNISResult', { ...queryResult, NIS: NISValue } as QueryCadunicoResult)
		} catch (error) {
			setIsLoading(false)
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
				backgroundColor={theme.pink2}
				height={'45%'}
				inputPlaceholder={'12345678910'}
				isLoading={isLoading}
				// initialValue={'11223312341'}
				keyboardType={'number-pad'}
				validationColor={theme.pink1}
				validateInputText={validateNIS}
				navigateBackwards={() => navigation.goBack()}
				saveTextData={saveNIS}
			>
				<PrimaryButton
					label={'não sei meu NIS'}
					highlightedWords={['NIS']}
					color={theme.yellow3}
					SecondSvgIcon={QuestionMarkWhiteIcon}
					onPress={navigateToQueryNIS}
				/>
			</PostInputText>
		</>
	)
}

export { InsertNIS }
