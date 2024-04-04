import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { PollEntity } from '@domain/poll/entity/types'

import { AuthContext } from '@contexts/AuthContext'
import { PollRegisterContext } from '@contexts/PollRegisterContext'

import { SelectPollRangeScreenProps } from '@routes/Stack/PollStack/screenProps'

import { theme } from '@common/theme'

import { PostRange } from '@components/_onboarding/PostRange'

function SelectPollRange({ navigation }: SelectPollRangeScreenProps) {
	const { userDataContext } = useContext(AuthContext)
	const { setPollDataOnContext } = useContext(PollRegisterContext)

	const savePostRange = (postRange: PollEntity['range']) => {
		setPollDataOnContext({ range: postRange })
		navigation.navigate('InsertPollLocation')
	}

	return (
		<>
			<StatusBar backgroundColor={theme.purple2} barStyle={'dark-content'} />
			<PostRange
				backgroundColor={theme.purple2}
				itemsColor={theme.purple3}
				hiddenValues
				userSubscriptionRange={userDataContext.subscription?.subscriptionRange || 'near'}
				navigateBackwards={() => navigation.goBack()}
				savePostRange={savePostRange}
				progress={[3, 3]}
			/>
		</>
	)
}

export { SelectPollRange }
