export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 150], // Ajuste conforme necessário
    'subject-case': [0, 'never'] // Permite que a primeira letra não seja maiúscula
  }
};
