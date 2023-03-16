import { QueryClient } from 'react-query';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 0,
			refetchOnWindowFocus: false,
			get enabled(){
				return  !!localStorage.getItem('token')
			},
		},
		mutations: {
			retry: 0,
			refetchOnWindowFocus: false,
		}
	},
});

export { queryClient };
