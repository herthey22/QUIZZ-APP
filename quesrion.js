//The code defines an array called quizData that contains multiple objects. 
//Each object represents a question in the quiz and has properties such as
// question (the question itself), 
//options (an array of answer options), and answer (the correct answer).
const quizData = [
    {
      question: 'The book of Genesis is the book that tells the story of',
      options: [
        'The Creation, Cain and Abel and Noah and the Ark.', 
        'Joseph in Egypt', 
        'The tower of Babel, Abraham, Isaac and Jacob.', 
        'The birth of Jesus'
      ],
      answer: 'The Creation, Cain and Abel and Noah and the Ark.',
    },
    {
      question: 'The first five books of the Bible are called:',
      options: ['The Pentagon', 'The Pentateuch', 'The Menorah', 'The Memorandum'],
      answer: 'The Pentateuch',
    },
    {
      question: 'Who wrote the first five books of the Bible?',
      options: ['Adam', 'Moses', 'David', 'Abraham'],
      answer: 'Moses',
    },
    {
      question: 'Why did Adam call his wife Eve?',
      options: [
        'She was the first born among women', 
        'She was a help meet fit for him', 
        'She was the mother of all living', 
        'She was taken out of man'
      ],
      answer: 'She was the mother of all living',
    },
    {
      question: 'Moses was hidden among the bulrushes in what river:',
      options: [
        'Euphrates',
        'Jordan',
        'Nile',
        'Tigris',
      ],
      answer: 'Nile',
    },
    {
      question: 'The first son of Adam and Eve was called......' ,
      options: ['Seth', 'Abel', 'Cain', 'Joshua'],
      answer: 'Cain',
    },
    {
      question: 'Who found Moses and adopted him?',
      options: [
        'The wife of Pharaoh',
        'The daughter of Pharaoh',
        'The sister of Pharaoh',
        'The servant of Pharaoh',
      ],
      answer: 'The daughter of Pharaoh',
    },
    {
      question: 'Where did Moses send men to spy out the land?',
      options: ['Caanan', 'Egypt', 'Median', 'Syria'],
      answer: 'Caanan',
    },
    {
      question: 'Where did Moses first encounter the Lord?',
      options: [
        'In a dream',
        'In a vision',
        'At well',
        'At a burning bush',
      ],
      answer: 'At a burning bush',
    },
    {
      question: 'The brother of Moses was named:',
      options: ['Aron', 'Levi', 'Joshua', 'Abraham'],
      answer: 'Aron',
    },
  ];
  

  //The code then defines variables to store references to various elements 
  //in the HTML document, such as the quizContainer, resultContainer, 
  //submitButton, retryButton, and showAnswerButton. These elements are
  // identified usingtheir respective IDs.
  const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

//Two variables, currentQuestion and score, are initialized to keep track of the
// current question being displayed and the player's score, 
// respectively. Additionally, an array called incorrectAnswers is created 
//to store any incorrect answers provided by the player.
let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

//The code includes a function called shuffleArray, which takes an array as input 
//and shuffles its elements randomly. This function is used to randomize the order 
//of answer options for each question.
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
   const j = Math.floor(Math.random() * (i + 1));
   [array[i], array[j]] = [array[j], array[i]];
 }
}


// displaying the quiz
//The displayQuestion function is defined to render the current question
 //and its answer options on the page. It retrieves the question data from 
 //the quizData array based on the currentQuestion index. It creates HTML elements
  //dynamically to display the question and options, and appends them to the 
  //quizContainer.
function displayQuestion() {
 const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

//The checkAnswer function is responsible for validating the player's answer. 
//It retrieves the selected option using a CSS selector, checks if an option is 
//selected, compares the selected answer with the correct answer from quizData, 
//and increments the score or adds the question to the incorrectAnswers array 
////accordingly. It then updates the currentQuestion index, clears the selected 
//option, and either displays the next question or the result if there are no more
// questions.
function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}


//The displayResult function is called when all the questions
 //have been answered. It hides the quiz container and submit button,
  //and shows the retry and show answer buttons. It displays the player's 
  //score and the number of questions in the resultContainer.
function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

//The retryQuiz function is called when the player clicks the retry button. 
//It resets the currentQuestion, score, and incorrectAnswers to their initial 
//values, displays the quiz container and submit button, and hides the retry 
//and show answer buttons. It also clears the result container and calls 
//displayQuestion to start the quiz again.
function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}


//The showAnswer function is called when the player clicks the show answer button.
//It hides the quiz container, submit button, and show answer button. It generates
//HTML to display the player's score and lists all the incorrect answers with the
//corresponding correct answers.
function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';

  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
  }

  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}

//Event listeners are attached to the submit, retry, and show answer buttons, 
//which call their respective functions when clicked.
submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

//Finally, the displayQuestion function is called initially to start 
//the quiz by displaying the first question.
displayQuestion();