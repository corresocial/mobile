import React, { useContext, useEffect } from 'react'

import { theme } from '../../../common/theme'
import QuestionMarkWhiteIcon from '../../../assets/icons/questionMark-white.svg'
import GiftWhiteIcon from '../../../assets/icons/megaphone-white.svg'

import { SelectCulturePurposeScreenProps } from '../../../routes/Stack/CultureStack/stackScreenProps'

import { CultureContext } from '../../../contexts/CultureContext'
import { EditContext } from '../../../contexts/EditContext'

import { PostSelectButton } from '../../../components/_onboarding/PostSelectButton'
import { OptionButton } from '../../../components/_buttons/OptionButton'

function SelectCulturePurpose({ route, navigation }: SelectCulturePurposeScreenProps) {
	const { isSecondPost, setCultureDataOnContext, getAditionalDataFromLastPost } = useContext(CultureContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	useEffect(() => {
		if (!route.params?.editMode) {
			getAditionalDataFromLastPost()
		}
	}, [])

	// const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const saveCulturePurpose = (lookingFor: boolean) => {
		/* if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ itemStatus })
			navigation.goBack()
			return
		} */

		setCultureDataOnContext({ lookingFor })
		navigation.navigate('SelectCultureCategory')
	}

	return (
		<PostSelectButton
			title={'você está procurando ou anunciando isso?'}
			highlightedWords={['procurando', 'anunciando']}
			headerBackgroundColor={theme.blue2}
			backgroundColor={theme.white3}
			progress={[2, isSecondPost ? 4 : 5]}
			navigateBackwards={() => navigation.goBack()}
		>
			<OptionButton
				label={'procurando'}
				highlightedWords={['procurando']}
				labelSize={18}
				relativeHeight={'28%'}
				SvgIcon={QuestionMarkWhiteIcon}
				svgIconScale={['40%', '40%']}
				leftSideColor={theme.blue3}
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
				leftSideColor={theme.blue3}
				leftSideWidth={'25%'}
				onPress={() => saveCulturePurpose(false)}
			/>
		</PostSelectButton>
	)
}

export { SelectCulturePurpose }
