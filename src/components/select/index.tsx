'use client';

import { Asterisk } from 'lucide-react';
import { useState } from 'react';

interface SelectProps {
  purpose?: 'year' | 'category';
  id?: string;
  name?: string;
  label?: string;
  defaultValue?: string;
  labelClass?: string;
  SelectClass?: string;
  OptionClass?: string;
}

export default function Select({
  purpose,
  id,
  name,
  label,
  defaultValue,
  labelClass,
  SelectClass,
  OptionClass,
}: SelectProps) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - 20 + i);
  const categories = ['팀', '단체', '동아리', '행사'];
  const [selectedValue, setSelectedValue] = useState<string>('');

  const options =
    purpose === 'year'
      ? years.map((year) => ({ value: String(year), label: `${year}년` }))
      : categories.map((category) => ({ value: category, label: category }));

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
        value={selectedValue}
        onChange={(e) => setSelectedValue(e.target.value)}
        className={`border border-gray-500 rounded-lg text-gray-500 font-medium px-2.5 py-2 h-[40px] md:px-4.5 md:py-4 md:h-[50px] hover:border-primary-700 focus:border-primary-700 active:border-primary-700 ${SelectClass || ''}`}
      >
        <option value="" disabled>
          {defaultValue}
        </option>
        {options.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
            className={`text-gray-900 ${OptionClass || ''}`}
          >
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
