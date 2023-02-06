import { Share, ShareOptions } from 'react-native'

const share = (message: string) => {
	const options: ShareOptions = { dialogTitle: 'nothing' }
	Share.share(
		{
			title: '',
			message,
		},
		options
	)
}

export { share }
