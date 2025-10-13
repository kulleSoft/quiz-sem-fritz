import { useState, useEffect } from "react";
import { QuizButton } from "@/components/ui/quiz-button";
import { Card } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Clock, CheckCircle, XCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import backgroundImage from "@/assets/background.jpeg";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const questionsByCategory: Record<string, Question[]> = {
  geografia: [
    {
      id: 1,
      question: "Qual é a capital do Brasil?",
      options: ["São Paulo", "Rio de Janeiro", "Brasília", "Belo Horizonte"],
      correct: 2,
      explanation: "Brasília é a capital federal do Brasil desde 1960."
    },
    {
      id: 2,
      question: "Qual o maior país do mundo?",
      options: ["China", "Rússia", "Canadá", "Estados Unidos"],
      correct: 1,
      explanation: "A Rússia é o maior país do mundo em área territorial."
    },
    {
      id: 3,
      question: "Qual é o rio mais longo do mundo?",
      options: ["Nilo", "Amazonas", "Yangtzé", "Mississippi"],
      correct: 1,
      explanation: "O Rio Nilo é considerado o rio mais longo do mundo."
    }
  ],
  historia: [
    {
      id: 1,
      question: "Em que ano ocorreu a independência do Brasil?",
      options: ["1822", "1889", "1500", "1808"],
      correct: 0,
      explanation: "A independência do Brasil foi proclamada em 7 de setembro de 1822."
    },
    {
      id: 2,
      question: "Quem foi o primeiro presidente do Brasil?",
      options: ["Getúlio Vargas", "Deodoro da Fonseca", "Juscelino Kubitschek", "Dom Pedro II"],
      correct: 1,
      explanation: "Deodoro da Fonseca foi o primeiro presidente do Brasil."
    },
    {
      id: 3,
      question: "Quando acabou a Segunda Guerra Mundial?",
      options: ["1943", "1944", "1945", "1946"],
      correct: 2,
      explanation: "A Segunda Guerra Mundial terminou em 1945."
    }
  ],
  ciencias: [
    {
      id: 1,
      question: "Quantos planetas existem no sistema solar?",
      options: ["7", "8", "9", "10"],
      correct: 1,
      explanation: "O sistema solar tem 8 planetas oficiais desde que Plutão foi reclassificado como planeta anão."
    },
    {
      id: 2,
      question: "Qual é o gás mais abundante na atmosfera terrestre?",
      options: ["Oxigênio", "Nitrogênio", "Gás Carbônico", "Hidrogênio"],
      correct: 1,
      explanation: "O nitrogênio representa cerca de 78% da atmosfera terrestre."
    },
    {
      id: 3,
      question: "Qual é a velocidade da luz?",
      options: ["300.000 km/s", "150.000 km/s", "500.000 km/s", "200.000 km/s"],
      correct: 0,
      explanation: "A velocidade da luz no vácuo é aproximadamente 300.000 km/s."
    }
  ],
  entretenimento: [
    {
      id: 1,
      question: "Qual filme ganhou o Oscar de melhor filme em 2020?",
      options: ["Parasita", "Coringa", "1917", "Era Uma Vez em Hollywood"],
      correct: 0,
      explanation: "Parasita foi o primeiro filme em língua não inglesa a ganhar o Oscar de melhor filme."
    },
    {
      id: 2,
      question: "Qual é a série mais assistida da Netflix?",
      options: ["Stranger Things", "Round 6", "La Casa de Papel", "The Witcher"],
      correct: 1,
      explanation: "Round 6 se tornou a série mais assistida da Netflix."
    },
    {
      id: 3,
      question: "Quem interpretou o Homem de Ferro no MCU?",
      options: ["Chris Evans", "Robert Downey Jr.", "Chris Hemsworth", "Mark Ruffalo"],
      correct: 1,
      explanation: "Robert Downey Jr. interpretou Tony Stark/Homem de Ferro no MCU."
    }
  ],
  arte: [
    {
      id: 1,
      question: "Quem pintou a Mona Lisa?",
      options: ["Van Gogh", "Picasso", "Leonardo da Vinci", "Michelangelo"],
      correct: 2,
      explanation: "Leonardo da Vinci pintou a Mona Lisa entre 1503 e 1519."
    },
    {
      id: 2,
      question: "Qual movimento artístico Pablo Picasso fundou?",
      options: ["Impressionismo", "Cubismo", "Surrealismo", "Expressionismo"],
      correct: 1,
      explanation: "Pablo Picasso foi um dos fundadores do Cubismo."
    },
    {
      id: 3,
      question: "Onde está localizado o Museu do Louvre?",
      options: ["Londres", "Nova York", "Paris", "Roma"],
      correct: 2,
      explanation: "O Museu do Louvre está localizado em Paris, França."
    }
  ],
  musica: [
    {
      id: 1,
      question: "Qual banda britânica é conhecida como os 'Fab Four'?",
      options: ["The Rolling Stones", "The Beatles", "Queen", "Led Zeppelin"],
      correct: 1,
      explanation: "The Beatles eram conhecidos como os 'Fab Four'."
    },
    {
      id: 2,
      question: "Quantas cordas tem um violão tradicional?",
      options: ["4", "5", "6", "7"],
      correct: 2,
      explanation: "Um violão tradicional tem 6 cordas."
    },
    {
      id: 3,
      question: "Quem é conhecido como o 'Rei do Pop'?",
      options: ["Elvis Presley", "Michael Jackson", "Prince", "Freddie Mercury"],
      correct: 1,
      explanation: "Michael Jackson é conhecido como o 'Rei do Pop'."
    }
  ],
  general: [
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
  ],
  daily: [
    {
      id: 1,
      question: "Qual é o maior oceano do mundo?",
      options: ["Atlântico", "Índico", "Pacífico", "Ártico"],
      correct: 2,
      explanation: "O Oceano Pacífico é o maior oceano do mundo."
    },
    {
      id: 2,
      question: "Qual é a montanha mais alta do mundo?",
      options: ["K2", "Monte Everest", "Kilimanjaro", "Aconcágua"],
      correct: 1,
      explanation: "O Monte Everest é a montanha mais alta do mundo com 8.848 metros."
    },
    {
      id: 3,
      question: "Quantos continentes existem?",
      options: ["5", "6", "7", "8"],
      correct: 2,
      explanation: "Existem 7 continentes: África, América do Norte, América do Sul, Antártida, Ásia, Europa e Oceania."
    }
  ]
};

