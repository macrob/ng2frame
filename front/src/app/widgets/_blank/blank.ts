
import { Component, Input, OnInit } from '@angular/core';

import { Service } from '../../shared/';

@Component({
	selector: 'blank',
	templateUrl: 'app/widgets/_blank/blank.html',

})

export class BlankWidget implements OnInit {
	@Input() limit: number = 50;

	title = 'Blank';
	records: any[];


	limits = [10, 50, 100];

	constructor (
		protected serviceFactory: Service.Factory) {

	}

	ngOnInit() {

		if (!this.records) {
			this.loadData();
		}
	}
	/* tslint:disable */
	loadData() {
	}

	onReload() {
		this.loadData();
	}
};
