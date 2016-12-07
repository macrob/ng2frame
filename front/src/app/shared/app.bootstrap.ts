
import {
	MockBackend,
} from '@angular/http/testing';

import {
	// tick,
	TestBed as TestBedCore,
} from '@angular/core/testing';

import {
	Http,
	BaseRequestOptions,

} from '@angular/http';



import { Backend } from './mocks/';
import { ApiService } from './api.service';

// import * as Service from './service/';

import { Factory } from './service/';
import { CONFIG } from '../config/';


let _ = require('lodash');



export namespace Providers {

	export const FAKE_BACKEND = 	[
		BaseRequestOptions,
		MockBackend,
		// ApiService,
		{
			provide: Backend,
			useFactory: (opt: any) => {
				return new Backend(new ApiService(CONFIG.api.baseUrl), opt);
			}
		},
		{
			provide: Http,
			useFactory: ( backend: MockBackend, defaultOptions: BaseRequestOptions) => {
				return new Http(backend, defaultOptions);
			},
			deps: [Backend, BaseRequestOptions]
		}
	];

	export const FACTORY = {
		provide: Factory,
		useFactory: ( http: Http) => {
			return new Factory(http, new ApiService(CONFIG.api.baseUrl));
		},
		deps: [Http]
	};

}

export namespace TestBed {

	export function provideIt(...opt: any[]) {
		return _.union(...opt);
	}

	export function declareIt(opt?: any[]) {
		return _.union({}, opt);
	}

	export function importsIt(opt?: any[]) {
		return _.union({}, opt);
	}

	export function configure({backend, providers, declarations, imports}:
														{backend?: any[], providers?: any[], declarations?: any[], imports?: any[]}) {
		let conf: {
			providers: any[],
			declarations: any[],
			imports: any[]
		} = <any> {};

		if (typeof providers !== 'undefined' || typeof backend !== 'undefined') {
			providers = providers ? providers : [];
			backend = backend ? backend : [];

			conf.providers = provideIt( _.union(backend, providers));
		}

		if (typeof declarations !== 'undefined') {
			conf.declarations = declareIt(declarations);
		}

		if (typeof imports !== 'undefined') {
			conf.imports = importsIt(imports);
		}

		return TestBedCore.configureTestingModule(conf);
	}
}
