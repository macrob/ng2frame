// import { TestBed } from '../../shared/spec';
//
// // import { ComponentFixture, TestBed as TestBedCore, async, fakeAsync, tick } from '@angular/core/testing';
// import { ComponentFixture, TestBed as TestBedCore, async, fakeAsync, tick } from '@angular/core/testing';
// import { By }							from '@angular/platform-browser';
// import { DebugElement }		from '@angular/core';
//
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// // import { DatePicker } from 'ng2-datepicker/ng2-datepicker';
//
// import { Contracts, Service } from '../../shared/';
// import { BlankWidget } from './blank';
//
//
// let comp:		BlankWidget;
// let fixture: ComponentFixture<BlankWidget>;
// let formFilter: DebugElement;
// // let db: any; /* from mocks */
//
// // let compDebitor, compCreditor:		AccountWidget;
// import { DatePickerModule } from 'ng2-datepicker';
//
// xdescribe('BlankWidget with ADAPTER_OPT', () => {
// 	let _ = require('lodash');
//
// 	jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
//
//
// 	beforeEach(async(() => {
//
// 		TestBed.configure({
// 			declarations: [
// 				BlankWidget,
// 				// DatePicker
// 			],
// 			imports: [
// 				DatePickerModule,
// 				FormsModule,
// 				ReactiveFormsModule
// 			],
// 			providers: [  TestBed.Config.providers.ADAPTER_OPT]
// 		}).compileComponents().then( () => {
//
// 			fixture = TestBedCore.createComponent(BlankWidget);
// 			comp = fixture.componentInstance;
// 			// comp.limits = [1,2,3];
// 			// comp.filter.limit = 1;
// 			// comp.type = Contracts.AccountsTypes.DEBITORS;
// 			fixture.detectChanges();
// 			comp.loadData();
// 		});
//
// 	}));
//
//
// 	it('Load ', async(() => {
// 		fixture.detectChanges();
// 			fixture.debugElement.query(By.css('table tbody'));
//
// 			// let expected = comp.accounts.length;
// 			// let actual = tbody.children.length;
//
// 			// expect(actual).toEqual(expected);
// 	}));
//
// 	describe('filter data', () => {
// 		let inputAmount: DebugElement;
// 		let btnApply: DebugElement;
// 		let selectLimit: DebugElement;
// 		let selectType: DebugElement;
// 		// let inputValue: DebugElement;
// 		beforeEach(fakeAsync(() => {
//
// 			fixture.detectChanges();
// 			formFilter = fixture.debugElement.query(By.css('form'));
//
// 			inputAmount = formFilter.query(By.css('input[name="amount"]'));
// 			btnApply = formFilter.query(By.css('button[name="apply"]'));
// 			selectLimit = formFilter.query(By.css('select[name="limit"]'));
// 			selectType = formFilter.query(By.css('select[name="type"]'));
// 		}));
//
// 		it('filter form must exists', fakeAsync(() => {
// 			fixture.detectChanges();
// 			// formFilter = fixture.debugElement.query(By.css('form'));
//
// 			expect(formFilter).not.toBeNull();
//
// 			// inputAmount = formFilter.query(By.css('input[name="amount"]'));
// 			// btnApply = formFilter.query(By.css('button[name="apply"]'));
// 			expect(selectLimit).not.toBeNull();
// 			expect(selectType).not.toBeNull();
// 			expect(inputAmount).not.toBeNull();
// 			expect(btnApply).not.toBeNull();
// 		}));
//
// 		it('submit test data amount 500', fakeAsync(() => {
// 			inputAmount.nativeElement.value = 500;
// 			inputAmount.nativeElement.dispatchEvent(new Event('input'));
//
// 			btnApply.nativeElement.dispatchEvent(new Event('click'));
//
// 			// fixture.detectChanges();
// 			tick();
// 			fixture.detectChanges();
// 			expect(comp.records.length).toEqual(3);
// 		}));
//
// 		it('submit test data amount G500', fakeAsync(() => {
// 			inputAmount.nativeElement.value = 'G400';
// 			inputAmount.nativeElement.dispatchEvent(new Event('input'));
//
// 			btnApply.nativeElement.dispatchEvent(new Event('click'));
//
// 			// fixture.detectChanges();
// 			tick();
// 			fixture.detectChanges();
// 			expect(comp.records.length).toEqual(5);
// 		}));
//
// 		it('submit test data amount G501', fakeAsync(() => {
// 			inputAmount.nativeElement.value = 'G501';
// 			inputAmount.nativeElement.dispatchEvent(new Event('input'));
//
// 			btnApply.nativeElement.dispatchEvent(new Event('click'));
//
// 			// fixture.detectChanges();
// 			tick();
// 			fixture.detectChanges();
// 			expect(comp.records.length).toEqual(2);
// 		}));
//
// 		it('submit test data set limit', fakeAsync(() => {
// 			comp.filter.limit = 2;
// 			comp.limits = [1,2,3];
// 			comp.filter.limit = 2;
// 			fixture.detectChanges();
// 			comp.loadData();
//
// 			selectLimit.nativeElement.dispatchEvent(new Event('change'));
//
// 			tick();
// 			fixture.detectChanges();
// 			// inputAmount.nativeElement.value = 'G500';
// 			// inputAmount.nativeElement.dispatchEvent(new Event('input'));
//
// 			// btnApply.nativeElement.dispatchEvent(new Event('click'));
//
// 			// fixture.detectChanges();
// 			// tick();
// 			// fixture.detectChanges();
// 			expect(comp.records.length).toEqual(2);
// 		}));
//
// 		it('submit test data set type=in', fakeAsync(() => {
// 			selectType.nativeElement.value = 'in';
// 			selectType.nativeElement.dispatchEvent(new Event('change'));
//
// 			btnApply.nativeElement.dispatchEvent(new Event('click'));
//
// 			// fixture.detectChanges();
// 			tick();
// 			fixture.detectChanges();
// 			expect(comp.records.length).toEqual(3);
// 		}));
//
// 		it('submit test data set type=out', fakeAsync(() => {
// 			selectType.nativeElement.value = 'out';
// 			selectType.nativeElement.dispatchEvent(new Event('change'));
//
// 			btnApply.nativeElement.dispatchEvent(new Event('click'));
//
// 			// fixture.detectChanges();
// 			tick();
// 			fixture.detectChanges();
// 			expect(comp.records.length).toEqual(0);
// 		}));
//
// 		it('create trx', fakeAsync(() => {
// 			let creditors;
// 			let debitors;
// 			comp.serviceAccount.list({ find: {
// 				type: Contracts.AccountsTypes.DEBITORS
// 			}}).then(res => {
// 				debitors = res;
// 			});
//
// 			comp.serviceAccount.list({ find: {
// 				type: Contracts.AccountsTypes.CREDITORS
// 			}}).then(res => {
// 				creditors = res;
// 			});
//
// 			tick();
// 			let fdeb: Contracts.Accounts = _.first (debitors);
// 			let fcred: Contracts.Accounts = _.first (creditors);
//
// 			let transaction: Contracts.Service.Transaction.Request.Create = {
// 				accountId: fdeb.id,
// 				contragentId: fcred.id,
// 				amount: -500,
// 				commission: 0,
// 				description: 'first trx'
// 			};
//
// 			comp.serviceTrx.create(transaction).then( (res: Contracts.Transactions) => {
// 				// console.log(res);
// 			});
// 			tick();
// 			comp.loadData();
// 			tick();
// 			fixture.detectChanges();
//
// 			transaction = {
// 				accountId: fdeb.id,
// 				contragentId: fcred.id,
// 				amount: 1000,
// 				commission: 0,
// 				description: 'second trx'
// 			};
//
// 			comp.serviceTrx.create(transaction).then( (res: Contracts.Transactions) => {
// 				// console.log(res);
// 			});
// 			tick();
// 			comp.loadData();
// 			tick();
// 			fixture.detectChanges();
// 			// 	this.send.emit({res});
// 			// }).catch(e => {
// 			// 	console.error(e);
// 			// });
// 			//
// 			// console.log({debitors, creditors, fdeb, fcred});
// 		}));
//
// 		it('create trx2', fakeAsync(() => {
// 			let creditors;
// 			let debitors;
// 			comp.serviceAccount.list({ find: {
// 				type: Contracts.AccountsTypes.DEBITORS
// 			}}).then(res => {
// 				debitors = res;
// 			});
//
// 			comp.serviceAccount.list({ find: {
// 				type: Contracts.AccountsTypes.CREDITORS
// 			}}).then(res => {
// 				creditors = res;
// 			});
//
// 			tick();
// 			let fdeb: Contracts.Accounts = _.first (debitors);
// 			let fcred: Contracts.Accounts = _.first (creditors);
//
// 			let transaction: Contracts.Service.Transaction.Request.Create = {
// 				accountId: fdeb.id,
// 				contragentId: fcred.id,
// 				amount: -500,
// 				commission: 0,
// 				description: 'first trx'
// 			};
//
// 			comp.serviceTrx.create(transaction).then( (res: Contracts.Transactions) => {
// 				// console.log(res);
// 			});
// 			tick();
// 			comp.loadData();
// 			tick();
// 			fixture.detectChanges();
//
// 			transaction = {
// 				accountId: fdeb.id,
// 				contragentId: fcred.id,
// 				amount: 1000,
// 				commission: 0,
// 				description: 'second trx'
// 			};
//
// 			comp.serviceTrx.create(transaction).then( (res: Contracts.Transactions) => {
// 				// console.log(res);
// 			});
// 			tick();
// 			comp.loadData();
// 			tick();
// 			fixture.detectChanges();
// 			// 	this.send.emit({res});
// 			// }).catch(e => {
// 			// 	console.error(e);
// 			// });
// 			//
// 			// console.log({debitors, creditors, fdeb, fcred});
// 		}));
//
// 		it('create trx3', fakeAsync(() => {
// 			let creditors;
// 			let debitors;
// 			comp.serviceAccount.list({ find: {
// 				type: Contracts.AccountsTypes.DEBITORS
// 			}}).then(res => {
// 				debitors = res;
// 			});
//
// 			comp.serviceAccount.list({ find: {
// 				type: Contracts.AccountsTypes.CREDITORS
// 			}}).then(res => {
// 				creditors = res;
// 			});
//
// 			tick();
// 			let fdeb: Contracts.Accounts = _.first (debitors);
// 			let fcred: Contracts.Accounts = _.first (creditors);
//
// 			let transaction: Contracts.Service.Transaction.Request.Create = {
// 				accountId: fcred.id,
// 				contragentId: fdeb.id,
// 				amount: -500,
// 				commission: 0,
// 				description: 'first trx'
// 			};
//
// 			comp.serviceTrx.create(transaction).then( (res: Contracts.Transactions) => {
// 				// console.log(res);
// 			});
// 			tick();
// 			comp.loadData();
// 			tick();
// 			fixture.detectChanges();
//
// 			transaction = {
// 				accountId: fcred.id,
// 				contragentId: fdeb.id,
// 				amount: 1000,
// 				commission: 0,
// 				description: 'second trx'
// 			};
//
// 			comp.serviceTrx.create(transaction).then( (res: Contracts.Transactions) => {
// 				// console.log(res);
// 			});
// 			tick();
// 			comp.loadData();
// 			tick();
// 			fixture.detectChanges();
// 			// 	this.send.emit({res});
// 			// }).catch(e => {
// 			// 	console.error(e);
// 			// });
// 			//
// 			// console.log({debitors, creditors, fdeb, fcred});
// 		}));
//
// 		it('submit2 test data set type=out', fakeAsync(() => {
// 			selectType.nativeElement.value = 'out';
// 			selectType.nativeElement.dispatchEvent(new Event('change'));
//
// 			btnApply.nativeElement.dispatchEvent(new Event('click'));
//
// 			// fixture.detectChanges();
// 			tick();
// 			fixture.detectChanges();
// 			expect(comp.records.length).toEqual(3);
// 		}));
// 	});
// });
