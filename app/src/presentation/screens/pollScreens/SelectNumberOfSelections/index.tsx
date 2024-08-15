import React from 'react'
import { useTheme } from 'styled-components'

import { SelectNumberOfSelectionsScreenProps } from '@routes/Stack/PollStack/screenProps'

import CheckWhiteIcon from '@assets/icons/check-white.svg'
import ChecksWhiteIcon from '@assets/icons/checks-white.svg'

import { OptionButton } from '@components/_buttons/OptionButton'
import { PostSelectButton } from '@components/_onboarding/PostSelectButton'

function SelectNumberOfSelections({ route, navigation }: SelectNumberOfSelectionsScreenProps) {
	const theme = useTheme()

	const selectNumberOfSelectableOptions = (multiSelect: boolean) => {
		navigation.push('InsertPollSelectOptions', { ...route.params, multiSelect })
	}

	return (
		<PostSelectButton
			title={'que tipo de resposta você quer?'}
			highlightedWords={['tipo', 'resposta']}
			headerBackgroundColor={theme.colors.purple[2]}
			progress={[3, 4]}
			backgroundColor={theme.colors.white[3]}
			navigateBackwards={() => navigation.goBack()}
		>
			<OptionButton
				label={'somente uma resposta'}
				highlightedWords={['resposta']}
				labelSize={15}
				relativeHeight={'25%'}
				SvgIcon={CheckWhiteIcon}
				svgIconScale={['50%', '50%']}
				leftSideColor={theme.colors.purple[3]}
				leftSideWidth={'25%'}
				onPress={() => selectNumberOfSelectableOptions(false)}
			/>
			<OptionButton
				label={'duas ou mais respostas'}
				highlightedWords={['respostas']}
				labelSize={15}
				relativeHeight={'25%'}
				SvgIcon={ChecksWhiteIcon}
				svgIconScale={['70%', '70%']}
				leftSideColor={theme.colors.purple[3]}
				leftSideWidth={'25%'}
				onPress={() => selectNumberOfSelectableOptions(true)}
			/>
		</PostSelectButton>
	)
}

export { SelectNumberOfSelections }
