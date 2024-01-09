import React from 'react'

import { InsertNISScreenProps } from '@routes/Stack/PublicServicesStack/stackScreenProps'

import QuestionMarkWhiteIcon from '@assets/icons/questionMark-white.svg'
import { theme } from '@common/theme'

import { PublicServicesAdapter } from '@adapters/publicService/PublicServiceAdapter'

import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { PostInputText } from '@components/_onboarding/PostInputText'

const { validateNIS } = PublicServicesAdapter()

function InsertNIS({ route, navigation }: InsertNISScreenProps) {
	const { smasService } = route.params

	const saveNIS = (NISValue: string) => {
		const cleanValue = NISValue.trim()
		console.log(cleanValue)

		navigation.navigate('QueryResult')
	}

	const getContextTitle = () => {
		switch (smasService) {
			case 'beneficioEmergencial': return 'consultar benefício emergencial'
			case 'bolsaFamilia': return 'consultar bolsa família'
			case 'cadUnico': return 'veja se seu cadastro único está atualizado'
		}
	}

	const getContextHighlightedWords = () => {
		switch (smasService) {
			case 'beneficioEmergencial': return ['benefício', 'emergencial']
			case 'bolsaFamilia': return ['bolsa', 'família']
			case 'cadUnico': return ['cadastro', 'único', 'atualizado']
		}
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
					onPress={() => console.log('navigateTONãoSEIMEUNIS')}
				/>
			</PostInputText>
		</>
	)
}

export { InsertNIS }
