export interface ResumeAnalysis {
  score: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

export interface InterviewQuestion {
  question: string;
  answer: string;
  score: number;
  feedback: string;
  improvements: string[];
}

export interface SalaryRange {
  min: number;
  max: number;
}