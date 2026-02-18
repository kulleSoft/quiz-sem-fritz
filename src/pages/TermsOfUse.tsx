import { QuizButton } from "@/components/ui/quiz-button";
import { useNavigate } from "react-router-dom";

const TermsOfUse = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-quiz-navy to-quiz-navy-dark">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <QuizButton
            variant="secondary"
            size="default"
            onClick={() => navigate("/")}
            className="mb-4"
          >
            ← Voltar
          </QuizButton>
          <h1 className="text-3xl font-bold text-white mb-2">
            Termos de Uso e Privacidade
          </h1>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 space-y-6 text-white">
          <section>
            <h2 className="text-xl font-bold text-quiz-orange mb-3">1. Termos de Uso</h2>
            <div className="space-y-2 text-sm leading-relaxed">
              <p>
                Ao utilizar o Quiz Gênio das Curiosidades, você concorda com os seguintes termos:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>O aplicativo é destinado para entretenimento e educação</li>
                <li>É proibido usar o app para fins comerciais sem autorização</li>
                <li>Não é permitido copiar ou redistribuir o conteúdo</li>
                <li>Reservamo-nos o direito de modificar estes termos a qualquer momento</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-quiz-orange mb-3">2. Política de Privacidade</h2>
            <div className="space-y-2 text-sm leading-relaxed">
              <p>
                Sua privacidade é importante para nós. Esta política descreve como tratamos seus dados:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Coletamos apenas dados necessários para o funcionamento do app</li>
                <li>Não compartilhamos informações pessoais com terceiros</li>
                <li>Dados de progresso são armazenados localmente no seu dispositivo</li>
                <li>Não utilizamos cookies de rastreamento</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-quiz-orange mb-3">3. Publicidade</h2>
            <div className="space-y-2 text-sm leading-relaxed">
              <p>Este aplicativo exibe anúncios para manter o serviço gratuito:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Anúncios podem ser exibidos durante o uso do aplicativo</li>
                <li>Utilizamos serviços de terceiros para exibição de anúncios</li>
                <li>Os anúncios podem usar identificadores do dispositivo para personalização</li>
                <li>Você pode desativar a personalização de anúncios nas configurações do seu dispositivo</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-quiz-orange mb-3">4. Dados Coletados</h2>
            <div className="space-y-2 text-sm leading-relaxed">
              <p>O aplicativo pode coletar:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Pontuações e progresso no quiz</li>
                <li>Preferências de categoria</li>
                <li>Dados de uso para melhorar a experiência</li>
                <li>Identificadores de publicidade para exibição de anúncios</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-quiz-orange mb-3">5. Contato</h2>
            <p className="text-sm leading-relaxed">
              Para dúvidas sobre estes termos ou nossa política de privacidade, entre em contato através do aplicativo.
            </p>
          </section>

          <section className="pt-4 border-t border-white/20">
            <p className="text-xs text-white/70">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;