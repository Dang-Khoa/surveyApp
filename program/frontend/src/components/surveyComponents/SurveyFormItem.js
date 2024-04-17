import React, { useState, useEffect } from 'react';
import { 
    CheckboxGroup, FormControl, FormLabel, 
    Input, NumberDecrementStepper, NumberIncrementStepper,
    NumberInput, NumberInputField, NumberInputStepper, Text
} from '@chakra-ui/react';
import { Radio, RadioGroup, Stack, Checkbox } from '@chakra-ui/react';

function SurveyFormItem({ formJsonObj, setResults, isReadOnly, preValues }) {
    const [value, setValue] = useState('');
    const isRequired = !('required' in formJsonObj) ? false : formJsonObj['required'];
    const formInputType = !('type' in formJsonObj) && !(formJsonObj['type'] in ['text', 'radiogroup', 'checkbox']) ? 'text' : formJsonObj['type']

    useEffect(() => {
        console.log(formJsonObj);

        if(formInputType === 'checkbox' && !value)
            return;
        if (typeof value === 'object' && value !== null)
            setResults(value);
        else {
            let result = {};
            result[formJsonObj.name] = value;
            setResults(result);
        }
    }, [value, formJsonObj.name])

    return (
        <FormControl isRequired={isRequired}>
            <FormLabel mt={2}> {formJsonObj.title} </FormLabel>
            {
                formInputType === 'checkbox' ?
                (
                    <CheckboxGroup> 
                        <Stack>
                            {formJsonObj.options && formJsonObj.options.map(function(option, i) {
                                let defaultIsChecked = preValues[option.name] === '1';
                                return (
                                    <Checkbox 
                                        key={i} 
                                        isReadOnly={isReadOnly}
                                        defaultIsChecked={defaultIsChecked}
                                        onChange={(e) => {
                                            var checkboxValue = value;
                                            if(checkboxValue === ''){
                                                checkboxValue = {}
                                                for(let i = 0; i < formJsonObj.options.length; i++) {
                                                    checkboxValue[formJsonObj.options[i].name] = '0';
                                                }
                                            }
                                            if(checkboxValue[option.name] === '0')
                                                checkboxValue[option.name] = '1'
                                            else
                                                checkboxValue[option.name] = '0'
                                            setValue({...checkboxValue});
                                        }
                                    }>
                                        <Text align='left'>
                                            {option.text}
                                        </Text>
                                    </Checkbox>
                                )
                            })}
                        </Stack>
                    </CheckboxGroup>
                ) :
                formInputType === 'radiogroup' ? 
                (
                    <RadioGroup onChange={setValue} defaultValue={preValues[formJsonObj.name]}> 
                        <Stack>
                            {formJsonObj.options && formJsonObj.options.map(function(option, i) {
                                let val = isNaN(option.value) ? option.value : option.value.toString();
                                return (
                                    <Radio key={i} value={val} isReadOnly={isReadOnly}> 
                                        <Text align='left'>
                                            {option.text}
                                        </Text>
                                    </Radio>
                                )
                            })}
                        </Stack>
                    </RadioGroup>
                ) :
                (
                    'inputType' in formJsonObj && formJsonObj.inputType === 'int' ?
                    (
                        'minValue' in formJsonObj && 'maxValue' in formJsonObj ? 
                        (
                            <NumberInput 
                                keepWithinRange={true}
                                min={formJsonObj.minValue} max={formJsonObj.maxValue}
                                onChange={(valueString) => setValue(valueString)}
                                isReadOnly={isReadOnly} defaultValue={preValues[formJsonObj.name]}
                            > 
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>

                        ) : (
                            <NumberInput 
                                onChange={(valueString) => setValue(valueString)}
                                isReadOnly={isReadOnly} defaultValue={preValues[formJsonObj.name]}
                            >
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        )
                    ) :
                    (
                        <Input isReadOnly={isReadOnly} defaultValue={preValues[formJsonObj.name]} onChange={e => {setValue(e.target.value)}} />
                    ) 
                )
            }
        </FormControl>
    )
}

export default SurveyFormItem;