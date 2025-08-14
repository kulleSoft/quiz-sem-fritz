import { QuizIcon } from "@/components/QuizIcon";
import { QuizButton } from "@/components/ui/quiz-button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-12">
          <QuizIcon className="mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-foreground mb-2">
            QUIZ
          </h1>
          <p className="text-2xl font-bold text-quiz-orange mb-2">
            GÊNIO DAS
          </p>
          <p className="text-2xl font-bold text-foreground">
            CURIOSIDADES
          </p>
        </div>
        
        <div className="space-y-4">
          <QuizButton
            variant="primary"
            size="lg"
            className="w-full"
            onClick={() => navigate("/quiz/general")}
          >
            Jogar Agora
          </QuizButton>
          
          <QuizButton
            variant="primary"
            size="lg"
            className="w-full"
            onClick={() => navigate("/categories")}
          >
            Categorias
          </QuizButton>
          
          <QuizButton
            variant="secondary"
            size="lg"
            className="w-full"
            onClick={() => navigate("/daily-challenge")}
          >
            Desafio Diário
          </QuizButton>
        </div>
        
        <div className="text-center mt-8">
          <button
            onClick={() => navigate("/terms")}
            className="text-sm text-white/70 hover:text-white transition-colors underline"
          >
            Termos de uso e privacidade
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
