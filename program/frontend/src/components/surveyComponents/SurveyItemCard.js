import React from 'react';
import {
    Box, Heading, Text, Center, Flex,
} from '@chakra-ui/react';
import { CaretRight } from 'phosphor-react';

function SurveyItemCard({ title, status, monthsAfterBirth, id }) {
    const statusToText = {
        0: 'Fällig',
        1: 'Offen',
        2: 'Ausgefüllt'
    }
   
    return (
        <Box boxShadow={2} borderWidth={1} borderRadius={10} overflow='hidden' mt={2} h='100%'>
            <Flex justifyContent='space-between'>
                <Box w='85%'>
                    <Box 
                        align='center' bg='orange' paddingRight='10px' paddingLeft='10px'
                        borderBottomRightRadius={10} d='inline-block' 
                    >
                        <Text >
                            { statusToText[status] }
                        </Text>
                    </Box>
                    <Box align='center' mt={3} mb={3}> 
                        <Box align='left' w='80%'>
                            <Heading size='md'>
                                { title }
                            </Heading>
                            <Text>{ `${monthsAfterBirth} Monate nach der Geburt` }</Text>
                        </Box>
                    </Box>
                </Box>
                <Box as='a' href={`/surveys/${id}`} bg='orange' w='12%' maxW='35px'>
                    <Center h='full'>
                        <CaretRight />
                    </Center>
                </Box>
            </Flex>
        </Box>
    )
}

export default SurveyItemCard;