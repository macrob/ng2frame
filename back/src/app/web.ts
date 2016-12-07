

import * as express from 'express';
// import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as fs from 'fs';



// require.main.paths.push(path.resolve(__dirname));
// console.log(require.main.paths);
import { Config } from 'config/config';
import { Routing } from 'config/routing';
// import { Job } from './job';


const cookieParser = require('cookie-parser');
const logger = require('morgan');
const useragent = require('express-useragent');
const fileUpload = require('express-fileupload');

export class Web {

	public port: number;
	public host: string;
	public socket: string;

	private debug: any = Config.debug('app:web');

	public srv: http.Server;

	constructor(
		private config: Config = new Config(),
		private router: Routing = new Routing(),
		private app: express.Application = express()
	) {

		this.port = <number> this.config.get('http.port');
		this.host = <string> this.config.get('http.host');
		this.socket = <string> this.config.get('http.socket');


		this.app.use(logger('dev'));
		this.app.use(fileUpload());

		this.app.set('trust proxy', true);
		this.app.set('port', this.port);
		this.app.set('host', this.host);

		// this.app.set('views', path.join(__dirname, 'views'));
		// this.app.set('view engine', 'jade');

		this.app.use((req, res, next) => {
			res.header('Access-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
			next();
		});



		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({ extended: true }));
		this.app.use(cookieParser());


		this.app.use(useragent.express());
		this.app.use('/adm/', express.static(this.config.root('public/')));
		this.app.use('/docs', express.static(this.config.root('docs/')));


		// this.app.use('/agenda', Job.getInstance().agendash());
		this.app.use(this.router.get());
	}

	public close(): Promise<any> {
		return new Promise( (resolve, reject) => {
				// // this.srv.close( (x: any, y: any) => {
				// 	this.debug.log({ x, y});
				// // 	resolve('closed');
				// // });
				// this.srv.close(resolve);
				if (this.socket) {
					fs.unlink(this.socket);
				}

			if (this.srv) {
				this.srv.on('close', (e: any): void => {
					this.debug.log({on	: 'close', e});
					// this.debug.log({e});
					// process.exit(1);
					resolve({on: 'close', e });
				});

				this.srv.emit('close');
			} else {
				resolve({on: 'close', e: 'Srv not started' });
			}

		});
	}

	public run(): Promise<any> {
		return new Promise((resolve, reject) => {

			this.srv = http.createServer(<any> this.app);

			if (this.socket) {
				this.debug.log('debug');
				this.srv.listen(this.socket);
			} else {
				this.srv.listen(this.port, this.host);
			}

			this.srv.on('listening', () => {

				let lst = this.socket ? this.socket : this.host + ':' + this.port;

				if (this.socket) {
					setTimeout(() => {
						fs.chmodSync(this.socket, 666);
					}, 1000);
				}

				this.debug.log('Listening on ' + lst);
				resolve();
			});

			this.srv.on('error', (e: NodeJS.ErrnoException): void => {
				this.debug.log({on: 'error', e});

				reject({on: 'error', e });
				// this.close().then( () => {
				// 	resolve({on: 'error', e });
				// });
			});
		});
	}

}
