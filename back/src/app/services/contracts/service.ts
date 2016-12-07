import * as Model from './model';

export namespace Service {

	export namespace RequestTypes {
		export enum FindTrxType {
			// 'in' | 'out' | 'all'
			'IN',
			'OUT',
			'ALL'
		}

		export enum FindIsAssigned {
			'YES',
			'NO'
		}


		export interface Find {
			accountId?: number,
			id?: number,
			isAssigned?: FindIsAssigned,
			trxType?: FindTrxType,
			hash?: string,
			amount?: string;
			// type?: Model.AccountsTypes;
			// name?: string;
			// subType?: Model.AccountsSubTypes;
		}

		export interface List {
			find: Find
			limit?: number[],
			opt?: string[],
			period?: any
		}
	}


export namespace Transaction {

	export namespace Request {

		export interface Create {
			accountId: number,
			amount: number,
			commission?: number,
			contragentId: number,
			description?: string,
			externalId?: string,
		}
	}
}

export namespace Account {
	export namespace Request {

		export interface Find {
			accountId?: number,
			type?: Model.AccountsTypes;
			name?: string;
			subType?: Model.AccountsSubTypes;
			externalId?: string;
		}

		export interface List extends RequestTypes.List {
			find: Find
		}

		export interface Create {
			name: string;
			type: Model.AccountsTypes;
			value: number;
			subType?: Model.AccountsSubTypes;
			externalId?: string;
			trxDt?: Date;
		}

	}

}

export namespace Webmoney {
	export namespace Request {

		export interface Create extends Transaction.Request.Create {
		}

	}
}
}
