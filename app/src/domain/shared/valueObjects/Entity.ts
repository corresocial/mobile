export interface EntityProps {
	id?: string
}

export abstract class Entity<Type, Props extends EntityProps> {
	// readonly id: Id
	readonly props: Props

	constructor(props: Props) {
		// this.id = new Id('GUBzWyXdQFeC5xEaWlTtbaR64tT2') // CURRENT
		this.props = { ...props }
	}

	// isEqual(anotherEntity: Entity<Type, Props>): boolean {
	// 	return this.id.value === anotherEntity?.id.value
	// }

	// isDifferent(anotherEntity: Entity<Type, Props>): boolean {
	// 	return this.id.value !== anotherEntity?.id.value
	// }

	// clone(newProps: Props, ...args: any): Type {
	// 	return new (this.constructor as any)(
	// 		{
	// 			...this.props,
	// 			...newProps
	// 		},
	// 		...args
	// 	)
	// }
}
