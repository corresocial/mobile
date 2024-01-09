import React from 'react'

import { InsertNISScreenProps } from '@routes/Stack/PublicServicesStack/stackScreenProps'

import QuestionMarkWhiteIcon from '@assets/icons/questionMark-white.svg'
import { theme } from '@common/theme'

import { PublicServicesAdapter } from '@adapters/publicService/PublicServiceAdapter'

import { PrimaryButton } from '@components/_buttons/PrimaryButton'
import { PostInputText } from '@components/_onboarding/PostInputText'

const { validateNIS } = PublicServicesAdapter()

function InsertNIS({ route, navigation }: InsertNISScreenProps) {
	const saveNIS = (NISValue: string) => {
		const cleanValue = NISValue.trim()
		console.log(cleanValue)
	}

	const getContextTitle = () => {
		return 'consultar bolsa família'
	}

	return (
		<>
			<PostInputText
				customTitle={'nos informe seu NIS'}
				customHighlight={['NIS']}
				contextTitle={getContextTitle()}
				backgroundColor={theme.pink2}
				height={'45%'}
				inputPlaceholder={'12345678910'}
				keyboardType={'number-pad'}
				validationColor={theme.pink1}
				validateInputText={validateNIS}
				progress={[1, 3]}
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
