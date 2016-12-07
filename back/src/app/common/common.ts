// import { Config } from 'config/config';
import * as Contracts from './contracts/contracts';

// const _ = require('lodash');
const check = require('check-types');
const moment = require('moment');

export function Period(alias?: 'yesterday' | 'lastweek' | 'today' | 'lastmonth' | Contracts.Period | string): Contracts.Period {


	const period: Contracts.Period = {
		from: new Date(moment('00:00', 'hh:mm').utc().startOf('month').toISOString()),
		to: new Date(moment('23:59', 'hh:mm').utc().endOf('month').toISOString())
	};

	if (check.object(alias)) {
		return Object.assign(period, alias);
	}


	switch (alias) {
		case 'yesterday':
			period.from = new Date(moment('00:00', 'hh:mm').add(-1, 'days').toISOString());
			period.to = new Date(moment('23:59', 'hh:mm').add(-1, 'days').toISOString());
		break;
		case 'lastweek':
			period.from = new Date(moment('00:00', 'hh:mm').startOf('week').add(-7, 'days').toISOString());
			period.to = new Date(moment('23:59', 'hh:mm').startOf('week').toISOString());
		break;
		case 'lastmonth':
		period.from = new Date(moment('00:00', 'hh:mm').startOf('month').add(0, 'days').toISOString());
		period.to = new Date(moment('23:59', 'hh:mm').toISOString());
		break;
		default:
			let regex = /^(2\d{7})\|(2\d{7})$/gi;
			let match: any = regex.exec(alias.toString());

			if (match) {
				period.from = new Date(moment(match[1], 'YYYYDDMM').toISOString());
				period.to = new Date(moment(match[2], 'YYYYDDMM').toISOString());
			}

			regex = /^(\d{8})\|(\d{8})$/gi;
			match = regex.exec(alias.toString());

			if (match) {
				period.from = new Date(moment(match[1], 'DDMMYYYY').toISOString());
				period.to = new Date(moment(match[2], 'DDMMYYYY').toISOString());
			}

			regex = /^(20\d{2}-\d\d-\d\d)_(20\d{2}-\d\d-\d\d)$/gi;
			match = regex.exec(alias.toString());

			if (match) {
				period.from = new Date(moment(match[1], 'YYYY-MM-DD').toISOString());
				period.to = new Date(moment(match[2], 'YYYY-MM-DD').toISOString());
			}

			regex = /^(20\d{2}-\d{1,2}-\d{1,2})$/gi;
			match = regex.exec(alias.toString());

			if (match) {
				period.from = new Date(moment(match[1] + ' ' + '00:00', 'YYYY-M-D hh:mm').utc().toISOString());
				period.to = new Date(moment(match[1] + ' ' + '23:59', 'YYYY-M-D hh:mm').toISOString());
				console.log(period);
			}
	}

	// console.log(period);
	return period;
};
//
// export class Period implements Contracts.Period {
// 	from: Date;
// 	to: Date;
//
// 	constructor (alias?: 'yesterday' | 'lastweek' | 'today' | Contracts.Period) {
// 		const check = Config.checkTypes();
// 		const moment = require('moment');
//
// 		if (check.object(alias)) {
// 			return Object.assign(this, alias);
// 		}
//
// 		switch (alias) {
// 			case 'yesterday':
// 				this.from = new Date(moment('00:01', 'hh:mm').add(-1, 'days').toISOString());
// 				this.to = new Date(moment('23:59', 'hh:mm').add(-1, 'days').toISOString());
// 			break;
// 			case 'lastweek':
// 				this.from = new Date(moment('00:01', 'hh:mm').startOf('week').add(-7, 'days').toISOString());
// 				this.to = new Date(moment('23:59', 'hh:mm').startOf('week').toISOString());
// 			break;
// 			default:
// 				this.from = new Date(moment('00:01', 'hh:mm').toISOString());
// 				this.to = new Date(moment('23:59', 'hh:mm').toISOString());
// 		}
// 	}
//
// 	static get(alias: 'yesterday' | 'lastweek' | 'today' | Contracts.Period ): Period {
// 		// const check = Config.checkTypes();
// 		// const moment = require('moment');
// 		//
// 		// if (check.object(alias)) {
// 		// 	return <Period> alias;
// 		// }
// 		//
// 		// let period = new Period();
// 		// switch (alias) {
// 		// 	case 'yesterday':
// 		// 		period.from = new Date(moment('00:01', 'hh:mm').add(-1, 'days').toISOString());
// 		// 		period.to = new Date(moment('23:59', 'hh:mm').add(-1, 'days').toISOString());
// 		// 	break;
// 		// 	case 'lastweek':
// 		// 		period.from = new Date(moment('00:01', 'hh:mm').startOf('week').add(-7, 'days').toISOString());
// 		// 		period.to = new Date(moment('23:59', 'hh:mm').startOf('week').toISOString());
// 		// 	break;
// 		// 	default:
// 		// 		period.from = new Date(moment('00:01', 'hh:mm').toISOString());
// 		// 		period.to = new Date(moment('23:59', 'hh:mm').toISOString());
// 		// }
// 		//
// 		return new Period(alias);
// 	}
// }


// import * as Contracts from './contracts/contracts';
export import Contracts = Contracts;
export { Validator } from './validator';
export const appValidator = require('./requests.validator');
