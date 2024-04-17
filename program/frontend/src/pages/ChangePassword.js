import React, { useState } from 'react';
import { 
	FormControl, FormLabel, Input, Button, 
	FormErrorMessage, Stack, IconButton, Spacer,
	InputGroup, InputRightElement, Text
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Check } from 'phosphor-react';
import { ErrorMessage } from '../components';
import { changePassword } from '../services/userServices';

function ChangePassword() {
	const [isLoading, setIsLoading] = useState(false);
	const [wasSuccessful, setWasSuccessful] = useState(false);
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [newPassword, setNewPassword] = useState('');
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [confirmNewPassword, setConfirmNewPassword] = useState('');
	const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
    const [errorText, setErrorText] = useState({
		newPassword: '',
		confirmNewPassword: ''
	});
	const [error, setError] = useState('');
	const hasSpecialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;

	function onChangePassword(e) { 
		setError('');
		setPassword(e.target.value);
	}

	function onChangeNewPassword(e) {
		if(confirmNewPassword.length !== 0 && e.target.value !== confirmNewPassword)
			errorText.confirmNewPassword = 'Passwörter stimmen nicht überein.';
		else
			errorText.confirmNewPassword = '';

		if(e.target.value.length < 6 || e.target.value.length > 63 || !hasSpecialCharRegex.test(e.target.value))
			errorText.newPassword = 'Mindestens 6 Zeichen lang mit einem Sonderzeichen.';
		else
			errorText.newPassword = '';

		setError('');
		setNewPassword(e.target.value);
		setErrorText(errorText);
	}

	function onChangeConfirmNewPassword(e) {
		if(e.target.value.length !== 0 && e.target.value !== newPassword)
			errorText.confirmNewPassword = 'Passwörter stimmen nicht überein.';
		else
			errorText.confirmNewPassword = '';

		setError('');
		setConfirmNewPassword(e.target.value);
		setErrorText(errorText);
	}

	function validateForm() {
		return password.length > 0 && newPassword.length > 0 && confirmNewPassword.length > 0 
			&& errorText.newPassword === '' && errorText.confirmNewPassword === '';
	}

	async function handleSubmit(event) {
		event.preventDefault();
		setIsLoading(true);

        changePassword(password, newPassword, function(err, data) {
            if(data) 
				setWasSuccessful(true);
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
							<Text 
								as='button' type='button' fontSize='14px' bg='transparent' 
								onClick={e => { setShowPassword(!showPassword) }} 
								style={{cursor: 'pointer'}}
							>
								{ password !== '' && (showPassword ? <ViewIcon /> : <ViewOffIcon />) } 
							</Text>
						</InputRightElement> 
					</InputGroup>
				</FormControl>
				<FormControl isInvalid={errorText.newPassword} isRequired>
					<FormLabel> Neues Passwort </FormLabel>
					<InputGroup> 
						<Input 
							type={showNewPassword ? 'text' : 'password'} onChange={onChangeNewPassword}
							size='lg' isReadOnly={wasSuccessful} 
						/>
						<InputRightElement h='100%'> 
							<Text 
								as='button' type='button' fontSize='14px' bg='transparent' 
								onClick={e => { setShowNewPassword(!showNewPassword) }} 
								style={{cursor: 'pointer'}}
							>
								{ newPassword !== '' && (showNewPassword ? <ViewIcon /> : <ViewOffIcon />) } 
							</Text>
						</InputRightElement> 
					</InputGroup>
					<FormErrorMessage>{errorText.newPassword}</FormErrorMessage>
				</FormControl>
				<FormControl isInvalid={errorText.confirmNewPassword} isRequired>
					<FormLabel> Neues Passwort bestätigen </FormLabel>
					<InputGroup> 
						<Input 
							type={showConfirmNewPassword ? 'text' : 'password'} onChange={onChangeConfirmNewPassword}
							size='lg' isReadOnly={wasSuccessful} 
						/>
						<InputRightElement h='100%'> 
							<Text 
								as='button' type='button' fontSize='14px' bg='transparent' 
								onClick={e => { setShowConfirmNewPassword(!showConfirmNewPassword) }} 
								style={{cursor: 'pointer'}}
							>
								{ confirmNewPassword !== '' && (showConfirmNewPassword ? <ViewIcon /> : <ViewOffIcon />) } 
							</Text>
						</InputRightElement> 
					</InputGroup>
					<FormErrorMessage>{errorText.confirmNewPassword}</FormErrorMessage>
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

export default ChangePassword;