const Quiz = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const questions = questionsByCategory[category || 'general'] || questionsByCategory.general;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !showResult && !quizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleTimeUp();
    }
  }, [timeLeft, showResult, quizCompleted]);

  // Auto-advance to next question after showing result
  useEffect(() => {
    if (showResult && timeLeft === 0) {
      const timer = setTimeout(() => {
        handleNextQuestion();
      }, 3000); // Wait 3 seconds before moving to next question
      return () => clearTimeout(timer);
    }
  }, [showResult, timeLeft]);

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
    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(10);
    } else {
      setQuizCompleted(true);
      toast({
        title: "Quiz concluído!",
        description: `Você acertou ${score}/${questions.length} perguntas.`,
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
      <div 
        className="min-h-screen p-6 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="max-w-md mx-auto relative z-10">
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
                  {score}/{questions.length}
                </span>
              </div>
              <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                <span className="text-foreground">Percentual:</span>
                <span className="text-2xl font-bold text-quiz-blue">
                  {Math.round((score / questions.length) * 100)}%
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

  const currentQ = questions[currentQuestion];

  return (
    <div 
      className="min-h-screen p-6 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="max-w-md mx-auto relative z-10">
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
              {currentQuestion + 1}/{questions.length}
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
              {currentQuestion < questions.length - 1 ? "Próxima Pergunta" : "Ver Resultado"}
            </QuizButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;