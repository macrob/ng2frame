// import * as _ from 'lodash';
import { Component } from '@angular/core';

import { Service } from '../../shared/';

@Component({
	selector: 'dashboard',
	templateUrl: 'app/pages/dashboard/dashboard.html',
	styles: [`
		table {
				table-layout: fixed;
				word-wrap: break-word;
		};

	.widget-overflow {
		overflow:scroll;
		box-sizing:inherit;
		width:250px;
	}
	`]
	// providers: [ Account.Service ]

})

export class DashboardPage {


	title: string = 'Dashboard';


	constructor (protected serviceFactory: Service.Factory) {
	}

};
