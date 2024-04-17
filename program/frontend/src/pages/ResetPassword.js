import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { 
	Flex, Box, Button, Text,
	FormControl, FormLabel, Input, 
	CircularProgress, Heading, 
	FormErrorMessage, InputGroup, InputRightElement, 
    PinInput, PinInputField, IconButton
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon, RepeatIcon } from '@chakra-ui/icons';
import { ErrorMessage, SuccessMessage } from '../components';
import { requestToken, setNewPassword } from '../services/authServices';

function ResetPassword() {
    const history = useHistory();
    const [pageState, setPageState] = useState(0);

    function nextState() {
        setPageState(pageState + 1);
    }

    function pushToSignin() {
        history.push('/signin');
    }

    var setEmailForToken = <SetEmailForToken onSuccess={nextState} />;
    var setNewPassword = <SetNewPassword onSuccess={pushToSignin} />;

    return (
        <Box>
            {
                pageState === 0 ? setEmailForToken  
                    : pageState === 1 && setNewPassword 
            }
        </Box>

    );
}

function SetEmailForToken({ onSuccess }) {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [errorText, setErrorText] = useState('');
    const [error, setError] = useState('');
	const isEmailRegex = /.+@.+\.[A-Za-z]+$/;

	function onChangeEmail(e) {
		if(e.target.value.length > 0 && !isEmailRegex.test(e.target.value))
            setErrorText('Bitte gültige E-mail angeben.');
		else 
            setErrorText('');

        setError('');
        setEmail(e.target.value);
	}

    function validatForm() {
        return (
            email.length > 0 && errorText === ''
        )
    }
     
    async function handleSubmitEmail(e) {
        e.preventDefault();
        setIsLoading(true);

        requestToken(email, function(err, msg) {
            setIsLoading(false);
            if (err)
                setError('E-Mail konnte nicht gesendet werden. Interner Fehler!')
            else if(msg) {
                onSuccess();
                setError('');
            }
        })
    }

    return (
        <Flex width="full" align="center" justifyContent="center" mt={10} >
            <Box p={10} maxWidth="700px" borderWidth={1.5} borderRadius={8} boxShadow="lg">
                <Box textAlign="center">
                    <Heading size='md' align='left'> Passwort Zurücksetzen </Heading>
                </Box>
                <Box my={4} textAlign="left">
					<form onSubmit={handleSubmitEmail}>
					{ error && <ErrorMessage message={error} /> }
                        <FormControl isInvalid={errorText} isRequired mt={3}>
                            <FormLabel> E-Mail Adresse </FormLabel>
                            <Input onChange={onChangeEmail}/>
                            <FormErrorMessage>{errorText}</FormErrorMessage>
                        </FormControl>
                        <Button bg='orange' type="submit" width="full" mt={4} disabled={!validatForm() || error}>
                            {isLoading ? (
                                <CircularProgress isIndeterminate size="24px" color="orange" />
                            ) : (
                                'Senden'
                            )}
                        </Button>
                    </form>
                </Box>
            </Box>
        </Flex>
    )
}

function SetNewPassword({ onSuccess }) {
    const [isLoading, setIsLoading] = useState(false);

    const [token, setToken] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showConfirmPassword, setShowConfirmPassword] = useState('');
    const [errorText, setErrorText] = useState({
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const hasSpecialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;

    function onChangeToken(value) {
        setError('');
        setToken(value);
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

    function validatePasswordForm() {
        return (
            token.length === 4 && password !== '' && confirmPassword !== '' &&
            errorText.password === '' && 
            errorText.confirmPassword === ''
        )
	}

    async function handleSubmitNewPassword(e) {
        e.preventDefault(); 
        setIsLoading(true);

        setNewPassword(token, password, function(err, data) {
            if (err)
                setError(err);
            else if (data) {
                setSuccess(data);
                onSuccess();
            }
            setIsLoading(false);
        })
    }

    return (
        <Flex width="full" maxW='400px' align="center" justifyContent="center" mt={10} >
            <Box p={10} maxWidth="700px" borderWidth={1.5} borderRadius={8} boxShadow="lg">
                <Box textAlign="center">
                    <Heading align='left' size='md'> Neues Passwort setzen </Heading>
                </Box>
                <Box my={4} textAlign="left">
                    <form onSubmit={handleSubmitNewPassword}>
                    { error && <ErrorMessage message={error} /> }
                    { success && <SuccessMessage message={success} /> }
                        <FormControl isRequired mt={3}>
                            <FormLabel> Token </FormLabel>
                            <Flex align='center' w='100%'> 
                                <Box whiteSpace='nowrap'>
                                    <PinInput value={token} onChange={onChangeToken} >
                                        <PinInputField />
                                        <PinInputField />
                                        <PinInputField />
                                        <PinInputField />
                                    </PinInput>
                                </Box>
                                <Box flex='1' align='center'> 
                                    <IconButton icon={ <RepeatIcon /> } flex='1'/> 
                                </Box>
                            </Flex>
                            <Text fontSize='xs' color='#777' mt={2}>
                                Token wurde an Ihre E-Mail geschickt. (<RepeatIcon /> zum erneuten senden)
                            </Text>
                        </FormControl>
                        <FormControl isInvalid={errorText.password} isRequired mt={3}>
                            <FormLabel> Neues Passwort </FormLabel>
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
                            <FormLabel> Neues Passwort bestätigen </FormLabel>
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
                        <Button bg='orange' type="submit" width="full" mt={4} disabled={!validatePasswordForm() || error}>
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

export default ResetPassword;
