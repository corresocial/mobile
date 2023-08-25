import React, { useContext, useEffect } from 'react'

import { theme } from '../../../common/theme'
import ColorPaletWhiteIcon from '../../../assets/icons/colorPalet-white.svg'
import CalendarEverydayWhiteIcon from '../../../assets/icons/calendarSomeday-white.svg'
import BooksWhiteIcon from '../../../assets/icons/books-white.svg'

import { SelectCultureTypeScreenProps } from '../../../routes/Stack/CultureStack/stackScreenProps'
import { CultureType } from '../../../services/firebase/types'

import { CultureContext } from '../../../contexts/CultureContext'
import { EditContext } from '../../../contexts/EditContext'

import { PostSelectButton } from '../../../components/_onboarding/PostSelectButton'
import { OptionButton } from '../../../components/_buttons/OptionButton'

function SelectCultureType({ route, navigation }: SelectCultureTypeScreenProps) {
	const { isSecondPost, setCultureDataOnContext, getAditionalDataFromLastPost } = useContext(CultureContext)
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	useEffect(() => {
		if (!route.params?.editMode) {
			getAditionalDataFromLastPost()
		}
	}, [])

	const saveWorkplaceType = (cultureType: CultureType) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ cultureType })
			navigation.goBack()
			return
		}

		setCultureDataOnContext({ cultureType })
		navigation.navigate('SelectCultureCategory')
	}

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	return (
		<PostSelectButton
			title={'você está \npostando sobre arte, \num evento ou educação?'}
			highlightedWords={['arte', 'evento', 'educação']}
			headerBackgroundColor={theme.blue2}
			backgroundColor={theme.white3}
			progress={[1, isSecondPost ? 4 : 5]}
			navigateBackwards={() => navigation.goBack()}
		>
			<OptionButton
				label={'postando arte'}
				highlightedWords={['arte']}
				labelSize={18}
				relativeHeight={'25%'}
				SvgIcon={ColorPaletWhiteIcon}
				svgIconScale={['50%', '50%']}
				leftSideColor={theme.blue3}
				leftSideWidth={'25%'}
				onPress={() => saveWorkplaceType('art')}
			/>
			<OptionButton
				label={'postando evento'}
				highlightedWords={['evento']}
				labelSize={18}
				relativeHeight={'25%'}
				SvgIcon={CalendarEverydayWhiteIcon}
				svgIconScale={['70%', '70%']}
				leftSideColor={theme.blue3}
				leftSideWidth={'25%'}
				onPress={() => saveWorkplaceType('event')}
			/>
			<OptionButton
				label={'postando educação'}
				highlightedWords={['educação']}
				labelSize={18}
				relativeHeight={'25%'}
				SvgIcon={BooksWhiteIcon}
				svgIconScale={['60%', '60%']}
				leftSideColor={theme.blue3}
				leftSideWidth={'25%'}
				onPress={() => saveWorkplaceType('education')}
			/>
		</PostSelectButton>
	)
}

export { SelectCultureType }
