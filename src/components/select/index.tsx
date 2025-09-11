'use client';

import { Asterisk } from 'lucide-react';
import { useState } from 'react';

interface SelectProps {
  id?: string;
  name?: string;
  label?: string;
  defaultValue?: string;
  labelClass?: string;
  SelectClass?: string;
  OptionClass?: string;
}

export default function Select({
  id,
  name,
  label,
  defaultValue,
  labelClass,
  SelectClass,
  OptionClass,
}: SelectProps) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);

  const [selectedYear, setSelectedYear] = useState<number | undefined>();

  return (
    <div className="flex justify-start items-center">
      {label && (
        <div className={`flex items-center gap-0.5 ${labelClass || ''}`}>
          <label htmlFor={id} className="whitespace-nowrap">
            {label}
          </label>
          <Asterisk className="text-red w-4 h-4" />
        </div>
      )}
      <select
        id={id}
        value={selectedYear ?? ''}
        onChange={(e) => setSelectedYear(Number(e.target.value))}
        className={`bg-gray-100 border border-border rounded-lg px-4.5 py-3 ${SelectClass || ''}`}
      >
        <option value="" disabled>
          {defaultValue}
        </option>
        {years.map((year) => (
          <option key={year} value={year} className={`${OptionClass || ''}`}>
            {year}년
          </option>
        ))}
      </select>
    </div>
  );
}
