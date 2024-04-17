import { Box, Spinner } from '@chakra-ui/react';

function LoadingScreen() {
    return (
        <Box align='center'>
            <Spinner 
                thickness={6} 
                emptyColor='gray.200' color='orange'
                size='xl'
            />
        </Box>
    )
}

export default LoadingScreen;