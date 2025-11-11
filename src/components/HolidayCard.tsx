"use client";

type Holiday = {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
};

interface HolidayCardProps {
  holiday: Holiday;
}

export function HolidayCard({ holiday }: HolidayCardProps) {
  const formattedDate = new Date(holiday.date).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <li className="glass-card rounded-2xl p-6 mb-4 list-none">
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-semibold text-[var(--text-primary)] m-0">
          {holiday.localName}
        </h3>
        <p className="text-sm text-[var(--text-secondary)] m-0 font-medium">
          {formattedDate}
        </p>
        {holiday.localName !== holiday.name && (
          <p className="text-xs text-[var(--text-secondary)] m-0 mt-1 opacity-75">
            {holiday.name}
          </p>
        )}
      </div>
    </li>
  );
}

