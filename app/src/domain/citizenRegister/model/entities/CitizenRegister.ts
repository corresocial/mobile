import { Entity } from '@domain/shared/valueObjects/Entity'
import { Id } from '@domain/shared/valueObjects/Id'

import { CitizenRegisterLocation, CitizenRegisterEntity, CitizenRegisterQuestionResponse } from './types'

import { UserName } from '../valueObjects/UserName'

export class CitizenRegister extends Entity<CitizenRegister, CitizenRegisterEntity> {
	readonly citizenRegisterId: Id | null
	readonly name: UserName
	readonly cellNumber: string // MODEL
	readonly censusTakerId: Id
	readonly createdAt: Date // MODEL
	readonly censusTakerName: UserName
	readonly location: CitizenRegisterLocation // MODEL
	readonly responses: CitizenRegisterQuestionResponse[] // MODEL

	constructor(props: CitizenRegisterEntity, newRegister?: boolean) {
		super(props, props.citizenRegisterId)

		this.citizenRegisterId = newRegister ? null : new Id(this.props.citizenRegisterId)
		this.name = new UserName(props.name)
		this.cellNumber = props.cellNumber // MODEL
		this.censusTakerId = new Id(props.censusTakerId)
		this.censusTakerName = new UserName(props.censusTakerName)
		this.createdAt = newRegister ? new Date() : props.createdAt // MODEL
		this.location = this.props.location // MODEL
		this.responses = props.responses // new CitizenRegisterResponses(props.responses)
	}

	get data(): CitizenRegisterEntity {
		return { ...this.props }
	}
}
