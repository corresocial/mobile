import * as Sharing from 'expo-sharing' // TODO unisntall
import { url } from 'inspector'
import { Share, ShareOptions } from 'react-native'

const share = (message: string) => {
	const options: ShareOptions = { dialogTitle: 'nothing' }
	Share.share(
		{
			title: '',
			message,
			url: 'https://i.pinimg.com/736x/4e/39/4d/4e394d47d6ae3f0da2b88becb57cb566.jpg'
		},
		options
	)
}

export { share }
