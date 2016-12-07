import { Validator } from './validator';


export const limit = Validator.lists(Validator.number().default(0), Validator.number().default(50));

export const get = Validator.create({
	// find: Validator.any(),
	limit: limit.require(),
	opt: Validator.any(),
	period: Validator.any()
});
