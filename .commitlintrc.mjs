module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
      'header-max-length': [2, 'always', 200], // Aqui você define o limite que deseja, por exemplo, 150 caracteres.
      'subject-case': [0, 'never']
    }
  };
  