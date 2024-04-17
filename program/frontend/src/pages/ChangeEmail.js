import React, { useState } from 'react';
import { 
	FormControl, FormLabel, Input, Button, 
	FormErrorMessage, Stack, IconButton, Spacer,
	InputGroup, InputRightElement, Text
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Check } from 'phosphor-react';
import { ErrorMessage } from '../components';
import { changeEmail } from '../services/userServices';

function ChangeEmail() {
	const [isLoading, setIsLoading] = useState(false);
	const [wasSuccessful, setWasSuccessful] = useState(false);
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState('');
    const [errorText, setErrorText] = useState('');
	const [error, setError] = useState('');
	const isEmailRegex = /.+@.+\.[A-Za-z]+$/;

	function onChangePassword(e) { 
		setError('');
		setPassword(e.target.value);
	}

	function onChangeEmail(e) {
        if(!isEmailRegex.test(e.target.value)) 
			setErrorText('Bitte gültige E-Mail Adresse angeben.');
        else
            setErrorText('');
		setError('');
		setEmail(e.target.value);
	}

	function togglePasswordVisible(e) {
		setShowPassword(!showPassword);
	}

	function validateForm() {
		return password.length > 0 && email.length > 0 && errorText === ''; 
	}

	async function handleSubmit(event) {
		event.preventDefault();
		setIsLoading(true);

        changeEmail(password, email, function(err, data) {
            if(data) 
                setWasSuccessful(true)
            else if (err)
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
					<FormLabel> Neue E-Mail Adresse</FormLabel>
					<Input size='lg' onChange={onChangeEmail} isReadOnly={wasSuccessful} />
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

export default ChangeEmail;