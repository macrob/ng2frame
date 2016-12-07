// import { Config } from 'config/config';

import * as Contracts from './contracts/contracts';
import { Period } from './common';

// {from: Date, to: Date } | 'today' | 'yesterday' | 'lastweek';
// const debug = Config.d('jasmine:common:period');

// const check = Config.checkTypes();

class Test {
	period: Contracts.Period;

	constructor( public cnf: Contracts.Period  | 'today' | 'yesterday' | 'lastweek' ) {
		this.period = Period(cnf);
	}
}

describe('Period', () => {



	it('Period Argument: today, check defined properties', () => {

		// let t = new Test({from: new Date(), to: new Date()});
		let t = new Test('today');

		// debug.log(t);
		var actual = Object.keys(t.period).sort();
		var expected = [
			'from',
			'to',
		].sort();

		expect(actual).toEqual(expected);
	});
});
