import 'react-native-gesture-handler'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import React from 'react'

import { PollRegisterProvider } from '@contexts/PollRegisterContext'

import { PollStackParamList } from './types'

import { AnswerBinaryQuestion } from '@screens/pollScreens/AnswerBinaryQuestion'
import { AnswerSatisfactionQuestion } from '@screens/pollScreens/AnswerSatisfactionQuestion'
import { AnswerSelectQuestion } from '@screens/pollScreens/AnswerSelectQuestion'
import { AnswerTextualQuestion } from '@screens/pollScreens/AnswerTextualQuestion'
import { FinishedPollResponse } from '@screens/pollScreens/FinishedPollResponse'
import { InsertPollDescription } from '@screens/pollScreens/InsertPollDescription'
import { InsertPollLocation } from '@screens/pollScreens/InsertPollLocation'
import { InsertPollQuestions } from '@screens/pollScreens/InsertPollQuestions'
import { InsertSelectOptions } from '@screens/pollScreens/InsertPollSelectOptions'
import { InsertPollTitle } from '@screens/pollScreens/InsertPollTitle'
import { PollReview } from '@screens/pollScreens/PollReview'
import { SelectNumberOfSelections } from '@screens/pollScreens/SelectNumberOfSelections'
import { SelectPollQuestionType } from '@screens/pollScreens/SelectPollQuestionType'
import { SelectPollRange } from '@screens/pollScreens/SelectPollRange'
import { ViewPoll } from '@screens/pollScreens/ViewPoll'

const Stack = createStackNavigator<PollStackParamList>()

export function PollStack() {
	return (
		<PollRegisterProvider>
			<Stack.Navigator
				initialRouteName={'InsertPollTitle'}
				screenOptions={{
					headerShown: false,
					gestureEnabled: true,
					...TransitionPresets.SlideFromRightIOS,
				}}
			>
				<Stack.Screen name={'InsertPollTitle'} component={InsertPollTitle} />
				<Stack.Screen name={'InsertPollDescription'} component={InsertPollDescription} />
				<Stack.Screen name={'InsertPollQuestions'} component={InsertPollQuestions} />
				<Stack.Screen name={'SelectPollQuestionType'} component={SelectPollQuestionType} />
				<Stack.Screen name={'SelectNumberOfSelections'} component={SelectNumberOfSelections} />
				<Stack.Screen name={'InsertPollSelectOptions'} component={InsertSelectOptions} />
				<Stack.Screen name={'SelectPollRange'} component={SelectPollRange} />
				<Stack.Screen name={'InsertPollLocation'} component={InsertPollLocation} />

				<Stack.Screen name={'PollReview'} component={PollReview} />
				<Stack.Screen name={'ViewPoll'} component={ViewPoll} />

				<Stack.Screen name={'AnswerSatisfactionQuestion'} component={AnswerSatisfactionQuestion} />
				<Stack.Screen name={'AnswerBinaryQuestion'} component={AnswerBinaryQuestion} />
				<Stack.Screen name={'AnswerTextualQuestion'} component={AnswerTextualQuestion} />
				<Stack.Screen name={'AnswerSelectQuestion'} component={AnswerSelectQuestion} />
				<Stack.Screen name={'FinishedPollResponse'} component={FinishedPollResponse} />
			</Stack.Navigator>
		</PollRegisterProvider>
	)
}
