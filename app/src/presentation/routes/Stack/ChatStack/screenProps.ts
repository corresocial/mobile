import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { ChatStackParamList } from './types'

export type ChatConversationsScreenProps = NativeStackScreenProps<ChatStackParamList, 'ChatConversations'>
export type ChatMessagesScreenProps = NativeStackScreenProps<ChatStackParamList, 'ChatMessages'>

export type ProfileChatScreenProps = NativeStackScreenProps<ChatStackParamList, 'ProfileChat'>
export type PostViewChatScreenProps = NativeStackScreenProps<ChatStackParamList, 'PostViewChat'>
