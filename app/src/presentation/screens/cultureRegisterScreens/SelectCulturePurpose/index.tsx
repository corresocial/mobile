import React, { useContext } from 'react'

import { CultureContext } from '@contexts/CultureContext'

import { SelectCulturePurposeScreenProps } from '@routes/Stack/CultureStack/screenProps'

import GiftWhiteIcon from '@assets/icons/megaphone-white.svg'
import QuestionMarkWhiteIcon from '@assets/icons/questionMark-white.svg'
import { theme } from '@common/theme'

import { OptionButton } from '@components/_buttons/OptionButton'
import { PostSelectButton } from '@components/_onboarding/PostSelectButton'

function SelectCulturePurpose({ route, navigation }: SelectCulturePurposeScreenProps) {
	const { isSecondPost, setCultureDataOnContext } = useContext(CultureContext)

	const saveCulturePurpose = (lookingFor: boolean) => {
		setCultureDataOnContext({ lookingFor })
		navigation.navigate('SelectCultureCategory')
	}

	return (
		<PostSelectButton
			title={'você está procurando ou anunciando isso?'}
			highlightedWords={['procurando', 'anunciando']}
			headerBackgroundColor={theme.colors.blue[2]}
			backgroundColor={theme.colors.white[3]}
			progress={[1, isSecondPost ? 4 : 5]}
			navigateBackwards={() => navigation.goBack()}
		>
			<OptionButton
				label={'procurando'}
				highlightedWords={['procurando']}
				labelSize={18}
				relativeHeight={'28%'}
				SvgIcon={QuestionMarkWhiteIcon}
				svgIconScale={['40%', '40%']}
				leftSideColor={theme.colors.blue[3]}
				leftSideWidth={'25%'}
				onPress={() => saveCulturePurpose(true)}
			/>
			<OptionButton
				label={'divulgando'}
				highlightedWords={['divulgando']}
				labelSize={18}
				relativeHeight={'28%'}
				SvgIcon={GiftWhiteIcon}
				svgIconScale={['60%', '60%']}
				leftSideColor={theme.colors.blue[3]}
				leftSideWidth={'25%'}
				onPress={() => saveCulturePurpose(false)}
			/>
		</PostSelectButton>
	)
}

export { SelectCulturePurpose }
