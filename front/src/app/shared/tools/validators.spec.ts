// import { validators as AppValidators, Regexps, RegexpExec, RegexpExecToExp } from './validators';
import {  Regexps } from './regexps';

describe('Validators', () => {

	describe('Regexps', () => {
		it('1,32.01 should validate "false"', () => {
			let amount = '1,32.01';
			let reg = '^' + Regexps.amount + '$';
			let res = new RegExp(reg).exec(amount);

			expect(res).toBeNull();
		});
	});

});


/* tslint:disable */

// import { AccountsTypes } from '../contracts/';
import { Validator } from './validators';

let _ = require('lodash');
let check = require('check-types');


/* tslint:disable */

describe('test validator', () => {

	describe('Simple Validator 1 field', () => {
		const ValidatorAccountRequestCreate = {
			name: Validator.string().require(),
			// value: Validator.number().require(),
			// fname: Validator.string(),
			// type: Validator.list(AccountsTypes).require(),
		};

		let requests = [{
			req: {
				name: 'serg',
			},
			res: {
				resolve: true,
				comment: ``
			}
		},{
			req: {},
			res: {
				resolve: false,
				comment: ``
			}
		},{
			req: {
				name: 423423,
			},
			res: {
				resolve: true,
				comment: ``
			}
		}];

		let validator = Validator.create(ValidatorAccountRequestCreate);

		for (let arg of requests) {
			it(arg.res.comment+' Request: "' + JSON.stringify(arg.req) + '" shoueld validate to: ' + arg.res.resolve, () => {
				let res = validator.isValid(arg.req);

				if(res !== arg.res.resolve) {
					console.error(validator);
				}

				expect(validator.isValid(arg.req)).toBe(arg.res.resolve);
			})
		};


	});



	describe('Simple ValidatorAccountRequestCreate', () => {
		const ValidatorAccountRequestCreate = {
			name: Validator.string().require(),
			value: Validator.number().require(),
			fname: Validator.string(),
			// type: Validator.list(AccountsTypes).require(),
		};

		let requests = [{
			req: {
				name: 'serg',
				value: 0,
				// type: AccountsTypes.CREDITORS
			},
			res: {
				resolve: true,
				comment: ``
			}
		},{
			req: {
				name: 'serg',
				value: 0,
				type: 3123
			},
			res: {
				resolve: false,
				comment: ``
			}
		},{
			req: {
				name: 'serg',
				value: 0,
				// type: AccountsTypes.CREDITORS,
				fname: 234234
			},
			res: {
				resolve: true,
				comment: ``
			}
		}];

		let validator = Validator.create(ValidatorAccountRequestCreate);

		for (let arg of requests) {
			it(arg.res.comment+' Request: "' + JSON.stringify(arg.req) + '" shoueld validate to: ' + arg.res.resolve, () => {
				let res = validator.isValid(arg.req);

				if(res !== arg.res.resolve) {
					console.error(validator);
				}

				expect(validator.isValid(arg.req)).toBe(arg.res.resolve);
			})
		};


	});


	// find?: any = <any> {};
	//
	// limit? : [number, number] = [0, 50];
	// opt?: string[];
	// period?: any;
	describe('Simple Find', () => {

		const ValidatorRequestList = {
			find: Validator.any().require(),
			// limit: Validator.lists(Validator.number(), Validator.number()),
			opt: Validator.any(),
			period: Validator.any()
		};


		let requests = [{
			req: {
			},
			res: {
				resolve: false,
				comment: ``
			}
		},{
			req: {
				find: 'fadfsadf'
			},
			res: {
				resolve: true,
				comment: ``
			}
		}];

		let validator = Validator.create(ValidatorRequestList);

		for (let arg of requests) {
			it(arg.res.comment+' Request: "' + JSON.stringify(arg.req) + '" shoueld validate to: ' + arg.res.resolve, () => {
				let res = validator.isValid(arg.req);

				if(res !== arg.res.resolve) {
					console.error(validator);
				}

				expect(validator.isValid(arg.req)).toBe(arg.res.resolve);
			})
		};
	});

	describe('Simple Find Lists', () => {

		const ValidatorRequestList = {
			find: Validator.any().require(),
			limit: Validator.lists(Validator.number(), Validator.number())
		};


		let requests = [{
			req: {
			},
			res: {
				resolve: false,
				comment: ``
			}
		},{
			req: {
				find: 'fadfsadf'
			},
			res: {
				resolve: true,
				comment: ``
			}
		},{
			req: {
				find: 'fadfsadf',
				limit: 33,
			},
			res: {
				resolve: false,
				comment: ``
			}
		},{
			req: {
				find: 'fadfsadf',
				limit: [],
			},
			res: {
				resolve: true,
				comment: ``
			}
		},{
			req: {
				find: 'fadfsadf',
				limit: [33],
			},
			res: {
				resolve: true,
				comment: ``
			}
		},{
			req: {
				find: 'fadfsadf',
				limit: ['33'],
			},
			res: {
				resolve: true,
				comment: ``
			}
		}];

		let validator = Validator.create(ValidatorRequestList);

		for (let arg of requests) {
			it(arg.res.comment+' Request: "' + JSON.stringify(arg.req) + '" shoueld validate to: ' + arg.res.resolve, () => {
				let res = validator.isValid(arg.req);

				if(res !== arg.res.resolve) {
					console.error(validator);
				}

				expect(validator.isValid(arg.req)).toBe(arg.res.resolve);
			})
		};

	});

	describe('432423', () => {

		const ValidatorLimit = Validator.lists(Validator.number(), Validator.number());
		const validatorAccountRequestCreate = Validator.create({
			name: Validator.string().require(),
			value: Validator.number().require(),
			// type: Validator.list(AccountsTypes).require(),
		});

		const validatorAccountRequestGet = Validator.create({
			name: Validator.string(),
			// type: Validator.list(AccountsTypes)
		});

		const validatorAccountRequestList = Validator.create({
			find: validatorAccountRequestGet,
			limit: ValidatorLimit
		});


	});
});



