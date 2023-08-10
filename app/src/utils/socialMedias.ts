import { Linking } from 'react-native'
import LinkClipIcon from '../assets/icons/linkClip.svg'
import LinkedinIcon from '../assets/icons/linkedin.svg'
import FacebookIcon from '../assets/icons/facebook.svg'
import InstagramIcon from '../assets/icons/instagram.svg'
import TwiterIcon from '../assets/icons/twiter.svg'
import WhatsAppIcon from '../assets/icons/whatsapp.svg'
import YoutubeIcon from '../assets/icons/youtube.svg'
import SpotifyIcon from '../assets/icons/spotify.svg'
import TikTokIcon from '../assets/icons/tiktok.svg'
import SoundCloudIcon from '../assets/icons/soundcloud.svg'

import { SocialMedia } from '../services/firebase/types'

const defaultSocialMedias = [
	{
		title: 'linkedin',
		link: ''
	},
	{
		title: 'facebook',
		link: ''
	},
	{
		title: 'instagram',
		link: ''
	},
	{
		title: 'twitter',
		link: ''
	},
	{
		title: 'whatsapp',
		link: ''
	},
	{
		title: 'youtube',
		link: ''
	},
	{
		title: 'spotify',
		link: ''
	},
	{
		title: 'tiktok',
		link: ''
	},
	{
		title: 'soundcloud',
		link: ''
	},
] as SocialMedia[]

const defaultSocialMediaTitles = defaultSocialMedias.map((socialMedia) => socialMedia.title)

const isDefaultSocialMedia = (title: string) => defaultSocialMediaTitles.includes(title)

const socialMediaUrl = (socialMediaTitle: string, atSign: string) => {
	const customAtSign = atSign[0] === '@' ? atSign.substring(1, atSign.length) : atSign

	switch (socialMediaTitle) {
		case 'linkedin': return `https://www.linkedin.com/in/${customAtSign}`
		case 'facebook': return `https://www.facebook.com/${customAtSign}`
		case 'instagram': return `https://www.instagram.com/${customAtSign}`
		case 'twitter': return `https://twitter.com/${customAtSign}`
		case 'whatsapp': return `https://wa.me/${customAtSign}`
		case 'youtube': return `https://www.youtube.com/@${customAtSign}`
		case 'spotify': return `https://open.spotify.com/artist/${customAtSign}`
		case 'tiktok': return `https://www.tiktok.com/@${customAtSign}`
		case 'soundcloud': return `https://soundcloud.com/${customAtSign}`
		default: return `https://www.google.com/search?client=opera&q=${customAtSign}`
	}
}

const getRelativeSocialMediaIcon = (title: string) => {
	switch (title) {
		case 'linkedin': return LinkedinIcon
		case 'facebook': return FacebookIcon
		case 'instagram': return InstagramIcon
		case 'twitter': return TwiterIcon
		case 'whatsapp': return WhatsAppIcon
		case 'youtube': return YoutubeIcon
		case 'spotify': return SpotifyIcon
		case 'tiktok': return TikTokIcon
		case 'soundcloud': return SoundCloudIcon
		default: return LinkClipIcon
	}
}

const mergeWithDefaultSocialMedia = (userSocialMedias: SocialMedia[]) => {
	const linkTitlesAlreadyFiltered = [] as string[]
	const socialMedias = [...defaultSocialMedias, ...userSocialMedias].map((socialMedia) => {
		const fillSocialMedia = userSocialMedias.reduce((acc, current) => {
			if (socialMedia.title === current.title && current.link) {
				return current
			}

			return acc
		}, {})

		if (linkTitlesAlreadyFiltered.includes(socialMedia.title)) {
			linkTitlesAlreadyFiltered.push(socialMedia.title)
			return false
		}

		if (Object.keys(fillSocialMedia).length) {
			linkTitlesAlreadyFiltered.push(socialMedia.title)
			return fillSocialMedia
		}

		linkTitlesAlreadyFiltered.push(socialMedia.title)
		return socialMedia
	}) as SocialMedia[]

	const formatedSocialMedias = socialMedias.filter((map) => !!map)
	return formatedSocialMedias
}

const sortSocialMedias = (socialMediaA: SocialMedia, socialMediaB: SocialMedia) => {
	if (socialMediaA.title > socialMediaB.title) return 1
	if (socialMediaA.title < socialMediaB.title) return -1
	return 0
}

const openURL = async (socialMedia: SocialMedia) => {
	if (!socialMedia.link || socialMediaUrl(socialMedia.title, '') === socialMedia.link) return
	console.log(socialMedia.link)

	const validUrl = await Linking.canOpenURL(socialMedia.link || '')
	if (validUrl) {
		Linking.openURL(socialMedia.link)
	} else {
		console.log('URL inválida')
	}
}

export {
	defaultSocialMedias,
	getRelativeSocialMediaIcon,
	defaultSocialMediaTitles,
	isDefaultSocialMedia,
	socialMediaUrl,
	mergeWithDefaultSocialMedia,
	sortSocialMedias,
	openURL
}
