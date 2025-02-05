import React from 'react';
import { DollarSign } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Props {
  onSelect: (range: { min: number; max: number }) => void;
}

const salaryRangesConfig = {
  en: [
    { min: 60000, max: 80000, key: '60-80' },
    { min: 80000, max: 100000, key: '80-100' },
    { min: 100000, max: 130000, key: '100-130' },
    { min: 130000, max: 160000, key: '130-160' },
    { min: 160000, max: 200000, key: '160-200' },
    { min: 200000, max: 250000, key: '200-250' },
  ],
  zh: [
    { min: 10000, max: 15000, key: '10-15' },
    { min: 15000, max: 20000, key: '15-20' },
    { min: 20000, max: 25000, key: '20-25' },
    { min: 25000, max: 30000, key: '25-30' },
    { min: 30000, max: 40000, key: '30-40' },
    { min: 40000, max: 50000, key: '40-50' },
  ],
};

export function SalarySelector({ onSelect }: Props) {
  const { t, i18n } = useTranslation();
  const salaryRanges =
    salaryRangesConfig[i18n.language as keyof typeof salaryRangesConfig] ||
    salaryRangesConfig.en;

  return (
    <div className="w-full max-w-xl">
      <h3 className="mb-4 text-lg font-medium text-gray-900">
        {t('salarySelector.title')}
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {salaryRanges.map((range) => (
          <button
            key={range.key}
            className="flex items-center justify-center px-4 py-3 space-x-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => onSelect({ min: range.min, max: range.max })}
          >
            <DollarSign className="w-4 h-4" />
            <span>{t(`salarySelector.ranges.${range.key}`)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