describe('test validator GET DATA', () => {

	describe('Simple Validator 1 field', () => {
		const ValidatorAccountRequestCreate = {
			name: Validator.string().default('Anton'),
		};

		let requests = [{
			req: {
			},
			res: {
				resolve: true,
				comment: ``
			}
		}];

		let validator = Validator.create(ValidatorAccountRequestCreate);

		for (let arg of requests) {
			it(arg.res.comment+' Request: "' + JSON.stringify(arg.req) + '" shoueld validate to: ' + arg.res.resolve, () => {
				let res = validator.get(arg.req);
				console.log(res);
				//
				// if(res !== arg.res.resolve) {
				// 	console.error(validator);
				// }
				//
				// expect(validator.isValid(arg.req)).toBe(arg.res.resolve);
			})
		};
	});

	xdescribe('Limit', () => {
		const ValidatorLimit = Validator.lists(Validator.number().default(0), Validator.number().default(50));

		let requests = [{
			req: [],
			res: {
				resolve: true,
				comment: ``
			}
		}, {
			req: ['323'],
			res: {
				resolve: true,
				comment: ``
			}
		}, {
			req: ['fdsf'],
			res: {
				resolve: true,
				comment: ``
			}
		}, {
			req: ['fdsf', 42423, 424234],
			res: {
				resolve: true,
				comment: ``
			}
		}];

		let validator = ValidatorLimit;

		for (let arg of requests) {
			it(arg.res.comment+' Request: "' + JSON.stringify(arg.req) + '" shoueld validate to: ' + arg.res.resolve, () => {
				let res = validator.get(arg.req);
				console.log(res);
				//
				// if(res !== arg.res.resolve) {
				// 	console.error(validator);
				// }
				//
				// expect(validator.isValid(arg.req)).toBe(arg.res.resolve);
			})
		};
	});


		describe('LimitDefault limit.require()', () => {
			const ValidatorLimit = Validator.lists(Validator.number().default(0), Validator.number().default(50));
			const ValidatorAccountRequestCreate = {
				name: Validator.string().default('Anton'),
				limit: ValidatorLimit.require()
			};

			let validator = Validator.create(ValidatorAccountRequestCreate);


			let requests = [{
				req: [],
				res: {
					resolve: true,
					comment: ``
				}
			}];

			for (let arg of requests) {
				it(arg.res.comment+' Request: "' + JSON.stringify(arg.req) + '" shoueld validate to: ' + arg.res.resolve, () => {
					let res = validator.get(arg.req);
					console.log(res);
					//
					// if(res !== arg.res.resolve) {
					// 	console.error(validator);
					// }
					//
					// expect(validator.isValid(arg.req)).toBe(arg.res.resolve);
				})
			};


		});


				describe('LimitDefault', () => {
					const ValidatorLimit = Validator.lists(Validator.number().default(0), Validator.number().default(50));
					const ValidatorAccountRequestCreate = {
						name: Validator.string().default('Anton'),
						limit: ValidatorLimit
					};

					let validator = Validator.create(ValidatorAccountRequestCreate);


					let requests = [{
						req: [],
						res: {
							resolve: true,
							comment: ``
						}
					}];

					for (let arg of requests) {
						it(arg.res.comment+' Request: "' + JSON.stringify(arg.req) + '" shoueld validate to: ' + arg.res.resolve, () => {
							let res = validator.get(arg.req);
							console.log(res);
							//
							// if(res !== arg.res.resolve) {
							// 	console.error(validator);
							// }
							//
							// expect(validator.isValid(arg.req)).toBe(arg.res.resolve);
						})
					};


				});
});
