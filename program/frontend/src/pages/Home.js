import React from 'react';
import { Button, Text, Box, Heading } from '@chakra-ui/react';
import { useUserContext } from '../context/authContext';
import { SurveyList } from '../components';
import { CreateUser } from '../components';

function Home() {
	const { isAdmin } = useUserContext();

	return (
		<Box>
			{ isAdmin() ?
				<>
					<Heading align='center' mb={6}>
						Neuen Benutzer erstellen
					</Heading>
					<CreateUser /> 
				</>
			:
				<>
					<Heading align='center' mb={6}>
						Deine Umfragen
					</Heading>
					<SurveyList />
				</>
			}
		</Box>
	);
}

export default Home;