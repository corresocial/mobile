import uuid from 'react-uuid'

import { Id } from '@domain/globalTypes'

import { newMessageObject } from '../core/generateNewMessageObject'

function generateNewMessageObjectDM(textMessage: string, userSenderId: Id) {
	return newMessageObject(uuid(), textMessage, userSenderId)
}

export { generateNewMessageObjectDM }
