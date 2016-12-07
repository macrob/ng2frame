export namespace Regexps {
	export const amount = '(-?\\s*[0-9]*((\\.[0-9]{1,2})?)|0)';
	export const findNumber = '^((' + amount + ')|(L(' + amount + '))|(G(' + amount + '))|(G(' + amount + ')L(' + amount + ')))$';
}
	let check = require('check-types');

export namespace RegexpExec {


	export function findNumber(arg: string) {
		let regexGroups: any;

		let res = new RegExp(Regexps.findNumber).exec(arg);
		console.log({res, arg});

		// regexGroups = { gte: 8 };
		// if (check.not.undefined(res[regexGroups.gte])) {
		// 	return { gte: parseFloat(res[regexGroups.gte]) };
		// }

		regexGroups = { gte: 12 };
		if (check.not.undefined(res[regexGroups.gte])) {
			return { gte: parseFloat(res[regexGroups.gte]) };
		}

		// regexGroups = { gte: 11, lte:  13};
		// if ( check.not.undefined(res[regexGroups.lte]) && check.not.undefined(res[regexGroups.gte])) {
		// 	return { gte: parseFloat(res[regexGroups.gte]), lte: parseFloat(res[regexGroups.lte])};
		// }

		regexGroups = { gte: 17, lte:  21};
		if ( check.not.undefined(res[regexGroups.lte]) && check.not.undefined(res[regexGroups.gte])) {
			return { gte: parseFloat(res[regexGroups.gte]), lte: parseFloat(res[regexGroups.lte])};
		}

		// regexGroups = { lte:  5};
		// if ( check.not.undefined(res[regexGroups.lte])) {
		// 	return { lte: parseFloat(res[regexGroups.lte])};
		// }

		regexGroups = { lte:  8};
		if ( check.not.undefined(res[regexGroups.lte])) {
			return { lte: parseFloat(res[regexGroups.lte])};
		}

		regexGroups = { eq:  2};
		if ( check.not.undefined(res[regexGroups.eq])) {
			return { eq: parseFloat(res[regexGroups.eq])};
		}
	}
}

export namespace RegexpExecToExp {
	// export function findNumber(regExec: {gte?: number, lte?: number, eq?: number}, obj)
	export function findNumber(arg: string) {
		let res: any = RegexpExec.findNumber(arg);

		return (arg: number): boolean => {
			let rs = true;

			if (check.not.undefined(res.eq)) {
				rs = rs && res.eq === arg;
			};

			if (check.not.undefined(res.lte)) {
				rs = rs && res.lte >= arg;
			}

			if (check.not.undefined(res.gte)) {
				rs = rs && res.gte <= arg;
			}
			// console.log({rs, arg, res});
			return rs;
		};
	}
}
