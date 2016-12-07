// import * as express from 'express';
//
// import * as fs from 'fs';
// import * as http from 'http';
// import * as Agenda from 'agenda';
//
//
// // import { Job as JobService } from 'services/job/service';
// import { Config } from 'config/config';
//
// import { EventEmitter } from 'events';
// import * as _ from 'lodash';
// // import * as Crawll from 'services/services';
//
//
// export class Job {
// 	public status: string;
// 	public running: any[] = new Array();
// 	public srv: http.Server;
// 	public agenda: Agenda;
// 	public app: express.Application;
//
// 	public port: number;
// 	public host: string;
// 	public socket: string;
//
// 	private evn = new EventEmitter();
//
// 	private static _instance: Job = new Job();
//
// 	constructor(
// 		private config: Config = new Config()
// 	) {
//
// 		if (Job._instance) {
// 			throw new Error('Error: Instantiation failed: Use SingletonClass.getInstance() instead of new.');
// 		}
//
// 		this.port = <number> this.config.get('agendash.port');
// 		this.host = <string> this.config.get('agendash.host');
// 		this.socket = <string> this.config.get('agendash.socket');
//
// 		this.agenda = new Agenda({
// 			db: { address: this.config.get('mongodb'), collection: 'agendaJobs' },
// 			processEvery: '4 seconds',
// 			maxConcurrency: 20,
// 			defaultConcurrency: 5,
// 		});
// 		// Job._instance.setTasks();
// 	}
//
// 	public get(): Agenda {
// 		return this.agenda;
// 	}
//
// 	public tasks(services: JobService.Service = new JobService.Service()): void {
// 		const taskList = services.tasks();
// 		const debug = this.config.debug('app:job:taks:');
//
// 		for (let i in taskList) {
// 			if (taskList.hasOwnProperty(i)) {
//
// 				let task = (<any> taskList) [i];
// 				debug.log('Task %s added', i);
//
// 				this.agenda.define(i, task[0], (job: Agenda.Job, done: (err?: Error) => void) => {
// 					const debug = this.config.debug('app:job:taks:' + i + ':');
// 					debug.log(job.attrs.data);
// 					task[1](job.attrs.data).then( (res: any) => {
//
// 						let id = i + JSON.stringify(job.attrs.data);
// 						debug.log('%s',id);
// 						this.evn.emit('jobdone' + id, res);
// 						done();
// 					}).catch( (e: Error) => {
// 						let id = i + JSON.stringify(job.attrs.data);
// 						debug.error(e, job.attrs.data);
// 						this.evn.emit('joberror' + id, e);
// 						done(e);
// 					});
// 				});
//
// 				if (Config.checkTypes().assigned(task[2])) {
// 					this.agenda.every( task[2], i);
// 				}
//
//
// 			}
// 		}
// 	}
//
// 	public now(task: string, opt?: any): Promise<Agenda.Job> {
// 		const debug = this.config.debug('app:job:now');
//
// 		return new Promise( (resolve, reject) => {
// 			debug.log('now', task, opt);
//
// 			const job: Agenda.Job = this.agenda.now(task, opt);
// 			const id = job.attrs.name.toString() + JSON.stringify(job.attrs.data);
//
// 			this.evn.on('jobdone' + id, (res: any) => {
// 				resolve(res);
// 				this.evn.removeAllListeners('joberror' + id);
// 				this.evn.removeAllListeners('jobdone' + id);
// 			});
//
// 			this.evn.on('joberror' + id, ( err: Error ) => {
// 				reject(err);
// 				this.evn.removeAllListeners('joberror' + id);
// 				this.evn.removeAllListeners('jobdone' + id);
// 			});
// 		});
// 	}
//
// 	public web(): Promise<any> {
// 		const debug = this.config.debug('app:job:run');
//
// 		return new Promise((resolve, reject) => {
// 			debug.log('run');
//
// 			const agendash = require('agendash');
// 			this.app = express();
// 			this.app.use('/', agendash(this.agenda));
//
// 			this.srv = http.createServer(<any> this.app);
//
// 			if (this.socket) {
// 				this.srv.listen(this.socket);
// 			} else {
// 				this.srv.listen(this.port, this.host);
// 			}
//
// 			this.srv.on('error', (e: NodeJS.ErrnoException): void => {
// 				debug.error(e);
// 				reject(e);
// 			});
//
// 			this.srv.on('listening', () => {
//
// 				let lst = this.socket ? this.socket : this.host + ':' + this.port;
//
// 				if (this.socket) {
// 					setTimeout(() => {
// 						fs.chmodSync(this.socket, 666);
// 					}, 1000);
// 				}
//
// 				debug.log('Listening on ' + lst);
// 				resolve();
// 			});
// 		});
// 	}
//
// 	public ready(): Promise<Job> {
//
// 		return new Promise( (resolve, reject) => {
// 			this.agenda.on('ready', () => {
//
// 				resolve();
// 			});
//
// 			this.agenda.on('error', (e: Error) => {
//
// 				reject(e);
// 			});
// 		});
// 	}
//
// 	public run(): Promise<any> {
// 		return this.ready().then( () => {
//
// 			this.tasks();
//
// 			const debug = this.config.debug('app:job:start');
// 			debug.log('Started Job');
//
// 			this.agenda.on('start', (job: Agenda.Job) => {
// 				this.running.push(job);
// 				debug.log({status: 'start', name: job.attrs.name, data: job.attrs.data});
// 			});
//
// 			this.agenda.on('complete', (job: Agenda.Job) => {
// 				_.pull(this.running, job);
// 				this.evn.emit('complete');
// 				debug.log({status: 'complete', name: job.attrs.name, data: job.attrs.data});
// 			});
//
// 			this.agenda.on('fail', (err: Error, job: Agenda.Job) => {
// 				debug.error({status: 'fail', name: job.attrs.name, data: job.attrs.data});
// 			});
//
// 			this.agenda.processEvery('15 seconds');
//
// 			this.status = 'start';
// 			this.agenda.start();
// 			return true;
// 		});
// 	}
//
// 	public isStopped(): boolean {
// 		return this.status === 'close';
// 	}
//
// 	public close(): Promise<any> {
// 		const agendaStop = Config.promisify(this.agenda.stop, this.agenda);
// 		const completeTasks = () => {
// 			return new Promise( (resolve, rehect) => {
// 				this.status = 'close';
//
// 				const debug = this.config.debug('app:job:close');
// 				this.evn.on('complete', () => {
// 					debug.log(this.running.length);
// 					if (this.running.length === 0) {
// 						resolve();
// 					}
// 				});
//
// 				if (this.running.length === 0) {
// 					resolve();
// 				}
// 			});
// 		};
//
// 		if (this.srv) {
// 			const serverClose = Config.promisify(this.srv.close, this.srv);
//
// 			if (this.socket) {
// 				fs.unlink(this.socket);
// 			}
//
// 			return serverClose().then(agendaStop).then(completeTasks);
// 		} else {
// 			return agendaStop().then(completeTasks);
// 		}
// 	}
//
// 	public agendash(): any {
// 		const agendash = require('agendash');
// 		return agendash(this.agenda);
// 	}
//
// 	public static getInstance(): Job {
// 		return Job._instance;
// 	}
// }
