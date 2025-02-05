import React, { useState } from 'react';
import {
  FileText,
  BrainCircuit,
  MessageCircle,
  DollarSign,
  CheckCircle,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ResumeUpload } from './components/ResumeUpload';
import { SalarySelector } from './components/SalarySelector';
import { InterviewSession } from './components/InterviewSession';
import { Results } from './components/Results';
import type { ResumeAnalysis, InterviewQuestion, SalaryRange } from './types';
import './i18n';
import { motion } from 'framer-motion';
import { ResumeAnalysisResult } from './components/ResumeAnalysisResult';

// 步骤配置
const STEPS = [
  { number: 1, label: '上传简历', icon: FileText },
  { number: 2, label: '薪资范围', icon: DollarSign },
  { number: 3, label: '面试', icon: MessageCircle },
  { number: 4, label: '结果', icon: CheckCircle },
] as const;

// 获取步骤状态的工具函数
const getStepStatus = (stepNumber: number, currentStep: number) => {
  if (stepNumber === currentStep) return 'current';
  if (stepNumber < currentStep) return 'completed';
  return 'upcoming';
};

// 步骤状态样式映射
const stepStatusStyles = {
  current: {
    circle: 'border-blue-600 bg-blue-50 text-blue-600',
    text: 'text-blue-600',
    line: 'bg-gray-200',
  },
  completed: {
    circle: 'border-green-500 bg-green-50 text-green-500',
    text: 'text-green-500',
    line: 'bg-green-500',
  },
  upcoming: {
    circle: 'border-gray-300 text-gray-400',
    text: 'text-gray-500',
    line: 'bg-gray-200',
  },
} as const;

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
    console.log(file, 'file');
    console.log(salaryRange, 'salaryRange');

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

  // 步骤指示器组件
  const StepIndicator = ({
    number,
    label,
    isLast,
  }: {
    number: number;
    label: string;
    isLast: boolean;
  }) => {
    const status = getStepStatus(number, step);
    const styles = stepStatusStyles[status];

    return (
      <div className="flex items-start mb-6 last:mb-0">
        <div className="relative">
          <div
            className={`w-6 h-6 text-sm rounded-full border-2 flex items-center justify-center ${styles.circle}`}
          >
            {number}
          </div>
          {!isLast && (
            <div
              className={`absolute left-3 top-6 w-[2px] h-10 -translate-x-1/2 ${styles.line}`}
            />
          )}
        </div>
        <span className={`ml-2 text-xs font-medium ${styles.text}`}>
          {label}
        </span>
      </div>
    );
  };

  // 内容区域组件
  const StepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex flex-col items-center space-y-3">
            <FileText className="w-8 h-8 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">
              上传您的简历
            </h2>
            <p className="text-xs text-gray-600 text-center max-w-md">
              我们将使用 AI 分析您的简历，提供个性化的面试问题和反馈。
            </p>
            <ResumeUpload onUpload={handleResumeUpload} />
          </div>
        );
      case 2:
        return resumeAnalysis ? (
          <div className="space-y-6">
            <ResumeAnalysisResult analysis={resumeAnalysis} />
            <SalarySelector onSelect={handleSalarySelect} />
          </div>
        ) : null;
      case 3:
        return (
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
        );
      case 4:
        return interviewResults ? (
          <Results questions={interviewResults} finalDecision={true} />
        ) : null;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Minimal Header */}
      <header className="bg-white/70 backdrop-blur-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center">
          <div className="flex items-center space-x-2">
            <BrainCircuit className="w-5 h-5 text-blue-600" />
            <span className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
              {t('appTitle')}
            </span>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <div className="relative overflow-hidden pt-16 pb-12">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <motion.h1
                className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {t('slogan')}
              </motion.h1>
              <motion.div
                className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse mr-2" />
                <span className="text-sm text-blue-600 font-medium">
                  Powered by DeepSeek AI Technology
                </span>
              </motion.div>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: BrainCircuit,
                  title: 'DeepSeek 驱动',
                  description: '顶尖 AI 模型支持',
                  gradient: 'from-blue-500 to-blue-600',
                },
                {
                  icon: FileText,
                  title: '深度简历解析',
                  description: '精准职业画像',
                  gradient: 'from-indigo-500 to-indigo-600',
                },
                {
                  icon: MessageCircle,
                  title: '智能面试模拟',
                  description: '贴合岗位需求',
                  gradient: 'from-sky-500 to-sky-600',
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="relative group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                >
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                  <div className="relative p-6 bg-white rounded-3xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow duration-500">
                    <div
                      className={`inline-flex p-3 rounded-2xl bg-gradient-to-r ${feature.gradient} mb-4`}
                    >
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 pb-16">
          <div className="bg-white rounded-3xl shadow-sm border border-blue-100 p-8">
            <div className="flex gap-12">
              {/* Steps */}
              <div className="w-48 shrink-0">
                <div className="sticky top-4 space-y-1">
                  {STEPS.map((s, index) => (
                    <div
                      key={s.number}
                      className={`flex items-center p-3 rounded-xl transition-colors ${
                        step === s.number
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      <s.icon className="w-5 h-5 mr-3" />
                      <span className="text-sm font-medium">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Content Area */}
              <div className="flex-1 min-h-[400px]">
                <StepContent />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
