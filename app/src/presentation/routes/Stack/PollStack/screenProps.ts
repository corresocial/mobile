import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { PollStackParamList } from './types'

export type InsertPollTitleScreenProps = NativeStackScreenProps<PollStackParamList, 'InsertPollTitle'>
export type InsertPollDescriptionScreenProps = NativeStackScreenProps<PollStackParamList, 'InsertPollDescription'>
export type InsertPollQuestionsScreenProps = NativeStackScreenProps<PollStackParamList, 'InsertPollQuestions'>
export type SelectPollQuestionTypeScreenProps = NativeStackScreenProps<PollStackParamList, 'SelectPollQuestionType'>
