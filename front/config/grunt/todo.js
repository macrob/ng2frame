module.exports = {
	options: [
		{
			name: 'FIX',
			pattern: /FIXME/,
			color: 'red'
		},
		{
			name: 'TODO',
			pattern: /TODO/,
			color: 'yellow'
		},
		{
			name: 'NOTE',
			pattern: /NOTE/,
			color: 'blue'
		}
	],
	file: 'report.md',
	your_target: {
		src: ['src/app/**/*']
	}
};
