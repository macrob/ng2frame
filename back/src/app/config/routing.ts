import * as express from 'express';

import * as v1 from 'controller/v1';
import { Controller } from 'controller/controller';

// import { Config } from 'config/config';

const check = require('check-types');

export class Routing {
	routing = [
		['/sdfsdf/', v1.Account, 'get:list'],
		['*', v1.Account, 'post:create'],
	];

	// private sitemaps: string[];

	constructor(private router: express.Router = express.Router()) {
		this.assign(this.routing);
	}

	// to(name: string): string {
	// 	return
	// }

	private assign(routing: Array<any>): void {

		const controllers: Array <Controller> = [];

		for (let i = 0; i < routing.length; i++) {

			let route: string = (<string> routing[i][0]);
			let method: string =  (<string> routing[i][2]);

			let cntrlName: string = (<any> routing[i][1]).name;

			if (check.not.assigned( (<any> controllers) [ cntrlName ])) {
				(<any> controllers)[ cntrlName ] = new (<any> routing[i][1])();
			}

			let cntrl: any = (<any> controllers)[ cntrlName ];

			// this.router.get(route, cntrl[method].bind(cntrl));
			let splited: string[] = method.split(':');

			if (splited.length === 2) {
				(<any> this.router)[splited[0]](route, cntrl.do.bind(cntrl, splited[1]));
			} else {
				this.router.get(route, cntrl.do.bind(cntrl, method));
			}
		}
	}

	get(): express.Router {
		console.log('fsdf', this.router);
		return this.router;
	}
}
