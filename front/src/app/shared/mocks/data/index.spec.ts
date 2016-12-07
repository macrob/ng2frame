
import { mockDb } from './index';

describe('Check mocks for accounts', () => {


	// let debug = require('debug');
	it('Mock must have more then 1 record', () => {

		expect(mockDb.account).toBeDefined();
	});

});
