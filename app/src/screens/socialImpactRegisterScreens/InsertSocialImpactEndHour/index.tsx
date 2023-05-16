import React, { useContext, useEffect, useState } from 'react'
import { Keyboard, Platform, StatusBar } from 'react-native'

import { theme } from '../../../common/theme'

import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'

import { InsertSocialImpactEndHourScreenProps } from '../../../routes/Stack/SocialImpactStack/stackScreenProps'

import { SocialImpactContext } from '../../../contexts/SocialImpactContext'
import { EditContext } from '../../../contexts/EditContext'

import { PostTime } from '../../../components/_onboarding/PostTime'

function InsertSocialImpactEndHour({ route, navigation }: InsertSocialImpactEndHourScreenProps) {
	const { socialImpactDataContext, setSocialImpactDataOnContext } = useContext(SocialImpactContext)
	const { addNewUnsavedFieldToEditContext, editDataContext } = useContext(EditContext)

	const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			if (Platform.OS === 'android') removeAllKeyboardEventListeners()
			Keyboard.addListener('keyboardDidShow', () => setKeyboardOpened(true))
			Keyboard.addListener('keyboardDidHide', () => setKeyboardOpened(false))
		})
		return unsubscribe
	}, [navigation])

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const skipScreen = () => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ endHour: '' })
			navigation.goBack()
			return
		}

		setSocialImpactDataOnContext({ endHour: '' as any })

		navigation.reset({
			index: 0,
			routes: [{
				name: 'EditSocialImpactPostReview',
				params: {
					postData: { ...socialImpactDataContext, endHour: '' },
					unsavedPost: true
				}
			}]
		})
	}

	const saveEndTime = (hour: string, minutes: string) => {
		const endHour = new Date()
		endHour.setHours(parseInt(hour), parseInt(minutes))

		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ endHour })
			navigation.goBack()
			return
		}

		setSocialImpactDataOnContext({ endHour })

		navigation.reset({
			index: 0,
			routes: [{
				name: 'EditSocialImpactPostReview',
				params: {
					postData: { ...socialImpactDataContext, endHour },
					unsavedPost: true
				}
			}]
		})
	}

	return (
		<>
			<StatusBar backgroundColor={theme.pink2} barStyle={'dark-content'} />
			<PostTime
				backgroundColor={theme.pink2}
				validationColor={theme.pink1}
				customTitle={'que horas você termina?'}
				customHighlight={['que', 'horas', 'termina']}
				editMode={editModeIsTrue()}
				startDate={editDataContext.unsaved.startDate || socialImpactDataContext.startDate}
				endDate={editDataContext.unsaved.startDate || socialImpactDataContext.startDate}
				startTime={editDataContext.unsaved.startHour || socialImpactDataContext.startHour}
				initialValue={editModeIsTrue() ? route.params?.initialValue : ''}
				progress={[4, 4]}
				keyboardOpened={keyboardOpened}
				navigateBackwards={() => navigation.goBack()}
				skipScreen={skipScreen}
				saveTime={saveEndTime}
			/>
		</>
	)
}

export { InsertSocialImpactEndHour }
