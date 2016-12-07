// import { ComponentFixture, TestBed, async } from '@angular/core/testing';
// import { By }							from '@angular/platform-browser';
// import { DebugElement }		from '@angular/core';
//
// // import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup  } from '@angular/forms';
// import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
//
// // import { DashboardPage } from 'app/pages/dashboard/';
// import { DashboardPage } from './index';
// // import { AppModule } from '../../app.module';
// import { EpeseWidget, AccountWidget, AccountAddWidget } from '../../widgets/';
//
//
// import { ApiService } from '../../shared/';
//
//
//
// import {
// 	MockBackend
// } from '@angular/http/testing';
//
//
// import {
// 	Http,
// 	ConnectionBackend,
// 	BaseRequestOptions,
// 	// Response,
// 	// ResponseOptions
// } from '@angular/http';
//
//
//
// let comp:		DashboardPage;
// let fixture: ComponentFixture<DashboardPage>;
// let de:			DebugElement;
// let widghetHeader:			HTMLElement;
//
//
// const widgets = {
// 	epese: {
// 		title: 'Epese'
// 	},
// 	account: {
// 		title: 'Accounts'
// 	},
// };
//
// describe('Dashboard3 Page', () => {
// 	beforeEach(async(() => {
//
// 		// refine the test module by declaring the test component
// 		TestBed.configureTestingModule({
// 			imports: [
// 				FormsModule,
// 				ReactiveFormsModule
// 			],
// 			declarations: [
// 				EpeseWidget,
// 				AccountWidget, AccountAddWidget,
//
// 				DashboardPage
// 			],
// 			providers: [
// 				BaseRequestOptions,
// 				MockBackend,
// 				{
// 					provide: Http,
// 					useFactory: ( backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
// 						return new Http(backend, defaultOptions);
// 					},
// 					deps: [MockBackend, BaseRequestOptions]
// 				},
// 				{ provide: 'ApiMap', useClass: ApiService },
// 				{
// 					provide: 'API_URL',
// 					useValue: 'http://172.16.167.153:5019/'
// 				},
// 			]
// 		}).compileComponents();
// 	}));
//
//
// 	describe('EpeseWidget', () => {
//
// 		it('should have title h6' + widgets.epese.title, async(() => {
//
// 			TestBed.compileComponents().then(() => {
//
// 				fixture = TestBed.createComponent(DashboardPage);
// 				comp = fixture.componentInstance;
// 				fixture.detectChanges();
//
// 				de = fixture.debugElement.query(By.css('epese h6'));
// 				widghetHeader = de.nativeElement;
// 				expect(widghetHeader.textContent).toEqual(widgets.epese.title);
// 				// expect(fixture).toContain(params.title);
// 			});
//
// 		}));
//
// 	});
//
// 	describe('AccountWidget', () => {
//
// 		it('should have title h6' + widgets.account.title, async(() => {
// 			TestBed.compileComponents().then(() => {
//
// 				fixture = TestBed.createComponent(DashboardPage);
// 				comp = fixture.componentInstance;
// 				fixture.detectChanges();
//
// 				de = fixture.debugElement.query(By.css('account h6'));
// 				widghetHeader = de.nativeElement;
// 				expect(widghetHeader.textContent).toEqual(widgets.account.title);
// 				// expect(fixture).toContain(params.title);
// 			});
// 		}));
//
// 		it('should have subTitle header.fw-semi-bold' + widgets.account.title, async(() => {
// 			TestBed.compileComponents().then(() => {
//
// 				fixture = TestBed.createComponent(DashboardPage);
// 				comp = fixture.componentInstance;
// 				fixture.detectChanges();
//
// 				de = fixture.debugElement.query(By.css('account header span.fw-semi-bold'));
// 				widghetHeader = de.nativeElement;
// 				expect(widghetHeader.textContent).not.toEqual('');
// 				// expect(fixture).toContain(params.title);
// 			});
// 		}));
//
//
// 	});
//
//
// });
