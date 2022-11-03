import React from 'react'
import { Modal, View, ActivityIndicator } from 'react-native'
import { theme } from '../../../common/theme'

interface LoaderModalProps {
	visible: boolean
}

function LoaderModal({visible}: LoaderModalProps) {
	return (
		<Modal
			transparent={true}
			visible={visible}
		>
			<View style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center'
			}}>
				<ActivityIndicator size={'large'} color={theme.green2} />
			</View>
		</Modal>
	)
}

export { LoaderModal }