/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import React, { useContext } from 'react';

import { loadStripe } from '@stripe/stripe-js';

const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || '';

const AppContext = React.createContext(undefined);

const stripePromise = loadStripe(STRIPE_PUB_KEY);

export const AppContextProvider = ({ children }) => {
	return (
		<AppContext.Provider
			value={{
				stripePromise,
			}}>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => {
	const context = useContext(AppContext);
	return context;
};
