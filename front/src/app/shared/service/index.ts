

import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import * as Base from './base';
import { ApiService } from '../api.service';

import {  AppValidators } from '../tools/';


export class Factory {

	constructor (public http: Http, public api: ApiService) {

	}

	get<x extends Base.Service>(service: { new(arg: Http, api: ApiService): x}): x {
		return new service(this.http, this.api);
	}

}




export class ServiceBasic extends Base.Service {
	create(reqArg: any): Promise<any> | any {
		return this.post('create', reqArg);
	}

	list(reqArg: any): Promise<any> | any {
		// console.log({reqArg});
		return this.get('list', AppValidators.list().set(reqArg));
	}
}
