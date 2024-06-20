import { Id } from './Id'

export abstract class Entity<Type, Props> {
	readonly id: Id | null
	readonly props: Props

	constructor(props: Props, id: string) {
		this.id = id ? new Id(id) : null
		this.props = { ...props }
	}

	isEqual(anotherEntity: Entity<Type, Props>): boolean {
		return this.id?.value === anotherEntity.id?.value
	}

	isDifferent(anotherEntity: Entity<Type, Props>): boolean {
		return this.id?.value !== anotherEntity.id?.value
	}

	clone(newProps: Props, ...args: any): Type {
		// const customData = customIdentifier ? { [customIdentifier]: this.id } : { id: this.id }
		return new (this.constructor as any)(
			{
				...this.props,
				...newProps
			},
			this.id?.value,
			...args
		)
	}
}
