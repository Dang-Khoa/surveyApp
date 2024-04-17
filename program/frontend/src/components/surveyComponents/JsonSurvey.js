var q3Json = {
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
            {
                type: 'text',
                name: 'furth_allerg_siblings_1',
                visible: false,
                visibleIf: '$furth_allerg_siblings === 1',   
                title: 'Weitere Allergie Geschwister 1',
            },
            {
                type: 'text',
                name: 'furth_allerg_siblings_2',
                visible: false,
                visibleIf: '$furth_allerg_siblings === 1',   
                title: 'Weitere Allergie Geschwister 2',
            },
            {
                type: 'text',
                name: 'furth_allerg_siblings_3',
                visible: false,
                visibleIf: '$furth_allerg_siblings === 1',   
                title: 'Weitere Allergie Geschwister 3',
            },
            {
                type: 'checkbox',
                name: 'furth_allerg_siblings_type',
                visible: false,
                visibleIf: '$furth_allerg_siblings === 1',
                title: 'Weitere Allergien Typ',
                options: [
                    { name: 'furth_allerg_sibling___1', text: 'Pollenallergie' },
                    { name: 'furth_allerg_sibling___2', text: 'Hausstauballergie' },
                    { name: 'furth_allerg_sibling___3', text: 'Medikamentenallergie' },
                    { name: 'furth_allerg_sibling___4', text: 'Tierhaarallergie' },
                    { name: 'furth_allerg_sibling___5', text: 'Kontaktallergie' },
                    { name: 'furth_allerg_sibling___6', text: 'Nahrungsmittelallergie' }
                ]
            },
            {
                type: 'radiogroup',
                name: 'furth_dis_siblings',
                visible: false,
                visibleIf: '$furth_allerg_dis_siblings === 1',   
                title: 'Weitere Erkrankungen',
                options: [
                    { value: 1, text: 'Ja' },
                    { value: 0, text: 'Nein' }
                ] 
            },
            {
                type: 'text',
                name: 'furth_dis_siblings_1',
                visible: false,
                visibleIf: '$furth_allerg_siblings === 1',   
                title: 'Weitere Erkrankung Geschwister 1',
            },
            {
                type: 'text',
                name: 'furth_dis_siblings_2',
                visible: false,
                visibleIf: '$furth_dis_siblings === 1',   
                title: 'Weitere Erkrankung Geschwister 2',
            },
            {
                type: 'checkbox',
                name: 'furth_dis_siblings_cause',
                visible: false,
                visibleIf: '$furth_dis_siblings === 1',
                title: 'Ätiologien der weiteren Erkrankungen der Geschwister',
                options: [
                    { name: 'furth_dis_siblings_cause___1', text: 'Infektionskrankheit' },
                    { name: 'furth_dis_siblings_cause___2', text: 'Erbkrankheit' },
                    { name: 'furth_dis_siblings_cause___3', text: 'Unfälle und Verletzungen' },
                    { name: 'furth_dis_siblings_cause___4', text: 'Autoimmunkrankheit' },
                    { name: 'furth_dis_siblings_cause___5', text: 'Tumore und Neoplasien' },
                    { name: 'furth_dis_siblings_cause___6', text: 'Psychische Erkrankungen' },
                    { name: 'furth_dis_siblings_cause___7', text: 'Zivilisationskrankheit' }
                ]
            },
            {
                type: 'checkbox',
                name: 'furth_dis_siblings_organ',
                visible: false,
                visibleIf: '$furth_dis_siblings === 1',
                title: 'Organ(system) der Erkrankungen der Geschwister',
                options: [
                    { name: 'furth_dis_siblings_organ___1', text: 'Haut' },
                    { name: 'furth_dis_siblings_organ___2', text: 'Atemwege und Lunge' },
                    { name: 'furth_dis_siblings_organ___3', text: 'Gastrointestinaltrakt' },
                    { name: 'furth_dis_siblings_organ___4', text: 'ZNS' },
                    { name: 'furth_dis_siblings_organ___5', text: 'Leber' },
                    { name: 'furth_dis_siblings_organ___6', text: 'Lymphatische Organe' },
                    { name: 'furth_dis_siblings_organ___7', text: 'Herz/Kreislauf' }
                ]
            },
            {
                type: 'radiogroup',
                name: 'job_postpreg',
                title: 'Mutter arbeitet wieder',
                options: [
                    { value: 1, text: 'Ja' },
                    { value: 0, text: 'Nein' }
                ]
            },
            {
                type: 'radiogroup',
                name: 'full_parttime_job_postpreg',
                visible: false,
                visibleIf: '$job_postpreg === 1',
                title: 'Art der Erwerbstätigkeit',
                options: [
                    { value: 1, text: 'Vollzeit' },
                    { value: 2, text: 'Teilzeit' },
                    { value: 3, text: 'Betriebliche Ausbildung/Lehre' },
                    { value: 4, text: 'Geringfügig erwerbstätig, Minijob, ...' }
                ]
            },
            {
                type: 'radiogroup',
                name: 'furth_allerg_dis_father',
                title: 'Weitere Allergie oder Erkrankungen beim Vater festgestellt',
                options: [
                    { value: 1, text: 'Ja' },
                    { value: 0, text: 'Nein' }
                ]
            },
            {
                type: 'radiogroup',
                name: 'furth_allerg_father',
                visible: false,
                visibleIf: '$furth_allerg_dis_father === 1',   
                title: 'Weitere Allergien des Vaters',
                options: [
                    { value: 1, text: 'Ja' },
                    { value: 0, text: 'Nein' }
                ] 
            },
            {
                type: 'text',
                name: 'furth_allerg_father_1',
                visible: false,
                visibleIf: '$furth_allerg_father === 1',   
                title: 'Weitere Allergie 1',
            },
            {
                type: 'text',
                name: 'furth_allerg_father_2',
                visible: false,
                visibleIf: '$furth_allerg_father === 1',   
                title: 'Weitere Allergie 2',
            },
            {
                type: 'text',
                name: 'furth_allerg_father_3',
                visible: false,
                visibleIf: '$furth_allerg_father === 1',   
                title: 'Weitere Allergie 3',
            },
            {
                type: 'checkbox',
                name: 'furth_allerg_father_type',
                visible: false,
                visibleIf: '$furth_allerg_father === 1',
                title: 'Weitere Allergien Typ',
                options: [
                    { name: 'furth_allerg_father___1', text: 'Pollenallergie' },
                    { name: 'furth_allerg_father___2', text: 'Hausstauballergie' },
                    { name: 'furth_allerg_father___3', text: 'Medikamentenallergie' },
                    { name: 'furth_allerg_father___4', text: 'Tierhaarallergie' },
                    { name: 'furth_allerg_father___5', text: 'Kontaktallergie' },
                    { name: 'furth_allerg_father___6', text: 'Nahrungsmittelallergie' }
                ]
            },
            {
                type: 'radiogroup',
                name: 'furth_dis_father',
                visible: false,
                visibleIf: '$furth_allerg_dis_father === 1',   
                title: 'Weitere Erkrankungen des Vaters',
                options: [
                    { value: 1, text: 'Ja' },
                    { value: 0, text: 'Nein' }
                ] 
            },
            {
                type: 'text',
                name: 'furth_dis_father_1',
                visible: false,
                visibleIf: '$furth_allerg_father === 1',   
                title: 'Weitere Erkrankung 1',
            },
            {
                type: 'text',
                name: 'furth_dis_father_2',
                visible: false,
                visibleIf: '$furth_dis_father === 1',   
                title: 'Weitere Erkrankung 2',
            },
            {
                type: 'checkbox',
                name: 'furth_dis_father_cause',
                visible: false,
                visibleIf: '$furth_dis_father === 1',
                title: 'Ätiologien der weiteren Erkrankungen des Vaters',
                options: [
                    { name: 'furth_dis_father_cause___1', text: 'Infektionskrankheit' },
                    { name: 'furth_dis_father_cause___2', text: 'Erbkrankheit' },
                    { name: 'furth_dis_father_cause___3', text: 'Unfälle und Verletzungen' },
                    { name: 'furth_dis_father_cause___4', text: 'Autoimmunkrankheit' },
                    { name: 'furth_dis_father_cause___5', text: 'Tumore und Neoplasien' },
                    { name: 'furth_dis_father_cause___6', text: 'Psychische Erkrankungen' },
                    { name: 'furth_dis_father_cause___7', text: 'Zivilisationskrankheit' }
                ]
            },
            {
                type: 'checkbox',
                name: 'furth_dis_father_organ',
                visible: false,
                visibleIf: '$furth_dis_father === 1',
                title: 'Organ(system) der Erkrankungen des Vaters',
                options: [
                    { name: 'furth_dis_father_organ___1', text: 'Haut' },
                    { name: 'furth_dis_father_organ___2', text: 'Atemwege und Lunge' },
                    { name: 'furth_dis_father_organ___3', text: 'Gastrointestinaltrakt' },
                    { name: 'furth_dis_father_organ___4', text: 'ZNS' },
                    { name: 'furth_dis_father_organ___5', text: 'Leber' },
                    { name: 'furth_dis_father_organ___6', text: 'Lymphatische Organe' },
                    { name: 'furth_dis_father_organ___7', text: 'Herz/Kreislauf' }
                ]
            },
            {
                type: 'radiogroup',
                name: 'furth_allerg_dis_mother',
                title: 'Weitere Allergie oder Erkrankungen bei der Mutter festgestellt',
                options: [
                    { value: 1, text: 'Ja' },
                    { value: 0, text: 'Nein' }
                ]
            },
            {
                type: 'radiogroup',
                name: 'furth_allerg_mother',
                visible: false,
                visibleIf: '$furth_allerg_dis_mother === 1',   
                title: 'Weitere Allergien der Mutter',
                options: [
                    { value: 1, text: 'Ja' },
                    { value: 0, text: 'Nein' }
                ] 
            },
            {
                type: 'text',
                name: 'furth_allerg_mother_1',
                visible: false,
                visibleIf: '$furth_allerg_mother === 1',   
                title: 'Weitere Allergie 1',
            },
            {
                type: 'text',
                name: 'furth_allerg_mother_2',
                visible: false,
                visibleIf: '$furth_allerg_mother === 1',   
                title: 'Weitere Allergie 2',
            },
            {
                type: 'text',
                name: 'furth_allerg_mother_3',
                visible: false,
                visibleIf: '$furth_allerg_mother === 1',   
                title: 'Weitere Allergie 3',
            },
            {
                type: 'checkbox',
                name: 'furth_allerg_mother_type',
                visible: false,
                visibleIf: '$furth_allerg_mother === 1',
                title: 'Weitere Allergien Typ',
                options: [
                    { name: 'furth_allerg_mother_type___1', text: 'Pollenallergie' },
                    { name: 'furth_allerg_mother_type___2', text: 'Hausstauballergie' },
                    { name: 'furth_allerg_mother_type___3', text: 'Medikamentenallergie' },
                    { name: 'furth_allerg_mother_type___4', text: 'Tierhaarallergie' },
                    { name: 'furth_allerg_mother_type___5', text: 'Kontaktallergie' },
                    { name: 'furth_allerg_mother_type___6', text: 'Nahrungsmittelallergie' }
                ]
            },
            {
                type: 'radiogroup',
                name: 'furth_dis_mother',
                visible: false,
                visibleIf: '$furth_allerg_dis_mother === 1',   
                title: 'Weitere Erkrankungen der Mutter',
                options: [
                    { value: 1, text: 'Ja' },
                    { value: 0, text: 'Nein' }
                ] 
            },
            {
                type: 'text',
                name: 'furth_dis_mother_1',
                visible: false,
                visibleIf: '$furth_allerg_mother === 1',   
                title: 'Weitere Erkrankung 1',
            },
            {
                type: 'text',
                name: 'furth_dis_mother_2',
                visible: false,
                visibleIf: '$furth_dis_mother === 1',   
                title: 'Weitere Erkrankung 2',
            },
            {
                type: 'checkbox',
                name: 'furth_dis_mother_cause',
                visible: false,
                visibleIf: '$furth_dis_mother === 1',
                title: 'Ätiologien der weiteren Erkrankungen der Mutter',
                options: [
                    { name: 'furth_dis_mother_cause___1', text: 'Infektionskrankheit' },
                    { name: 'furth_dis_mother_cause___2', text: 'Erbkrankheit' },
                    { name: 'furth_dis_mother_cause___3', text: 'Unfälle und Verletzungen' },
                    { name: 'furth_dis_mother_cause___4', text: 'Autoimmunkrankheit' },
                    { name: 'furth_dis_mother_cause___5', text: 'Tumore und Neoplasien' },
                    { name: 'furth_dis_mother_cause___6', text: 'Psychische Erkrankungen' },
                    { name: 'furth_dis_mother_cause___7', text: 'Zivilisationskrankheit' }
                ]
            },
            {
                type: 'checkbox',
                name: 'furth_dis_mother_organ',
                visible: false,
                visibleIf: '$furth_dis_mother === 1',
                title: 'Organ(system) der Erkrankungen der Mutter',
                options: [
                    { name: 'furth_dis_mother_organ___1', text: 'Haut' },
                    { name: 'furth_dis_mother_organ___2', text: 'Atemwege und Lunge' },
                    { name: 'furth_dis_mother_organ___3', text: 'Gastrointestinaltrakt' },
                    { name: 'furth_dis_mother_organ___4', text: 'ZNS' },
                    { name: 'furth_dis_mother_organ___5', text: 'Leber' },
                    { name: 'furth_dis_mother_organ___6', text: 'Lymphatische Organe' },
                    { name: 'furth_dis_mother_organ___7', text: 'Herz/Kreislauf' }
                ]
            },
            {
                type: 'radiogroup',
                name: 'change_flat',
                title: 'Änderung Wohnsituation',
                options: [
                    { value: 1, text: 'Ja' },
                    { value: 0, text: 'Nein' }
                ] 
            },
            {
                type: 'text',
                name: 'new_room_number',
                visible: false,
                visibleIf: '$change_flat === 1',
                title: 'Anzahl der Zimmer',
            },
            {
                type: 'text',
                name: 'new_room_sm',
                visible: false,
                visibleIf: '$change_flat === 1',
                title: 'Größe der Wohnung (in qm)',
            },
            {
                type: 'text',
                name: 'new_persons_flat',
                visible: false,
                visibleIf: '$change_flat === 1',
                title: 'Personen',
            },
            {
                type: 'radiogroup',
                name: 'smoking_flat_postpreg',
                title: 'Rauchen in der Wohnung',
                options: [
                    { value: 1, text: 'Ja' },
                    { value: 0, text: 'Nein' }
                ] 
            },
            {
                type: 'text',
                name: 'smoking_items_number',
                visible: false,
                visibleIf: '$smoking_flat_postpreg === 1',
                title: 'Zigaretten/Zigarren/Pfeifen pro Tag',
            },
            {
                type: 'radiogroup',
                name: 'new_animals',
                title: 'Neue Haus- oder Nutztiere',
                options: [
                    { value: 1, text: 'Ja' },
                    { value: 0, text: 'Nein' }
                ] 
            },
            {
                type: 'radiogroup',
                name: 'new_animals_flat',
                title: 'Neue Kleintiere in der Wohnung',
                visible: false,
                visibleIf: '$new_animals === 1',
                options: [
                    { value: 1, text: 'Ja' },
                    { value: 0, text: 'Nein' }
                ] 
            },
            {
                type: 'text',
                name: 'new_animal_flat_1',
                visible: false,
                visibleIf: '$new_animals_flat === 1',
                title: 'Neues Kleintier in Wohnung 1',
            },
            {
                type: 'text',
                name: 'new_animal_flat_2',
                visible: false,
                visibleIf: '$new_animals_flat === 1',
                title: 'Neues Kleintier in Wohnung 2',
            },
            {
                type: 'checkbox',
                name: 'new_animal_flat_type',
                visible: false,
                visibleIf: '$new_animals_flat === 1',
                title: 'Art der neuen Kleintiere',
                options: [
                    { name: 'new_animals_flat___1', text: 'Katze/Hund' },
                    { name: 'new_animals_flat___2', text: 'Nager' },
                    { name: 'new_animals_flat___3', text: 'Vögel' },
                    { name: 'new_animals_flat___4', text: 'Reptilien' }
                ]
            },
            {
                type: 'radiogroup',
                name: 'new_livestock',
                title: 'Neue Nutztiere',
                visible: false, 
                visibleIf: '$new_animals === 1',
                options: [
                    { value: 1, text: 'Ja' },
                    { value: 0, text: 'Nein' }
                ] 
            },
            {
                type: 'text',
                name: 'new_lifestock_1',
                visible: false,
                visibleIf: '$new_livestock === 1',
                title: 'Neues Nutztier 1'
            },
            {
                type: 'text',
                name: 'new_lifestock_2',
                visible: false,
                visibleIf: '$new_livestock === 2',
                title: 'Neues Nutztier 2'
            },
            {
                type: 'checkbox',
                name: 'new_livestock_type',
                visible: false,
                visibleIf: '$new_livestock === 1',
                title: 'Art der neuen Nutztiere',
                options: [
                    { name: 'new_livestock_type___1', text: 'Unpaarhufer (Pferd/Esel)' },
                    { name: 'new_livestock_type___2', text: 'Paarhufer Weidetiere (Kuh/Schaf/Ziege/Kamel)' },
                    { name: 'new_livestock_type___3', text: 'Paarhufer sonstige (Schwein)' }
                ]
            },
            {
                type: 'radiogroup',
                name: 'new_cleaning_agent',
                title: 'Änderung Putzverhalten',
                options: [
                    { value: 1, text: 'Ja' },
                    { value: 0, text: 'Nein' }
                ] 
            },
            {
                type: 'radiogroup',
                name: 'new_cleaning_agent_type',
                visible: false,
                visibleIf: '$new_cleaning_agent === 1',
                title: 'Art des neuen Reinigungsmittels',
                options: [
                    { value: 1, text: 'Nicht desinfizierende Reinigungsmittel' },
                    { value: 2, text: 'Überwiegend nicht desinfizierende Reinigungsmittel' },
                    { value: 3, text: 'Desinfizierende Reinigungsmittel' }
                ]
            },
        ]
        },
        {
        name: 'page2',
        title: 'Fragen zum Befinden mit dem Kind',
        elements: [
            {
                type: 'radiogroup',
                name: 'feel_tense_hyped_postpreg',
                title: 'Angespannt oder überdreht',
                options: [
                    { value: 1, text: 'Überhaupt nicht' },
                    { value: 2, text: 'Selten' },
                    { value: 3, text: 'Manchmal' },
                    { value: 4, text: 'Meistens' }
                ]
            },
            {
                type: 'radiogroup',
                name: 'fear_bad_event_postpreg',
                title: 'Gefühl, etwas schlimmes könnte passieren',
                options: [
                    { value: 1, text: 'Überhaupt nicht' },
                    { value: 2, text: 'Selten' },
                    { value: 3, text: 'Manchmal' },
                    { value: 4, text: 'Meistens' }
                ]
            },
            {
                type: 'radiogroup',
                name: 'troubl_thoughts_postpreg',
                title: 'Beunruhigende Gedanken',
                options: [
                    { value: 1, text: 'Überhaupt nicht' },
                    { value: 2, text: 'Selten' },
                    { value: 3, text: 'Manchmal' },
                    { value: 4, text: 'Meistens' }
                ]
            },
            {
                type: 'radiogroup',
                name: 'sit_comf_relax_postpreg',
                title: 'Kann bequem sitzen und sich entspannt fühlen',
                options: [
                    { value: 1, text: 'Überhaupt nicht' },
                    { value: 2, text: 'Selten' },
                    { value: 3, text: 'Manchmal' },
                    { value: 4, text: 'Meistens' }
                ]
            },
            {
                type: 'radiogroup',
                name: 'fright_flitt_feel_postpreg',
                title: 'Ängstliches und flatterndes Gefühl im Bauch',
                options: [
                    { value: 1, text: 'Überhaupt nicht' },
                    { value: 2, text: 'Selten' },
                    { value: 3, text: 'Manchmal' },
                    { value: 4, text: 'Meistens' }
                ]
            },
            {
                type: 'radiogroup',
                name: 'feeling_restl_postpreg',
                title: 'Ruhelos und viel auf Achse',
                options: [
                    { value: 1, text: 'Überhaupt nicht' },
                    { value: 2, text: 'Selten' },
                    { value: 3, text: 'Manchmal' },
                    { value: 4, text: 'Meistens' }
                ]
            },
            {
                type: 'radiogroup',
                name: 'feeling_panic_postpreg',
                title: 'Plötzliches Gefühle von Panik',
                options: [
                    { value: 1, text: 'Überhaupt nicht' },
                    { value: 2, text: 'Selten' },
                    { value: 3, text: 'Manchmal' },
                    { value: 4, text: 'Meistens' }
                ]
            },
            {
                type: 'radiogroup',
                name: 'enjoying_life_postpreg',
                title: 'Genießt nach wie vor die gewohnten Dinge',
                options: [
                    { value: 1, text: 'Überhaupt nicht' },
                    { value: 2, text: 'Selten' },
                    { value: 3, text: 'Manchmal' },
                    { value: 4, text: 'Meistens' }
                ]
            },
            {
                type: 'radiogroup',
                name: 'laugh_fun_postpreg',
                title: 'Kann lachen und die lustige Seite der Dinge sehen',
                options: [
                    { value: 1, text: 'Überhaupt nicht' },
                    { value: 2, text: 'Selten' },
                    { value: 3, text: 'Manchmal' },
                    { value: 4, text: 'Meistens' }
                ]
            },
            {
                type: 'radiogroup',
                name: 'feeling_happy_postpreg',
                title: 'Fühlt sich glücklich',
                options: [
                    { value: 1, text: 'Überhaupt nicht' },
                    { value: 2, text: 'Selten' },
                    { value: 3, text: 'Manchmal' },
                    { value: 4, text: 'Meistens' }
                ]
            },
            {
                type: 'radiogroup',
                name: 'feeling_braked_postpreg',
                title: 'Fühlt sich wie abgebremst',
                options: [
                    { value: 1, text: 'Überhaupt nicht' },
                    { value: 2, text: 'Selten' },
                    { value: 3, text: 'Manchmal' },
                    { value: 4, text: 'Meistens' }
                ]
            },
            {
                type: 'radiogroup',
                name: 'carefree_look_postpreg',
                title: 'Unbekümmert von Aussehen',
                options: [
                    { value: 1, text: 'Überhaupt nicht' },
                    { value: 2, text: 'Selten' },
                    { value: 3, text: 'Manchmal' },
                    { value: 4, text: 'Meistens' }
                ]
            },
            {
                type: 'radiogroup',
                name: 'looking_fwd_joy_postpreg',
                title: 'Blickt mit Freude nach vorn',
                options: [
                    { value: 1, text: 'Überhaupt nicht' },
                    { value: 2, text: 'Selten' },
                    { value: 3, text: 'Manchmal' },
                    { value: 4, text: 'Meistens' }
                ]
            },
            {
                type: 'radiogroup',
                name: 'enj_book_radio_tv_postpreg',
                title: 'Kann ein gutes Buch, Radio oder Fernseh-Programm genießen',
                options: [
                    { value: 1, text: 'Überhaupt nicht' },
                    { value: 2, text: 'Selten' },
                    { value: 3, text: 'Manchmal' },
                    { value: 4, text: 'Meistens' }
                ]
            },
        ]
        },
        {
        name: 'page3',
        title: 'Fragen zum Kind',
        elements: [
            {
                type: 'text',
                name: 'child_size',
                inputType: 'int',
                minValue: '40',
                maxValue: '150',
                title: 'Größe des Kindes (cm)'
            },
            {
                type: 'text',
                name: 'child_weight',
                inputType: 'int',
                minValue: '2',
                maxValue: '30',
                title: 'Gewicht des Kindes (kg)'
            },
            {
                type: 'text',
                name: 'taillenumfang',
                inputType: 'int',
                minValue: '10',
                maxValue: '80',
                title: 'Taillenumfang (cm)'
            },
            {
                type: 'text',
                name: 'hip_umfang2',
                inputType: 'int',
                minValue: '10',
                maxValue: '80',
                title: 'Hüftumfang (cm)'
            },
            {
                type: 'text',
                name: 'hip_circumf',
                inputType: 'int',
                minValue: '30',
                maxValue: '0',
                title: 'Kopfumfang (cm)'
            },
            {
                type: 'radiogroup',
                name: 'breastfeeding',
                title: 'Kind jemals gestillt',
                options: [
                    { value: 1, text: 'Ja' },
                    { value: 0, text: 'Nein' }
                ]
            },
            {
                type: 'radiogroup',
                name: 'breastf_stop',
                visible: false,
                visibleIf: '$breastfeeding === 1',
                title: 'Stillen beendet',
                options: [
                    { value: 1, text: 'Ja' },
                    { value: 0, text: 'Nein' }
                ]
            },
            {
                type: 'text',
                name: 'breastfeeding_comment',
                title: 'Gestillt bis Kommentar'
            },
            {
                type: 'radiogroup',
                name: 'food',
                visible: false,
                visibleIf: '$breastf_stop} === 1 or {breastfeeding === 0',
                title: 'Ernährung',
                options: [
                    { value: 1, text: 'Muttermilchersatz' },
                    { value: 2, text: 'Beikost' },
                    { value: 3, text: 'Vollkost' }
                ]
            },
            {
                type: 'radiogroup',
                name: 'kindergarten',
                title: 'Kind geht in Kinderkrippe oder Kindergarten',
                options: [
                    { value: 1, text: 'Nein' },
                    { value: 2, text: 'Ja, halbtags' },
                    { value: 3, text: 'Ja, ganztags' }
                ]
            },
            {
                type: 'radiogroup',
                name: 'show_bath_freq_child',
                title: 'Häufigkeit duschen/baden',
                options: [
                    { value: 1, text: 'Täglich' },
                    { value: 2, text: 'Wöchentlich' },
                    { value: 3, text: 'Alle zwei Wochen' },
                    { value: 4, text: 'Seltener' }
                ]
            },
            {
                type: 'text',
                name: 'show_bath_product_1',
                title: 'Duschen/Baden mit Produkt 1'
            },
            {
                type: 'text',
                name: 'show_bath_product_2',
                title: 'Duschen/Baden mit Produkt 2'
            },
            {
                type: 'radiogroup',
                name: 'creme_freq',
                title: 'Häufigkeit Creme/Hautpflege',
                options: [
                    { value: 1, text: 'Nie' },
                    { value: 2, text: 'Täglich' },
                    { value: 3, text: 'Nur nach dem Baden' },
                    { value: 4, text: 'Gelegentlich' }
                ]
            },
            {
                type: 'text',
                name: 'creme_product',
                visible: false,
                visibleIf: '$creme_freq !== 1',
                title: 'Hautpflege Produkt 1',
            },
            {
                type: 'checkbox',
                name: 'stay_nature',
                title: 'Aufenthalt in der Natur',
                options: [
                    { name: 'stay_nature___1', text: 'Nein' },
                    { name: 'stay_nature___2', text: 'Ja, Garten/Spielplätze/Sandkästen' },
                    { name: 'stay_nature___3', text: 'Ja, Familienausflüge in die Natur' },
                    { name: 'stay_nature___4', text: 'Ja, Wiesen/Wald/Bauernhof' }
                ]
            },
            {
                type: 'radiogroup',
                name: 'stay_nature_freq',
                visible: false,
                visibleIf: '$stay_nature___2 === 1 or stay_nature___3 === 1',
                title: 'Häufigkeit Naturaufenthalt',
                options: [
                    { value: 1, text: 'Täglich' },
                    { value: 2, text: 'Mehrmals die Woche' },
                    { value: 3, text: 'Mehrmals im Monat' },
                    { value: 4, text: 'Selten' }
                ]
            },
            {
                type: 'checkbox',
                name: 'travel_child',
                title: 'Fernreisen mit dem Kind',
                options: [
                    { name: 'travel_child___1', text: 'Keine Fernreisen' },
                    { name: 'travel_child___2', text: 'Reisen ins europäische Ausland' },
                    { name: 'travel_child___3', text: 'Fernreisen in Industrieländer' },
                    { name: 'travel_child___4', text: 'Fernreisen in Entwicklungsländer' }
                ]
            }
        ]
        },
        {
        name: 'page3',
        title: 'Erkrankungen und Impfungen des Kindes',
        elements: [
            {
                type: 'checkbox',
                name: 'skin_diseases_child',
                title: 'Hauterkrankungen oder Symptome',
                options: [
                    { name: 'skin_diseases_child___1', text: 'Nein' },
                    { name: 'skin_diseases_child___2', text: 'Sonnenbrand' },
                    { name: 'skin_diseases_child___3', text: 'Schürfwunden' },
                    { name: 'skin_diseases_child___4', text: 'Neurodermitis' },
                    { name: 'skin_diseases_child___5', text: 'Sonstige' }
                ]
            },
            {
                type: 'text',
                name: 'other_skin_dis_child_1',
                visible: false,
                visibleIf: '$skin_disease_child___5 === 1',
                title: 'Sonstige Hautkrankheit 1',
            },
            {
                type: 'text',
                name: 'other_skin_dis_child_2',
                visible: false,
                visibleIf: '$skin_disease_child___5 === 1',
                title: 'Sonstige Hautkrankheit 2',
            },
            {
                type: 'radiogroup',
                name: 'vaccinations',
                title: 'Impfungen durchgeführt',
                options: [
                    { value: 1, text: 'Ja' },
                    { value: 0, text: 'Nein' }
                ]
            },
            {
                type: 'checkbox',
                name: 'vacc_target',
                title: 'Impfungen gegen',
                options: [
                    { name: 'vacc_target___1', text: 'Tetanus' },
                    { name: 'vacc_target___2', text: 'Diphterie' },
                    { name: 'vacc_target___3', text: 'Pertussis' },
                    { name: 'vacc_target___4', text: 'H. influenzae b' },
                    { name: 'vacc_target___5', text: 'Poliomyelitis' },
                    { name: 'vacc_target___6', text: 'Hepatitis B' },
                    { name: 'vacc_target___7', text: 'Peumokokken' },
                    { name: 'vacc_target___8', text: 'Rotaviren' },
                    { name: 'vacc_target___9', text: 'Meningokokken C' },
                    { name: 'vacc_target___10', text: 'Masern' },
                    { name: 'vacc_target___mumps', text: 'Röteln' },
                    { name: 'vacc_target___11', text: 'Varizellen' }
                ]
            },
            {
                type: 'text',
                name: 'sonstige_impfungen',
                title: 'Sonstige Impfungen'
            },
            {
                type: 'text',
                name: 'vacc_date',
                visible: false,
                visibleIf: '$vaccinations === 1',
                title: 'Sonstige Impfungen',
                inputType: 'date',
            },
            {
                type: 'text',
                name: 'vacc_complication_1',
                title: 'Impfkomplikationen 1'
            },
            {
                type: 'text',
                name: 'vacc_complication_2',
                title: 'Impfkomplikationen 2'
            },
            {
                type: 'checkbox',
                name: 'diseases_child',
                title: 'Erkrankungen des Kindes',
                options: [
                    { name: 'diseases_child___1', text: 'Nein' },
                    { name: 'diseases_child___2', text: 'Bauchschmerzen/Blähungen' },
                    { name: 'diseases_child___3', text: 'Grippe' },
                    { name: 'diseases_child___4', text: 'Schnupfen' },
                    { name: 'diseases_child___5', text: 'Atemwegsinfekte' },
                    { name: 'diseases_child___6', text: '"Wheezing"' },
                    { name: 'diseases_child___7', text: 'Sonstige' }
                ]
            },
            {
                type: 'text',
                name: 'other_dis_child_1',
                visible: false,
                visibleIf: '$diseases_child___7 === 1',
                title: 'Sonstige Erkrankungen 1'
            },
            {
                type: 'text',
                name: 'other_dis_child_2',
                visible: false,
                visibleIf: '$diseases_child___7 === 2',
                title: 'Sonstige Erkrankungen 2'
            },
            {
                type: 'checkbox',
                name: 'medication_child',
                title: 'Medikamenteneinahme durch das Kind',
                options: [
                    { name: 'medication_child___1', text: 'Nein' },
                    { name: 'medication_child___2', text: 'Schmerz- oder Beruhigungsmittel' },
                    { name: 'medication_child___3', text: 'Erkältungsmittel' },
                    { name: 'medication_child___4', text: 'Antibiotika' },
                    { name: 'medication_child___5', text: 'Sonstige' }
                ]
            },
            {
                type: 'text',
                name: 'other_medication_1',
                visible: false,
                visibleIf: '$diseases_child___5 === 1',
                title: 'Sonstiges Medikament 1'
            },
            {
                type: 'text',
                name: 'other_medication_2',
                visible: false,
                visibleIf: '$diseases_child___5 === 2',
                title: 'Sonstiges Medikament'
            },
            {
                type: 'radiogroup',
                name: 'medcare_contact',
                title: 'Arztkontakte, Alternativheilkunde',
                options: [
                    { value: 1, text: 'Ja' },
                    { value: 0, text: 'Nein' }
                ]
            },
            {
                type: 'text',
                name: 'medcare_cause_1',
                visible: false,
                visibleIf: '$medcare_contact === 1',
                title: 'Kontaktgrund 1'
            },
            {
                type: 'text',
                name: 'medcare_type_1',
                visible: false,
                visibleIf: '$medcare_contact === 1',
                title: 'Fachrichtung 1'
            },
            {
                type: 'text',
                name: 'medcare_cause_2',
                visible: false,
                visibleIf: '$medcare_contact === 1',
                title: 'Kontaktgrund 2'
            },
            {
                type: 'text',
                name: 'medcare_type_2',
                visible: false,
                visibleIf: '$medcare_contact === 1',
                title: 'Fachrichtung 2'
            },
            {
                type: 'text',
                name: 'medcare_cause_3',
                visible: false,
                visibleIf: '$medcare_contact === 1',
                title: 'Kontaktgrund 3'
            },
            {
                type: 'text',
                name: 'medcare_type_3',
                visible: false,
                visibleIf: '$medcare_contact === 1',
                title: 'Fachrichtung 3'
            }
        ]
        }
    ]
};

export default q3Json;