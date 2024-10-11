import './index.css';

import App from './App.jsx';
import { StrictMode } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { Toaster } from './components/ui/toaster';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
			<App />
			<Toaster />
		</ThemeProvider>
	</StrictMode>
);
