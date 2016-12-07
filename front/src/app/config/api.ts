export const map: {
		[prop: string]: {
			[method: string]: { url: string }
		}
	} = {
		account: {
			'create': { url: 'account/' },
			'list': { url: 'account/' },
			// 'get': { url: 'account/:accountId' },
			// 'update': { url: 'account/:accountId' },
			// 'delete': { url: 'account/:accountId' }
		},
	};
