const citizenRegisterErrors = {
	SINGLE_NAME: 'O nome deve ter um sobrenome',
	EMPTY_NAME: 'O nome não pode ser nulo',
	SMALL_NAME: 'Este nome é muito pequeno',
	LARGE_NAME: 'Este nome é muito grande',
	NAME_INVALID_CHARACTERS: 'O nome não pode possuir caracteres especiais',

	EMPTY_QUESTION_ID: 'O ID da pergunta não pode ser vazio',
	EMPTY_QUESTION: 'A pergunta não pode ser vazia',
	INVALID_RESPONSE_TYPE: 'O tipo de resposta fornecido é inválido',
	INVALID_QUESTION_TYPE: 'O tipo de pergunta fornecido é inválido',
	RESPONSE_NOT_IN_OPTIONS: 'A resposta fornecida não existe nas opções',
	MISSING_SPECIFIC_RESPONSE: 'Ao selecionar "outros", uma especificação é necessária'
}

export { citizenRegisterErrors }
