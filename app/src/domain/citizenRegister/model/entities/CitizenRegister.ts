import { Entity } from '@domain/shared/valueObjects/Entity'
import { Id } from '@domain/shared/valueObjects/Id'

import { CitizenRegisterLocation, CitizenRegisterQuestionResponse, CitizenRegisterEntity } from './types'

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
		this.name = new UserName(this.props.name)
		this.cellNumber = this.props.cellNumber // MODEL
		this.censusTakerId = new Id(this.props.censusTakerId)
		this.censusTakerName = new UserName(this.props.censusTakerName)
		this.createdAt = newRegister ? new Date() : this.props.createdAt // MODEL
		this.location = this.props.location // MODEL
		this.responses = this.props.responses || [] // MODEL
	}

	get data(): CitizenRegisterEntity {
		return { ...this.props }
	}
}
