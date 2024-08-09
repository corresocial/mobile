import React, { useContext, useEffect, useState } from 'react'
import { Keyboard, Platform } from 'react-native'

import { EditContext } from '@contexts/EditContext'

import { InsertIncomeLinksScreenProps } from '@routes/Stack/SaleStack/screenProps'

import { removeAllKeyboardEventListeners } from '@common/listenerFunctions'
import { theme } from '@common/theme'

import { PostLinks } from '@components/_onboarding/PostLinks/Index'

function InsertIncomeLinks({ route, navigation }: InsertIncomeLinksScreenProps) {
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

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
			backgroundColor={theme.colors.green[2]}
			lightColor={theme.colors.green[1]}
			keyboardOpened={keyboardOpened}
			initialValue={route.params?.initialValue || []}
			editMode={editModeIsTrue()}
			navigateBackwards={navigateBackwards}
			saveLinks={saveLinks}
		/>
	)
}

export { InsertIncomeLinks }
