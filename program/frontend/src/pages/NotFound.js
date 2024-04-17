import React from 'react';
import { Box, Button, Heading } from '@chakra-ui/react';

function NotFound() {
    return (
        <Box>
            <Heading> Diese Seite ist leider nicht verfügbar. </Heading>
            <Box mt={6}>
                <Button as='a' href='/' bg='orange'> Zurück </Button>
            </Box>
        </Box>
    )
}

export default NotFound;