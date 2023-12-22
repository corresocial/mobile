import { MutableRefObject } from 'react'

export type MutableObjectReference<refType> = MutableRefObject<refType>

export type NotificationMessageConfig = {
	to: string // token
	sound: string
	title: string
	body: string
	data: {
		collapseKey: string
	}
}
