import uuid from 'react-uuid'

import { Id } from '@domain/entities/globalTypes'

import { newMessageObject } from '../rules/generateNewMessageObject'

function generateNewMessageObjectUC(textMessage: string, userSenderId: Id) {
	return newMessageObject(uuid(), textMessage, userSenderId)
}

export { generateNewMessageObjectUC }
