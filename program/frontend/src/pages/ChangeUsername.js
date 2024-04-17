import React, { useState } from 'react';
import { 
	FormControl, FormLabel, Input, Button, 
	FormErrorMessage, Stack, IconButton, Spacer,
	InputGroup, InputRightElement, Text
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Check } from 'phosphor-react';
import { ErrorMessage } from '../components';
import { changeUsername } from '../services/userServices';

function ChangeUsername() {
	const [isLoading, setIsLoading] = useState(false);
	const [wasSuccessful, setWasSuccessful] = useState(false);
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [username, setUsername] = useState('');
    const [errorText, setErrorText] = useState('');
	const [error, setError] = useState('');
	const hasSpecialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;

	function onChangePassword(e) { 
		setError('');
		setPassword(e.target.value);
	}

	function onChangeUsername(e) {
		let value = e.target.value;
		if((value.length > 0 && value.length < 5) || value.length > 16 || hasSpecialCharRegex.test(value))
			setErrorText('Zwischen 5 bis 16 Buchstaben und Zahlen.');
		else 
			setErrorText('');

		setError('');
		setUsername(e.target.value);
	}

	function togglePasswordVisible(e) {
		setShowPassword(!showPassword);
	}
	
	function validateForm() {
		return username.length > 0 && password.length > 0 && errorText === '';
	}

	async function handleSubmit(event) {
		event.preventDefault();
		setIsLoading(true);

        changeUsername(password, username, function(err, data) {
            if(data) 
				setWasSuccessful(true);
            else 
				setError(err);
            setIsLoading(false);
        })
	}

	return (
		<form onSubmit={handleSubmit}>
		{ error && <ErrorMessage message={error} /> }
			<Stack spacing={3} mt={12}>
				<FormControl isRequired>
					<FormLabel> Aktuelles Passwort </FormLabel>
					<InputGroup> 
						<Input 
							type={showPassword ? 'text' : 'password'} onChange={onChangePassword}
							size='lg' isReadOnly={wasSuccessful} 
						/>
						<InputRightElement h='100%'> 
							<Text as='button' type='button' fontSize='14px' bg='transparent' onClick={togglePasswordVisible} style={{cursor: 'pointer'}}>
								{ password !== '' && (showPassword ? <ViewIcon /> : <ViewOffIcon />) } 
							</Text>
						</InputRightElement> 
					</InputGroup>
				</FormControl>
				<FormControl isInvalid={errorText} isRequired> 
					<FormLabel> Neuer Benutzername </FormLabel>
					<Input size='lg' onChange={onChangeUsername}  isReadOnly={wasSuccessful} />
					<FormErrorMessage>{errorText}</FormErrorMessage>
				</FormControl>
				<Spacer />
				{wasSuccessful && <IconButton bg='orange' icon={<Check />}/>}
				{!wasSuccessful && 
					<Button bg='orange' type='submit' isLoading={isLoading} disabled={!validateForm() || error}>
						Speichern
					</Button>
				}
			</Stack>
		</form>
	);
}

export default ChangeUsername;