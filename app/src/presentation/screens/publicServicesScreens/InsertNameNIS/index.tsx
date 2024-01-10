import React from 'react'

import { InsertNameNISScreenProps } from '@routes/Stack/PublicServicesStack/stackScreenProps'

import { theme } from '@common/theme'

import { PublicServicesAdapter } from '@adapters/publicService/PublicServiceAdapter'

import { PostInputText } from '@components/_onboarding/PostInputText'

const { validateNIS } = PublicServicesAdapter()

function InsertNameNIS({ route, navigation }: InsertNameNISScreenProps) {
	const saveNIS = async (NISValue: string) => {

	}

	return (
		<>
			<PostInputText
				customTitle={'nos informe seu nome completo sem acentos'}
				customHighlight={['nome', 'completo', 'sem', 'acentos']}
				contextTitle={'consultar NIS'}
				contextHighlightedWords={['NIS']}
				backgroundColor={theme.pink2}
				height={'45%'}
				inputPlaceholder={'ex: Maria Candida'}
				validationColor={theme.pink1}
				validateInputText={validateNIS}
				navigateBackwards={() => navigation.goBack()}
				saveTextData={saveNIS}
			/>
		</>
	)
}

export { InsertNameNIS }
