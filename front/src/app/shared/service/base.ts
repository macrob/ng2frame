/* tslint:disable */
import { Http, Headers, URLSearchParams } from '@angular/http';
/* tslint:enable */
import { ApiService } from '../api.service';

import * as moment from 'moment';
declare var $: any;


export class Service {
	protected headers = new Headers({ 'Content-Type': 'application/json' });
	protected module: string;



	constructor(
		public http: Http, public api: ApiService) {

	}

	protected get(moduleAction: string, params?: Object): Promise<Object[] | Object>  {
				// console.log({moduleAction, params});
		return this.request(this.getRoute(moduleAction), params, 'get');
	}

	protected post(moduleAction: string, params?: Object): Promise<Object[] | Object>  {
		return this.request(this.getRoute(moduleAction), params, 'post');
	}

	protected getRoute(route: string, module?: string): string {

		module = module ? module : this.module;

		// let data: any = { route, module };

		if (!this.api.get(module)) {
			// throw { msg: 'Module Route in api not found', data , route};
			throw `Module Route in api not found ${module}`;
			// throw {msg: 'Module in api url not found', data};
		}

		if (!this.api.get(module)[route]) {
			// throw { msg: 'Module Route in api not found', data , route};
			throw `Module Route in api not found ${module} ${route}`;
		}


		return this.api.get(module)[route].url;
	}

	protected isValid(req: any): Promise<any>  {

		return new Promise((res, rej) =>  {
			if (typeof req === 'undefined') {
				res(req);
				return true;
			}
			if (typeof req.isValid === 'undefined') {
				res(req);
				return true;
			}

			if (req.isValid()) {
				res(typeof req.getData === 'undefined' ? req : req.getData());
			} else {
				rej({ msg: 'Validation Error', error: 'validation', req });
			}
		});
	}

	public query(url: string, params?: Object, method: 'get' | 'post' | 'delete' | 'put' = 'get'): Promise<Object[] | Object>  {
		return this.isValid(params).then((data: any) =>  {

			let rs: any;
			switch (method) {
				case 'get':
					rs = (<any> this.http)[method](url, {
						headers: this.headers,
						// search: new URLSearchParams($.param((<any>  params).find))
						// search: new URLSearchParams($.param((<any> data)))
						search: $.param((<any> data))
					});

					break;
				default:
					rs = (<any> this.http)[method](url, data, {
						headers: this.headers
					});
			};

			return rs;
		});
	}
	protected requestDataToQuary(data: any) {
		let check = require('check-types');

		let find = {};
		let limit = {};
		let period = {};

		if (data.find) {
			find = data.find;
		}

		if (data.limit) {
			limit = {
				page: data.limit[0],
				limit: data.limit[1]
			};
		}

	if (data.period) {
		if (check.assigned(data.period.length)) {
			period = {
				sdt: moment(data.period[0]).format('DD-MM-YYYY'),
				edt: moment(data.period[1]).format('DD-MM-YYYY')
			};
		} else {
			period = {
				dt: moment(data.period).format('DD-MM-YYYY'),
			};
		}
	}

		return $.param(<any> Object.assign({}, find, limit, period));
	}

	public request(url: string, params?: Object, method: 'get' | 'post' | 'delete' | 'put' = 'get'): Promise<Object[] | Object>  {
		return this.isValid(params).then((data: any) =>  {

			let rs: any;
			switch (method) {
				case 'get':
					rs = (<any> this.http)[method](url, {
						headers: this.headers,
						// search: new URLSearchParams($.param((<any>  params).find))
						search: this.requestDataToQuary(data)
					});

					break;
				default:
					rs = (<any> this.http)[method](url, data, {
						headers: this.headers
					});
			};

			return rs.toPromise().then((response: any) =>  {
				return response.json();
			});
		});
	}

	protected handleError(err: Error) {
		// console.error(err);
		return true;
	}
}
