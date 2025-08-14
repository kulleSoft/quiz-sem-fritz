import { useState, useEffect } from "react";
import { QuizButton } from "@/components/ui/quiz-button";
import { Card } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Clock, CheckCircle, XCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const sampleQuestions: Question[] = [
  {
    id: 1,
    question: "Qual é a capital do Brasil?",
    options: ["São Paulo", "Rio de Janeiro", "Brasília", "Belo Horizonte"],
    correct: 2,
    explanation: "Brasília é a capital federal do Brasil desde 1960."
  },
  {
    id: 2,
    question: "Quantos planetas existem no sistema solar?",
    options: ["7", "8", "9", "10"],
    correct: 1,
    explanation: "O sistema solar tem 8 planetas oficiais desde que Plutão foi reclassificado como planeta anão."
  },
  {
    id: 3,
    question: "Quem pintou a Mona Lisa?",
    options: ["Van Gogh", "Picasso", "Leonardo da Vinci", "Michelangelo"],
    correct: 2,
    explanation: "Leonardo da Vinci pintou a Mona Lisa entre 1503 e 1519."
  }
];

const Quiz = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !showResult && !quizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleTimeUp();
    }
  }, [timeLeft, showResult, quizCompleted]);

  const handleTimeUp = () => {
    setShowResult(true);
    toast({
      title: "Tempo esgotado!",
      description: "Passando para a próxima pergunta...",
      variant: "destructive",
    });
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleConfirmAnswer = () => {
    if (selectedAnswer === null) return;
    
    setShowResult(true);
    if (selectedAnswer === sampleQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(30);
    } else {
      setQuizCompleted(true);
      toast({
        title: "Quiz concluído!",
        description: `Você acertou ${score}/${sampleQuestions.length} perguntas.`,
      });
    }
  };

  const getCategoryName = () => {
    switch (category) {
      case 'daily': return 'Desafio Diário';
      case 'geografia': return 'Geografia';
      case 'historia': return 'História';
      case 'ciencias': return 'Ciências';
      case 'entretenimento': return 'Entretenimento';
      case 'arte': return 'Arte';
      case 'musica': return 'Música';
      default: return 'Quiz Geral';
    }
  };

  if (quizCompleted) {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-md mx-auto">
          <Card className="p-8 bg-quiz-card border-quiz-orange/20 text-center quiz-shadow-card">
            <div className="mb-6">
              <div className="w-24 h-24 mx-auto rounded-full quiz-gradient-orange flex items-center justify-center mb-4">
                <CheckCircle className="w-12 h-12 text-quiz-navy" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Parabéns!
              </h2>
              <p className="text-muted-foreground mb-4">
                Você completou o {getCategoryName()}
              </p>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                <span className="text-foreground">Pontuação:</span>
                <span className="text-2xl font-bold text-quiz-orange">
                  {score}/{sampleQuestions.length}
                </span>
              </div>
              <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                <span className="text-foreground">Percentual:</span>
                <span className="text-2xl font-bold text-quiz-blue">
                  {Math.round((score / sampleQuestions.length) * 100)}%
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <QuizButton
                variant="primary"
                size="lg"
                className="w-full"
                onClick={() => navigate("/")}
              >
                Voltar ao Menu
              </QuizButton>
              <QuizButton
                variant="outline"
                size="lg"
                className="w-full"
                onClick={() => window.location.reload()}
              >
                Jogar Novamente
              </QuizButton>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  const currentQ = sampleQuestions[currentQuestion];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6">
          <QuizButton
            variant="outline"
            size="icon"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="w-5 h-5" />
          </QuizButton>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">{getCategoryName()}</p>
            <p className="text-lg font-bold text-foreground">
              {currentQuestion + 1}/{sampleQuestions.length}
            </p>
          </div>
          
          <div className="flex items-center gap-2 bg-quiz-card px-3 py-2 rounded-lg">
            <Clock className="w-4 h-4 text-quiz-orange" />
            <span className={`font-bold ${timeLeft <= 10 ? 'text-red-500' : 'text-foreground'}`}>
              {timeLeft}s
            </span>
          </div>
        </div>

        <Card className="p-6 bg-quiz-card border-quiz-orange/20 mb-6 quiz-shadow-card">
          <h2 className="text-xl font-bold text-foreground mb-4">
            {currentQ.question}
          </h2>
          
          <div className="space-y-3">
            {currentQ.options.map((option, index) => {
              let buttonClass = "w-full p-4 text-left rounded-lg border-2 transition-all ";
              
              if (showResult) {
                if (index === currentQ.correct) {
                  buttonClass += "border-green-500 bg-green-500/20 text-green-300";
                } else if (index === selectedAnswer && index !== currentQ.correct) {
                  buttonClass += "border-red-500 bg-red-500/20 text-red-300";
                } else {
                  buttonClass += "border-muted bg-muted/50 text-muted-foreground";
                }
              } else {
                if (selectedAnswer === index) {
                  buttonClass += "border-quiz-orange bg-quiz-orange/20 text-quiz-orange";
                } else {
                  buttonClass += "border-muted bg-muted/50 text-foreground hover:border-quiz-orange/50";
                }
              }

              return (
                <button
                  key={index}
                  className={buttonClass}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-current/20 flex items-center justify-center text-sm font-bold">
                      {String.fromCharCode(65 + index)}
                    </span>
                    {option}
                    {showResult && index === currentQ.correct && (
                      <CheckCircle className="w-5 h-5 ml-auto text-green-500" />
                    )}
                    {showResult && index === selectedAnswer && index !== currentQ.correct && (
                      <XCircle className="w-5 h-5 ml-auto text-red-500" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        {showResult && (
          <Card className="p-4 bg-quiz-card border-quiz-blue/20 mb-6">
            <p className="text-sm text-muted-foreground">
              <strong>Explicação:</strong> {currentQ.explanation}
            </p>
          </Card>
        )}

        <div className="space-y-3">
          {!showResult ? (
            <QuizButton
              variant="primary"
              size="lg"
              className="w-full"
              onClick={handleConfirmAnswer}
              disabled={selectedAnswer === null}
            >
              Confirmar Resposta
            </QuizButton>
          ) : (
            <QuizButton
              variant="primary"
              size="lg"
              className="w-full"
              onClick={handleNextQuestion}
            >
              {currentQuestion < sampleQuestions.length - 1 ? "Próxima Pergunta" : "Ver Resultado"}
            </QuizButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;