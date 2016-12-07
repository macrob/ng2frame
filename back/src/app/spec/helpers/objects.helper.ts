import * as _ from 'lodash';

// const statSorting = (records: any): any => {
// 	records.tag = _.orderBy(records.tag, ['dt', 'tag'], ['asc', 'asc']);
// 	records.domain = _.orderBy(records.domain, ['dt', 'domain'], ['asc', 'asc']);
// 	records.browser = _.orderBy(records.browser, ['dt'], ['asc']);
// 	records.country = _.orderBy(records.country, ['dt'], ['asc']);
// 	records.general = _.orderBy(records.general, ['dt', 'domain', 'tag'], ['asc', 'asc', 'asc']);
//
// 	return records;
// };

// const customMatcher = {
// 	toContain: function(util, customEqualityTesters) {
// 		return {
// 			compare: function(actual, expected) {
// 				if (expected === undefined) {
// 					expected = '';
// 				}
// 				var result = {};
// 				_.map(actual, function(item) {
// 					_.map(item, function(subItem, key) {
// 						result.pass = util.equals(subItem,
// 							expected[key], customEqualityTesters);
// 					});
// 				});
// 				if (result.pass) {
// 					result.message = 'Expected ' + actual + 'to contain ' + expected;
// 				}
// 				else {
// 					result.message = 'Expected ' + actual + 'to contain ' + expected + ' but it was not found';
// 				}
// 				return result;
// 			}
// 		};
// 	}
// };


beforeEach(function() {
		jasmine.addMatchers({
			toHaveProperties(util: any, customEqualityTesters: any): { compare: any } {
				return {
					compare(actual: Object[], expected: string[]): { pass: boolean } {

						var result = <any> { pass: true };

						for ( let item of actual) {

							for ( let prop of expected) {
								result.pass = result.pass && item.hasOwnProperty(prop);

								if (!result.pass) {
									result.message = 'Expected ' + JSON.stringify(item) + 'to contain ' + prop + ' but it was not found';
									return result;
								}

							}
							// _.map(item, (subItem: any, key: any) => {
							//
							// 	result.pass = util.equals(subItem,
							// 		expected[key], customEqualityTesters);
							// });

							// if (!result.pass) {
							// 	result.message = 'Expected ' + item + 'to contain ' + expected + ' but it was not found';
							// 	return result;
							// }


						};

						if (result.pass) {
							result.message = 'Expected ' + actual + 'to contain ' + expected;
						} else {
							result.message = 'Expected ' + actual + 'to contain ' + expected + ' but it was not found';
						}

						return result;

					}
				};
			}
		});

		jasmine.addMatchers({
			toBeDefinedProperties(util: any, customEqualityTesters: any): { compare: any } {
				return {
					compare(actual: {[index: string]: any}[], expected: string[]): { pass: boolean } {

						let result = <any> { pass: true };
						// let actualItem: any;

						// _.map(actual, (item) => {
						for ( let item of actual) {

							for (let prop of expected) {
								// result.pass = result.pass && item.hasOwnProperty(prop) && typeof (<any> item)[prop] !== 'undefined';
								result.pass = result.pass && item.hasOwnProperty(prop) && typeof item[prop] !== 'undefined';

								if (!result.pass) {
									result.message = 'Expected ' + JSON.stringify(item) + 'to contain ' + prop + ' but it was not found';
									return result;
								}
							}

							// _.map(item, (subItem: any, key: any) => {
							//
							// 	result.pass = util.equals(subItem,
							// 		expected[key], customEqualityTesters);
							// });
						// });
						};

						if (result.pass) {
							result.message = 'Expected ' + actual + 'to contain ' + expected;
						} else {
							result.message = 'Expected ' + actual + 'to contain ' + expected + ' but it was not found';
						}

						return result;

					}
				};
			}
		});

	jasmine.addMatchers({
		compare(): { compare: any } {
			return {
				compare(record: Object, expected: Object): { pass: boolean } {

					// let model = new expected();
					let model = expected;

					let dif = {
						record: _.differenceBy(Object.keys(record), Object.keys(model)),
						model: _.differenceBy(Object.keys(model), Object.keys(record))
					};

					return {
						pass: dif.record.length === 0 && dif.model.length === 0 &&
						// record instanceof expected &&
						model.constructor.name === record.constructor.name
					};
				}
			};
		}
	});
});

let propertiesCompare = (actual: any, expected: any): boolean => {
	let res: boolean = true;
	let debug = require('debug')('jasmine:propertiesCompare');

	for (let i in actual) {
		if (actual.hasOwnProperty(i)) {
			switch (i) {
				case 'id':
					res = res && propertiesCompare(actual[i], expected[i]);
					if (!res) {
						debug('propertiesCompare');
					}
					break;
				case 'sids':
					res = res && actual[i].length === expected[i].length;
					if (!res) {
						debug('sids', actual[i].length, expected[i].length);
					}
					// res = res && true;
					// res = true;
					break;
				case 'dt':
					res = res && true;
					if (!res) {
						debug('dt');
					}
					break;
				case 'dtMax':
					res = res && true;

					if (!res) {
						debug('dtMax');
					}
					break;
				// case 'uniq':
				//	 res = res && true;
				// break;
				// case 'sessions':
				//	 res = res && true;
				// break;
				case 'ip':
					// expect(actual[i].length).toBe(expected[i].length);
					// res = res && _.isEqual(expected.unique.sort(), actual.unique.sort());
					res = res && actual[i].length === expected[i].length;
					if (!res) {
						debug('unique', actual[i].length, expected[i].length);
					}

					break;
				default:
					if (actual[i] !== expected[i]) {
						debug = require('debug')('jasmine:compare:error');
						debug(`Record not equal`, { i, actual: actual[i], expected: expected[i] });
					};


					res = res && actual[i] === expected[i];
			}
		}
	}

	if (!res) {
		let debug = require('debug')('jasmine:compare:record:error');
		debug(`Record not equal`, { actual, expected });
	}
	return res;
	// return true;
};

beforeEach(() => {
	jasmine.addMatchers({
		compareArrays(): { compare: any } {
			return {
				compare(actual: Object[], expected: Object[]): { pass: boolean } {
					let debug = require('debug')('jasmine:compare:actual:error');

					let res: boolean = true;

					expect(actual.length).toBe(expected.length);
					// res = actual.length === expected.length;

					if (res && actual.length > 0) {

						actual.forEach((record: any, index: number, recordsObj: any[]) => {
							// let record: any	= records[0];
							let model: any = expected[index];

							let dif = {
								record: _.differenceBy(Object.keys(record), Object.keys(model)),
								model: _.differenceBy(Object.keys(model), Object.keys(record))
							};

							if (dif.record.length !== dif.model.length) {
								console.error(dif);
							}

							expect(dif.record.length).toBe(dif.model.length);
							res = res && propertiesCompare(record, model);

						});
					} else {

						debug(actual);
						debug = require('debug')('jasmine:compare:expected:error');
						debug(expected);
					}


					return {
						pass: res
					};
				}
			};
		}
	});
});
