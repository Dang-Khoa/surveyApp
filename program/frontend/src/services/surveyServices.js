import axios from 'axios';
import { getAuthHeader } from './authServices';
import JsonSurvey from '../components/surveyComponents/JsonSurvey';

const API_URL = process.env.REACT_APP_API + "api/user/survey";

function saveSurvey(surveyId, surveyJson, callback) {
    axios.post(API_URL + '/save', {
            surveyEvent: surveyId,
            surveyResults: [surveyJson]
        },
        {
            headers: getAuthHeader()
        }
    )
    .then(
        (response) => {
            return callback(null, response.data.message);
        },
        (error) => {
            return callback('Umfrage konnte nicht gespeichert werden. Interner Fehler!', null);
        }
    );
};

function getSurvey(surveyForm, surveyEvent, callback) {
    axios.post(API_URL + '/get', {
            surveyForm: surveyForm,
            surveyEvent: surveyEvent,
        },
        {
            headers: getAuthHeader()
        }
    )
    .then(
        (response) => {
            return callback(null, response.data.data);
        },
        (error) => {
            return callback('Umfrage konnte nicht gespeichert werden.')
        }
    )
};

// need to get status of all surveys from beginning to today
function getSurveyStatusList(monthsAfterBirth, callback) {
    recursiveGetSurveyStatusList(0, monthsAfterBirth, function(err, data) {
        if(err) callback(err);
        else if (data) callback(null, data);
        else callback("Interner Fehler!");
    });
}

const surveyForm = process.env.REACT_APP_SURVEY_FORM;
const surveyStatusVariable = process.env.REACT_APP_SURVEY_STATUS_NAME;
const surveyEventSuffix = process.env.REACT_APP_EVENT_SUFFIX;
// Needs special case for month 2 and 12
// For some reason the event name is singular -> 2_month_visit_arm_1 instead of 2_months_visit_arm_1
// For other consistent arms, the event suffix should be set in the .env file, and the if-clause in the method should be adjusted accordingly
const surveyEventExceptionsSuffix = "_month_visit_arm_1";   
function recursiveGetSurveyStatusList(currentSurveyMonth, monthsAfterBirth, callback) {
    if(currentSurveyMonth === 0) 
        currentSurveyMonth = 2;
    else if(currentSurveyMonth === 2) 
        currentSurveyMonth = 6;
    else
        currentSurveyMonth += 6;

    if(currentSurveyMonth > monthsAfterBirth)
        return callback(null, []);
         
    var surveyEvent;
    if(currentSurveyMonth === 2 || currentSurveyMonth === 12)
        surveyEvent = currentSurveyMonth + surveyEventExceptionsSuffix;
    else 
        surveyEvent = currentSurveyMonth + surveyEventSuffix;

    axios.post(API_URL + '/get', {
            surveyForm: surveyForm,
            surveyEvent: surveyEvent
        },
        {
            headers: getAuthHeader()
        }
    )
    .then(
        (response) => {
            var surveyStatus;
            if(Array.isArray(response.data.data) && response.data.data.length === 1)
                surveyStatus = parseInt(response.data.data[0][surveyStatusVariable]);
            else
                surveyStatus = 0;
            var surveyListItem = {
                'monthsAfterBirth' : currentSurveyMonth, 
                'surveyId' : surveyEvent,
                'surveyStatus' : surveyStatus
            }

            recursiveGetSurveyStatusList(currentSurveyMonth, monthsAfterBirth, function(err, data) {
                if (err) 
                    return callback(err);
                else if (data) {
                    data.push(surveyListItem);
                    return callback(null, data);
                }
                else 
                    return callback('Interner Fehler!');
            })
        },
        (error) => {
            return callback('Umfrageliste konnte nicht aufgerufen werden.')
        }
    )
}

function getSurveyData(surveyId, callback) {
    getSurvey(surveyForm, surveyId, function(err, data){
        if(data){
            var returnData;
            if(data.length === 0) {
                returnData = {
                    'surveyJson' : JsonSurvey,
                    'surveyData' : {},
                    'surveyStatus' : 0
                }
            }
            else {
                returnData = {
                    'surveyJson' : JsonSurvey,
                    'surveyData' : data[0],
                    'surveyStatus' : data[0][surveyStatusVariable]
                }
            }

            callback(null, returnData);
        }
        else if (err)
            callback(err);
        else
            callback("Interner Fehler!");
    });
}

export { saveSurvey, getSurveyStatusList, getSurveyData };