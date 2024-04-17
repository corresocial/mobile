import React from 'react'
import { useTheme } from 'styled-components'

import { SelectLeaderPostTypeScreenProps } from '@routes/Stack/UserStack/screenProps'

import DescriptionWhiteIcon from '@assets/icons/description-white.svg'
import FormHeartWhiteIcon from '@assets/icons/formHearth-white.svg'

import { OptionButton } from '@components/_buttons/OptionButton'
import { PostSelectButton } from '@components/_onboarding/PostSelectButton'

function SelectLeaderPostType({ route, navigation }: SelectLeaderPostTypeScreenProps) {
	const theme = useTheme()

	const navigateToPollRegister = () => {
		navigation.navigate('PollStack')
	}

	const navigateToUndersignedRegister = () => {
		console.log('Abaixo assinado')
	}

	return (
		<PostSelectButton
			title={'você quer criar uma enquete ou abaixo assinado?'}
			highlightedWords={['enquete', 'abaixo', 'assinado']}
			headerBackgroundColor={theme.purple2}
			backgroundColor={theme.white3}
			navigateBackwards={() => navigation.goBack()}
		>
			<OptionButton
				label={'uma enquete'}
				highlightedWords={['enquete']}
				labelSize={18}
				relativeHeight={'28%'}
				SvgIcon={DescriptionWhiteIcon}
				svgIconScale={['50%', '50%']}
				leftSideColor={theme.purple3}
				leftSideWidth={'25%'}
				onPress={navigateToPollRegister}
			/>
			<OptionButton
				label={'um abaixo \nassinado'}
				highlightedWords={['abaixo', '\nassinado']}
				labelSize={18}
				relativeHeight={'28%'}
				SvgIcon={FormHeartWhiteIcon}
				svgIconScale={['85%', '85%']}
				leftSideColor={theme.purple3}
				leftSideWidth={'25%'}
				onPress={navigateToUndersignedRegister}
			/>
		</PostSelectButton>
	)
}

export { SelectLeaderPostType }
