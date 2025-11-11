"use client";

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CountrySelect } from './CountrySelect';
import { HolidayCard } from './HolidayCard';

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

const NAGER_API_URL = 'https://date.nager.at/api/v3';

const fetchCountries = async (): Promise<Country[]> => {
    const response = await fetch(`${NAGER_API_URL}/AvailableCountries`);
    if (!response.ok) {
        throw new Error('Falha ao buscar países da API Nager.');
    }
    return response.json(); 
};

const fetchHolidays = async (countryCode: string): Promise<Holiday[]> => {
    if (!countryCode) return [];
    const currentYear = new Date().getFullYear();
    const response = await fetch(`${NAGER_API_URL}/PublicHolidays/${currentYear}/${countryCode}`);
    if (!response.ok) throw new Error(`Erro ao buscar feriados para ${countryCode}.`);
    return response.json();
};

export function HolidayApp() {
    const [selectedCountry, setSelectedCountry] = useState('BR'); 

    const { data: countries, isLoading: isLoadingCountries, isError: isErrorCountries } = useQuery({
        queryKey: ['countries'],
        queryFn: fetchCountries,
    });

    const { data: holidays, isLoading: isLoadingHolidays, isError: isErrorHolidays, error: holidayError } = useQuery<Holiday[]>({
        queryKey: ['holidays', selectedCountry],
        queryFn: () => fetchHolidays(selectedCountry),
        enabled: !!selectedCountry,
    });

    const selectedCountryName = countries?.find(c => c.countryCode === selectedCountry)?.name || selectedCountry;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-5xl font-bold text-[var(--text-primary)] tracking-tight">
                    Feriados Nacionais
                </h1>
                <p className="text-lg text-[var(--text-secondary)]">
                    Explore os feriados de diferentes países ao redor do mundo
                </p>
            </div>

            {/* Country Select */}
            <CountrySelect
                countries={countries || []}
                selectedCountry={selectedCountry}
                onCountryChange={setSelectedCountry}
                isLoading={isLoadingCountries}
                isError={isErrorCountries}
            />

            {/* Holidays List */}
            <div className="glass-card rounded-2xl p-8">
                <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-6">
                    Feriados de {selectedCountryName}
                </h2>
                
                {isLoadingHolidays && (
                    <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="glass-card rounded-2xl p-6 animate-pulse">
                                <div className="h-6 bg-[var(--glass-border)] rounded w-1/3 mb-3"></div>
                                <div className="h-4 bg-[var(--glass-border)] rounded w-1/4"></div>
                            </div>
                        ))}
                    </div>
                )}

                {isErrorHolidays && (
                    <div className="glass-card rounded-2xl p-6 border-red-500/30">
                        <p className="text-red-500 m-0">
                            {(holidayError as Error)?.message || 'Erro ao carregar feriados. Tente novamente mais tarde.'}
                        </p>
                    </div>
                )}
                
                {holidays && holidays.length > 0 && (
                    <ul className="space-y-4 list-none p-0 m-0">
                        {holidays.map(holiday => (
                            <HolidayCard key={holiday.date + holiday.name} holiday={holiday} />
                        ))}
                    </ul>
                )}

                {holidays && holidays.length === 0 && !isLoadingHolidays && (
                    <div className="text-center py-12">
                        <p className="text-[var(--text-secondary)] text-lg">
                            Nenhum feriado encontrado para este país.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}