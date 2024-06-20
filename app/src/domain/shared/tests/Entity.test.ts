import { Entity } from '../valueObjects/Entity'

// Classe concreta para testes
interface TestEntityProps {
	name?: string;
	age?: number;
}

class TestEntity extends Entity<TestEntity, TestEntityProps> { }

describe('Entity', () => {
	const testProps: TestEntityProps = {
		name: 'John Doe',
		age: 30
	}

	const anotherProps: TestEntityProps = {
		name: 'Jane Doe',
		age: 25
	}

	// Teste de criação com ID
	test('Deve criar uma instância com um ID válido', () => {
		const entity = new TestEntity(testProps, 'abc123')
		expect(entity.id?.value).toBe('abc123')
		expect(entity.props).toEqual(testProps)
	})

	// Teste de criação sem ID (ID nulo)
	test('Deve criar uma instância com ID nulo', () => {
		const entity = new TestEntity(testProps, '')
		expect(entity.id).toBeNull()
		expect(entity.props).toEqual(testProps)
	})

	// Teste do método isEqual
	test('Deve retornar verdadeiro se IDs são iguais', () => {
		const entity1 = new TestEntity(testProps, 'abc123')
		const entity2 = new TestEntity(anotherProps, 'abc123')
		expect(entity1.isEqual(entity2)).toBe(true)
	})

	test('Deve retornar falso se IDs são diferentes', () => {
		const entity1 = new TestEntity(testProps, 'abc123')
		const entity2 = new TestEntity(anotherProps, 'xyz789')
		expect(entity1.isEqual(entity2)).toBe(false)
	})

	// Teste do método isDifferent
	test('Deve retornar verdadeiro se IDs são diferentes', () => {
		const entity1 = new TestEntity(testProps, 'abc123')
		const entity2 = new TestEntity(anotherProps, 'xyz789')
		expect(entity1.isDifferent(entity2)).toBe(true)
	})

	test('Deve retornar falso se IDs são iguais', () => {
		const entity1 = new TestEntity(testProps, 'abc123')
		const entity2 = new TestEntity(anotherProps, 'abc123')
		expect(entity1.isDifferent(entity2)).toBe(false)
	})

	// Teste do método clone
	test('Deve clonar a entidade com novos props', () => {
		const entity = new TestEntity(testProps, 'abc123')
		const clonedEntity = entity.clone({ name: 'Jane Smith' })
		expect(clonedEntity).toBeInstanceOf(TestEntity)
		expect(clonedEntity.props.name).toBe('Jane Smith')
		expect(clonedEntity.props.age).toBe(30) // Verifica se mantém o valor original de age
		expect(clonedEntity.id?.value).toBe('abc123') // Verifica se mantém o ID original
	})

	test('Deve clonar a entidade com novos e ID customizado', () => {
		const entity = new TestEntity(testProps, 'abc123')
		const clonedEntity = entity.clone({ name: 'Jane Smith' }, 'entityId')
		expect(clonedEntity).toBeInstanceOf(TestEntity)
		expect(clonedEntity.props.name).toBe('Jane Smith')
		expect(clonedEntity.props.age).toBe(30) // Verifica se mantém o valor original de age
		expect(clonedEntity.id?.value).toBe('abc123') // Verifica se mantém o ID original
	})
})
