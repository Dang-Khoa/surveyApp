import React, { useState, useEffect } from 'react';
import { Prompt } from 'react-router-dom';
import { Box, Flex, Heading, Stack, Button } from '@chakra-ui/react';
import SurveyFormItem from './SurveyFormItem';

function SurveyForm({ jsonSurvey, surveyData, status, onSubmitSurvey }) {
    const [results, setResults] = useState(surveyData);
    const [currentPage, setCurrentPage] = useState(0);
    const [currentPageJson, setCurrentPageJson] = useState({});
    const [surveyState, setSurveyState] = useState(0);
    const pageCount = jsonSurvey['pages'].length;
    
    const mathOp = ['+', '-', '*', '/'];
    const checkConditionString = (conditionString) => {
        var conditionElements = conditionString.split('and');
        if(conditionElements.length > 1){
            let condition = true;
            for(let i = 0; i < conditionElements.length; i++){
                condition = condition && checkSingleConditionString(conditionElements[i]);
            }
            return condition;
        }
        
        conditionElements = conditionString.split('or');
        if(conditionElements.length > 1){
            let condition = false;
            for(let i = 0; i < conditionElements.length; i++){
                condition = condition || checkSingleConditionString(conditionElements[i]);
            }
            return condition;
        }

        return checkSingleConditionString(conditionString);
    }

    const checkSingleConditionString = (conditionString) => {
        var conditionElements = conditionString.split(' ').filter(el => {return el.length !== 0});

        for(let i = 0; i < conditionElements.length; i++) {
            if(conditionElements[i][0] === '$'){
                var conditionVar = conditionElements[i].substring(1);
                if(conditionVar in results)
                    conditionElements[i] = results[conditionVar];
                else
                    conditionElements[i] = 0;
            }
        }

        let i = 0;
        while(i < conditionElements.length) {
            let element = conditionElements[i]
            if(mathOp.includes(element)) {
                if(i - 1 < 0 || i + 1 >= conditionElements.length) {
                    console.error('Invalid mathematical operation in JSON survey object: ' + conditionString);
                    return false;
                }
                else {
                    var mathResult;
                    if(conditionElements[i-1] === '')
                        conditionElements[i-1] = 0
                    if(conditionElements[i+1] === '')
                        conditionElements[i+1] = 0

                    if(element === '+')
                        mathResult = parseInt(conditionElements[i-1]) + parseInt(conditionElements[i+1])
                    else if(element === '-')
                        mathResult = parseInt(conditionElements[i-1]) - parseInt(conditionElements[i+1])
                    else if(element === '*')
                        mathResult = parseInt(conditionElements[i-1]) * parseInt(conditionElements[i+1])
                    else if(element === '/')
                        mathResult = parseInt(conditionElements[i-1]) / parseInt(conditionElements[i+1])

                    if(mathResult === undefined){
                        console.error('Invalid condition in JSON survey object: ' + conditionString);
                        return false;
                    }

                    conditionElements = [...conditionElements.slice(0, i-1), mathResult,...conditionElements.slice(i+2)];
                    i -= 1;
                }
            }
            i += 1;
        }

        if(conditionElements.length !== 3) {
            console.error('Invalid condition in JSON survey object: ' + conditionString);
            return false;
        }

        if(!isNaN(conditionElements[0]) && !isNaN(conditionElements[2])) {
            conditionElements[0] = parseInt(conditionElements[0]);
            conditionElements[2] = parseInt(conditionElements[2]);
        }

        if(conditionElements[1] === '===')
            return conditionElements[0] === conditionElements[2];
        else if(conditionElements[1] === '!==')
            return conditionElements[0] !== conditionElements[2];
        else if(conditionElements[1] === '<')
            return conditionElements[0] < conditionElements[2];
        else if(conditionElements[1] === '>')
            return conditionElements[0] > conditionElements[2];
        else if(conditionElements[1] === '<=')
            return conditionElements[0] <= conditionElements[2];
        else if(conditionElements[1] === '>=')
            return conditionElements[0] >= conditionElements[2];
        
        console.error('Invalid conditional operator in JSON survey object: ' + conditionString);
        return false;
    }

    useEffect(() => {
        const setCurrentScope = () => {
            let currentPageJson = jsonSurvey.pages[currentPage]
            if(!currentPageJson)
                setCurrentPageJson({});
            else
                setCurrentPageJson(currentPageJson);
        }

        setCurrentScope();
    }, [currentPage, jsonSurvey])

    function setFormResults(pageResults) {
        setResults({ ...results, ...pageResults })
    }

    function onSubmit() {
        results[process.env.REACT_APP_SURVEY_STATUS_NAME] = surveyState;
        onSubmitSurvey(results);
    }
    
    return (
        <Box align='center' borderWidth={1} borderRadius={10}> 
            <form onSubmit={onSubmit}>
                  <Prompt
                        when={true}
                        message={location =>
                            `Are you sure you want to go to ${location.pathname}`
                        }
                    />
                {
                    <Heading align='left' mt={3} ml={3} mb={3}> {currentPageJson.title} </Heading>
                }
                <Box mr={5} ml={5}>
                    <Stack>
                        {
                            Array.isArray(currentPageJson.elements) &&
                            currentPageJson.elements.map(function(element, i) {
                                let isReadOnly = status === '2';
                                if(!('visible' in element) || element.visible) {
                                    return (
                                        <SurveyFormItem 
                                            key={i} formJsonObj={element} setResults={setFormResults} 
                                            isReadOnly={isReadOnly} preValues={results}
                                        />
                                    )
                                }
                                else {
                                    if('visibleIf' in element && checkConditionString(element.visibleIf)) {
                                        return (
                                            <SurveyFormItem 
                                                key={i} formJsonObj={element} setResults={setFormResults} 
                                                isReadOnly={isReadOnly} preValues={results}
                                            />
                                        )
                                    }
                                }
                                return <React.Fragment key={i}></React.Fragment>
                            })
                        }
                    </Stack>
                </Box>
                <Box w='90%'>
                    <Flex justify='space-between' mt={6}>
                        <Box>
                            { 
                                pageCount !== 0 && !(currentPage === 0) && 
                                <Button align='left' onClick={e => {setCurrentPage(currentPage - 1); window.scrollTo(0,0)}}> Zurück </Button> 
                            }
                        </Box>
                        <Box>
                            { 
                                pageCount !== 0 && !(currentPage === pageCount-1) && 
                                <Button align='right' onClick={e => {setCurrentPage(currentPage + 1); window.scrollTo(0,0)}}> Weiter </Button>
                            }
                        </Box>
                    </Flex>
                    {
                        status !== '2' ? (
                            currentPage === pageCount-1 ?
                                <Button mb={3} bg='orange' type="submit" width="full" mt={4} onClick={() => setSurveyState(2)}> 
                                    Senden </Button>
                                : 
                                <Button mb={3} bg='orange' type='submit' width='full' mt={4} onClick={() => setSurveyState(1)}> 
                                    Änderungen Speichern 
                                </Button>
                        ) : <Box mb={3}/>
                    }
                </Box>
            </form>
        </Box>
    )
}

export default SurveyForm;