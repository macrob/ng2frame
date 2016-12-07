
import * as SharedContracts from '../contracts/';

// const _ = require('lodash');
// const moment = require('moment');
// const check = require('check-types');
const parser = require('query-string-parser');

export function getLocation(href: string): SharedContracts.Url {
	console.log(href);
	var match = href.match(/^((https?\:)\/\/)?(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?([^#]*|))?(#.*|)$/);
	// console.log(match);


	return match && {
		protocol: match[2],
		host: match[3],
		hostname: match[4],
		port: match[5],
		pathname: match[6],
		search: match[8] ? parser.fromQuery(decodeURIComponent(match[8])) : {},
		hash: match[9],
		// url:
	};
};


export class EnumEx {
	static getNamesAndValues<T extends number>(e: any) {
		return EnumEx.getNames(e).map(n => ({ name: n, value: e[n] as T }));
	}

	static getNames(e: any) {
		return EnumEx.getObjValues(e).filter(v => typeof v === 'string') as string[];
	}

	static getValues<T extends number>(e: any) {
		return EnumEx.getObjValues(e).filter(v => typeof v === 'number') as T[];
	}

	private static getObjValues(e: any): (number | string)[] {
		return Object.keys(e).map(k => e[k]);
	}
}
