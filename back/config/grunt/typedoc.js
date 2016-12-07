module.exports = function(cnf) {
    return {
        options: {
            module: 'commonjs',
            out: 'dist/docs',
            name: 'my-project',
            target: 'es5',
            "emitDecoratorMetadata": true,
            "experimentalDecorators": true,
            "noEmitHelpers": false,
            "listFiles": true,
            "noImplicitAny": true,
            "allowUnreachableCode":false,
            "moduleResolution": "classic",
            "pretty": true,
            "rootDir": "src/app/"
        },
        src: ['./src/app/**/*.ts'],
        "exclude": [
            "node_modules",
    		"typings/index.d.ts",
            "typings/globals",
            "node_modules/rxjs/operator/delay.d.ts"
        ],
    }
};
