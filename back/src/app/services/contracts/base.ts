
// import { Transaction, Account } from 'services/services';
import * as ServiceContracts from '../contracts/contracts';

const check = require('check-types');

export class Base {
	protected getWhere(find: ServiceContracts.Service.RequestTypes.Find): any {
		let rs: any = {};

		if (check.assigned(find.isAssigned)) {
			switch (ServiceContracts.Service.RequestTypes.FindIsAssigned[find.isAssigned]) {
				case ServiceContracts.Service.RequestTypes.FindIsAssigned[ServiceContracts.Service.RequestTypes.FindIsAssigned.YES]:
					rs.hash = {
						$ne: null
					};
				break;
				case ServiceContracts.Service.RequestTypes.FindIsAssigned[ServiceContracts.Service.RequestTypes.FindIsAssigned.NO]:
					rs.hash = {
						$is: null
					};
				break;
			}
		}

		// if (check.assigned(find.trxType)) {
		// 	switch (ServiceContracts.Service.RequestTypes.FindTrxType[find.trxType]) {
		// 		case ServiceContracts.Service.RequestTypes.FindTrxType[ServiceContracts.Service.RequestTypes.FindTrxType.IN]:
		// 			rs.amount = {
		// 				$gte: 0
		// 			};
		// 		break;
		// 		case ServiceContracts.Service.RequestTypes.FindTrxType[ServiceContracts.Service.RequestTypes.FindTrxType.OUT]:
		// 			rs.amount = {
		// 				$lte: 0
		// 			};
		// 		break;
		// 	}
		// }

		if (check.assigned(find.amount)) {

			let qu: any;
			let amount: number;
			switch ((<any> find.amount)[0]) {
				case 'L':
					amount = (<any> find.amount).slice(1);
					qu =  {$or: {
						$lte: (<any> find.amount).slice(1),
						// $gte: (<any> find.amount).slice(1) * (-1)
					}};
				break;
				case 'G':
					amount = (<any> find.amount).slice(1);
					qu =  {$or: {
						$gte: (<any> find.amount).slice(1),
						// $lte: (<any> find.amount).slice(1) * (-1)
					}};
				break;
				default:
					amount = parseFloat(<any> find.amount);

					if (check.number(amount)) {
						qu =  { $eq: amount };
					}
			}

			if (qu) {
				rs.amount = qu;
			}
		}

		if (check.assigned(find.trxType)) {
			let qu: any;

			switch (ServiceContracts.Service.RequestTypes.FindTrxType[find.trxType]) {
				case ServiceContracts.Service.RequestTypes.FindTrxType[ServiceContracts.Service.RequestTypes.FindTrxType.IN]:
					qu = {
						// amount: {
							$gte: 0
						// }
					};
					rs.amount = check.undefined(rs.amount) ? qu : {
						$and: [rs.amount, qu]
					};
				break;
				case ServiceContracts.Service.RequestTypes.FindTrxType[ServiceContracts.Service.RequestTypes.FindTrxType.OUT]:
					qu = {
						// amount: {
							$lte: 0
						// }
					};
					rs.amount = check.undefined(rs.amount) ? qu : {
						$and: [rs.amount, qu]
					};
				break;
			}

		}

		if (check.assigned(find.accountId) && check.number(parseFloat(<any> find.accountId))) {
			rs.accountId = find.accountId;
		}

		if (check.assigned(find.hash)) {
			rs.hash = find.hash;
		}

		if (check.assigned(find.id)) {
			rs.id = find.id;
		}

		return rs;
	}

	protected getLimit(limit: any): {offset?: number, limit?: number } {
		let rs: {offset?: number, limit?: number } = {};

		switch (true) {
			case check.array(limit):
				rs.offset = check.number(parseInt((<any> limit)[0])) ? parseInt((<any> limit)[0]) : 0;
				rs.limit = check.number(parseInt((<any> limit)[1])) ? parseInt((<any> limit)[1]) : 50;
			break;
			case check.number(limit):
				rs.limit = <number> limit;
			break;
		}

		return rs;
	}

	protected query(request: any) {
		let where = {};
		let limit = {};

		if (request) {
			if (request.find) {
				where = this.getWhere(request.find);
			}

			if (request.period) {
				where = Object.assign({}, where, {dt: {
					$gte: request.period[0],
					$lte: request.period[1]
				}});
			}

			if (request.limit) {
				limit = this.getLimit(request.limit);
			}
		}

		let order = [['dt', 'asc']];
		let query = Object.assign({}, {where}, limit, {order});
		console.log(query);
		return query;
	}
}
