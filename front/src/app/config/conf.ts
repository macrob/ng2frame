/*
	defined env variable from /config/default.json app
*/
export const CONFIG: {
	api: { baseUrl: string }
} = <any> {
	api: {
		baseUrl: '@@api.baseUrl'
	}
};
