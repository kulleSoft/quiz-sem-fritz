import { QuizButton } from "@/components/ui/quiz-button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Trophy, Target } from "lucide-react";

const DailyChallenge = () => {
  const navigate = useNavigate();
  const today = new Date().toLocaleDateString('pt-BR', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-md mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <QuizButton
            variant="outline"
            size="icon"
            onClick={() => navigate("/")}
            className="shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </QuizButton>
          <h1 className="text-3xl font-bold text-foreground">Desafio Diário</h1>
        </div>

        <Card className="p-6 bg-quiz-card border-quiz-orange/20 mb-6 quiz-shadow-card">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-6 h-6 text-quiz-orange" />
            <span className="text-muted-foreground capitalize">{today}</span>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Desafio de Hoje
          </h2>
          <p className="text-muted-foreground mb-4">
            Complete o quiz diário e ganhe pontos extras! 
            Cada desafio tem 10 perguntas especiais.
          </p>
        </Card>

        <Card className="p-6 bg-quiz-card border-quiz-blue/20 mb-6 quiz-shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Target className="w-6 h-6 text-quiz-blue" />
              <span className="font-bold text-foreground">Meta Diária</span>
            </div>
            <span className="text-quiz-blue font-bold">7/10</span>
          </div>
          <div className="w-full bg-muted rounded-full h-3 mb-2">
            <div 
              className="quiz-gradient-blue h-3 rounded-full transition-all duration-500" 
              style={{ width: '70%' }}
            ></div>
          </div>
          <p className="text-sm text-muted-foreground">
            Faltam apenas 3 respostas certas para completar sua meta!
          </p>
        </Card>

        <Card className="p-6 bg-quiz-card border-quiz-yellow/20 mb-8 quiz-shadow-card">
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="w-6 h-6 text-quiz-yellow" />
            <span className="font-bold text-foreground">Recompensas</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Completar desafio:</span>
              <span className="text-quiz-orange font-bold">+50 pontos</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Sequência de 7 dias:</span>
              <span className="text-quiz-yellow font-bold">+200 pontos</span>
            </div>
          </div>
        </Card>

        <QuizButton
          variant="primary"
          size="lg"
          className="w-full"
          onClick={() => navigate("/quiz/daily")}
        >
          Começar Desafio
        </QuizButton>
      </div>
    </div>
  );
};

export default DailyChallenge;