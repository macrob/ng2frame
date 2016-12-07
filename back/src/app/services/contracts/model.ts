export namespace Period {
		export const day = 1;
		export const week = 6;
		export const week2 = 13;
		export const def = week2;
}


export enum TrxTypes {
	'IN',
	'OUT'
}


export enum AccountsTypes {
	'CREDITORS',
	'DEBITORS',
	'WEBMONEY',
	'UNKNOWN'
}

export enum AccountsSubTypes {
	'merchant','webmaster','vendor','unknown', 'office'
}


export interface ExtTransaction {
	id?: number; /* primary key internal format */
	hash?: string; /* assign hash */
	trxId?: string; /* unique id */
	type?: TrxTypes;
	dt?: Date;
	amount: number; /* amount */
	commission: number;
	balance?: number;
	description: string;
	// lastTrx?: Base | number;
	comments?: string;

	accountId: number;
	externalId?: string;

	// contragent?: Accounts;
	contragentId?: number;
	externalContragent?: string;
}

export namespace Vendor {
	export interface ApiTransaction {
		vendor_id: number;
		vendor: string;
		shipped: number;
		added: number;
		balance: number;
		dt: Date;
	}

	export interface Transaction extends ExtTransaction {
		// vendorId: number;
		// name: string;
		// shipped: number;
		// added: number;
	}
}

export namespace Epese {

		export interface Transaction  extends ExtTransaction {

		}

}

export namespace Ozon {
	// export interface Api {
	//
	// }

	export interface Transaction extends ExtTransaction {
		dtProccessing: Date;
		symbol2: string;
		symbol1: string;
		accountCurrency: string;
		amountInTrxCurrency: number;
		trxCurrency: string;
		iban: string;
		counteraccount: string;
	}
}

export namespace Rentron {
	export interface Transaction extends ExtTransaction {
		iban: string;
		currency: string;
	}
}

export namespace Webmoney {
	/* tslint:disable */


	export interface ApiTransaction {
		TransactionId: number;
		PayerPurse: string;
		PayeePurse: string;
		Amount: number;
		Fee: number;
		Status: string;
		OperationType: string;

		Description: string;
		CorrespondentWmid: string;
		Balance: number;
		CreateDateTime: Date | string;

		InvoiceId?: number;
		OrderId?: number;
		TransactionExternalId?: number;
	}


	export interface Transaction extends ExtTransaction {
	}

}

export namespace Employyes {

	export interface Transaction extends ExtTransaction {
		employeer?: Employeer;
		nextTrx?: Date;
	}

	export interface Employeer  {
		id: number;
		fname: string;
		lname: string;
		dt: Date | string;
		sallery: number;
		lastTrx?: Transaction;
		hash?:  string;
	}
}

export namespace Webmaster {

	export interface ApiTransaction {
		balance: number;
		credited: number;
		affId: number;
		// payed: {
		// 	webmoney: { amount: number, commission: number },
		// 	epese: { amount: number, commission: number },
		// 	system: { amount: number, commission: number }
		// },
		payed: { amount: number, commission: number }[];
		dt: Date;
	};

	export interface Transaction extends ExtTransaction {
	}

}
