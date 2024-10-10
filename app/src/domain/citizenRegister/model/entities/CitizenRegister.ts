import { Entity } from '@domain/shared/valueObjects/Entity'
import { Id } from '@domain/shared/valueObjects/Id'

import { CitizenRegisterLocation, CitizenRegisterEntity } from './types'

import { CitizenRegisterResponses } from '../domainServices/CitizenRegisterResponses'
import { UserName } from '../valueObjects/UserName'

export class CitizenRegister extends Entity<CitizenRegister, CitizenRegisterEntity> {
	readonly citizenRegisterId: Id | null
	readonly name: UserName
	readonly cellNumber: string // MODEL
	readonly coordinatorId: Id | null
	readonly censusTakerId: Id
	readonly createdAt: Date // MODEL
	readonly censusTakerName: UserName
	readonly location: CitizenRegisterLocation // MODEL
	readonly responses: CitizenRegisterResponses

	constructor(props: CitizenRegisterEntity, newRegister?: boolean) {
		super(props, props.citizenRegisterId)

		this.citizenRegisterId = newRegister && !props.citizenRegisterId ? null : new Id(this.props.citizenRegisterId)
		this.name = new UserName(props.name)
		this.cellNumber = props.cellNumber // MODEL
		this.coordinatorId = props.coordinatorId ? new Id(props.coordinatorId) : null
		this.censusTakerId = new Id(props.censusTakerId)
		this.censusTakerName = new UserName(props.censusTakerName)
		this.createdAt = newRegister ? new Date() : new Date(props.createdAt) // MODEL
		this.location = props.location // MODEL
		this.responses = new CitizenRegisterResponses(this.props.responses, newRegister)
	}

	get data(): CitizenRegisterEntity {
		const props: CitizenRegisterEntity = {
			...this.props,
			name: this.name.value,
			cellNumber: this.cellNumber,
			censusTakerName: this.censusTakerName.value,
			censusTakerId: this.censusTakerId.value,
			createdAt: this.createdAt,
			responses: this.responses.data()
		}

		if (this.citizenRegisterId !== null) {
			props.citizenRegisterId = this.citizenRegisterId.value
		}

		if (this.coordinatorId) {
			props.coordinatorId = this.coordinatorId.value
		}

		return props as CitizenRegisterEntity
	}
}
