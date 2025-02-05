import React, { useState } from 'react';
import { Send, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { InterviewQuestion } from '../types';

interface Props {
  questions: InterviewQuestion[];
  onComplete: (answers: InterviewQuestion[]) => void;
}

export function InterviewSession({ questions, onComplete }: Props) {
  const { t } = useTranslation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState('');
  const [answers, setAnswers] = useState<InterviewQuestion[]>([]);

  const handleSubmitAnswer = () => {
    if (answer.trim()) {
      const updatedAnswers = [
        ...answers,
        { ...questions[currentQuestion], answer },
      ];
      setAnswers(updatedAnswers);
      setAnswer('');

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        onComplete(updatedAnswers);
      }
    }
  };

  return (
    <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900">
          {t('interviewSession.questionCount', {
            current: currentQuestion + 1,
            total: questions.length,
          })}
        </h3>
        <p className="mt-2 text-lg text-gray-700">
          {questions[currentQuestion].question}
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-start space-x-4">
          <MessageCircle className="w-6 h-6 mt-2 text-gray-400" />
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="flex-1 p-3 min-h-[120px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={t('interviewSession.placeholder')}
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSubmitAnswer}
            className="flex items-center px-4 py-2 space-x-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <span>{t('interviewSession.submitAnswer')}</span>
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="mt-6">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{
              width: `${((currentQuestion + 1) / questions.length) * 100}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
