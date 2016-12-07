import { ApiService } from './api.service';

describe('Api.Service', () => {

	let api = new ApiService('http://test.com');

	it('detect', () => {
		let module = api.detect('http://test.comaccount/');

		expect(module).toEqual('account');
	});
});
