import 'react-native-gesture-handler'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import React from 'react'

import { PollRegisterProvider } from '@contexts/PollRegisterContext'

import { PollStackParamList } from './types'

import { EditPoll } from '@screens/pollScreens/EditPoll'
import { InsertPollDescription } from '@screens/pollScreens/InsertPollDescription'
import { InsertPollLocation } from '@screens/pollScreens/InsertPollLocation'
import { InsertPollQuestions } from '@screens/pollScreens/InsertPollQuestions'
import { InsertPollTitle } from '@screens/pollScreens/InsertPollTitle'
import { SelectPollQuestionType } from '@screens/pollScreens/SelectPollQuestionType'
import { SelectPollRange } from '@screens/pollScreens/SelectPollRange'

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
				<Stack.Screen name={'SelectPollRange'} component={SelectPollRange} />
				<Stack.Screen name={'InsertPollLocation'} component={InsertPollLocation} />
				<Stack.Screen name={'EditPoll'} component={EditPoll} />
			</Stack.Navigator>
		</PollRegisterProvider>
	)
}
