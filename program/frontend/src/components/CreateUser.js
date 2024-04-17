import React, { useState } from 'react';
import {
    Text, FormControl, FormLabel, FormErrorMessage,
    Input, Button, Tabs, TabPanels, TabList, Tab, 
    TabPanel
} from '@chakra-ui/react'
import DatePicker from 'react-datepicker';
import ErrorMessage from './ErrorMessage';
import SuccessMessage from './SuccessMessage';
import { createUser, createAdmin } from '../services/adminServices';

import 'react-datepicker/dist/react-datepicker.css';
import './createUser.css'

function CreateUser() {
    const [isLoading, setIsLoading] = useState(false);
    const [wasSuccessful, setWasSuccessful] = useState(false);
    const [tab, setTab] = useState(0);
    const [email, setEmail] = useState('');
    const [childsBirthDay, setChildsBirthDay] = useState('');
    const [patientcode, setPatientcode] = useState('');
    const [errorText, setErrorText] = useState('');
    const [error, setError] = useState('');
	const isEmailRegex = /.+@.+\.[A-Za-z]+$/;

    const onChangeEmail = (e) => {
        if(e.target.value === '' || isEmailRegex.test(e.target.value)) 
            setErrorText('');
        else
			setErrorText('Bitte gültige E-Mail Adresse angeben.');
        
		setError('');
        setWasSuccessful('');
		setEmail(e.target.value);
	}

    const onChangePatientcode = (e) => {
        setError('');
        setWasSuccessful('');
        setPatientcode(e.target.value);
    }

    function validateForm() {
        return error === '' && errorText === '' && email.length > 0;
    }

	async function handleSubmit(event) {
		event.preventDefault();
		setIsLoading(true);

        if(tab === 0) {
            createUser(email, patientcode, childsBirthDay, function(err, data) {
                console.log(data, err);
                if(data){
                    setWasSuccessful(true);
                    setEmail('');
                    setChildsBirthDay('');
                }
                else if (err)
                    setError(err);
                setIsLoading(false);
            })
        }
        else {
            createAdmin(email, patientcode, function(err, data) {
                console.log(err, data);
                if(data)
                    setWasSuccessful(true);
                else if (err)
                    setError(err);
                setIsLoading(false);
            })
        }
    }

    const createUserForm = (
        <form onSubmit={handleSubmit}>
            { error && <ErrorMessage message={error} /> }
            { wasSuccessful && <SuccessMessage message='Registrierungslink wurde erfolgreich gesendet.' /> }
            <FormControl isInvalid={errorText} isRequired> 
                <FormLabel> E-Mail des Benutzers eingeben </FormLabel>
                <Input value={email} onChange={onChangeEmail} />
                <FormErrorMessage>{errorText}</FormErrorMessage>
                <Text fontSize='xs' color='#777' mt={2}>
                    Ein Registrierungslink wird der E-Mail Adresse zugesendet, womit sich der Benutzer registrieren kann.
                </Text>
            </FormControl>
            <FormControl isInvalid={errorText} mt={3}> 
                <FormLabel> Datum der letzten Geburt der Patientin </FormLabel>
                <DatePicker 
                    id='published-date' showPopperArrow={true} 
                    selected={childsBirthDay ? new Date(childsBirthDay) : null} 
                    onChange={date => setChildsBirthDay(date.toISOString().slice(0, 10))} 
                    />
            </FormControl>
            <FormControl isInvalid={errorText} mt={3}> 
                <FormLabel> Patienten-ID für den Account angeben </FormLabel>
                <Input value={patientcode} onChange={onChangePatientcode} />
                <Text fontSize='xs' color='#777' mt={2}>
                    Falls keine Patienten-ID angegeben wird, wird die nächste freie ID automatisch ausgewählt.
                </Text>
            </FormControl>
            <Button 
                w='full' bg='orange' type='submit' mt={7}
                isLoading={isLoading} disabled={!validateForm() || error}
            >
                Senden
            </Button>
        </form>
    )
    
    const createAdminForm = (
        <form onSubmit={handleSubmit}>
            { error && <ErrorMessage message={error} /> }
            { wasSuccessful && <SuccessMessage message='Registrierungslink wurde erfolgreich gesendet.' /> }
            <FormControl isInvalid={errorText} isRequired> 
                <FormLabel> E-Mail des Administrators eingeben </FormLabel>
                <Input value={email} onChange={onChangeEmail} />
                <FormErrorMessage>{errorText}</FormErrorMessage>
                <Text fontSize='xs' color='#777' mt={2}>
                    Ein Registrierungslink wird der E-Mail Adresse zugesendet, womit sich der Administrator registrieren kann.
                </Text>
            </FormControl>
            <FormControl isInvalid={errorText} mt={3}> 
                <FormLabel> Patienten ID für den Account angeben </FormLabel>
                <Input value={patientcode} onChange={onChangePatientcode} />
                <Text fontSize='xs' color='#777' mt={2}>
                    Standardformat: 1700.XXX
                </Text>
            </FormControl>
            <Button 
                w='full' bg='orange' type='submit' mt={7}
                isLoading={isLoading} disabled={!validateForm() || error}
            >
                Senden
            </Button>
        </form>
    )

	return (
        <Tabs onChange={(i) => setTab(i)}>
            <TabList>
                <Tab>Benutzer</Tab>
                <Tab>Administrator</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    {createUserForm}
                </TabPanel>
                <TabPanel>
                    {createAdminForm}
                </TabPanel>
            </TabPanels>
        </Tabs>
	);
}

export default CreateUser;