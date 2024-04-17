import React from "react";
import { 
    Switch, Stack, Text, Box, Heading, 
    IconButton, Center, Flex
} from '@chakra-ui/react';
import { CaretRight } from 'phosphor-react';
import { useUserContext } from '../context/authContext';

function Settings() {
    const { isAdmin } = useUserContext();

    return (
        <Stack spacing={7}> 
            <Heading align='center'> Einstellungen</Heading>
            <Stack>
                <Box fontSize='md' borderWidth={1} borderRadius={10} borderColor='orange' overflow="hidden">
                        <Flex justify='flex-end'>
                            <Center w='100%'>
                                <Box w='90%'> 
                                    <Text align='left'> E-Mail Adresse ändern </Text>
                                </Box>
                            </Center>
                            <IconButton as='a' href='/settings/email' size='md' icon={<CaretRight />}/>
                        </Flex>
                </Box>
                <Box fontSize='md' borderWidth={1} borderRadius={10} borderColor='orange' overflow="hidden">
                        <Flex justify='flex-end'>
                            <Center w='100%'>
                                <Box w='90%'> 
                                    <Text align='left'> Benutzername ändern </Text>
                                </Box>
                            </Center>
                            <IconButton as='a' href='/settings/username' size='md' icon={<CaretRight />}/>
                        </Flex>
                </Box>
                <Box fontSize='md' borderWidth={1} borderRadius={10} borderColor='orange' overflow="hidden">
                        <Flex justify='flex-end'>
                            <Center w='100%'>
                                <Box w='90%'> 
                                    <Text align='left'> Passwort ändern </Text>
                                </Box>
                            </Center>
                            <IconButton as='a' href='/settings/password' size='md' icon={<CaretRight />}/>
                        </Flex>
                </Box>
            </Stack>
            { 
                !isAdmin() && 
                <Stack direction='row'>
                    <Switch size='lg' colorScheme='orange' />
                    <Text> Benachrichtigung erlauben </Text>
                </Stack>
            }
        </Stack>
    );
}

export default Settings;