import { useUserContext } from '../context/authContext';
import { List, Power, Gear, House } from 'phosphor-react';
import { 
    Menu, MenuList, MenuItem, MenuButton, IconButton,
    Grid, GridItem, Text, Center, Box
} from '@chakra-ui/react';

export default function NavMenu() {
    const { isAuthenticated, logout } = useUserContext();

    if(isAuthenticated()){
        return (
            <Box bg='orange' height={16}>
                <Grid templateColumns='repeat(5, 1fr)' h='100%'> 
                    <GridItem align='left' alignItems='center'> 
                        <IconButton 
                            as='a' href='/' h='100%' bg='transparent' variant='ghost' 
                            ml={2} icon={<House size='25' weight='fill' />}
                        /> 
                    </GridItem>
                    <GridItem align='center' gridColumnStart={2} gridColumnEnd={5}>
                        <Center h='100%'>
                            <Text fontSize='lg' fontWeight='bold'> Umfragen-App </Text>
                        </Center>
                    </GridItem>
                    <GridItem align='right' alignItems='center'>  
                        <Menu>
                            <MenuButton 
                                as={IconButton} icon={<List size='25' weight='bold' />} aria-label='Menü' 
                                bg='transparent' h='100%' mr={2}
                            />
                            <MenuList>
                                <MenuItem icon={<Gear size={25}/>} as='a' href='/settings'> 
                                    Einstellungen
                                </MenuItem>
                                <MenuItem as='button' icon={<Power size={25}/>} onClick={logout}>
                                    Abmelden
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </GridItem>
                </Grid>
            </Box>
        );
    }
    else {
        return (
            <Box bg='orange' height={16}>
                <Grid templateColumns='repeat(5, 1fr)' h='100%'> 
                    <GridItem align='center' gridColumnStart={2} gridColumnEnd={5}>
                        <Center h='100%'>
                            <Text fontSize='lg' fontWeight='bold'> Umfragen-App </Text>
                        </Center>
                    </GridItem>
                    <GridItem align='right' alignItems='center'>  
                        <Menu>
                            <MenuButton 
                                as={IconButton} icon={<List size='25' weight='bold' />} aria-label='Menü' 
                                bg='transparent' h='100%' mr={2}
                            />
                            <MenuList>
                                <MenuItem as='a' href='/signin'> 
                                    Anmelden
                                </MenuItem>
                                <MenuItem as='a' href='/signup'> 
                                    Registrieren
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </GridItem>
                </Grid>
            </Box>
        );
    }
}