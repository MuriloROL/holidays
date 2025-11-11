"use client";

type Country = {
  countryCode: string;
  name: string;
};

interface CountrySelectProps {
  countries: Country[];
  selectedCountry: string;
  onCountryChange: (countryCode: string) => void;
  isLoading: boolean;
  isError: boolean;
}

export function CountrySelect({
  countries,
  selectedCountry,
  onCountryChange,
  isLoading,
  isError,
}: CountrySelectProps) {
  if (isLoading) {
    return (
      <div className="glass-card rounded-2xl p-6 animate-pulse">
        <div className="h-4 bg-[var(--glass-border)] rounded w-1/4 mb-4"></div>
        <div className="h-12 bg-[var(--glass-border)] rounded"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="glass-card rounded-2xl p-6 border-red-500/30">
        <p className="text-red-500 m-0">Erro ao carregar países. Tente novamente mais tarde.</p>
      </div>
    );
  }

  if (countries.length === 0) {
    return null;
  }

  return (
    <div className="glass-card rounded-2xl p-6">
      <label
        htmlFor="country-select"
        className="block text-sm font-medium text-[var(--text-primary)] mb-4"
      >
        Selecione um país:
      </label>
      <select
        id="country-select"
        value={selectedCountry}
        onChange={(e) => onCountryChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl bg-[var(--glass-bg)] backdrop-filter backdrop-blur-lg border border-[var(--glass-border)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all duration-200 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22currentColor%22 stroke-width=%222%22><polyline points=%226 9 12 15 18 9%22></polyline></svg>')] bg-no-repeat bg-right pr-10"
        style={{
          backgroundPosition: 'right 0.75rem center',
        }}
      >
        {countries.map((country) => (
          <option key={country.countryCode} value={country.countryCode}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
}

