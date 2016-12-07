// export namespace Contracts {
import * as Sequelize from 'sequelize';

	export interface Period {
		from: Date
		to: Date
	};


	export interface ProviderMysql < T > {
		remove(req?: Sequelize.FindOptions): Promise<any>;
		create(item: T, opt?: Sequelize.CreateOptions): Promise<T>;

		save?(item: T): Promise<T>;
		// update(item: T): Promise<T>;
		// update(item: T, where?: Sequelize.WhereOptions): Promise<[number, T[]]>;
		update(item: T, where?: Sequelize.WhereOptions): Promise<number>;

		query<X>(req?: Sequelize.FindOptions): Promise<T[] | X[]>;

		findOne<T>(req: Object): Promise<T>;

	}
// }
