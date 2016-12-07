
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Tools } from '../../shared/';
// const _ = require('lodash');
// declare var $: any;

@Component({
	selector: 'filter',
	templateUrl: 'app/layout/filter/filter.html',
})

export class FilterWidget {
	@Output() send = new EventEmitter();
	@Input() filter: Tools.Filter = new  Tools.Filter();
	@Input() limits: number[];


	goBack() {
		this.filter.back();
		this.onSubmit();
	}

	goNext() {
		this.filter.next();
		this.onSubmit();
	}

	onReset() {
		this.send.emit({filter: this.filter});
	}

	onSubmit() {
		this.send.emit({filter: this.filter});
	}

};
