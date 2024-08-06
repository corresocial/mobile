export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 150], // Ajuste conforme necessário
    'subject-case': [0, 'never'], // Permite que a primeira letra não seja maiúscula
    'type-enum': [ // Adicione 'config' aos tipos permitidos
      2,
      'always',
      [
        'build', 'chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test', 'config'
      ]
    ]
  }
};
