import React, { useContext, useEffect } from 'react'

import { ServiceContext } from '@contexts/ServiceContext'

import GiftWhiteIcon from '@assets/icons/megaphone-white.svg'
import QuestionMarkWhiteIcon from '@assets/icons/questionMark-white.svg'
import { theme } from '@common/theme'

import { OptionButton } from '@components/_buttons/OptionButton'
import { PostSelectButton } from '@components/_onboarding/PostSelectButton'

import { SelectServicePurposeScreenProps } from '../../../routes/Stack/ServiceStack/stackScreenProps'

function SelectServicePurpose({ route, navigation }: SelectServicePurposeScreenProps) {
	const { isSecondPost, setServiceDataOnContext, getAditionalDataFromLastPost } = useContext(ServiceContext)
	// const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	useEffect(() => {
		if (!route.params?.editMode) {
			getAditionalDataFromLastPost()
		}
	}, [])

	// const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const saveServicePurpose = (lookingFor: boolean) => {
		/* if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ lookingFor })
			navigation.goBack()
			return
		} */

		setServiceDataOnContext({ lookingFor })
		navigation.navigate('SelectServiceCategory')
	}

	return (
		<PostSelectButton
			title={'você está procurando ou anunciando este serviço?'}
			highlightedWords={['procurando', 'anunciando']}
			headerBackgroundColor={theme.green2}
			backgroundColor={theme.white3}
			progress={[1, isSecondPost ? 5 : 5]}
			navigateBackwards={() => navigation.goBack()}
		>
			<OptionButton
				label={'procurando'}
				highlightedWords={['procurando']}
				labelSize={18}
				relativeHeight={'28%'}
				SvgIcon={QuestionMarkWhiteIcon}
				svgIconScale={['40%', '40%']}
				leftSideColor={theme.green3}
				leftSideWidth={'25%'}
				onPress={() => saveServicePurpose(true)}
			/>
			<OptionButton
				label={'anunciando'}
				highlightedWords={['anunciando']}
				labelSize={18}
				relativeHeight={'28%'}
				SvgIcon={GiftWhiteIcon}
				svgIconScale={['60%', '60%']}
				leftSideColor={theme.green3}
				leftSideWidth={'25%'}
				onPress={() => saveServicePurpose(false)}
			/>
		</PostSelectButton>
	)
}

export { SelectServicePurpose }
