import {
	ResponseOptions
} from '@angular/http';


export interface Adapter {
	request: {
		get: any,
		post: any
	};

	get(): ResponseOptions;
	post(): ResponseOptions;
	del(): ResponseOptions;
	put(): ResponseOptions;

	setRequest(request: { post: any; get: any;}): void;
}

export interface Db {
	find(item: any): any[];
	findOne(item: any): any;
	findById(id: number): any;
}
