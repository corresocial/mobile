import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { PollEntity } from '@domain/poll/entity/types'

import { AuthContext } from '@contexts/AuthContext'
import { EditContext } from '@contexts/EditContext'
import { usePollRegisterContext } from '@contexts/PollRegisterContext'

import { SelectPollRangeScreenProps } from '@routes/Stack/PollStack/screenProps'

import { checkFreeTrialRange } from '@services/stripe/checkFreeTrialRange'

import { theme } from '@common/theme'

import { PostRange } from '@components/_onboarding/PostRange'

function SelectPollRange({ route, navigation }: SelectPollRangeScreenProps) {
	const { userDataContext } = useContext(AuthContext)
	const { setPollDataOnContext } = usePollRegisterContext()
	const { addNewUnsavedFieldToEditContext } = useContext(EditContext)

	const editModeIsTrue = () => !!(route.params && route.params.editMode)

	const savePollRange = (pollRange: PollEntity['range']) => {
		if (editModeIsTrue()) {
			addNewUnsavedFieldToEditContext({ range: pollRange })
			navigation.goBack()
			return
		}

		setPollDataOnContext({ range: pollRange })
		navigation.navigate('InsertPollLocation')
	}

	const { range } = checkFreeTrialRange(userDataContext.subscription?.subscriptionRange)

	return (
		<>
			<StatusBar backgroundColor={theme.colors.purple[2]} barStyle={'dark-content'} />
			<PostRange
				backgroundColor={theme.colors.purple[2]}
				itemsColor={theme.colors.purple[3]}
				hiddenValues
				userSubscriptionRange={range || 'near'}
				navigateBackwards={() => navigation.goBack()}
				savePostRange={savePollRange}
				progress={[4, 4]}
			/>
		</>
	)
}

export { SelectPollRange }
