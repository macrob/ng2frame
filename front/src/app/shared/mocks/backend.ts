
// import * as _ from 'lodash';

import {
	MockBackend,
	MockConnection
} from '@angular/http/testing';


import {
	Response,
	ResponseOptions,
} from '@angular/http';

import { Injectable } from '@angular/core';

import { ApiService } from '../api.service';

import * as helper from '../tools/';

import * as Contracts from './contracts/';
import * as SharedContracts from '../contracts/';

import * as Adapter from './adapter/';
import { Base } from './adapter/base';



	@Injectable()
	export class Backend extends MockBackend {
		response: ResponseOptions;

		constructor(private apiService: ApiService, private opt?: any) {
			super();
			console.log({opt});
			let adapters: any = this.initAdapters();

			this.connections.subscribe( (c: MockConnection) => {

				// this.response = new ResponseOptions();
				// this.request = c.request;
				let location = helper.getLocation(c.request.url);

				let request = {
					post: c.request.json(),
					get: location.search,
					location
				};

				let route: any = this.apiService.detect(c.request.url);
				let adapter: Contracts.Adapter = this.getAdapter(route, adapters);

				adapter.setRequest(request);

				// console.log ('new base work', this.request.url);

			if (typeof adapter[route.action] === 'undefined') {
				switch (c.request.method) {
					case SharedContracts.RequestMethod.Get:
						// this.doGet();
						this.response = adapter.get();
					break;
					case SharedContracts.RequestMethod.Post:
						this.response = adapter.post();
					break;
					case SharedContracts.RequestMethod.Delete:
						this.response = adapter.del();
					break;
					case SharedContracts.RequestMethod.Put:
						this.response = adapter.put();
					break;
				};
			} else {
				this.response = adapter[route.action]();
			}

			// this.response = adapter.get();
				console.log({method: c.request.method, adapter, request, res: this.response, route});

				c.mockRespond(new Response(this.response));

			});
		}

		private initAdapters() {
			let res = {};

			for (let i in Adapter) {


				if (Adapter[i].Adapter) {
					res[i.toLowerCase()] = new Adapter[i].Adapter();
				} else {

					res[i.toLowerCase()] = new Base.Adapter();
				}
			}

			return res;
		}

		private getAdapter(route: any, adapters: any[]): Contracts.Adapter {

			let key;
			let rs;


			if (route) {
				key = route.module.toLowerCase();

				switch (route.module) {
					default:
						rs = adapters[key];
				}

			}

			if (typeof rs === 'undefined') {
				console.error({ msg: 'Adapter undefined', url: this, adapters});
				rs = new Base.Adapter();
			}

			return rs;
		}
	};
