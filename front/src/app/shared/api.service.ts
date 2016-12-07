import { apiMap } from '../config/';

export class ApiService {
	map: {
		[prop: string]: {
			[method: string]: { url: string }
		}
	} = <any> { };

	constructor(public baseUrl: string) {
		this.map = apiMap;
	}

	get(name: string, action?: string): { [method: string]: { url: string } } | string | any  {
		if (this.map[name]) {
			let result = {};

			if (action) {
				return this.map[ name ][action].url;
			}

			for (let action in this.map[ name ]) {
				result[action] = {};
				result[action].url = this.baseUrl + this.map[ name ][action].url;
			}

			return result;
		} else {
			return false;
		}
	}

	detect(url: string): {
		module: string,
		action: string
	} {
		let plainUrl: string = url.replace(this.baseUrl, '');
		plainUrl = plainUrl.replace(/\?.*$/,'');

		for (let name in this.map) {
			for (let action in this.map[ name ]) {
				if ( this.map[ name ][action].url === plainUrl ) {
					return {
						module: name,
						action: action
					};
				}
			}
		}
	}
};
