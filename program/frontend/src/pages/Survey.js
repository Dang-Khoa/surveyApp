import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import SurveyForm from '../components/surveyComponents/SurveyForm';
import { getSurveyData } from '../services/surveyServices';
import JsonSurvey from '../components/surveyComponents/JsonSurvey';

import { saveSurvey } from '../services/surveyServices';
import { ErrorMessage, SuccessMessage } from '../components';

function Survey() {
    const { history } = useHistory();
    const { surveyId } = useParams();
    const [surveyData, setSurveyData] = useState(null);
    const [surveyJson, setSurveyJson] = useState(null);
    const [surveyStatus, setSurveyStatus] = useState(null);

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        async function fetchSurveyData() {
            getSurveyData(surveyId, function(err, data){
                if (data) {
                    setSurveyData(data.surveyData);
                    setSurveyJson(JsonSurvey);
                    setSurveyStatus(data.surveyStatus);
                }
                else if (err){
                    alert(err);
                }
            })
        }
        
        fetchSurveyData();
    }, [surveyId, setSurveyData]);

    function onSubmitSurvey(results) {
        saveSurvey(surveyId, results, function(err, msg) {
            if(err)
                setError(err);
            else {
                setSuccess('Die Antworten wurden erfolgreich gesendet.');
                history.push('/');
                console.log(success);
            }
        })
    }

    return (
        surveyJson ? 
            (
                <>
                    <SurveyForm jsonSurvey={surveyJson} surveyData={surveyData} status={surveyStatus} onSubmitSurvey={onSubmitSurvey} /> : 
                    { error && <ErrorMessage message={error} /> }
                    { success && <SuccessMessage message={success} /> }
                </>
            ) :
            <div> Lädt... </div>
    )
}

export default Survey;