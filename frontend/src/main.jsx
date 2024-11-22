import './index.css';

import { QueryClient, QueryClientProvider } from 'react-query';

import App from './App.jsx';
import { AppContextProvider } from './contexts/AppContext';
import { AuthProvider } from './components/AuthProvider';
import { SearchContextProvider } from './contexts/SearchContext';
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
				<AuthProvider>
					<AppContextProvider>
						<SearchContextProvider>
							<App />
						</SearchContextProvider>
					</AppContextProvider>
				</AuthProvider>
			</ThemeProvider>
		</QueryClientProvider>
	</StrictMode>
);
