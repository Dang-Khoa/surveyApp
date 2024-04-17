import React from 'react';
import { NavMenu } from './components';
import { UserProvider } from './context/authContext';
import { ChakraProvider, Container } from '@chakra-ui/react';
import HttpsRedirect from 'react-https-redirect';
import AppRoutes from './routes/AppRoutes';

import './App.css';

function App() {
    return (
		<div> 
			<HttpsRedirect>
				<ChakraProvider>
					<UserProvider>
						<NavMenu />
						<Container padding='20px'>
							<AppRoutes />
						</Container>
					</UserProvider>
				</ChakraProvider>
			</HttpsRedirect>
		</div>
  );
}

export default App;