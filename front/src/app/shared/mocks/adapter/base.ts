
import {
	ResponseOptions
} from '@angular/http';

import * as SharedContracts from '../../contracts/';

/* tslint:disable */
import { Adapter as AdapterContract, Db as DbWrapperContract } from '../contracts/';


let _ = require('lodash');
let check = require('check-types');


export namespace Base {
	export class DbWrapper implements DbWrapperContract {


		constructor(protected db:any[]) {

		}

		find(get: SharedContracts.Service.RequestTypes.List | any): any[] {


			if(get.find) {
				return _.filter(this.db, (o: any) => {
					let rs = true;

					_.each(get.find, (value, key) => {

						switch(key) {
							default:
								rs = rs && o[key] == value;
						}

					});

					return rs;
				});
			} else
			{
				return this.db;
			}
		}

		findById(id: number | any) {
			let res = this.find({
				find: {
					id: id
				}
			});

			return typeof res.length !== 'undefined' && res.length > 0 ? res[0] : null;
		}

		findOne(get: SharedContracts.Service.RequestTypes.List): any {
			let res = this.find(get);

			return typeof res.length !== 'undefined' && res.length > 0 ? res[0] : null;
		}

		protected getId(): number {
			let rs = _.last(this.db);

			return rs ? rs.id + 1 : 1;
		}

		create(item: any) {
			item.id = this.getId();
			item.dt = new Date();
			this.db.push(item);

			return item;
		}

		update <x extends {id: any}>(item: x) {
			let ind = _.findIndex(this.db, ['id', item.id]);
			this.db[ind] = item;
		}
	}



	export class Adapter implements AdapterContract {
		protected response: ResponseOptions = new ResponseOptions();
		public request: { post: any; get: any;};

		constructor(protected db: Base.DbWrapper = new Base.DbWrapper([])) {

		}

		setRequest(request: { post: any; get: any;}) {
			this.request	= request;
		}

		get() {
			this.response.body = this.db.find(this.request.get);
			console.log({res: this.response.body, get: this.request.get, db: this.db});
			return this.response;
		}

		post() {
			this.response.body = this.db.create(this.request.post);
			return this.response;
		}

		del() {
			return this.response;
		}

		put() {
			return this.response;
		}

	}
}
