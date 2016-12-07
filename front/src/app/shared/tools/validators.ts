// import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Regexps } from './regexps';

let _ = require('lodash');
let check = require('check-types');

	export namespace NgForm {
		export const amount = Validators.pattern('^' + Regexps.amount + '$');
		export const findNumber = Validators.pattern(Regexps.findNumber);
		export const idNumber = Validators.pattern('^[0-9]+$');
	}

	export namespace Validator {
		export class Validator {
			isRequire: boolean = false;
			lastValidation: any;

			defaultValue: any;
			requestValues: any;

			constructor(protected data: any, protected isScalar: boolean = false) {

			}

			append(...opt: {}[]) {
				Object.assign(this.data, ...opt);
				return this;
			}

			private prepare(data: any): any {
				// console.log(this, req);
				let req = data;

				switch (true) {
					case check.not.undefined(this.data.type) && this.isScalar:

						if (check.undefined(req)) {
							req = this.defaultValue;
						}

						if (check.undefined(req) && this.data.type === 'lists' && this.isRequire) {
							req = [];
						}

						if (check.not.undefined(req)) {
							// console.log(this.data.type);
							switch (this.data.type) {
								case 'string':
									req = req.toString();
									break;
								case 'number':
									req = check.number(parseFloat(req)) ? parseFloat(req) : this.defaultValue;
									break;
								case 'findnumber':
									req = req.toString();
									break;
								case 'any':
									// retunr req;
									break;
								case 'lists':
									let lists: any[] = [];
									// if (check.array(req)) {
									req = check.array(req) ? req : [req];

									_.each(this.data.values, (validator: any, ind: any) => {
										lists.push(validator.get(req[ind]));
									});
									// }
									req = lists;
									break;
								case 'enum':
									// rs = rs && check.not.undefined(this.data.values[req]) && check.not.undefined(this.data.values[this.data.values[req]]);
								break;
							}
						}


						break;
					default:

						req = _.pick(req, _.keys(this.data));
						// console.log(req);
						_.each(this.data, (validator: any, properties: any) => {
							switch (true) {
								case check.not.undefined(validator.isValid):
									// console.log({isValid: 'go', properties, validator, req: req[properties]});
									// console.log({properties, val: req[properties], lt: validator.get(req[properties])});
									req[properties] = validator.get(req[properties]);
									break;
							}

						});

						req = _.pickBy(req, (el: any) => {
							return _.isUndefined(el) === false;
						});
				}

				return req;
			}

			get(req?: any): any {
				return this.prepare(req);
			}

			set(data: any): this {
				// console.log({data, v: this});
				this.requestValues = this.prepare(data);
				// console.log({v: this, d: this.requestValues, data});
				// console.log({ val: this.requestValues, data });
				return this;
			}

			getData() {
				// console.log({ reqData: this.requestValues });
				return this.requestValues;
			}

			// isValid(req: any = this.requestValues) {
			// 	// req = req ? this.prepare(req) : this.requestValues;
			//
			// 	return this.validation(req);
			// }

			isValid(req: any) {
				req = req ? this.prepare(req) : this.requestValues;
				// console.log(req);
				let rs = this.validation(req);
				// console.log({ isvalid: rs });
				return rs;
			}

			public validation(req: any): boolean {
				let rs: boolean = true;
				let results = {};

				switch (true) {
					case check.not.undefined(this.data.type) && this.isScalar:

						if (this.isRequire) {
							rs = rs && check.not.undefined(req);
						}

						if (check.not.undefined(req)) {
							switch (this.data.type) {
								case 'string':
									rs = rs && check.string(req);
									break;
								case 'number':
									rs = rs && check.number(req);
									break;
								case 'findnumber':
									rs = rs && new RegExp(Regexps.findNumber).test(req);
									break;
								case 'any':

									break;
								case 'lists':

									rs = rs && check.array(req);
									if (rs) {
										_.each(this.data.values, (validator: any, ind: any) => {
											rs = rs && validator.validation(req[ind]);
										});
									}

									break;
								case 'enum':
									rs = rs && check.not.undefined(this.data.values[req]) && check.not.undefined(this.data.values[this.data.values[req]]);
									break;
							}
						}
						break;
					default:

						req = _.pick(req, _.keys(this.data));

						_.each(this.data, (validator: any, properties: any) => {

							switch (true) {
								case check.not.undefined(validator.isValid):
									// console.log({ isValid: 'go', properties, validator, req: req[properties] });

									(<any> results)[properties] = {
										property: properties,
										isValid: validator.validation(req[properties])
									};
									break;
								default:
									throw { msg: 'uknownr' };
							}

						});
				}

				this.lastValidation = {
					request: req,
					results: results
				};

				rs = rs && _.every(results, { isValid: true });
				return rs;
			}

			require(): this {
				this.isRequire = true;
				return this;
			}

			default(value: any): this {
				this.defaultValue = value;
				return this;
			}
		}

		export function create(cnf: any, scalar: boolean = false) {
			return new Validator(cnf, scalar);
		}

		export function string() {
			return create({
				type: 'string'
			}, true);
		};

		export function number() {
			return create({
				type: 'number'
			}, true);
		};

		export function findNumber() {
			return create({
				type: 'findnumber'
			}, true);
		};


		export function list(values: any) {
			return create({
				type: 'enum',
				values: values
			}, true);
		};

		export function any() {
			return create({
				type: 'any'
			}, true);
		};
		//
		export function lists(...validators: { isValid(x: any): boolean }[]) {
			return create({
				type: 'lists',
				values: validators
			}, true);
		};
	}



		export namespace AppValidators {

			export function list() {
				return Validator.create({
						find: Validator.any(),
						opt: Validator.any(),
						period: Validator.any(),
						limit: Validator.lists(Validator.number().default(0), Validator.number().default(50)).require()
					});
			};

			// export const LIMIT = {
			// 	l: Validator.number().default(50),
			// 	s: Validator.number().default(0),
			// };

			export const LIST = Validator.create({
					find: Validator.any(),
					opt: Validator.any(),
					period: Validator.any()
				});

			}
