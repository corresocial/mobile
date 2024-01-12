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

	const saveNIS = async (NISValue: string) => {
		const cleanValue = NISValue.trim()
		// validação
		const response = await makeQueryOnSmasService(cleanValue)

		navigation.navigate('QueryByNISResult', { ...response } as any) // TODO type correctly
	}

	const makeQueryOnSmasService = async (NIS: string) => {
		switch (smasService) {
			case 'beneficioEmergencial': return {
				smasService,
				NIS,
				status: 'granted',
				grantDate: 'xx/xx/xxxx',
				expectedDate: 'xx/xx/xxxx'
			}
			case 'bolsaFamilia': return {
				smasService,
				NIS,
				status: 'granted',
				familyBagName: 'Leandro Pereira', // TODO fix types
				familyBagValue: 'R$500,00'
			}
			case 'cadUnico': return {
				smasService,
				NIS,
				status: 'granted',
				grantDate: 'xx/xx/xxxx'
			}
		}
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
