import { Entity } from '@domain/shared/valueObjects/Entity'
import { Id } from '@domain/shared/valueObjects/Id'

import { CitizenRegisterLocation, CitizenRegisterQuestionResponse, CitizenRegisterEntity } from './types'

import { UserName } from '../valueObjects/UserName'

/* interface CitizenRegisterProps extends CitizenRegisterEntity {
	citizenRegisterId: string
	props?: CitizenRegisterEntity
} */

export class CitizenRegister extends Entity<CitizenRegister, any/* CitizenRegisterProps */> { // CURRENT Resolver id causa isso
	readonly citizenRegisterId: Id | null
	readonly userId: Id
	readonly name: UserName
	readonly cellNumber: string // MODEL
	readonly censusTakerId: Id
	readonly createdAt: Date // MODEL
	readonly censusTakerName: UserName
	readonly location: CitizenRegisterLocation // MODEL
	readonly responses: CitizenRegisterQuestionResponse[] // MODEL

	constructor(props: CitizenRegisterEntity, newRegister?: boolean) {
		super(props)

		this.citizenRegisterId = newRegister ? null : new Id(this.props.citizenRegisterId)
		this.name = new UserName(this.props.name)
		this.userId = this.props.userId
		this.cellNumber = this.props.cellNumber
		this.censusTakerId = new Id(this.props.censusTakerId)
		this.censusTakerName = new UserName(this.props.censusTakerName)
		this.createdAt = newRegister ? new Date() : this.props.createdAt
		this.location = this.props.location // MODEL
		this.responses = this.props.responses || []
	}

	// CURRENT Novos campos
	// specificResponse, allowOtherOptions

	get data(): CitizenRegisterEntity {
		return { ...this.props }
	}
}
