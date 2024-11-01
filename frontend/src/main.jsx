import './index.css';

import { QueryClient, QueryClientProvider } from 'react-query';

import App from './App.jsx';
import { StrictMode } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { createRoot } from 'react-dom/client';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 0,
		},
	},
});
createRoot(document.getElementById('root')).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
				<App />
			</ThemeProvider>
		</QueryClientProvider>
	</StrictMode>
);
