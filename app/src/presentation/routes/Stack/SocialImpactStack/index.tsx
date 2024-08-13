import 'react-native-gesture-handler'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import React from 'react'

import { SocialImpactProvider } from '@contexts/SocialImpactContext'

import { SocialImpactStackParamList } from './types'

import { SocialImpactPostReview } from '@screens/editPostScreens/SocialImpactPostReview'
import { InsertSocialImpactDescription } from '@screens/socialImpactRegisterScreens/InsertSocialImpactDescription'
import { InsertSocialImpactEndDate } from '@screens/socialImpactRegisterScreens/InsertSocialImpactEndDate'
import { InsertSocialImpactEndHour } from '@screens/socialImpactRegisterScreens/InsertSocialImpactEndHour'
import { InsertSocialImpactLinks } from '@screens/socialImpactRegisterScreens/InsertSocialImpactLInks'
import { InsertSocialImpactStartDate } from '@screens/socialImpactRegisterScreens/InsertSocialImpactStartDate'
import { InsertSocialImpactStartHour } from '@screens/socialImpactRegisterScreens/InsertSocialImpactStartHour'
import { SelectSocialImpactCategory } from '@screens/socialImpactRegisterScreens/SelectSocialImpactCategory'
import { SelectSocialImpactDaysOfWeek } from '@screens/socialImpactRegisterScreens/SelectSocialImpactDaysOfWeek'
import { SelectSocialImpactExhibitionRange } from '@screens/socialImpactRegisterScreens/SelectSocialImpactExhibitionRange'
import { SelectSocialImpactFrequency } from '@screens/socialImpactRegisterScreens/SelectSocialImpactFrequency'
import { SelectSocialImpactLocation } from '@screens/socialImpactRegisterScreens/SelectSocialImpactLocation'
import { SelectSocialImpactLocationView } from '@screens/socialImpactRegisterScreens/SelectSocialImpactLocationView'
import { SelectSocialImpactPostMedia } from '@screens/socialImpactRegisterScreens/SelectSocialImpactPostMedia'
import { SelectSocialImpactPurpose } from '@screens/socialImpactRegisterScreens/SelectSocialImpactPurpose'
import { SelectSocialImpactRange } from '@screens/socialImpactRegisterScreens/SelectSocialImpactRange'
import { SelectSocialImpactRepeat } from '@screens/socialImpactRegisterScreens/SelectSocialImpactRepeat'
import { SelectSocialImpactTags } from '@screens/socialImpactRegisterScreens/SelectSocialImpactTags'
import { SelectSocialImpactType } from '@screens/socialImpactRegisterScreens/SelectSocialImpactType'
import { SocialImpactLocationViewPreview } from '@screens/socialImpactRegisterScreens/SocialImpactLocationViewPreview'

import { SocialImpactStackScreenProps } from '../UserStack/screenProps'

const Stack = createStackNavigator<SocialImpactStackParamList>()

export function SocialImpactStack({ route }: SocialImpactStackScreenProps) {
	return (
		<SocialImpactProvider>
			<Stack.Navigator
				initialRouteName={'InsertSocialImpactDescription'}
				screenOptions={{
					headerShown: false,
					gestureEnabled: true,
					...TransitionPresets.SlideFromRightIOS,
				}}
			>
				<Stack.Screen
					name={'InsertSocialImpactDescription'}
					component={InsertSocialImpactDescription}
					initialParams={route && route.params ? { ...(route.params || {}) } : {} as any}
				/>
				<Stack.Screen name={'SelectSocialImpactPostMedia'} component={SelectSocialImpactPostMedia} />
				<Stack.Screen name={'SelectSocialImpactLocation'} component={SelectSocialImpactLocation} />
				<Stack.Screen name={'SocialImpactPostReview'} component={SocialImpactPostReview} />

				{/* Optional */}
				<Stack.Screen name={'SelectSocialImpactType'} component={SelectSocialImpactType} />
				<Stack.Screen name={'SelectSocialImpactPurpose'} component={SelectSocialImpactPurpose} />
				<Stack.Screen name={'SelectSocialImpactCategory'} component={SelectSocialImpactCategory} />
				<Stack.Screen name={'SelectSocialImpactTags'} component={SelectSocialImpactTags} />
				<Stack.Screen name={'InsertSocialImpactLinks'} component={InsertSocialImpactLinks} />
				<Stack.Screen name={'SelectSocialImpactRange'} component={SelectSocialImpactRange} />
				<Stack.Screen name={'SelectSocialImpactLocationView'} component={SelectSocialImpactLocationView} />
				<Stack.Screen name={'SocialImpactLocationViewPreview'} component={SocialImpactLocationViewPreview} />
				<Stack.Screen name={'SelectSocialImpactExhibitionRange'} component={SelectSocialImpactExhibitionRange} />
				<Stack.Screen name={'SelectSocialImpactFrequency'} component={SelectSocialImpactFrequency} />
				<Stack.Screen name={'SelectSocialImpactDaysOfWeek'} component={SelectSocialImpactDaysOfWeek} />
				<Stack.Screen name={'SelectSocialImpactRepeat'} component={SelectSocialImpactRepeat} />
				<Stack.Screen name={'InsertSocialImpactStartDate'} component={InsertSocialImpactStartDate} />
				<Stack.Screen name={'InsertSocialImpactEndDate'} component={InsertSocialImpactEndDate} />
				<Stack.Screen name={'InsertSocialImpactStartHour'} component={InsertSocialImpactStartHour} />
				<Stack.Screen name={'InsertSocialImpactEndHour'} component={InsertSocialImpactEndHour} />
			</Stack.Navigator>
		</SocialImpactProvider>
	)
}
