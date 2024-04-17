import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { 
	Flex, Box, Heading, Button, Link,
	FormControl, FormLabel, Input, Text,
	CircularProgress, InputGroup, InputRightElement,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { ErrorMessage } from '../components';
import { useUserContext } from '../context/authContext';
import { signin } from '../services/authServices';

function Signin() {
	const history = useHistory();
	const { setUserContext } = useUserContext(); 
	const [isLoading, setIsLoading] = useState(false);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState('');

	function onChangeUsername(e) { 
		setError('');
		setUsername(e.target.value);
	}
	
	function onChangePassword(e) { 
		setError('');
		setPassword(e.target.value);
	}

	function togglePasswordVisible(e) {
		setShowPassword(!showPassword);
	}
	
	function validateForm() {
		return username.length > 0 && password.length > 0;
	}

	function handleSubmit(event) {
		event.preventDefault();
		setIsLoading(true);

		signin(username, password, function(err, data) {
			if (err) {
				setIsLoading(false);
				setError(err);
				console.log(err);
			}
			else if (data) {
				setUserContext(data);
				history.push('/');
			}
			else {
				setIsLoading(false);
				alert('Interner Fehler'); 	// shouldn't happen
			}
		})
	}

	return (
		<Flex width="full" align="center" justifyContent="center" mt={10}>
			<Box p={8} maxWidth="500px" borderWidth={1.5} borderRadius={8} boxShadow="lg">
				<Box textAlign="center">
					<Heading> Anmelden </Heading>
				</Box>
				<Box my={4} textAlign="left">
					<form onSubmit={handleSubmit}>
					{ error && <ErrorMessage message={error} /> }
						<FormControl isRequired>
							<FormLabel> Benutzername </FormLabel>
							<Input onChange={onChangeUsername}/>
						</FormControl>
						<FormControl isRequired mt={3}>
							<FormLabel> Passwort </FormLabel>
							<InputGroup> 
								<Input type={showPassword ? 'text' : 'password'} onChange={onChangePassword}/>
								<InputRightElement h='100%'> 
										<Text as='button' type='button' fontSize='14px' bg='transparent' onClick={togglePasswordVisible} style={{cursor: 'pointer'}}>
											{ password !== '' && (showPassword ? <ViewIcon /> : <ViewOffIcon />) } 
										</Text>
								</InputRightElement> 
							</InputGroup>
						</FormControl>
						<Link href='/signin/reset'> Passwort vergessen? </Link>
						<Button bg='orange' type="submit" width="full" mt={4} disabled={!validateForm() || error}>
							{isLoading ? (
								<CircularProgress isIndeterminate size="24px" color="orange" />
							) : (
								'Bestätigen'
							)}
						</Button>
					</form>
				</Box>
			</Box>
		</Flex>
	);
}

export default Signin;