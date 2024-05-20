import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { PollStackParamList } from './types'

export type InsertPollTitleScreenProps = NativeStackScreenProps<PollStackParamList, 'InsertPollTitle'>
export type InsertPollDescriptionScreenProps = NativeStackScreenProps<PollStackParamList, 'InsertPollDescription'>
export type InsertPollQuestionsScreenProps = NativeStackScreenProps<PollStackParamList, 'InsertPollQuestions'>
export type SelectPollQuestionTypeScreenProps = NativeStackScreenProps<PollStackParamList, 'SelectPollQuestionType'>
export type SelectNumberOfSelectionsScreenProps = NativeStackScreenProps<PollStackParamList, 'SelectNumberOfSelections'>
export type InsertPollSelectOptionsScreenProps = NativeStackScreenProps<PollStackParamList, 'InsertPollSelectOptions'>
export type SelectPollRangeScreenProps = NativeStackScreenProps<PollStackParamList, 'SelectPollRange'>
export type InsertPollLocationScreenProps = NativeStackScreenProps<PollStackParamList, 'InsertPollLocation'>

export type PollReviewScreenProps = NativeStackScreenProps<PollStackParamList, 'PollReview'>
export type ViewPollScreenProps = NativeStackScreenProps<PollStackParamList, 'ViewPoll'>

export type AnswerSatisfactionQuestionScreenProps = NativeStackScreenProps<PollStackParamList, 'AnswerSatisfactionQuestion'>
export type AnswerBinaryQuestionScreenProps = NativeStackScreenProps<PollStackParamList, 'AnswerBinaryQuestion'>
export type AnswerTextualQuestionScreenProps = NativeStackScreenProps<PollStackParamList, 'AnswerTextualQuestion'>
export type AnswerSelectQuestionScreenProps = NativeStackScreenProps<PollStackParamList, 'AnswerSelectQuestion'>
export type FinishedPollResponseScreenProps = NativeStackScreenProps<PollStackParamList, 'FinishedPollResponse'>
