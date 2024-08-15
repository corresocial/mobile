import React from 'react'
import uuid from 'react-uuid'

import { SocialMedia } from '@domain/user/entity/types'

import { socialMediaUrl } from '@utils/socialMedias'

import {
	Container,
	ScrollView,
	TouchableIcon
} from './styles'
import FacebookIcon from '@assets/icons/facebook.svg'
import InstagramIcon from '@assets/icons/instagram.svg'
import LinkClipIcon from '@assets/icons/linkClip.svg'
import LinkedinIcon from '@assets/icons/linkedin.svg'
import SoundCloudIcon from '@assets/icons/soundcloud.svg'
import SpotifyIcon from '@assets/icons/spotify.svg'
import TikTokIcon from '@assets/icons/tiktok.svg'
import TwiterIcon from '@assets/icons/twiter.svg'
import WhatsAppIcon from '@assets/icons/whatsapp.svg'
import YoutubeIcon from '@assets/icons/youtube.svg'
import { relativeScreenDensity, relativeScreenHeight } from '@common/screenDimensions'

interface HorizontalSocialMediaListProps {
	socialMedias: SocialMedia[] | undefined
	onPress: (socialMedia: SocialMedia) => void
}

function HorizontalSocialMediaList({ socialMedias = [], onPress }: HorizontalSocialMediaListProps) {
	const renderSocialMedias = () => {
		const filteredSocialMedias = socialMedias.filter((socialMedia) => socialMedia.link && socialMediaUrl(socialMedia.title, '') !== socialMedia.link)

		return (
			filteredSocialMedias.map((socialMedia) => (
				<TouchableIcon
					key={uuid()}
					onPress={() => (onPress && onPress(socialMedia))}
				>
					{getRelativeSocialMediaIcon(socialMedia.title)}
				</TouchableIcon>
			))
		)
	}

	const getRelativeSocialMediaIcon = (title: string) => {
		switch (title) {
			case 'linkedin': return <LinkedinIcon width={relativeScreenDensity(25)} height={relativeScreenDensity(25)} />
			case 'facebook': return <FacebookIcon width={relativeScreenDensity(20)} height={relativeScreenDensity(20)} />
			case 'instagram': return <InstagramIcon width={relativeScreenDensity(25)} height={relativeScreenDensity(25)} />
			case 'twitter': return <TwiterIcon width={relativeScreenDensity(25)} height={relativeScreenDensity(25)} />
			case 'whatsapp': return <WhatsAppIcon width={relativeScreenDensity(25)} height={relativeScreenDensity(25)} />
			case 'youtube': return <YoutubeIcon width={relativeScreenDensity(25)} height={relativeScreenDensity(25)} />
			case 'spotify': return <SpotifyIcon width={relativeScreenDensity(25)} height={relativeScreenDensity(25)} />
			case 'tiktok': return <TikTokIcon width={relativeScreenDensity(20)} height={relativeScreenDensity(20)} />
			case 'soundcloud': return <SoundCloudIcon width={relativeScreenDensity(25)} height={relativeScreenDensity(25)} />
			default: return <LinkClipIcon width={relativeScreenDensity(20)} height={relativeScreenDensity(20)} />
		}
	}

	if (!socialMedias || (socialMedias && !socialMedias.length)) return <></>

	return (
		<Container
			style={{
				height: socialMedias.length > 0 ? relativeScreenHeight(7) : relativeScreenHeight(2.5)
			}}
		>
			<ScrollView horizontal showsHorizontalScrollIndicator={false}>
				<Container>
					{renderSocialMedias()}
				</Container>
			</ScrollView>
		</Container>
	)
}

export { HorizontalSocialMediaList }
