import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from '../pages/';



const routes: Routes = [
	{
		path: '',
		component: DashboardPage
	}
];


export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
