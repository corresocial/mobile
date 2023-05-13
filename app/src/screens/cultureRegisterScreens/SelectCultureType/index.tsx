import React, { useContext, useEffect } from 'react'

import { theme } from '../../../common/theme'
import ColorPaletWhiteIcon from '../../../assets/icons/colorPalet-white.svg'
import CalendarEverydayWhiteIcon from '../../../assets/icons/calendarEveryday-unfilled.svg'
import BooksWhiteIcon from '../../../assets/icons/books-white.svg'

import { SelectCultureTypeScreenProps } from '../../../routes/Stack/CultureStack/stackScreenProps'
import { CultureType } from '../../../services/firebase/types'

import { CultureContext } from '../../../contexts/CultureContext'
import { EditContext } from '../../../contexts/EditContext'

import { PrimaryButton } from '../../../components/_buttons/PrimaryButton'
import { PostSelectButton } from '../../../components/_onboarding/PostSelectButton'

function SelectCultureType({ route, navigation }: SelectCultureTypeScreenProps) {
	const { setCultureDataOnContext, getAditionalDataFromLastPost } = useContext(CultureContext)
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
			backgroundColor={theme.blue2}
			navigateBackwards={() => navigation.goBack()}
		>
			<PrimaryButton
				justifyContent={'space-around'}
				color={theme.white3}
				relativeHeight={'22%'}
				labelColor={theme.black4}
				SecondSvgIcon={ColorPaletWhiteIcon}
				label={'postando arte'}
				highlightedWords={['postando']}
				onPress={() => saveWorkplaceType('art')}
			/>
			<PrimaryButton
				justifyContent={'space-around'}
				color={theme.white3}
				relativeHeight={'22%'}
				labelColor={theme.black4}
				SecondSvgIcon={CalendarEverydayWhiteIcon}
				label={'postando evento'}
				highlightedWords={['postando']}
				onPress={() => saveWorkplaceType('event')}
			/>
			<PrimaryButton
				justifyContent={'space-around'}
				color={theme.white3}
				relativeHeight={'22%'}
				labelColor={theme.black4}
				SecondSvgIcon={BooksWhiteIcon}
				label={'postando educação'}
				highlightedWords={['postando']}
				onPress={() => saveWorkplaceType('education')}
			/>
		</PostSelectButton>
	)
}

export { SelectCultureType }
