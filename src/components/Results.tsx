import React from 'react';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import type { InterviewQuestion } from '../types';

interface Props {
  questions: InterviewQuestion[];
  finalDecision: boolean;
}

export function Results({ questions, finalDecision }: Props) {
  const averageScore = questions.reduce((acc, q) => acc + q.score, 0) / questions.length;

  return (
    <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-8 text-center">
        <div className="inline-block p-4 rounded-full bg-gray-50">
          {finalDecision ? (
            <CheckCircle className="w-12 h-12 text-green-500" />
          ) : (
            <XCircle className="w-12 h-12 text-red-500" />
          )}
        </div>
        <h2 className="mt-4 text-2xl font-bold text-gray-900">
          {finalDecision ? 'Congratulations!' : 'Thank you for your time'}
        </h2>
        <p className="mt-2 text-gray-600">
          {finalDecision
            ? 'You have been selected for the next round.'
            : 'Unfortunately, we will not be moving forward at this time.'}
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Interview Performance</h3>
        <div className="mt-2 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Average Score</span>
            <span className="text-xl font-bold text-gray-900">{averageScore.toFixed(1)}/10</span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {questions.map((q, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-medium text-gray-900">Question {index + 1}</h4>
              <span className={`px-2 py-1 text-sm rounded ${
                q.score >= 7 ? 'bg-green-100 text-green-800' :
                q.score >= 5 ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                Score: {q.score}/10
              </span>
            </div>
            <p className="mb-2 text-gray-700">{q.question}</p>
            <p className="mb-4 text-gray-600">Your answer: {q.answer}</p>
            
            <div className="space-y-2">
              <h5 className="flex items-center text-sm font-medium text-gray-900">
                <AlertTriangle className="w-4 h-4 mr-2 text-yellow-500" />
                Areas for Improvement
              </h5>
              <ul className="pl-6 list-disc text-sm text-gray-600">
                {q.improvements.map((improvement, i) => (
                  <li key={i}>{improvement}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}