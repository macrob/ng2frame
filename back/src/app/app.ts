// import * as path from 'path';


// require.main.paths.push(path.resolve(__dirname));
// console.log(require.main.paths);

// import { Job } from './job';
import { Web } from './web';
// import { Connection as ConnectionMongo } from './models/connection.mongo';
import { Config } from './config/config';

export class App {

	debug: any;
	constructor(private worker: any, private config: Config = new Config()) {

		this.debug = Config.debug('app');

		this.worker.run().then( () => {
			this.debug.log({worker: 'run'});
		}).catch( (e: Error) => {
			this.debug.error({e});
			this.close({obj: 'worker', on: 'error'});
		});

		// ConnectionMongo.getInstance().run().catch(this.close.bind(this, {obj: 'app', on: 'close'}));

		this.onClose().then(this.close.bind(this, {obj: 'app', on: 'close'}));
	}

	onClose() : Promise<any> {
		return new Promise( (resolve, reject) => {
			this.debug.log({s: 'wait exit'});

			process.on('SIGINT', resolve);
			process.on('SIGTERM', resolve);
		});
	};

	close(evn: {obj: string; on: string}): void {
		const stop = () => {
			const terminate = require('terminate');

			terminate(process.pid, (err: any, done: any) => {
				this.debug.log({err, done});

				if (err) { // you will get an error if you did not supply a valid process.pid
					this.debug.error({ err }); // handle errors in your preferred way.
				} else {
					this.debug.log('stoped'); // do what you do best!
					process.exit(0);
				}
			});
		};

		this.debug.log(evn);

		// this.worker.close().then( (evn: {obj: string; on: string}) => {
		this.worker.close().catch( (e: any) => {
			this.debug.error(e);
			return true;
		}).then( (evn: any) => {
			this.debug.log({obj: 'worker', evn});
			stop();
		});

	}

	static bootstrapJob() {
		// const job = Job.getInstance();

		// return new App(job);
	}


	static bootstrapWeb() {
		const web = new Web();

		return new App(web);
	}
}

export { Config } from './config/config';
