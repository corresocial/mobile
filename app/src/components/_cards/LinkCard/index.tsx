import React from 'react'
import uuid from 'react-uuid'

import { Linking } from 'react-native'
import { arrayIsEmpty } from '../../../common/auxiliaryFunctions'

import { LinksContainer, LinkContainer, TextLink } from './styles'
import LinkClipWhiteIcon from '../../../assets/icons/linkClip.svg'
import PlusWhiteIcon from '../../../assets/icons/plus-white.svg'

import { DefaultHeaderTitle } from '../../DefaultHeaderTitle'
import { DefaultCardContainer } from '../DefaultCardContainer'
import { EditHeaderContainer } from '../../_containers/EditHeaderContainer'

interface LinkCardProps {
	title?: string
	links?: string[]
	onEdit?: () => void
}

function LinkCard({ title, links = [], onEdit }: LinkCardProps) {
	const renderLinks = () => {
		return links.map((link) => (
			<LinkContainer
				key={uuid()}
				activeOpacity={0.6}
				onPress={() => openLink(link)}
			>
				<TextLink>{link}</TextLink>
			</LinkContainer>
		))
	}

	const openLink = async (link: string) => {
		try {
			const supportedLink = await Linking.canOpenURL(link)
			if (!supportedLink) {
				throw new Error('Link inválido')
			}

			if (link.includes('http')) {
				return await Linking.openURL(link)
			}

			await Linking.openURL(`http://${link}`)
		} catch (error: any) {
			console.log(error)
			throw new Error(error)
		}
	}

	const getHeaderRightIcon = () => {
		return arrayIsEmpty(links) ? PlusWhiteIcon : undefined
	}

	return (
		<DefaultCardContainer>
			<EditHeaderContainer onPress={onEdit} RightIcon={getHeaderRightIcon()}>
				<DefaultHeaderTitle
					title={title || 'links'}
					highlightedWords={['links']}
					SvgIcon={LinkClipWhiteIcon}
					dimensions={28}
				/>
			</EditHeaderContainer>
			{
				!arrayIsEmpty(links) && (
					<LinksContainer>
						{renderLinks()}
					</LinksContainer>
				)
			}
		</DefaultCardContainer >
	)
}

export { LinkCard }
