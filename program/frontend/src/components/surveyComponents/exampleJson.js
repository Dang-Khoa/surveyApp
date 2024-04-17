export var exampleJson = {
    title: 'Q3 (Development)',
    showProgressBar: 'top',
    pages: [
        {
        name: 'page1',
        title: 'Fragen zum Familienleben',
        elements: [
            {
                type: 'radiogroup',
                name: 'further_siblings',
                title: 'Mittlerweile mehrere Kinder',
                options: [
                    { value: 1, text: 'Ja' },
                    { value: 0, text: 'Nein' }
                ]
            },
            {
                type: 'text',
				inputType: 'int',
                name: 'further_brothers',
                visible: false,
                visibleIf: '$further_siblings === 1',
                title: 'Weiterer Brüder',
                minValue: 0,
                maxValue: 5
            },
            {
                type: 'text',
				inputType: 'int',
                name: 'further_sisters',
                visible: false,
                visibleIf: '$further_siblings === 1',
                title: 'Weitere Schwestern',
                minValue: 0,
				maxValue: 5
            },
            {
                type: 'text',
				inputType: 'int',
                name: 'further_sibling_age_1',
                visible: false,
                visibleIf: '$further_brothers + $further_sisters > 0',
                title: 'Alter weiteres Geschwister 1 (in Jahren)',
                minValue: 0,
				maxValue: 5
                
            },
            {
                type: 'text',
				inputType: 'int',
                name: 'further_sibling_age_2',
                visible: false,
                visibleIf: '$further_brothers + $further_sisters > 1',
                title: 'Alter weiteres Geschwister 2 (in Jahren)',
                minValue: 0,
				maxValue: 5
            },
            {
                type: 'radiogroup',
                name: 'furth_allerg_dis_siblings',
                title: 'Weitere Allergie oder Erkrankungen bei Geschwistern festgestellt',
                options: [
                    { value: 1, text: 'Ja' },
                    { value: 0, text: 'Nein' }
                ]
            },
            {
                type: 'radiogroup',
                name: 'furth_allerg_siblings',
                visible: false,
                visibleIf: '$furth_allerg_dis_siblings === 1',   
                title: 'Weitere Allergien',
                options: [
                    { value: 1, text: 'Ja' },
                    { value: 0, text: 'Nein' }
                ] 
            },
        ]
    }]
}