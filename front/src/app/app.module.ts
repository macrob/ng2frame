import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload/ng2-file-upload';
// import { routing, config } from './config/';
import { routing } from './config/';
import { Pipe, PipeTransform } from '@angular/core';

/*
	TODO: 1. test1
	TODO: 2. test2
	TODO: 3. test13
	TODO: 4. test4
	TODO: 5. test14
	TODO: 6. test145

*/
import { NgModule }			from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { App }	 from './app';
import { DashboardPage }	 from './pages/';
import  * as Widgets	 from './widgets/';


import { Providers } from './shared/';

import { DatePickerModule } from 'ng2-datepicker';

let _ = require('lodash');

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
	transform(value: any , args: string[]) : any {
		let keys = [];
		for (let key in value) {
			keys.push({key: key, value: value[key]});
		}
		return keys;
	}
}

// console.log(DatePicker);
@NgModule({
	imports:	[ DatePickerModule, BrowserModule, routing, FormsModule, ReactiveFormsModule, HttpModule ],
	declarations: _.union([

		App,

		FileSelectDirective,
		FileDropDirective,
		KeysPipe,

		DashboardPage
	], _.values(Widgets)),
	bootstrap: [ App ],
	// providers: _.union([TestBed.Config.providers.ADAPTER_OPT], TestBed.Config.providers.BACKEND_V2)
	providers: [Providers.FACTORY]


})

export class AppModule { }
