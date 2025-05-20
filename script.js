// ===== Theme Toggle =====
function toggleTheme() {
  document.body.classList.toggle("dark");
}

// ===== Full Question Set =====
const fullQuestionSet = [
  { question: "What does HTML stand for?", options: ["Hyper Text Markup Language","Home Tool Markup Language","Hyperlinks and Text Markup Language","High-level Text Management Language"], answer: "Hyper Text Markup Language" },
  { question: "Which CSS property controls the text size?", options: ["font-style","text-size","font-size","text-style"], answer: "font-size" },
  { question: "Inside which HTML element do we put the JavaScript?", options: ["<js>","<scripting>","<script>","<javascript>"], answer: "<script>" },
  { question: "Which built-in method removes the last element from an array?", options: [".pop()",".last()",".shift()",".remove()"], answer: ".pop()" },
  { question: "Which operator is used to assign a value to a variable?", options: ["=","==","===","::"], answer: "=" },
  { question: "How do you write 'Hello World' in an alert box?", options: ["alertBox('Hello World');","msg('Hello World');","alert('Hello World');","msgBox('Hello World');"], answer: "alert('Hello World');" },
  { question: "Which HTML attribute is used to define inline styles?", options: ["styles","style","font","class"], answer: "style" },
  { question: "What is the correct CSS syntax to make all <p> elements bold?", options: ["p {font-weight:bold;}","p {text-style:bold;}","<p style='font-weight:bold;'>","p.bold();"], answer: "p {font-weight:bold;}" },
  { question: "Which symbol is used for comments in JavaScript?", options: ["<!-- -->","//","/* */","#"], answer: "//" },
  { question: "Which method fetches resources asynchronously across the network?", options: ["fetch()","get()","load()","request()"], answer: "fetch()" },
  { question: "How do you convert a JSON string into a JavaScript object?", options: ["JSON.parse()","JSON.stringify()","JSON.toObject()","JSON.decode()"], answer: "JSON.parse()" },
  { question: "Which HTML element is used to define the footer of a document?", options: ["<bottom>","<footer>","<section>","<aside>"], answer: "<footer>" }
];

// ===== Randomize 5 Questions =====
function getRandomQuestions(arr, count = 5) {
  return [...arr].sort(() => 0.5 - Math.random()).slice(0, count);
}
const questions = getRandomQuestions(fullQuestionSet);

// ===== Quiz Logic =====
let currentQuestion = 0;
let score = 0;

const questionEl      = document.getElementById("question");
const optionsEl       = document.getElementById("options");
const nextBtn         = document.getElementById("next-btn");
const scoreContainer  = document.getElementById("score-container");
const scoreEl         = document.getElementById("score");
const totalEl         = document.getElementById("total");

if (questionEl) {
  totalEl.innerText = questions.length;
  loadQuestion();
}

function loadQuestion() {
  const q = questions[currentQuestion];
  questionEl.innerText = q.question;
  optionsEl.innerHTML = "";
  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => selectOption(btn, q.answer);
    const li = document.createElement("li");
    li.appendChild(btn);
    optionsEl.appendChild(li);
  });
  nextBtn.style.display = "none";
}

function selectOption(button, correctAnswer) {
  const buttons = optionsEl.querySelectorAll("button");
  buttons.forEach(btn => btn.disabled = true);
  if (button.innerText === correctAnswer) {
    score++;
    button.classList.add("selected");
  } else {
    button.classList.add("wrong");
  }
  nextBtn.style.display = "inline-block";
}

nextBtn?.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  // hide quiz ui
  document.getElementById("quiz-container").style.display = "none";
  // reveal score
  scoreContainer.classList.remove("hidden");
  scoreEl.innerText = score;
  totalEl.innerText = questions.length;

  // suggestion based on score
  const suggestion = document.createElement("p");
  suggestion.classList.add("suggestion");
  const percent = (score / questions.length) * 100;
  if (percent === 100) {
    suggestion.innerText = "🎉 Perfect score! You're a quiz master!";
  } else if (percent >= 80) {
    suggestion.innerText = "👏 Great job! You have a strong grasp of these topics.";
  } else if (percent >= 50) {
    suggestion.innerText = "👍 Not bad! Review a few areas and try again.";
  } else {
    suggestion.innerText = "🤔 Keep practicing the basics of HTML, CSS, and JavaScript.";
  }
  scoreContainer.appendChild(suggestion);
}

// ===== Trivia API Fetch =====
const fetchBtn = document.getElementById("fetch-btn");
const triviaText = document.getElementById("trivia-text");

if (fetchBtn && triviaText) {
  fetchBtn.addEventListener("click", async () => {
    const spinner = document.getElementById("spinner");
    spinner.classList.remove("hidden");
    triviaText.innerText = "";
    try {
      const res = await fetch("https://v2.jokeapi.dev/joke/Any");
      const data = await res.json();
      if (data.type === "single") {
        triviaText.innerText = data.joke;
      } else if (data.type === "twopart") {
        triviaText.innerText = `${data.setup} ... ${data.delivery}`;
      }
    } catch {
      triviaText.innerText = "Failed to load trivia. Try again!";
    } finally {
      spinner.classList.add("hidden");
    }
  });
}
