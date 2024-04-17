import React, { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react'
import { useUserContext } from '../../context/authContext';
import { getSurveyStatusList } from '../../services/surveyServices';
import SurveyItemCard from './SurveyItemCard';
import { LoadingScreen } from '..';

async function getSurveyListAsync(monthsAfterBirth, callback) {
    getSurveyStatusList(monthsAfterBirth, function(err, data) {
        if (data) {
            if (Array.isArray(data)){
                for(var i = 0; i < data.length; i++){
                    data[i]['title'] = process.env.REACT_APP_CARD_TITLE 
                    data[i]['header'] = data[i]['monthsAfterBirth'] + ' Monate nach der Geburt'
                }
                return callback(null, data);
            }
        }
        else if (err) 
            return callback(err);
        return callback("Interner Fehler!");
    });
}

function SurveyList(){
    const { user } = useUserContext();
    const [isLoading, setIsLoading] = useState(false);
    const [surveyList, setSurveyList] = useState(JSON.parse(localStorage.getItem('surveyList')) || []);

    useEffect(() => {
        let isMounted = true;
        async function fetchSurveyList() {
            setIsLoading(true);

            var monthsAfterBirth = getMonthsToToday(new Date(user.userInfo.childs_birth_day))
            if(!monthsAfterBirth){
                return;
            }
            getSurveyListAsync(monthsAfterBirth, function(err, data) {
                console.log(data, err);
                if (isMounted && data) {
                    localStorage.setItem('surveyList', JSON.stringify(data));
                    setSurveyList(data);
                }
                setIsLoading(false);
            })
        }

        fetchSurveyList();
        return () => { isMounted = false }
    }, [user]);

    if(isLoading)
        return <LoadingScreen />
    
    return (
        <div>
            {
                surveyList === [] ?
                    <Box> Keine Umfragen fällig. </Box>
                :
                surveyList.map(function(survey, i) {
                    return (
                        <SurveyItemCard
                            key={i}
                            title={survey.title}
                            status={survey.surveyStatus}
                            monthsAfterBirth={survey.monthsAfterBirth}
                            id={survey.surveyId}
                        />
                    )    
                })
            }
        </div>
    )
}

function getMonthsToToday(startingDate) {
    const today = new Date();

    var monthsDifference = today.getMonth() - startingDate.getMonth();
    var yearsDifference = today.getFullYear() - startingDate.getFullYear();
    var dayDifference = today.getDate() - startingDate.getDate();

    if (dayDifference < 0)
        return monthsDifference + 12*yearsDifference - 1;
    else 
        return monthsDifference + 12*yearsDifference;
}

export default SurveyList