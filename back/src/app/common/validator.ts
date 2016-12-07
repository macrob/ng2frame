let _ = require('lodash');
let check = require('check-types');
// import { Regexps } from '../config/';


export namespace Regexps {
	export const amount = '(-?\\s*[1-9][0-9]*((\\.[0-9]{1,2})?)|0)';
	export const findNumber = '^((' + amount + ')|(L(' + amount + '))|(G(' + amount + '))|(G(' + amount + ')L(' + amount + ')))$';
}


export namespace RegexpExec {


	export function findNumber(arg: string): any {
		let regexGroups: any;

		let res = new RegExp(Regexps.findNumber).exec(arg);
		console.log({res, arg});

		// regexGroups = { gte: 8 };
		// if (check.not.undefined(res[regexGroups.gte])) {
		// 	return { gte: parseFloat(res[regexGroups.gte]) };
		// }

		regexGroups = { gte: 12 };
		if (check.not.undefined(res[regexGroups.gte])) {
			return { gte: parseFloat(res[regexGroups.gte]) };
		}

		// regexGroups = { gte: 11, lte:  13};
		// if ( check.not.undefined(res[regexGroups.lte]) && check.not.undefined(res[regexGroups.gte])) {
		// 	return { gte: parseFloat(res[regexGroups.gte]), lte: parseFloat(res[regexGroups.lte])};
		// }

		regexGroups = { gte: 17, lte:  21};
		if ( check.not.undefined(res[regexGroups.lte]) && check.not.undefined(res[regexGroups.gte])) {
			return { gte: parseFloat(res[regexGroups.gte]), lte: parseFloat(res[regexGroups.lte])};
		}

		// regexGroups = { lte:  5};
		// if ( check.not.undefined(res[regexGroups.lte])) {
		// 	return { lte: parseFloat(res[regexGroups.lte])};
		// }

		regexGroups = { lte:  8};
		if ( check.not.undefined(res[regexGroups.lte])) {
			return { lte: parseFloat(res[regexGroups.lte])};
		}

		regexGroups = { eq:  2};
		if ( check.not.undefined(res[regexGroups.eq])) {
			return { eq: parseFloat(res[regexGroups.eq])};
		}
	}
}

export namespace RegexpExecToExp {
	// export function findNumber(regExec: {gte?: number, lte?: number, eq?: number}, obj)
	export function findNumber(arg: string) {
		let res: any = RegexpExec.findNumber(arg);

		return (arg: number): boolean => {
			let rs = true;

			if (check.not.undefined(res.eq)) {
				rs = rs && res.eq === arg;
			};

			if (check.not.undefined(res.lte)) {
				rs = rs && res.lte >= arg;
			}

			if (check.not.undefined(res.gte)) {
				rs = rs && res.gte <= arg;
			}
			// console.log({rs, arg, res});
			return rs;
		};
	}
}

export namespace Validator {
	// const SCALAR = create();

	export class Validator  {
		isRequire: boolean = false;
		lastValidation: any;

		defaultValue: any;
		requestValues: any;

		constructor(protected data: any, protected isScalar: boolean = false) {

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

						switch (this.data.type) {
							case 'string':
								req = req.toString();
							break;
							case 'number':
								req = check.number(req) ? parseFloat(req) : this.defaultValue;
							break;
							case 'findnumber':
								req = check.number(req) ? parseFloat(req) : this.defaultValue;
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
					_.each(this.data, (validator:  any, properties: any) => {
						switch (true) {
							case check.not.undefined(validator.isValid):
								// console.log({isValid: 'go', properties, validator, req: req[properties]});

								req[properties] = validator.get(req[properties]);
							break;
						}

					});

					req =  _.pickBy(req, (el: any) => {
						return _.isUndefined(el) === false;
					});
			}

			return req;
		}

		get(req?: any): any {
			return this.prepare(req);
		}

		set(data: any): this {
			this.requestValues = this.prepare(data);
			console.log({val: this.requestValues, data});
			return this;
		}

		getData() {
			console.log({reqData: this.requestValues});
			return this.requestValues;
		}

		// isValid(req: any = this.requestValues) {
		// 	// req = req ? this.prepare(req) : this.requestValues;
		//
		// 	return this.validation(req);
		// }

		isValid(req: any) {
			req = req ? this.prepare(req) : this.requestValues;
			console.log(req);
			let rs = this.validation(req);
			console.log({isvalid: rs});
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
								rs = rs &&  check.string(req);
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

					_.each(this.data, (validator:  any, properties: any) => {

						switch (true) {
							case check.not.undefined(validator.isValid):
								console.log({isValid: 'go', properties, validator, req: req[properties]});

								(<any> results)[properties] = {
									property: properties,
									isValid: validator.validation(req[properties])
								};
							break;
							default:
								throw {msg: 'uknownr'};
						}

					});
			}

			this.lastValidation = {
				request: req,
				results: results
			};

			rs = rs && _.every(results, {isValid: true});
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


	export function list (values: any) {
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
	export function lists (...validators: { isValid(x: any): boolean}[]) {
		return create({
			type: 'lists',
			values: validators
		}, true);
	};
}
