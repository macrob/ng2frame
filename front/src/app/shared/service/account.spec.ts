
import {
	inject,
	fakeAsync,
} from '@angular/core/testing';


import {
	Http,
} from '@angular/http';

import * as Shared from '../';
import { TestBed, Mocks } from '../spec';


// import { Factory } from './';
import { Service } from './account';


describe('AccountService', () => {


	let data: any = new Mocks();
	let mocks = data.createDb();

	jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;

	beforeEach(() => {

		TestBed.configure({
			backend: TestBed.Config.providers.BACKEND_V2,
			providers: [
				{
					provide: Service,
					useFactory: ( http: Http, api: any) => {
						return new Service(http, api);
					},
					deps: [Http, 'ApiService']
				}
			]
		});

	});


	// it('init test', inject([ServiceFactory], (service: any) => {
	//
	// 	console.log(service.get(Service));
	// 	// service.list(arg.req).then( (response: any) => {
	// 	// 	console.log(response);
	// 	// 	expect(true).toEqual(arg.res.resolve);
	// 	// }).catch( err => {
	// 	// 	expect(false).toEqual(arg.res.resolve);
	// 	// });
	// }));


	describe('list', () => {

		describe('Validators request', () => {

			let params = [{
				req: {find: {name: 'aaap', type: 3232}, limit: [0, 20]},
				res: { resolve: false }
			},{
				req: {find: {type: Shared.Contracts.AccountsTypes.CREDITORS}, limit: [0, 20]},
				res: { resolve: true }
			},{
				req: {},
				res: { resolve: true }
			},{
				req: {limit: [0, 'sdffsdf']},
				res: { resolve: true }
			},{
				req: {limit: [0, 'sdffsdf', '234234']},
				res: { resolve: true }
			},{
				req: {limit: [50]},
				res: { resolve: true }
			},{
				req: {limit: 50},
				res: { resolve: true }
			}];

			for (let arg of params) {

				it('Request: "' + JSON.stringify(arg.req) + '" shoueld validate to: ' + arg.res.resolve,
				inject([Service], fakeAsync((service: Shared.Contracts.Service.Account.Service | any) => {
					console.log(service);
					service.list(arg.req).then( (response: any) => {
						console.log(response);
						expect(true).toEqual(arg.res.resolve);
					}).catch( err => {
						console.error(err);
						expect(false).toEqual(arg.res.resolve);
					});
				})));
			};

		});

	});

	describe('create', () => {

		// it('url and response checks', inject([Service],
		// 	fakeAsync((service: Shared.Contracts.Service.Account.Service) => {
		//
		// 	let initDb = mocks.account;
		// 	let initLenght = initDb.length;
		//
		// 	service.list({}).then( (response: any) => {
		// 			expect(response.length).not.toEqual(initLenght + 1);
		// 			expect(response.length).toEqual(initLenght);
		//
		// 			service.create({name: 'Test', value: 0, type: Shared.Contracts.AccountsTypes.CREDITORS}).then( (response: any) => {
		// 				console.log(response);
		// 				expect(response.length).toEqual(initLenght + 1);
		// 			});
		// 	});
		//
		//
		// })));


		describe('Validators request', () => {

			let params = [{
				req: {name: 'aaap', type: 3232},
				res: { resolve: false }
			},{
				req: {type: Shared.Contracts.AccountsTypes.CREDITORS},
				res: { resolve: false }
			},{
				req: {},
				res: { resolve: false }
			},{
				req: {name: 'aaap', value: 3232},
				res: { resolve: false }
			},{
				req: { value: '3232'},
				res: { resolve: false }
			},{
				req: { type: Shared.Contracts.AccountsTypes.CREDITORS, name: 'Test', value: -444 },
				res: { resolve: true }
			},{
				req: { type: Shared.Contracts.AccountsTypes.DEBITORS, name: 'Test2', value: 434.44 },
				res: { resolve: true }
			}];

			for (let arg of params) {

				it('Request: "' + JSON.stringify(arg.req) + '" shoueld validate to: ' + arg.res.resolve,
				inject([Service], fakeAsync((service: Shared.Contracts.Service.Account.Service | any) => {

					service.create(arg.req).then( (response: any) => {
						console.log(response);
						expect(true).toEqual(arg.res.resolve);
					}).catch( err => {
						console.error(err);
						expect(false).toEqual(arg.res.resolve);
					});
				})));
			};

		});


		it('url and response checks', inject([Service],
			fakeAsync((service: Shared.Contracts.Service.Account.Service) => {

			let initDb = mocks.account;
			let initLenght = initDb.length;

			service.list({}).then( (response: any) => {
				expect(response.length).not.toEqual(initLenght + 1);
				expect(response.length).toEqual(initLenght);

				service.create({name: 'Test', value: 0, type: Shared.Contracts.AccountsTypes.CREDITORS}).then( (response: any) => {
					console.log(response);
					expect(response.id).toBeDefined();
				});
			});


		})));

	});

});
