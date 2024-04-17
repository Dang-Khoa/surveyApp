import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { 
	Flex, Box, Heading, Button,
	FormControl, FormLabel, Input, Text,
	CircularProgress, InputGroup, InputRightElement,
	FormErrorMessage, PinInput, PinInputField
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { ErrorMessage } from '../components';
import { useUserContext } from '../context/authContext';
import { signup, checkToken, checkUserId } from '../services/authServices';
import NotFound from './NotFound';
import * as serviceWorker from '../serviceWorker';

function Signup() {
	const { userId } = useParams();
    const [pageState, setPageState] = useState(0);
	const [inputUserId, setInputUserId] = useState('');
	const [isValidUrl, setIsValidUrl] = useState(1); // 0 - false, 1 - page loading, 2 - true

    function nextState() {
        setPageState(pageState + 1);
    }

	function onSuccessCheckToken(userId) {
		setInputUserId(userId);
		nextState();
	}

    var checkToken = <CheckToken onSuccess={onSuccessCheckToken} />;
    var signupForm = userId ? <SignupForm userId={userId} /> : <SignupForm userId={inputUserId} />;
	var loading = (
		<Box>
			<Heading> Überprüft Regstrierungslink... </Heading>
		</Box>
	)

	useEffect(() => {
		const checkValidRegistrationLink = async() => {
			if(userId) {
				checkUserId(userId, function(err, data) {
					if(data){
						setIsValidUrl(2);
						setInputUserId(userId);
					}
					else
						setIsValidUrl(0);	
				})
			}
			else
				setIsValidUrl(2);
		}

		checkValidRegistrationLink();
	}, [userId]);

    return (
        <Box>
            {
				isValidUrl === 0 ? <NotFound /> :
					(isValidUrl === 1 ? loading : (
						!inputUserId ? 
							(pageState === 0 ? checkToken : signupForm)
						:
							signupForm
					))
            }
        </Box>
    );
}

function CheckToken({ onSuccess }) {
	const [isLoading, setIsLoading] = useState(false);
    const [token, setToken] = useState('');
    const [error, setError] = useState(false);

    function onChangeToken(value) {
        setError('');
        setToken(value);
    }

	function validateForm() {
		return token.length === 4;
	}

	async function handleSubmit(e) {
		e.preventDefault();
		setIsLoading(true);

        checkToken(token, function(err, data) {
            if(err)
                setError(err);
            else if(data) {
				onSuccess(data);
			}
            setIsLoading(false);
        })
	}

	return (
		<Flex width="full" align="center" justifyContent="center" mt={10} >
			<Box p={10} maxWidth="700px" borderWidth={1.5} borderRadius={8} boxShadow="lg"> 
				<Box textAlign="center">
					<Heading> Token zur Registrierung </Heading>
				</Box>
				<Box my={4} textAlign="left">
					<form onSubmit={handleSubmit}>
					{ error && <ErrorMessage message={error} /> }
                        <FormControl isRequired mt={6}>
                            <Flex align='center'> 
                                <FormLabel> Token: </FormLabel>
								<Box>
									<PinInput value={token} onChange={onChangeToken}>
										<PinInputField />
										<PinInputField />
										<PinInputField />
										<PinInputField />
									</PinInput>
								</Box>
                            </Flex>
                            <Text fontSize='xs' color='#777' mt={2} align='left'>
                                Der Token wurde per E-Mail geschickt, falls Sie berechtigt zur Registrierung sind.
                            </Text>
                        </FormControl>
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
	)
}

function SignupForm({ userId }) {
	const history = useHistory();
	const { setUserContext, logout } = useUserContext();
	const [isLoading, setIsLoading] = useState(false);
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [confirmPassword, setConfirmPassword] = useState('');
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [error, setError] = useState('');
	const [errorText, setErrorText] = useState({
		email: '',
		username: '',
		password: '',
		confirmPassword: ''
	});
	const hasSpecialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
	const isEmailRegex = /.+@.+\.[A-Za-z]+$/;

	function onChangeEmail(e) {
		if(e.target.value.length > 0 && !isEmailRegex.test(e.target.value))
			errorText.email = 'Bitte gültige E-mail Adresse angeben.'
		else 
			errorText.email = '';

		setError('');
		setEmail(e.target.value);
		setErrorText(errorText);
	}

	function onChangeUsername(e) {
		let value = e.target.value;
		if((value.length > 0 && value.length < 5) || value.length > 16 || hasSpecialCharRegex.test(value))
			errorText.username = 'Zwischen 5 bis 16 Buchstaben und Zahlen.';
		else 
			errorText.username = '';

		setError('');
		setUsername(e.target.value);
		setErrorText(errorText);
	}

	function onChangePassword(e) {
		if(confirmPassword.length !== 0 && e.target.value !== confirmPassword)
			errorText.confirmPassword = 'Passwörter stimmen nicht überein.';
		else
			errorText.confirmPassword = '';

		if(e.target.value.length < 6 || e.target.value.length > 63 || !hasSpecialCharRegex.test(e.target.value))
			errorText.password = 'Mindestens 6 Zeichen lang mit einem Sonderzeichen.';
		else
			errorText.password = '';

		setError('');
		setPassword(e.target.value);
		setErrorText(errorText);
	}

	function onChangeConfirmPassword(e) {
		if(e.target.value.length !== 0 && e.target.value !== password)
			errorText.confirmPassword = 'Passwörter stimmen nicht überein.';
		else
			errorText.confirmPassword = '';

		setError('');			
		setConfirmPassword(e.target.value);
		setErrorText(errorText);
	}

	function validateForm() {
		return (
			email.length > 0 && username.length > 0 && password.length > 0 &&
            errorText.username === '' && 
            errorText.password === '' &&
            errorText.confirmPassword === ''
        );
	}

	async function handleSubmit(e) {
		e.preventDefault();
		setIsLoading(true);

		signup(userId, email, username, password, async function(err, data) {
			if(err) {
				setIsLoading(false);
				setError(err);
			}
			else if(data) {
				setUserContext(data);
				await serviceWorker.subscribeUser()
				logout();
				history.push('/');
			}
		})
	}

	return (
		<Flex width="full" align="center" justifyContent="center" mt={5} >
			<Box p={10} maxWidth="700px" borderWidth={1.5} borderRadius={8} boxShadow="lg">
				<Box textAlign="center">
					<Heading> Registrieren </Heading>
				</Box>
				<Box my={4} textAlign="left">
					<form onSubmit={handleSubmit}>
					{ error && <ErrorMessage message={error} /> }
						<FormControl isInvalid={errorText.email} isRequired mt={3}>
							<FormLabel> E-Mail Adresse </FormLabel>
							<Input onChange={onChangeEmail}/>
							<FormErrorMessage>{errorText.email}</FormErrorMessage>
						</FormControl>
						<FormControl isInvalid={errorText.username} isRequired mt={3}> 
							<FormLabel> Benutzername </FormLabel>
							<Input onChange={onChangeUsername}/>
							<FormErrorMessage>{errorText.username}</FormErrorMessage>
						</FormControl>
						<FormControl isInvalid={errorText.password} isRequired mt={3}>
							<FormLabel> Passwort </FormLabel>
							<InputGroup> 
								<Input type={showPassword ? 'text' : 'password'} onChange={onChangePassword}/>
								<InputRightElement h='100%'> 
										<Text 
											as='button' type='button' fontSize='14px' bg='transparent' 
											onClick={ e => {setShowPassword(!showPassword)} } 
											style={{cursor: 'pointer'}}
										>
											{ password !== '' && (showPassword ? <ViewIcon /> : <ViewOffIcon />) } 
										</Text>
								</InputRightElement> 
							</InputGroup>
							<FormErrorMessage>{errorText.password}</FormErrorMessage>
						</FormControl>
						<FormControl isInvalid={errorText.confirmPassword} isRequired mt={3}>
							<FormLabel> Passwort bestätigen </FormLabel>
							<InputGroup> 
								<Input type={showConfirmPassword ? 'text' : 'password'} onChange={onChangeConfirmPassword}/>
								<InputRightElement h='100%'> 
										<Text 
											as='button' type='button' fontSize='14px' bg='transparent' 
											onClick={ e => {setShowConfirmPassword(!showConfirmPassword)} } 
											style={{cursor: 'pointer'}}
										>
											{ confirmPassword !== '' && (showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />) } 
										</Text>
								</InputRightElement> 
							</InputGroup>
							<FormErrorMessage>{errorText.confirmPassword}</FormErrorMessage>
						</FormControl>
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

export default Signup;