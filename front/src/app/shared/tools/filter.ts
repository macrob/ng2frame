import * as moment from 'moment';
import * as SharedContracts from '../contracts/';

export class Filter implements SharedContracts.Filter {
		start: moment.Moment = moment().hours(0).minutes(0).seconds(0).day('Sunday').subtract(7, 'days');
		end: moment.Moment = moment().hours(23).minutes(59).seconds(59).day('saturday');
		limit = 50;

		constructor(item?: SharedContracts.Filter) {
				if (item) {
						if (item.start) {
								item.start = moment(item.start);
						}

						if (item.end) {
								item.end = moment(item.end);
						}

						Object.assign(this, item);
				}

				this.dif = this.getDif();
		}

		dif: number;

		setStart(dt: Date) {
				this.start = moment(dt).hours(0).minutes(0).seconds(0);
				this.dif = this.getDif();
		}

		setEnd(dt: Date) {
				this.end = moment(dt).hours(23).minutes(59).seconds(59);
				this.dif = this.getDif();
		}

		protected getDif() {
				let dif = 0;

				switch (true) {
						case this.end.diff(this.start, 'days') <= 1:
								dif = 1;
								break;
						case this.end.diff(this.start, 'days') <= 7:
								dif = 7;
								break;
						case this.end.diff(this.start, 'days') <= 14:
								dif = 14;
								break;
						default:
								dif = 1;
				}

				return dif;
		}

		back() {
				// this.start.subtract(7, 'days').day('Sunday');
				// this.end.subtract(7, 'days').day('saturday');
				this.start = moment(this.start.subtract(this.dif, 'days').toDate());
				this.end = moment(this.end.subtract(this.dif, 'days').toDate());
		}

		next() {
				// this.start.add(7, 'days').day('Sunday');
				// this.end.add(7, 'days').day('saturday');
				this.start = moment(this.start.add(this.dif, 'days').toDate());
				this.end = moment(this.end.add(this.dif, 'days').toDate());
		}

		weekBack() {
				// this.start.subtract(7, 'days').day('Sunday');
				// this.end.subtract(7, 'days').day('saturday');
				this.start = moment(this.start.subtract(7, 'days').toDate());
				this.end = moment(this.end.subtract(7, 'days').toDate());
		}

		weekNext() {
				this.start = moment(this.start.add(7, 'days').toDate());
				this.end = moment(this.end.add(7, 'days').toDate());
				// this.start.add(this.dif, 'days');
				// this.end.add(this.dif, 'days');
		}
}
