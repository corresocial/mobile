const citizenRegisterErrors = {
	SINGLE_NAME: 'O nome deve ter um sobrenome',
	EMPTY_NAME: 'O nome não pode ser nulo',
	SMALL_NAME: 'Este nome é muito pequeno',
	LARGE_NAME: 'Este nome é muito grande',
	NAME_INVALID_CHARACTERS: 'O nome não pode possuir caracteres especiais',

	INVALID_EMAIL: 'Email inválido',

	EMPTY_PASSWORD: 'A senha não pode ser nula',
	SMALL_PASSWORD: 'A senha deve ter no mínimo 6 caracteres',
	LARGE_PASSWORD: 'A senha deve ter no máximo 12 caracteres',
	UPPERCASE_CHARACTER_PASSWORD: 'A senha deve ter pelo menos uma letra maiúscula',
	LOWERCASE_CHARACTER_PASSWORD: 'A senha deve ter pelo menos uma letra minúscula',
	SYMBOL_CHARACTER_PASSWORD: 'A senha deve ter pelo menos um símbolo',
}

export { citizenRegisterErrors }
