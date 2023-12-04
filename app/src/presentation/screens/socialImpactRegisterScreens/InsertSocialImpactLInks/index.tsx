import React, { useContext, useEffect, useState } from 'react'
import { Keyboard, Linking, Platform } from 'react-native'

import { removeAllKeyboardEventListeners } from '../../../common/listenerFunctions'

import { InsertSocialImpactLinksScreenProps } from '../../../routes/Stack/SocialImpactStack/stackScreenProps'

import { EditContext } from '../../../../contexts/EditContext'

import { theme } from '../../../common/theme'

import { PostLinks } from '../../../components/_onboarding/PostLinks/Index'

function InsertSocialImpactLinks({ route, navigation }: InsertSocialImpactLinksScreenProps) {
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

	const saveLinks = async (links: string[]) => {
		const formatedLinks = await formatToValidLinks(links)
		const validLinks = removeInvalidLinks(formatedLinks)

		if (editModeIsTrue() && validLinks.length) {
			addNewUnsavedFieldToEditContext({ links: validLinks })
			navigateBackwards()
		}
	}

	const formatToValidLinks = async (links: string[]) => {
		return Promise.all(
			links.map(async (link: string) => {
				const cleanLink = link.trim()
				const linkCanOpened = await Linking.canOpenURL(cleanLink)
				console.log(`linkCanOpened: ${linkCanOpened}`)

				if (!cleanLink || (cleanLink && !cleanLink.length) || !linkCanOpened) return ''

				return cleanLink.slice(0, 3) === 'www' || cleanLink.slice(0, 4) !== 'http'
					? `http://${link}`
					: cleanLink
			})
		)
	}

	const removeInvalidLinks = (links: string[]) => {
		return links.filter((link: string) => link)
	}

	return (
		<PostLinks
			backgroundColor={theme.pink2}
			lightColor={theme.pink1}
			keyboardOpened={keyboardOpened}
			initialValue={route.params?.initialValue || []}
			editMode={editModeIsTrue()}
			navigateBackwards={navigateBackwards}
			saveLinks={saveLinks}
		/>
	)
}

export { InsertSocialImpactLinks }
