import React from 'react';
import type { ResumeAnalysis } from '../types';

interface Props {
  analysis: ResumeAnalysis;
}

export const ResumeAnalysisResult: React.FC<Props> = ({ analysis }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-gray-600">总体评分</span>
        <span className="text-2xl font-bold text-blue-600">
          {analysis.score}/10
        </span>
      </div>
      <div className="space-y-4">
        <div>
          <h3 className="font-medium text-gray-900 mb-2">优势</h3>
          <ul className="list-disc pl-5 space-y-1">
            {analysis.strengths.map((strength, index) => (
              <li key={index} className="text-gray-600">
                {strength}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-medium text-gray-900 mb-2">待提升</h3>
          <ul className="list-disc pl-5 space-y-1">
            {analysis.weaknesses.map((weakness, index) => (
              <li key={index} className="text-gray-600">
                {weakness}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
