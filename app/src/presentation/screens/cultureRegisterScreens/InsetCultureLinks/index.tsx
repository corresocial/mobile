import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useContext, useState } from 'react'
import { Keyboard } from 'react-native'

import { EditContext } from '@contexts/EditContext'

import { InsertCultureLinksScreenProps } from '@routes/Stack/CultureStack/screenProps'

import { theme } from '@common/theme'

import { PostLinks } from '@components/_onboarding/PostLinks/Index'

function InsertCultureLinks({ route, navigation }: InsertCultureLinksScreenProps) {
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const [keyboardOpened, setKeyboardOpened] = useState<boolean>(false)

	useFocusEffect(useCallback(() => {
		const keyboardDidShowSubscription = Keyboard.addListener('keyboardDidShow', () => setKeyboardOpened(true))
		const keyboardDidHideSubscription = Keyboard.addListener('keyboardDidHide', () => setKeyboardOpened(false))
		return () => {
			keyboardDidShowSubscription.remove()
			keyboardDidHideSubscription.remove()
		}
	}, []))

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const navigateBackwards = () => navigation.goBack()

	const saveLinks = (links: string[]) => {
		const formatedLinks = formatToValidLinks(links)
		const validLinks = removeInvalidLinks(formatedLinks)

		if (editModeIsTrue() && validLinks.length) {
			addNewUnsavedFieldToEditContext({ links: validLinks })
			navigateBackwards()
		}
	}

	const formatToValidLinks = (links: string[]) => {
		return links.map((link: string) => {
			const cleanLink = link.trim()
			if (!cleanLink || (cleanLink && !cleanLink.length)) return ''

			return cleanLink.slice(0, 3) === 'www' || cleanLink.slice(0, 4) !== 'http'
				? `http://${link}`
				: cleanLink
		})
	}

	const removeInvalidLinks = (links: string[]) => {
		return links.filter((link: string) => link)
	}

	return (
		<PostLinks
			backgroundColor={theme.colors.blue[2]}
			lightColor={theme.colors.blue[1]}
			keyboardOpened={keyboardOpened}
			initialValue={route.params?.initialValue || []}
			editMode={editModeIsTrue()}
			navigateBackwards={navigateBackwards}
			saveLinks={saveLinks}
		/>
	)
}

export { InsertCultureLinks }
