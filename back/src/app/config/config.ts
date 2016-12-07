import * as path from 'path';
import * as fs from 'fs';
import * as crypto from 'crypto';
import * as url from 'url';
import * as querystring from 'querystring';

const env = process.env.NODE_ENV || 'default';
const prjRoot = path.resolve(process.env.PWD);

export class Config {

	check: any;

	static data: JSON = require(path.resolve(prjRoot, 'config/' + env + '.json'));
	static env: string;

	static phantomjs = require('phantomjs').path;
	static process = require('child-process-promise').exec;

	/* fix for Unused importnused import */
	static use(...x: any[]): boolean {
		return x.hasOwnProperty('length');
	}

	[propName: string]: any;


	// waitFor<T>(data: Promise<T>): T {
	// 	let result: T;
	//
	// 	data.then
	//
	// 	return result'
	// }

	getTmpname(name: string): string {
		return path.resolve(prjRoot, 'tmp/', crypto.createHash('md5').update(name).digest('hex'));
	}

	static debug(debug: string) {
		let d = {
			log: require('debug')(debug),
			error: require('debug')(debug + ':error')
		};

		d.log.log = console.log.bind(console);

		return d;
	}

	getMysqlUri() {
		let mysql = <any> this.get('mysql');
		return 'mysql://' + mysql.username + ':' + mysql.password + '@' + mysql.host + ':' + mysql.port + '/' + mysql.dbname;
	}

	get(pth: string): any {

		let pthArray = pth.split('.');
		let fkey = pthArray.shift();
		let cnf: any;

		switch (true) {
			case Config.hasOwnProperty(fkey):
				cnf = (<any> Config) [fkey];
			break;
			case Config.data.hasOwnProperty(fkey):
				cnf = (<any> Config.data) [fkey];
			break;
			default:
				return null;
		}

		while (pthArray.length > 0) {

			let key = pthArray.shift();
			if (cnf.hasOwnProperty(key)) {
				cnf = cnf[key];
			} else {
				return null;
			}

		}

		return cnf;
	}

	read(entity: string): string {
		let pth: string = this.path(entity);

		return fs.readFileSync(pth, 'UTF-8');
	}

	path(entity: string): string {
		let pth: string;

		switch (true) {
			case this.check.assigned(this[entity]):
				pth = this[entity]();
			break;

			case Config.hasOwnProperty(entity):
				pth = this.resolve((<any> Config) [entity]);
			break;
			default:
				let cnf = this.get(entity);

				if (this.check.assigned(cnf)) {
					// pth = cnf;
					pth = this.resolve(cnf);
				} else {
					pth = this.resolve(entity);
				}
		}

		return pth;
	}
	root(pth: string): string {
		return path.resolve(prjRoot, pth);
	}
	resolve(pth: string): string {
		return path.resolve(__dirname, '..', '..', pth);
	}

	exec(cmd: string | Array<string>, opt?: Object): Promise<string> {
		let cmdEx: any;

		if (this.check.array(cmd)) {
			cmdEx = 	<Array<string>> cmd;
			cmdEx = cmdEx.join(' ');

		} else {
			cmdEx = <string> cmd;
		}

		// let cmdEx: string = this.check.array(cmd) ? <any>cmd.join(' ') : cmd;

		return Config.process(cmdEx, opt).then( (result: {stderr: string, stdout: string} ) => {
			// if (result.stdout) {
			// 	throw new Error(result.stderr);
			// }
			//
			// if (result.stderr) {
			// 	throw new Error(result.stderr);
			// }
			return result.stdout;
		});
	}

	phantom(script: string | Array<string>): Promise<string> {
		let cmd: any;

		if (this.check.array(script)) {
			cmd = <Array<string>> script;
			cmd.unshift(Config.phantomjs);

		} else {
			cmd = <string> script + ' ' + script;
		}

		return this.exec(cmd, { maxBuffer: 800 * 10024 });
	}

	getFromUrl(purl: string, param: string): string {

		if ( this.check.array(purl) ) {
			purl = ( <any> purl).shift();
		};

		let parsed = url.parse(purl);
		let res: string;

		if (this.check.nonEmptyString(parsed.query)) {
			let params = querystring.parse(parsed.query);

			res = this.check.nonEmptyString(params[param]) ? params[param] : false;
		}

		return res;
	};


	static promisify(func: any, context?: any): any {
		return (...opt: Array<any>): Promise<any> => {

			return new Promise( (resolve, reject) => {

				opt.push( (err: any, result: any) => {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				});

				func.apply(context, opt);
			});
		};
	}
}


import * as Sequelize from 'sequelize';

export class MysqlConnection {
	static instance: MysqlConnection;

	private connection: Sequelize.Sequelize;


	constructor(private config: Config = new Config()) {
		if ( MysqlConnection.instance ) {
			throw new Error('User MysqlConnection.getInstance(), cant use new MysqlConnection');
		}

		this.connection = new Sequelize(this.config.getMysqlUri(), { logging: false });

		this.connection
			.authenticate()
			.then( () => {
				console.log('Connection has been established successfully.');
			}, (err: Error) => {
				console.error('Unable to connect to the database:', err);
			});


		return this;
	}

	connected(): Promise<any> {
		return new Promise( (resolve, reject) => {
			this.connection
				.authenticate()
				.then( () => {
					console.log('Connection has been established successfully.');
					resolve();
				}, (err: Error) => {
					console.error('Unable to connect to the database:', err);
					reject();
				});


		});
	}

	get(): Sequelize.Sequelize {

		return this.connection;
	}

	static getInstance(): MysqlConnection {
		if (!this.instance) {

			this.instance = new MysqlConnection();
		}

		return this.instance;
}
}
