
import { Component } from '@angular/core';


declare var $: any;

@Component({
	selector: 'app',
	templateUrl: 'app/app.html',
// 	template: `<div id="modals"></div>
// 	<!--
// 	<nav sidebar id="sidebar" role="navigation" class="sidebar"></nav>
// 	-->
// 	<div class="content-wrap">
// 		<main id="content" class="content view-animate fade-up" role="main">
//
// 			<router-outlet></router-outlet>
//
// 		</main>
// 	</div>
// `,
	// styleUrls: ['scss/application.scss'],
	// styleUrls: ['https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css']
	styles: [`
		datepicker-ionic {
			display: inline-block;
			margin-left: 150px;
		}
	`]
	// margin-left: 150px;
})

export class App {
	title = 'App';
};


$('body').on('click', '[data-check-all]', function () {
		let limit = parseInt($(this).attr('data-check-all'));
		let start = $(this).attr('data-check-start');
		start = start ? parseInt(start) : 0;

		// $(this).attr('data-check-start', start + limit);
		let x = $(this).closest('table').find('input[type=checkbox]').slice(start, limit);
				x.not(this).prop('checked', $(this).prop('checked'));
});


// $('.datepicker').datepicker();
