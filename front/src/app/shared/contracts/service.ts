
export interface Base {
	api: any;
};


export namespace RequestTypes {


	export interface Find {
	}

	export interface List {
		find: Find
		limit?: { start: number, end: number } | Date,
		opt?: string[],
		period?: { start: Date, end: Date } | Date
	}
}
