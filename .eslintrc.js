module.exports = {
	extends: [
		'standard',
		'prettier',
		'eslint:recommended',
		'plugin:import/recommended',
		'plugin:security/recommended',
	],
	plugins: ['jest', 'security', 'prettier'],
	env: {
		'jest/globals': true,
	},
	rules: {
		'comma-dangle': ['error', 'always-multiline'],
	},
}
