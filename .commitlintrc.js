module.exports = {
    parserPreset: './.parser-preset.js',
    rules: {
		'type-empty': [2, 'never'],
        'type-case': [2, 'always', 'lower-case'],
        'subject-empty': [2, 'never'],
        'type-enum': [2, 'always', [
            'feat',
            'fix',
            'docs',
            'style',
            'refactor',
            'test',
            'chore',
            'up',
            'revert',
            'merge'
        ]]
    }
}
