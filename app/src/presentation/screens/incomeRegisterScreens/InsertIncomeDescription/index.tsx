import React, { useEffect, useState } from 'react'
import { Keyboard, StatusBar } from 'react-native'

import { useEditContext } from '@contexts/EditContext'
import { useIncomeContext } from '@contexts/IncomeContext'

import { InsertIncomeDescriptionScreenProps } from '@routes/Stack/IncomeStack/screenProps'

import { removeAllKeyboardEventListeners } from '@common/listenerFunctions'
import { theme } from '@common/theme'

import { PostInputText } from '@components/_onboarding/PostInputText'

function InsertIncomeDescription({ route, navigation }: InsertIncomeDescriptionScreenProps) {
	const { setIncomeDataOnContext, getAditionalDataFromLastPost } = useIncomeContext()
	const { addNewUnsavedFieldToEditContext } = useEditContext()

	const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)

	useEffect(() => {
		if (!route.params?.editMode) {
			getAditionalDataFromLastPost()
		}
	}, [])

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			removeAllKeyboardEventListeners()
			Keyboard.addListener('keyboardDidShow', () => setKeyboardOpened(true))
			Keyboard.addListener('keyboardDidHide', () => setKeyboardOpened(false))
		})
		return unsubscribe
	}, [navigation])

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const validateSaleDescription = (text: string) => {
		const isValid = (text).trim().length >= 1
		if (isValid && !keyboardOpened) {
			return true
		}
		return false
	}

	// Remova quando encontrar
	// const saveMedia = (picturesUrl: string[], videosUrl: string[]) => {
	// 	if (editModeIsTrue()) {
	// 		addNewUnsavedFieldToEditContext({ picturesUrl, videosUrl })
	// 		return navigation.goBack()
	// 	}

	// 	setIncomeDataOnContext({ picturesUrl, videosUrl })
	// 	customBottomSheetRef.current?.close()
	// }

	const saveSaleDescription = (inputText: string) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ description: inputText })
			navigation.goBack()
			return
		}

		setIncomeDataOnContext({ description: inputText, ...(route.params || {}) })
		navigation.navigate('SelectIncomePostMedia')
	}

	// const customBottomSheetRef = useRef<CustomBottomSheetRef>(null)
	// const showMediaSelect = () => {
	// 	customBottomSheetRef.current?.show()
	// }

	// function getMediaAssets() {
	// 	const photos = (incomeDataContext.picturesUrl || []).filter((url) => !!url)
	// 		.map((url) => ({ url, mediaType: 'photo' }))

	// 	const videos = (incomeDataContext.videosUrl || []).filter((url) => !!url)
	// 		.map((url) => ({ url, mediaType: 'video', /* videoThumbnail: getVideoThumbnail ? getVideoThumbnail((url)) : undefined */ }))

	// 	console.log([...photos, ...videos])
	// 	return [...photos, ...videos] as MediaAsset[]
	// }

	return (
		<>
			<StatusBar backgroundColor={theme.colors.green[2]} barStyle={'dark-content'} />

			<PostInputText
				multiline
				backgroundColor={theme.colors.green[2]}
				validationColor={theme.colors.green[1]}
				initialValue={editModeIsTrue() ? route.params?.initialValue : ''}
				keyboardOpened={keyboardOpened}
				validateInputText={validateSaleDescription}
				navigateBackwards={() => navigation.goBack()}
				saveTextData={saveSaleDescription}
			>
				{/* <>
					<HorizontalListPictures
						mediaAssets={getMediaAssets()}
						onSelectMedia={() => { }}
					/>
					<View style={{ alignSelf: 'center' }}>
						<VerticalSpacing />
						<StandardButton
							icon={'chat'}
							text={'Adicionar foto ou video'}
							relativeWidth={'70%'}
							reversed
							onPress={showMediaSelect}
						/>
					</View>
					<CustomBottomSheet
						ref={customBottomSheetRef}
						initialSnapPoint={1}
						content={(
							<>
								<SelectPostMediaBottomSheet
									saveMedia={saveMedia}
									initialValue={getMediaAssets()}
								/>
							</>
						)}
					/>
				</> */}
			</PostInputText>
		</>
	)
}

export { InsertIncomeDescription }
