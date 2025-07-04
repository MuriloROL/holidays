// holidayApp.tsx

"use client";

import React, { useState } from 'react';
// As importações de Query/React-Query devem estar no componente que as USA.
import { useQuery } from '@tanstack/react-query';

type Country = {
  countryCode: string;
  name: string;
};

type Holiday = {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
};

// A API e as funções de busca continuam aqui, pois pertencem a este componente.
const NAGER_API_URL = 'https://date.nager.at/api/v3';

// Encontre sua função fetchCountries e atualize a primeira linha dela
const fetchCountries = async (): Promise<Country[]> => {
    console.log("Buscando lista de países da API Nager...");
    const response = await fetch(`${NAGER_API_URL}/AvailableCountries`);
    if (!response.ok) {
        throw new Error('Failed to fetch countries from Nager API.');
    }
    // Agora o TypeScript sabe que o resultado de response.json() 
    // será um array de objetos Country.
    return response.json(); 
};

const fetchHolidays = async (countryCode: string) => {
    if (!countryCode) return [];
    const currentYear = new Date().getFullYear();
    const response = await fetch(`${NAGER_API_URL}/PublicHolidays/${currentYear}/${countryCode}`);
    if (!response.ok) throw new Error(`Error fetching holidays for ${countryCode}.`);
    return response.json();
};

// --- MUDANÇA PRINCIPAL: Adicionamos "export" aqui! ---
export function HolidayApp() {
    const [selectedCountry, setSelectedCountry] = useState('NL'); 

    const { data: countries, isLoading: isLoadingCountries, isError: isErrorCountries } = useQuery({
        queryKey: ['countries'],
        queryFn: fetchCountries,
    });

    const { data: holidays, isLoading: isLoadingHolidays, isError: isErrorHolidays, error: holidayError } = useQuery<Holiday[]>({
        queryKey: ['holidays', selectedCountry],
        queryFn: () => fetchHolidays(selectedCountry),
        enabled: !!selectedCountry,
    });

    const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCountry(event.target.value);
    };

    const selectedCountryName = countries?.find(c => c.countryCode === selectedCountry)?.name || selectedCountry;

    // O JSX do seu componente continua exatamente o mesmo...
    return (
        <div className="paper container">
            <h1 className="text-center">National Holidays</h1>
            
            <div className="form-group">
                <label htmlFor="country-select">Select a Country:</label>
                {isLoadingCountries ? (
                    <p>Loading countries...</p>
                ) : isErrorCountries ? (
                    <p className="alert alert-danger">Failed to load countries.</p>
                ) : (
                    <select 
                        id="country-select"
                        value={selectedCountry} 
                        onChange={handleCountryChange}
                        className="form-control"
                    >
                        {countries?.map(country => (
                            <option key={country.countryCode} value={country.countryCode}>
                                {country.name}
                            </option>
                        ))}
                    </select>
                )}
            </div>

            <hr />

            <div>
                <h2>Holidays for {selectedCountryName}</h2>
                {isLoadingHolidays && <p>Loading holidays...</p>}
                {isErrorHolidays && <p className="alert alert-danger">{(holidayError as Error).message}</p>}
                
                {holidays && holidays.length > 0 && (
                    <ul className="list-unstyled">
                        {holidays.map(holiday => (
                            <li key={holiday.date + holiday.name} className="card" style={{marginBottom: '1rem'}}>
                                <div className="card-body">
                                    <h4 className="card-title">{holiday.localName}</h4>
                                    <p className="card-text">{new Date(holiday.date).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    <p className="card-text"><small>National Name: {holiday.name}</small></p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}

                {holidays && holidays.length === 0 && !isLoadingHolidays && (
                    <p className="alert alert-secondary">No holidays found for this country.</p>
                )}
            </div>
        </div>
    );
}