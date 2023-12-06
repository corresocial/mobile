import { Message, MessageObjects } from "@domain/entities/chat/types";
import { Id } from "@domain/entities/globalTypes";

function filterInvalidMessages(messages: MessageObjects, authenticatedUserId: Id) {
	return Object.values(messages || {}).filter((message: Message) => (
		!message.justOwner || (message.justOwner && message.owner === authenticatedUserId))
		&& (!message.userCanView || message.userCanView === authenticatedUserId))
}

export { filterInvalidMessages }
