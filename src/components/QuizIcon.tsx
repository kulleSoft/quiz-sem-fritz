import { cn } from "@/lib/utils";

interface QuizIconProps {
  className?: string;
}

export const QuizIcon = ({ className }: QuizIconProps) => {
  return (
    <div className={cn("relative", className)}>
      <div className="w-16 h-16 rounded-full bg-quiz-yellow flex items-center justify-center quiz-shadow-glow">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-8 h-8 text-quiz-navy"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16,17 21,12 16,7" />
          <line x1="21" x2="9" y1="12" y2="12" />
        </svg>
      </div>
      <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-quiz-orange flex items-center justify-center">
        <span className="text-xs font-bold text-quiz-navy">?</span>
      </div>
    </div>
  );
};