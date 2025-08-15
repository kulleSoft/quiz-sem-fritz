// Estado do jogo
let currentQuestionIndex = 0;
let score = 0;
let questions = [];
let selectedAnswer = null;

// Perguntas do quiz (dados simulados)
const quizQuestions = [
    {
        question: "Qual é o maior planeta do sistema solar?",
        answers: ["Terra", "Júpiter", "Saturno", "Netuno"],
        correct: 1
    },
    {
        question: "Em que ano o homem pisou na Lua pela primeira vez?",
        answers: ["1967", "1968", "1969", "1970"],
        correct: 2
    },
    {
        question: "Qual é o elemento químico mais abundante no universo?",
        answers: ["Oxigênio", "Carbono", "Hidrogênio", "Hélio"],
        correct: 2
    },
    {
        question: "Quantos ossos tem o corpo humano adulto?",
        answers: ["206", "215", "198", "220"],
        correct: 0
    },
    {
        question: "Qual é a capital da Austrália?",
        answers: ["Sydney", "Melbourne", "Canberra", "Perth"],
        correct: 2
    },
    {
        question: "Em que século viveu Leonardo da Vinci?",
        answers: ["XIV", "XV", "XVI", "XVII"],
        correct: 1
    },
    {
        question: "Qual é o menor país do mundo?",
        answers: ["Monaco", "Vaticano", "San Marino", "Liechtenstein"],
        correct: 1
    },
    {
        question: "Quem escreveu 'Dom Casmurro'?",
        answers: ["José de Alencar", "Machado de Assis", "Aluísio Azevedo", "Eça de Queirós"],
        correct: 1
    },
    {
        question: "Qual é a fórmula química da água?",
        answers: ["H2O", "CO2", "NaCl", "CH4"],
        correct: 0
    },
    {
        question: "Em que continente fica o Egito?",
        answers: ["Ásia", "Europa", "África", "América"],
        correct: 2
    }
];

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    checkTermsAcceptance();
});

// Verificar se os termos foram aceitos
function checkTermsAcceptance() {
    const hasSeenTerms = localStorage.getItem('quiz-terms-accepted');
    if (!hasSeenTerms) {
        showTermsModal();
    }
}

// Mostrar modal de termos
function showTermsModal() {
    document.getElementById('termsModal').classList.add('show');
}

// Aceitar termos
function acceptTerms() {
    localStorage.setItem('quiz-terms-accepted', 'true');
    document.getElementById('termsModal').classList.remove('show');
}

// Mostrar termos completos
function showTerms() {
    showTermsModal();
}

function showFullTerms() {
    alert('Página de termos completos em desenvolvimento');
}

// Navegação
function goHome() {
    hideAllScreens();
    document.querySelector('.container').style.display = 'flex';
}

function hideAllScreens() {
    document.querySelector('.container').style.display = 'none';
    document.getElementById('quizScreen').classList.add('hidden');
    document.getElementById('resultScreen').classList.add('hidden');
    document.getElementById('categoriesScreen').classList.add('hidden');
    document.getElementById('dailyChallengeScreen').classList.add('hidden');
}

// Iniciar quiz
function startQuiz(category) {
    hideAllScreens();
    
    // Reset do estado
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswer = null;
    questions = [...quizQuestions];
    
    // Embaralhar perguntas
    shuffleArray(questions);
    
    // Mostrar tela do quiz
    document.getElementById('quizScreen').classList.remove('hidden');
    
    // Atualizar UI
    updateScore();
    loadQuestion();
}

// Embaralhar array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Carregar pergunta atual
function loadQuestion() {
    const question = questions[currentQuestionIndex];
    
    // Atualizar número da pergunta
    document.getElementById('questionNumber').textContent = currentQuestionIndex + 1;
    document.getElementById('totalQuestions').textContent = questions.length;
    
    // Atualizar texto da pergunta
    document.getElementById('questionText').textContent = question.question;
    
    // Criar botões de resposta
    const answersContainer = document.getElementById('answersContainer');
    answersContainer.innerHTML = '';
    
    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.className = 'answer-btn';
        button.textContent = answer;
        button.onclick = () => selectAnswer(index);
        answersContainer.appendChild(button);
    });
    
    // Atualizar barra de progresso
    updateProgress();
    
    selectedAnswer = null;
}

// Selecionar resposta
function selectAnswer(answerIndex) {
    if (selectedAnswer !== null) return; // Já respondeu
    
    selectedAnswer = answerIndex;
    const question = questions[currentQuestionIndex];
    const answerButtons = document.querySelectorAll('.answer-btn');
    
    // Desabilitar todos os botões
    answerButtons.forEach(button => {
        button.classList.add('disabled');
    });
    
    // Marcar resposta correta e incorreta
    answerButtons[question.correct].classList.add('correct');
    
    if (answerIndex !== question.correct) {
        answerButtons[answerIndex].classList.add('incorrect');
    } else {
        score += 10; // 10 pontos por resposta correta
        updateScore();
    }
    
    // Próxima pergunta após 2 segundos
    setTimeout(() => {
        nextQuestion();
    }, 2000);
}

// Próxima pergunta
function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex >= questions.length) {
        showResults();
    } else {
        loadQuestion();
    }
}

// Mostrar resultados
function showResults() {
    hideAllScreens();
    document.getElementById('resultScreen').classList.remove('hidden');
    
    const finalScore = score;
    const maxScore = questions.length * 10;
    const percentage = Math.round((finalScore / maxScore) * 100);
    
    document.getElementById('finalScore').textContent = finalScore;
    
    let message = '';
    if (percentage >= 90) {
        message = '🌟 Excelente! Você é um verdadeiro gênio!';
    } else if (percentage >= 70) {
        message = '👏 Muito bom! Você tem um ótimo conhecimento!';
    } else if (percentage >= 50) {
        message = '👍 Bom trabalho! Continue estudando!';
    } else {
        message = '📚 Que tal estudar um pouco mais e tentar novamente?';
    }
    
    document.getElementById('resultMessage').textContent = message;
}

// Atualizar pontuação
function updateScore() {
    document.getElementById('score').textContent = score;
}

// Atualizar barra de progresso
function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
}

// Mostrar tela de categorias
function showCategories() {
    hideAllScreens();
    document.getElementById('categoriesScreen').classList.remove('hidden');
}

// Mostrar tela de desafio diário
function showDailyChallenge() {
    hideAllScreens();
    document.getElementById('dailyChallengeScreen').classList.remove('hidden');
    updateDailyDate();
}

// Atualizar data do desafio diário
function updateDailyDate() {
    const today = new Date();
    const options = { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    };
    const dateStr = today.toLocaleDateString('pt-BR', options);
    document.getElementById('dailyDate').textContent = dateStr;
}