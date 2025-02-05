import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Props {
  onUpload: (file: File) => void;
}

export function ResumeUpload({ onUpload }: Props) {
  const { t } = useTranslation();
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      onUpload(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      onUpload(file);
    }
  };

  return (
    <div
      className={`w-full max-w-xl p-8 border-2 border-dashed rounded-lg ${
        isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
      } transition-colors duration-200`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        <Upload className="w-12 h-12 text-gray-400" />
        <p className="text-lg font-medium text-gray-700">
          {t('resumeUpload.dragAndDrop')}
        </p>
        <p className="text-sm text-gray-500">{t('resumeUpload.or')}</p>
        <label className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md cursor-pointer hover:bg-blue-700">
          {t('resumeUpload.browseFiles')}
          <input
            type="file"
            className="hidden"
            accept=".pdf"
            onChange={handleFileInput}
          />
        </label>
      </div>
    </div>
  );
}
