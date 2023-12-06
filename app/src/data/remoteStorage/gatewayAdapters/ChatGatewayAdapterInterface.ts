import { UserDatabase } from "@domain/entities/chat/types";
import { Id } from "@domain/entities/globalTypes";

export interface ChatGatewayAdapterInterface {
	registerNewUser(userId: Id, initialUserData: Partial<UserDatabase>): Promise<boolean> | boolean
}

