import { QuizButton } from "@/components/ui/quiz-button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Globe, Gamepad, History, Dna, Palette, Music } from "lucide-react";
import backgroundImage from "@/assets/background.jpeg";

const Categories = () => {
  const navigate = useNavigate();

  const categories = [
    { id: 'geografia', name: 'Geografia', icon: Globe, color: 'bg-emerald-500' },
    { id: 'historia', name: 'História', icon: History, color: 'bg-amber-500' },
    { id: 'ciencias', name: 'Ciências', icon: Dna, color: 'bg-blue-500' },
    { id: 'entretenimento', name: 'Entretenimento', icon: Gamepad, color: 'bg-purple-500' },
    { id: 'arte', name: 'Arte', icon: Palette, color: 'bg-pink-500' },
    { id: 'musica', name: 'Música', icon: Music, color: 'bg-indigo-500' },
  ];

  return (
    <div 
      className="min-h-screen p-6 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="max-w-md mx-auto relative z-10">
        <div className="flex items-center gap-4 mb-8">
          <QuizButton
            variant="outline"
            size="icon"
            onClick={() => navigate("/")}
            className="shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </QuizButton>
          <h1 className="text-3xl font-bold text-foreground">Categorias</h1>
        </div>

        <div className="space-y-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.id}
                className="p-6 bg-quiz-card border-quiz-orange/20 hover:border-quiz-orange/40 transition-all cursor-pointer hover:scale-105 quiz-shadow-card"
                onClick={() => {
                  console.log("Navigating to category:", category.id, "URL:", `/quiz/${category.id}`);
                  navigate(`/quiz/${category.id}`);
                }}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${category.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{category.name}</h3>
                    <p className="text-muted-foreground">Teste seus conhecimentos</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Categories;