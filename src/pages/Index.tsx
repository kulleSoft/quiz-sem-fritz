import { QuizIcon } from "@/components/QuizIcon";
import { QuizButton } from "@/components/ui/quiz-button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import backgroundImage from "@/assets/background.jpeg";

const Index = () => {
  const navigate = useNavigate();
  const [showTermsDialog, setShowTermsDialog] = useState(false);

  useEffect(() => {
    const hasSeenTerms = localStorage.getItem('quiz-terms-accepted');
    if (!hasSeenTerms) {
      setShowTermsDialog(true);
    }
  }, []);

  const handleAcceptTerms = () => {
    localStorage.setItem('quiz-terms-accepted', 'true');
    setShowTermsDialog(false);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-6 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
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
            onClick={() => { console.log("Navigating to /quiz/general"); navigate("/quiz/general"); }}
          >
            Jogar Agora
          </QuizButton>
          
          <QuizButton
            variant="primary"
            size="lg"
            className="w-full"
            onClick={() => { console.log("Navigating to /categories"); navigate("/categories"); }}
          >
            Categorias
          </QuizButton>
          
          <QuizButton
            variant="secondary"
            size="lg"
            className="w-full"
            onClick={() => { console.log("Navigating to /daily-challenge"); navigate("/daily-challenge"); }}
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

      <Dialog open={showTermsDialog} onOpenChange={() => {}}>
        <DialogContent className="max-w-md bg-quiz-navy border-quiz-orange/30 text-white max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-quiz-orange text-xl text-center">
              Termos de Uso e Privacidade
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold text-quiz-orange mb-2">Termos de Uso</h3>
              <p className="text-white/90 text-xs leading-relaxed">
                Ao usar este quiz, você concorda que o app é para entretenimento e educação. 
                É proibido uso comercial sem autorização e cópia do conteúdo.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-quiz-orange mb-2">Privacidade</h3>
              <p className="text-white/90 text-xs leading-relaxed">
                Coletamos apenas dados necessários (pontuações, progresso). 
                Não compartilhamos informações pessoais. Dados ficam no seu dispositivo.
                O app exibe anúncios para manter o serviço gratuito.
              </p>
            </div>
            
            <div className="flex flex-col gap-2 pt-4">
              <QuizButton
                variant="primary"
                size="lg"
                onClick={handleAcceptTerms}
                className="w-full"
              >
                Aceito os Termos
              </QuizButton>
              
              <button
                onClick={() => navigate("/terms")}
                className="text-xs text-quiz-orange hover:text-quiz-orange-light transition-colors underline"
              >
                Ler termos completos
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
