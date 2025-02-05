import React, { useState } from 'react';
import { FileText, BrainCircuit, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ResumeUpload } from './components/ResumeUpload';
import { SalarySelector } from './components/SalarySelector';
import { InterviewSession } from './components/InterviewSession';
import { Results } from './components/Results';
import type { ResumeAnalysis, InterviewQuestion, SalaryRange } from './types';
import './i18n';

function App() {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [resumeAnalysis, setResumeAnalysis] = useState<ResumeAnalysis | null>(
    null
  );
  const [salaryRange, setSalaryRange] = useState<SalaryRange | null>(null);
  const [interviewResults, setInterviewResults] = useState<
    InterviewQuestion[] | null
  >(null);

  const handleResumeUpload = async (file: File) => {
    // TODO: Implement DeepSeek API integration for resume analysis
    const mockAnalysis: ResumeAnalysis = {
      score: 8.5,
      strengths: [
        t('mockData.strengths.technical'),
        t('mockData.strengths.experience'),
      ],
      weaknesses: [t('mockData.weaknesses.leadership')],
      recommendations: [t('mockData.recommendations.impact')],
    };
    setResumeAnalysis(mockAnalysis);
    setStep(2);
  };

  const handleSalarySelect = (range: SalaryRange) => {
    setSalaryRange(range);
    setStep(3);
  };

  const handleInterviewComplete = (answers: InterviewQuestion[]) => {
    setInterviewResults(answers);
    setStep(4);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2">
            <BrainCircuit className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              {t('appTitle')}
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-8">
          {/* Enhanced Slogan Section with Mobile Responsiveness */}
          <div className="w-full max-w-4xl text-center py-6 sm:py-8 px-3 sm:px-4 bg-gradient-to-r from-blue-600/10 to-blue-400/10 rounded-2xl backdrop-blur-sm">
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-3xl sm:text-5xl font-bold">
                <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  {t('slogan')}
                </span>
              </h2>
              <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 text-gray-600">
                <div className="flex items-center gap-2">
                  <BrainCircuit className="w-5 sm:w-6 h-5 sm:h-6 text-blue-500 flex-shrink-0" />
                  <div className="flex flex-col items-start">
                    <span className="font-semibold text-sm sm:text-base">
                      DeepSeek 驱动
                    </span>
                    <span className="text-xs sm:text-sm">顶尖 AI 模型支持</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-5 sm:w-6 h-5 sm:h-6 text-blue-500 flex-shrink-0" />
                  <div className="flex flex-col items-start">
                    <span className="font-semibold text-sm sm:text-base">
                      深度简历解析
                    </span>
                    <span className="text-xs sm:text-sm">精准职业画像</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 sm:w-6 h-5 sm:h-6 text-blue-500 flex-shrink-0" />
                  <div className="flex flex-col items-start">
                    <span className="font-semibold text-sm sm:text-base">
                      智能面试模拟
                    </span>
                    <span className="text-xs sm:text-sm">贴合岗位需求</span>
                  </div>
                </div>
              </div>
              <div className="text-xs sm:text-sm text-blue-600 font-medium">
                Powered by DeepSeek AI Technology
              </div>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="w-full max-w-3xl mb-8">
            <div className="flex justify-between">
              {[1, 2, 3, 4].map((number) => (
                <div
                  key={number}
                  className={`flex items-center ${
                    number === step ? 'text-blue-600' : 'text-gray-400'
                  }`}
                >
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                      number === step
                        ? 'border-blue-600 bg-blue-50'
                        : number < step
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-300'
                    }`}
                  >
                    {number}
                  </div>
                  <div className="ml-2 text-sm font-medium">
                    {t(
                      `steps.${
                        ['resumeUpload', 'salaryRange', 'interview', 'results'][
                          number - 1
                        ]
                      }`
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          {step === 1 && (
            <div className="w-full flex flex-col items-center space-y-6">
              <FileText className="w-16 h-16 text-blue-600" />
              <h2 className="text-2xl font-semibold text-gray-900">
                {t('upload.title')}
              </h2>
              <p className="text-gray-600 text-center max-w-md">
                {t('upload.description')}
              </p>
              <ResumeUpload onUpload={handleResumeUpload} />
            </div>
          )}

          {step === 2 && resumeAnalysis && (
            <div className="w-full flex flex-col items-center space-y-8">
              <div className="w-full max-w-xl p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {t('analysis.title')}
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">
                      {t('analysis.overallScore')}
                    </span>
                    <span className="text-2xl font-bold text-blue-600">
                      {resumeAnalysis.score}/10
                    </span>
                  </div>
                  <div className="border-t pt-4">
                    <h3 className="font-medium text-gray-900 mb-2">
                      {t('analysis.strengths')}
                    </h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {resumeAnalysis.strengths.map((strength, index) => (
                        <li key={index} className="text-gray-600">
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <SalarySelector onSelect={handleSalarySelect} />
            </div>
          )}

          {step === 3 && (
            <InterviewSession
              questions={[
                {
                  question: t('interview.questions.interest'),
                  answer: '',
                  score: 0,
                  feedback: '',
                  improvements: [],
                },
                {
                  question: t('interview.questions.challenge'),
                  answer: '',
                  score: 0,
                  feedback: '',
                  improvements: [],
                },
              ]}
              onComplete={handleInterviewComplete}
            />
          )}

          {step === 4 && interviewResults && (
            <Results questions={interviewResults} finalDecision={true} />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
