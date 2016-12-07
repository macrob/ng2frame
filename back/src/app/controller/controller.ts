import * as express from 'express';
import * as url from 'url';
// import * as querystring from 'querystring';

import { Config } from 'config/config';

const check = require('check-types');

export class Redirect {
	url: string | Promise<string>;
	params: Object;

	constructor ({url, params}: {url: string | Promise<string>; params?: Object}) {
		this.url = url;
		this.params = params;

	}

	to(): Promise<string> {

		let to: any;

		switch (true) {
			case check.instance(this.url, Promise):
				to = this.url;
			break;
			case check.string(this.url):
				to = new Promise( (resolve, reject) => { resolve(this.url); });
			break;
		}

		return (<Promise<string>> to).then(this.query.bind(this));
	}

	private query(rurl: string): string {
		let u = url.parse(rurl);

		if (this.params) {
			u.query = this.params;
		}

		return url.format(u);
	}
};

export class Controller {
	debug: any;
	error: any;

	gif = require('emptygif');

	constructor(debug: string, protected config: Config = new Config()) {

		this.debug = Config.debug('app:controllers:' + debug);
	}

	protected redirect(url: string | Promise<string>, params?: Object): Redirect {
		return new Redirect({url, params});
	}

	protected getUrl(req: express.Request): string {

		let requrl = url.format({
			protocol: req.protocol,
			host: req.get('host'),
			pathname: req.originalUrl,
			query: req.query
		});

		return requrl;
	}


	do (method: string, req: express.Request, res: express.Response, next: express.NextFunction) {
		this.debug.log({method});
		let response = (<any> this) [method](req, res, next);

		switch (true) {
			case check.undefined(response):

			break;
			case check.instance(response, Promise):
				this.response(response, req, res);
			break;
			case check.instance(response, Redirect):
				this.location(response.to(), req, res);
			break;
			default:
				this.sendResult(response, res);
		}
	}

	response(data: Promise<any>, req: express.Request, res: express.Response): void {
		data.then( (result: any) => {

			switch (true) {
				case check.undefined(result):

				break;
				case check.instance(result, Redirect):
					this.location(result.to(), req, res);
				break;
				default:
					this.sendResult(result, res);
			}

		}).catch(this.internalError.bind(this, [req, res]));
	}

	sendResult(result: any, res: express.Response): void {
		if (!check.string(result)) {
			res.setHeader('Content-Type', 'application/json');
		}

		res.send(result);
	}

	internalError([req, res]: [express.Request, express.Response], error: Error): void {
		console.log({error, req});
		res.sendStatus(500);
	}

	location(location: Promise<string>, req: express.Request, res: express.Response): void {
		location.then( (url: string) => {
			res.set({
				'Location': url,
				'Content-Length': '0'
			});

			res.sendStatus(303);
		}).catch(this.internalError.bind(this, [req, res]));
	}

	showGif(req: express.Request, res: express.Response): void {
		this.gif.sendEmptyGif(req, res, {
			'Content-Type': 'image/gif',
			'Content-Length': this.gif.emptyGifBufferLength,
			'Cache-Control': 'public, max-age=0' // or specify expiry to make sure it will call everytime
		});
	}
}
