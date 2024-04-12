import * as FileSystem from 'expo-file-system'
import * as Print from 'expo-print'
import { shareAsync } from 'expo-sharing'
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

async function shareFile(fileContent: string) {
	const { uri, numberOfPages } = await Print.printToFileAsync({ html: fileContent, base64: false })
	const renamedDocument = `${FileSystem.cacheDirectory}relatorio(${numberOfPages}).pdf`
	await FileSystem.moveAsync({ from: uri, to: renamedDocument })
	shareAsync(renamedDocument)
}

export { share, shareFile }
