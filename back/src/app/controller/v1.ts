
import * as _ from 'lodash';
import * as express from 'express';
import { Controller } from './controller';

const moment = require('moment');


// import { Validator, appValidator } from '../common/common';



// const check = require('check-types');

export function requestToGet(req: any) {
	let find: any = {};
	let period: any = [];
	let lim = req.limit ? req.limit : 15;
	let start = parseInt(req.page) > 0 ? (parseInt(req.page) - 1) * lim : 0;
			// sdt: moment(data.period[0], 'DD-MM-YYYY').toDate(),
			// edt: moment(data.period[1], 'DD-MM-YYYY').toDate()
	if (req.sdt || req.edt ) {
		period = [
			req.sdt  ? moment(req.sdt , 'DD-MM-YYYY').hours(0).minutes(0).seconds(0).toDate() : moment().hours(0).minutes(0).seconds(0).toDate(),
			req.edt  ? moment(req.edt , 'DD-MM-YYYY').hours(23).minutes(59).seconds(59).toDate() : moment().hours(23).minutes(59).seconds(59).toDate(),
		];
	}

	if (req.dt ) {
		period = [
			moment(req.dt , 'DD-MM-YYYY').hours(0).minutes(0).seconds(0).toDate(),
			moment(req.dt , 'DD-MM-YYYY').hours(23).minutes(59).seconds(59).toDate()
		];
	}


	// let req.sdt
	// req.edt

	let limit: number[] = [start, lim];

	_.unset(req, ['page', 'limit', 'sdt', 'edt', 'dt']);
	find = req;

	let query: any = {find, limit};
	if (period.length) {
		query.period = period;
	}

	return query;
}


export class Account extends Controller {


	constructor() {
		super('account');
	}


	public list(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> | any {
		return '423fsdfsdasdffsfsdfffsfsdfsfsdsdfsdsdfsdfd';
	}

	public create(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> | any {

		return 'test2';
	}
}
