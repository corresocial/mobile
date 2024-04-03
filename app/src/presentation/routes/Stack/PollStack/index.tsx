import 'react-native-gesture-handler'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import React from 'react'

import { PollRegisterProvider } from '@contexts/PollRegisterContext'

import { PollStackParamList } from './types'

import { InsertPollDescription } from '@screens/pollScreens/InsertPollDescription'
import { InsertPollQuestions } from '@screens/pollScreens/InsertPollQuestions'
import { InsertPollTitle } from '@screens/pollScreens/InsertPollTitle'
import { SelectPollQuestionType } from '@screens/pollScreens/SelectPollQuestionType'

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
			</Stack.Navigator>
		</PollRegisterProvider>
	)
}
