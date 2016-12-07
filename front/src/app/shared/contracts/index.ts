import * as moment from 'moment';

export enum RequestMethod {
	Get,
	Post,
	Put,
	Delete,
	Options,
	Head,
	Patch
};

export interface Url {
	protocol: string;
	host: string;
	hostname: string;
	port: string;
	pathname: string;
	search: any;
	hash: string;
};

export interface Filter {
	start?: moment.Moment;
	end?: moment.Moment;
	limit?: number;
}

/* tslint:disable */
import * as Srv from './service';
export import Service = Srv;


// export *  from './model'
